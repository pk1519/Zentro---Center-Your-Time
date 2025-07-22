'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Send, ArrowLeft, Copy, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';

interface SendResponse {
  success: boolean;
  code: string;
  expiresAt: string;
  message: string;
  error?: string;
}

export default function SendPage() {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState(5);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SendResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type (only text-based files)
    const allowedTypes = ['text/plain', 'application/json', 'text/csv', 'text/xml'];
    const allowedExtensions = ['.txt', '.json', '.csv', '.xml', '.md'];
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
    
    if (!isAllowed) {
      setError('Only text-based files are allowed (.txt, .json, .csv, .xml, .md)');
      return;
    }

    if (file.size > 1024 * 1024) { // 1MB limit
      setError('File size must be less than 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMessage(content);
      setFileName(file.name);
      setError('');
    };
    reader.readAsText(file);
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setError('Please enter a message or upload a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          fileName,
          expiryMinutes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data);
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (response?.code) {
      await navigator.clipboard.writeText(response.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setMessage('');
    setFileName('');
    setExpiryMinutes(5);
    setResponse(null);
    setError('');
    setCopied(false);
  };

  if (response) {
    return (
      <div className="min-h-screen">
        <header className="glass-effect border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">SecureShare</h1>
              </div>
              <Link href="/" className="btn-secondary">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Home
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl text-center"
          >
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-sm font-medium text-gray-600">Your Access Code:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-4xl font-mono font-bold bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                    {response.code}
                  </code>
                  <button
                    onClick={copyCode}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-center text-sm text-gray-600 space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Expires: {new Date(response.expiresAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Security Notice:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Share this code securely with your recipient</li>
                    <li>The message will be permanently deleted once accessed</li>
                    <li>If not accessed, it will auto-delete after {Math.floor((new Date(response.expiresAt).getTime() - Date.now()) / 60000)} minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetForm}
                className="btn-primary"
              >
                Send Another Message
              </button>
              <Link href="/receive" className="btn-secondary">
                Receive Message
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="glass-effect border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SecureShare</h1>
            </div>
            <Link href="/" className="btn-secondary">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Secure Message</h2>
          <p className="text-gray-600">
          Enter your confidential message or upload a text file. We&apos;ll encrypt it and provide you with a unique access code.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-8 rounded-xl"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center text-red-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field h-48 resize-none"
                placeholder="Enter your confidential message here..."
                maxLength={10000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {message.length}/10,000 characters
                </span>
                {fileName && (
                  <div className="flex items-center text-sm text-blue-600">
                    <FileText className="h-4 w-4 mr-1" />
                    {fileName}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Upload a Text File
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.json,.csv,.xml,.md"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: .txt, .json, .csv, .xml, .md (max 1MB)
              </p>
            </div>

            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Time
              </label>
              <select
                id="expiry"
                value={expiryMinutes}
                onChange={(e) => setExpiryMinutes(Number(e.target.value))}
                className="input-field"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={1440}>24 hours</option>
              </select>
            </div>

            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className={`w-full btn-primary ${
                loading || !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Encrypting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send Secure Message
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
