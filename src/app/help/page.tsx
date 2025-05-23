'use client';

import { FiHelpCircle, FiMail, FiBookOpen, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';
import React, { useState } from 'react';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-full mb-6 shadow-lg">
          <FiHelpCircle className="text-indigo-600 dark:text-indigo-400" size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
          Need assistance? Browse FAQs, contact support, or explore our documentation for help.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a href="#faq" className="flex items-center px-5 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 font-semibold shadow hover:bg-indigo-100 dark:hover:bg-indigo-700 transition">
            <FiMessageSquare className="mr-2" /> FAQs
          </a>
          <a href="#docs" className="flex items-center px-5 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 font-semibold shadow hover:bg-indigo-100 dark:hover:bg-indigo-700 transition">
            <FiBookOpen className="mr-2" /> Documentation
          </a>
          <a href="#contact" className="flex items-center px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
            <FiMail className="mr-2" /> Contact Support
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="max-w-2xl mx-auto my-12">
        <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center"><FiMessageSquare className="mr-2" /> Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 group transition-all duration-200 ${openFaq === 'password' ? 'ring-2 ring-indigo-500' : ''}`}>
            <button 
              onClick={() => toggleFaq('password')} 
              className="w-full font-semibold cursor-pointer text-gray-900 dark:text-white flex justify-between items-center"
            >
              <span className={openFaq === 'password' ? 'text-indigo-600 dark:text-indigo-400' : ''}>
                How do I reset my password?
              </span>
              {openFaq === 'password' ? 
                <FiChevronUp className="text-indigo-600 dark:text-indigo-400" /> : 
                <FiChevronDown />
              }
            </button>
            {openFaq === 'password' && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 animate-fadeIn">
                Go to your account settings, click on 'Change Password', and follow the instructions. If you forgot your password, use the 'Forgot Password' link on the login page.
              </div>
            )}
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 group transition-all duration-200 ${openFaq === 'docs' ? 'ring-2 ring-indigo-500' : ''}`}>
            <button 
              onClick={() => toggleFaq('docs')} 
              className="w-full font-semibold cursor-pointer text-gray-900 dark:text-white flex justify-between items-center"
            >
              <span className={openFaq === 'docs' ? 'text-indigo-600 dark:text-indigo-400' : ''}>
                Where can I find the documentation?
              </span>
              {openFaq === 'docs' ? 
                <FiChevronUp className="text-indigo-600 dark:text-indigo-400" /> : 
                <FiChevronDown />
              }
            </button>
            {openFaq === 'docs' && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 animate-fadeIn">
                You can access our full documentation in the Documentation section below or at <a href="#docs" className="text-indigo-600 underline">this link</a>.
              </div>
            )}
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 group transition-all duration-200 ${openFaq === 'support' ? 'ring-2 ring-indigo-500' : ''}`}>
            <button 
              onClick={() => toggleFaq('support')} 
              className="w-full font-semibold cursor-pointer text-gray-900 dark:text-white flex justify-between items-center"
            >
              <span className={openFaq === 'support' ? 'text-indigo-600 dark:text-indigo-400' : ''}>
                How do I contact support?
              </span>
              {openFaq === 'support' ? 
                <FiChevronUp className="text-indigo-600 dark:text-indigo-400" /> : 
                <FiChevronDown />
              }
            </button>
            {openFaq === 'support' && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 animate-fadeIn">
                Fill out the contact form below or email us at <a href="mailto:support@example.com" className="text-indigo-600 underline">support@example.com</a>.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="max-w-2xl mx-auto my-12">
        <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center"><FiBookOpen className="mr-2" /> Documentation</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 rounded transition-colors">
              <a href="#" className="flex items-center justify-between text-indigo-600 group">
                <span className="font-medium group-hover:underline">Getting Started Guide</span>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">New</span>
              </a>
            </li>
            <li className="py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 rounded transition-colors">
              <a href="#" className="flex items-center justify-between text-indigo-600 group">
                <span className="font-medium group-hover:underline">API Reference</span>
                <span className="text-xs">Updated 3 days ago</span>
              </a>
            </li>
            <li className="py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 rounded transition-colors">
              <a href="#" className="flex items-center justify-between text-indigo-600 group">
                <span className="font-medium group-hover:underline">User Tutorials</span>
                <span className="text-xs">10 articles</span>
              </a>
            </li>
            <li className="py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-2 rounded transition-colors">
              <a href="#" className="flex items-center justify-between text-indigo-600 group">
                <span className="font-medium group-hover:underline">Troubleshooting</span>
                <span className="text-xs">15 articles</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-2xl mx-auto my-12">
        <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center"><FiMail className="mr-2" /> Contact Support</h2>
        
        {formSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Message Sent Successfully!</h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Thank you for reaching out. Our support team will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setFormSubmitted(false)} 
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Your Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                placeholder="Enter your name" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                placeholder="you@example.com" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                rows={4} 
                placeholder="How can we help you?" 
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </section>
    </MainLayout>
  );
}
