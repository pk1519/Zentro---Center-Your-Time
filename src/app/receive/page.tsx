'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Download, ArrowLeft, AlertTriangle, CheckCircle, FileText, Copy, Clock } from 'lucide-react';

interface ReceiveResponse {
  success: boolean;
  data: {
    message: string;
    fileName: string | null;
    timestamp: string;
    hasFile: boolean;
  };
  error?: string;
}

export default function ReceivePage() {
  const [code, setCode] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ReceiveResponse | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Only allow one digit per input
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 1) {
      inputRefs[index + 1].current?.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Handle enter to submit
    if (e.key === 'Enter' && code.every(digit => digit !== '')) {
      handleUnlock();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 2);
    
    if (digits.length === 2) {
      setCode([digits[0], digits[1]]);
      setError('');
    }
  };

  const handleUnlock = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 2) {
      setError('Please enter a complete 2-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: fullCode,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data);
      } else {
        setError(data.error || 'Failed to retrieve message');
        // Clear the code on error
        setCode(['', '']);
        inputRefs[0].current?.focus();
      }
    } catch {
      setError('Network error. Please try again.');
      setCode(['', '']);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = async () => {
    if (response?.data.message) {
      await navigator.clipboard.writeText(response.data.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadAsFile = () => {
    if (!response?.data.message) return;
    
    const fileName = response.data.fileName || `secure_message_${new Date().getTime()}.txt`;
    const blob = new Blob([response.data.message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setCode(['', '']);
    setResponse(null);
    setError('');
    setCopied(false);
    inputRefs[0].current?.focus();
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Message Retrieved Successfully!</h2>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-semibold mb-1">Security Notice:</p>
                  <p>This message has been permanently deleted from our servers and cannot be accessed again.</p>
                </div>
              </div>
            </div>

            {response.data.fileName && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                    Original File: {response.data.fileName}
                  </span>
                </div>
                <div className="flex items-center text-xs text-blue-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(response.data.timestamp).toLocaleString()}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message Content</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={copyMessage}
                    className="flex items-center px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadAsFile}
                    className="flex items-center px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                    title="Download as file"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 break-words">
                  {response.data.message}
                </pre>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetForm}
                className="btn-primary"
              >
                Receive Another Message
              </button>
              <Link href="/send" className="btn-secondary">
                Send a Message
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Receive Secure Message</h2>
          <p className="text-gray-600">
            Enter the 2-digit access code provided by the sender to decrypt and view the message.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-8 rounded-xl text-center"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center text-red-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Enter 2-Digit Access Code
            </label>
            <div className="flex justify-center space-x-4 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="code-input"
                  maxLength={1}
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Enter the digits one by one, or paste the full 2-digit code
            </p>
          </div>

          <button
            onClick={handleUnlock}
            disabled={loading || code.some(digit => !digit)}
            className={`btn-primary text-lg px-8 py-4 ${
              loading || code.some(digit => !digit) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Decrypting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Download className="h-6 w-6 mr-3" />
                Unlock Message
              </div>
            )}
          </button>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Important:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Messages are permanently deleted after being accessed once</li>
                  <li>If the code is incorrect, the message remains encrypted</li>
                  <li>Messages auto-expire and cannot be recovered after expiration</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
