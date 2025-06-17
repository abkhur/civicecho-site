/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState } from 'react';

interface FormData {
  userName: string;
  userStance: 'support' | 'oppose';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  congress: number;
  billType: string;
  billNumber: number;
  userContext: string;
}

export default function EmailForm() {
  const [emailOutput, setEmailOutput] = useState<string>('');
  const [contactPage, setContactPage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    userName: '',
    userStance: 'support',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    congress: 119,
    billType: 'hr',
    billNumber: 123,
    userContext: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailOutput('');
    setContactPage('');

    try {
      // 1️⃣ Generate email
      const emailRes = await fetch('http://localhost:3000/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const emailData = await emailRes.json();
      const emailContent = emailData.emailContent || 'Something went wrong.';
      setEmailOutput(emailContent);

      // 2️⃣ Get contact page URL
      const contactRes = await fetch('http://localhost:3000/get-contact-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        }),
      });
      const contactData = await contactRes.json();
      const contactUrl = contactData.contactPage || '';
      setContactPage(contactUrl);

      // 3️⃣ Post to extension via window.postMessage
      if (typeof window !== 'undefined') {
        window.postMessage(
          {
            source: 'civicecho',
            type: 'CIVICECHO_SAVE',
            payload: {
              ...formData,
              emailOutput: emailContent,
              contactPage: contactUrl,
            },
          },
          '*'
        );
      }
    } catch (err) {
      console.error(err);
      setEmailOutput('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="userName"
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full border border-gray-300 p-2 rounded"
        required
      />

      <select
        name="userStance"
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        value={formData.userStance}
      >
        <option value="support">Support</option>
        <option value="oppose">Oppose</option>
      </select>

      <input
        name="street"
        onChange={handleChange}
        placeholder="Street"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="city"
        onChange={handleChange}
        placeholder="City"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="state"
        onChange={handleChange}
        placeholder="State (VA, etc.)"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="zipCode"
        onChange={handleChange}
        placeholder="ZIP Code"
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="billType"
        disabled
        className="w-full border p-2 bg-gray-100 text-gray-500 rounded"
        value={formData.billType}
      >
        <option value="hr">H.R. (House Bill)</option>
      </select>

      <input
        type="number"
        name="billNumber"
        onChange={handleChange}
        placeholder="Bill Number"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="userContext"
        onChange={handleChange}
        placeholder="Optional extra context..."
        className="w-full border p-2 rounded"
        rows={3}
        value={formData.userContext}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating…' : 'Generate Email'}
      </button>

      {emailOutput && !loading && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 border rounded whitespace-pre-wrap">
            {emailOutput}
          </div>

          {contactPage && (
            <a
              href={contactPage}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition"
            >
              Fill Out Contact Form
            </a>
          )}
        </div>
      )}
    </form>
  );
}
