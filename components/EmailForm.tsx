/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState } from 'react';

export default function EmailForm() {
  const [emailOutput, setEmailOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailOutput('');

    try {
      const res = await fetch('http://localhost:3000/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setEmailOutput(data.emailContent || 'Something went wrong.');
    } catch {
      setEmailOutput('Network error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="userName" onChange={handleChange} placeholder="Your Name" className="w-full border border-gray-300 p-2 rounded" required />

      <select name="userStance" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
        <option value="support">Support</option>
        <option value="oppose">Oppose</option>
      </select>

      <input name="street" onChange={handleChange} placeholder="Street" className="w-full border p-2 rounded" required />
      <input name="city" onChange={handleChange} placeholder="City" className="w-full border p-2 rounded" required />
      <input name="state" onChange={handleChange} placeholder="State (VA, etc.)" className="w-full border p-2 rounded" required />
      <input name="zipCode" onChange={handleChange} placeholder="ZIP Code" className="w-full border p-2 rounded" required />

      <select name="billType" onChange={handleChange} disabled className="w-full border p-2 bg-gray-100 text-gray-500 rounded">
        <option value="hr">H.R. (House Bill)</option>
      </select>

      <input name="billNumber" onChange={handleChange} placeholder="Bill Number" className="w-full border p-2 rounded" required />

      <textarea name="userContext" onChange={handleChange} placeholder="Optional extra context..." className="w-full border p-2 rounded" rows={3} />

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
        Generate Email
      </button>

      {loading && <p className="text-center text-gray-600">Generating email...</p>}

      {!loading && emailOutput && (
        <div className="mt-6 p-4 bg-gray-100 border rounded whitespace-pre-wrap">
          {emailOutput}
        </div>
      )}
    </form>
  );
}
