/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState, useEffect } from 'react';

type BillType = 'hr' | 'hres' | 'issue';

interface FormData {
  congress: number;
  userName: string;
  billType: BillType;
  billNumber?: number;
  resolutionNumber?: number;
  issueTopic?: string;
  issueSummary?: string;
  userStance: 'support' | 'oppose';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  userContext: string;
}

interface TrendingIssue {
  title: string;
  link: string;
  summary: string;
}

const ALL_STEPS = [
  'Name',
  'Type',
  'Details',
  'Stance',
  'Address',
  'Context',
  'Review',
];

interface EmailFormProps {
  defaultTopic?: string;
  defaultSummary?: string;
}

export default function EmailForm({
  defaultTopic = '',
  defaultSummary = '',
}: EmailFormProps) {
  // track whether we're in "campaign" mode
  const isPrefilled = defaultTopic !== '';

  // form state
  const [formData, setFormData] = useState<FormData>({
    congress: 119,
    userName: '',
    billType: 'issue',
    billNumber: undefined,
    resolutionNumber: undefined,
    issueTopic: defaultTopic,
    issueSummary: defaultSummary,
    userStance: 'support',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    userContext: '',
  });

  // current step index into ALL_STEPS
  const [step, setStep] = useState<number>(0);
  const [emailOutput, setEmailOutput] = useState<string>('');
  const [contactPage, setContactPage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [trending, setTrending] = useState<TrendingIssue[]>([]);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [urlLoading, setUrlLoading] = useState<boolean>(false);

  // fetch trending issues
  useEffect(() => {
    fetch('http://localhost:3000/trending-issues')
      .then(r => r.json())
      .then(data => setTrending(data.issues || []))
      .catch(() => setTrending([]));
  }, []);

  // generic change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(f => ({
      ...f,
      [name]:
        name === 'billNumber' || name === 'resolutionNumber'
          ? Number(value)
          : value,
    }));
  };

  // skip logic for next / prev
  const nextStep = () => {
    if (isPrefilled && step === 0) {
      // after Name, jump to Stance (index 3)
      setStep(3);
    } else {
      setStep(s => Math.min(s + 1, ALL_STEPS.length - 1));
    }
  };
  const prevStep = () => {
    if (isPrefilled && step === 3) {
      // back from Stance to Name
      setStep(0);
    } else {
      setStep(s => Math.max(s - 1, 0));
    }
  };

  // fetch article by URL
  const handleFetchUrl = async () => {
    if (!customUrl) return;
    setUrlLoading(true);
    try {
      const res = await fetch('http://localhost:3000/extract-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: customUrl }),
      });
      const { title, summary } = await res.json();
      setFormData(f => ({
        ...f,
        issueTopic: title,
        issueSummary: summary,
      }));
    } catch {
      // no-op
    } finally {
      setUrlLoading(false);
    }
  };

  // final submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { emailContent } = await res.json();
      setEmailOutput(emailContent || 'Something went wrong.');

      const cRes = await fetch('http://localhost:3000/get-contact-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        }),
      });
      const { contactPage } = await cRes.json();
      setContactPage(contactPage || '');
    } catch {
      setEmailOutput('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // render UI for each step
  const renderStep = () => {
    switch (ALL_STEPS[step]) {
      case 'Name':
        return (
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Your Name"
            className="input"
            required
          />
        );

      case 'Type':
        return (
          <select
            name="billType"
            value={formData.billType}
            onChange={handleChange}
            className="input"
          >
            <option value="issue">General Issue/Policy</option>
            <option value="hr">H.R. (House Bill)</option>
          </select>
        );

      case 'Details':
        if (formData.billType === 'issue') {
          return (
            <div className="space-y-4">
              <div className="grid gap-2">
                {trending.map(issue => (
                  <button
                    key={issue.title}
                    type="button"
                    onClick={() =>
                      setFormData(f => ({
                        ...f,
                        issueTopic: issue.title,
                        issueSummary: issue.summary,
                      }))
                    }
                    className={
                      formData.issueTopic === issue.title
                        ? 'btn-primary w-full text-left'
                        : 'btn-secondary w-full text-left'
                    }
                  >
                    {issue.title}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste article URL…"
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={handleFetchUrl}
                  disabled={urlLoading}
                  className="btn-primary"
                >
                  {urlLoading ? 'Fetching…' : 'Fetch'}
                </button>
              </div>

              <input
                name="issueTopic"
                value={formData.issueTopic || ''}
                onChange={handleChange}
                placeholder="Or type your own issue..."
                className="input"
                required
              />
            </div>
          );
        } else {
          return (
            <input
              type="number"
              name="billNumber"
              value={formData.billNumber ?? ''}
              onChange={handleChange}
              placeholder="Bill Number (e.g., 123)"
              className="input"
              required
            />
          );
        }

      case 'Stance':
        return (
          <select
            name="userStance"
            value={formData.userStance}
            onChange={handleChange}
            className="input"
          >
            <option value="support">Support</option>
            <option value="oppose">Oppose</option>
          </select>
        );

      case 'Address':
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {['street', 'city', 'state', 'zipCode'].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input"
                required
                onChange={handleChange}
                value={(formData as any)[field] || ''}
              />
            ))}
          </div>
        );

      case 'Context':
        return (
          <textarea
            name="userContext"
            value={formData.userContext}
            onChange={handleChange}
            placeholder="Optional extra context..."
            className="input"
            rows={4}
          />
        );

      case 'Review':
        return (
          <div className="card">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Name:</strong> {formData.userName}
              </li>
              <li>
                <strong>Topic:</strong> {formData.issueTopic}
              </li>
              <li>
                <strong>Stance:</strong> {formData.userStance}
              </li>
              <li>
                <strong>Address:</strong>{' '}
                {`${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`}
              </li>
              {formData.userContext && (
                <li>
                  <strong>Context:</strong> {formData.userContext}
                </li>
              )}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Progress bar */}
      <div className="flex items-center mb-6">
        {ALL_STEPS.map((label, i) => {
          // hide the Type & Details markers when prefilled
          if (isPrefilled && (label === 'Type' || label === 'Details')) {
            return null;
          }
          const idx = ALL_STEPS.indexOf(label);
          const isActive = idx === step;
          const reached = idx <= step;
          return (
            <div key={label} className="relative flex-1">
              <div
                className={`h-1 rounded ${reached ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
              />
              {idx < ALL_STEPS.length - 1 && (
                <div className="absolute right-0 top-[-6px] w-4 h-4 rounded-full bg-white border border-gray-300 dark:border-gray-600" />
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          step === ALL_STEPS.indexOf('Review') ? handleSubmit() : nextStep();
        }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {ALL_STEPS[step]}
        </h2>

        {renderStep()}

        <div className="flex justify-between">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn-secondary w-auto"
            >
              Back
            </button>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-auto">
            {step === ALL_STEPS.indexOf('Review')
              ? loading
                ? 'Submitting…'
                : 'Submit'
              : 'Next'}
          </button>
        </div>
      </form>

      {!!emailOutput && (
        <div className="mt-8 space-y-4">
          <div className="p-5 bg-gray-100 dark:bg-gray-800 border rounded shadow whitespace-pre-wrap">
            {emailOutput}
          </div>
          <a
            href={contactPage}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center w-full"
          >
            Fill Out Contact Form
          </a>
        </div>
      )}
    </div>
  );
}
