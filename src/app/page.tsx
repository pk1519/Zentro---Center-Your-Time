'use client';

import Link from 'next/link';
import { Shield, Send, Download, Clock, Lock, Sparkles, ArrowRight, Eye, Zap, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl blur-lg opacity-30 animate-pulse-slow" />
                  <Shield className="relative h-10 w-10 text-brand-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">
                    SecureShare
                  </h1>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">CONFIDENTIAL MESSAGING</p>
                </div>
              </motion.div>

              {/* Navigation Actions */}
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/send" className="premium-btn-primary group">
                    <Send className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    <span>Send Message</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/receive" className="premium-btn-secondary group">
                    <Download className="h-5 w-5 mr-2" />
                    <span>Receive</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.main 
        className="pt-24 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            {/* Floating Elements */}
            <div className="absolute inset-0 -z-10">
              <motion.div 
                className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-brand-400/20 to-accent-400/20 rounded-full blur-2xl"
                animate={{ 
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-accent-300/20 to-brand-300/20 rounded-full blur-xl"
                animate={{ 
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-100 to-accent-100 px-4 py-2 rounded-full mb-8">
                <Sparkles className="h-4 w-4 text-brand-600" />
                <span className="text-sm font-medium text-brand-700">Military-Grade Encryption</span>
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="block text-gray-900 font-display">
                Share Data
              </span>
              <span className="block bg-gradient-to-r from-brand-600 via-accent-500 to-brand-700 bg-clip-text text-transparent animate-gradient bg-300% font-display">
                Confidentially
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Send sensitive text or files using secure two-digit codes. Messages are 
              <span className="font-semibold text-brand-700">encrypted</span>, 
              <span className="font-semibold text-accent-600">auto-expire</span>, and are 
              <span className="font-semibold text-error-600">destroyed</span> after a single access.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <Link href="/send" className="premium-btn-primary-large group">
                  <Send className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                  <span className="font-semibold">Send Secure Message</span>
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/receive" className="premium-btn-secondary-large group">
                  <Download className="h-6 w-6 mr-3" />
                  <span className="font-semibold">Enter Access Code</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500 mb-20"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse" />
                <span>AES-256 Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                <span>Zero Knowledge</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-400 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                <span>Auto-Destruct</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
                <span>Open Source</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="glass-effect p-8 rounded-xl text-center">
            <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">End-to-End Encryption</h3>
            <p className="text-gray-600">
              All data is encrypted using AES encryption. Your message is secure from the moment you send it.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Auto-Expiring</h3>
            <p className="text-gray-600">
              Messages automatically delete after 5 minutes or upon first access, ensuring maximum security.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-xl text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zero Knowledge</h3>
            <p className="text-gray-600">
              We never store your data in plain text. Only you and your recipient can access the content.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Send Your Message</h4>
              <p className="text-gray-600">Enter your confidential text or upload a file. We&apos;ll encrypt it instantly.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Get Your Code</h4>
              <p className="text-gray-600">Receive a unique 2-digit code. Share this code with your recipient securely.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Access & Auto-Delete</h4>
              <p className="text-gray-600">Recipient enters the code to decrypt the message. It&apos;s then permanently deleted.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">SecureShare</span>
          </div>
          <p className="text-gray-400 mb-4">
            Secure, temporary, and confidential message sharing
          </p>
          <p className="text-sm text-gray-500">
            All messages are encrypted and automatically deleted. We never store your data in plain text.
          </p>
        </div>
      </footer>
    </div>
  );
}
