/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const isPrefilled = defaultTopic !== '';

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

  const [step, setStep] = useState<number>(0);
  const [emailOutput, setEmailOutput] = useState<string>('');
  const [contactPage, setContactPage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [trending, setTrending] = useState<TrendingIssue[]>([]);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [urlLoading, setUrlLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('https://civicecho.org/trending-issues')
      .then(r => r.json())
      .then(data => setTrending(data.issues || []))
      .catch(() => setTrending([]));
  }, []);

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
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};
    switch (ALL_STEPS[step]) {
      case 'Name':
        if (!formData.userName.trim()) errs.userName = 'Name is required';
        break;
      case 'Details':
        if (formData.billType === 'issue') {
          if (!formData.issueTopic?.trim()) errs.issueTopic = 'Topic is required';
          if (!formData.issueSummary?.trim()) errs.issueSummary = 'Summary is required';
        } else {
          if (!formData.billNumber || formData.billNumber <= 0) errs.billNumber = 'Valid bill number is required';
        }
        break;
      case 'Address':
        ['street', 'city', 'state', 'zipCode'].forEach(field => {
          const val = (formData as any)[field]?.toString().trim();
          if (!val) errs[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        });
        if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) errs.zipCode = 'ZIP code must be 5 digits';
        break;
      default:
        break;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (isPrefilled && step === 0) {
      setStep(3);
    } else {
      setStep(s => Math.min(s + 1, ALL_STEPS.length - 1));
    }
  };

  const prevStep = () => {
    if (isPrefilled && step === 3) {
      setStep(0);
    } else {
      setStep(s => Math.max(s - 1, 0));
    }
  };

  const handleFetchUrl = async () => {
    if (!customUrl) return;
    setUrlLoading(true);
    try {
      const res = await fetch('https://civicecho.org/extract-article', {
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
    } catch { /* empty */ }
    finally { setUrlLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://civicecho.org/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { emailContent } = await res.json();
      setEmailOutput(emailContent || 'Something went wrong.');

      const cRes = await fetch('https://civicecho.org/get-contact-page', {
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

  const renderStep = () => {
    switch (ALL_STEPS[step]) {
      case 'Name':
        return (
          <div>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your Name"
              className="input"
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>
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
              />
              {errors.issueTopic && <p className="text-red-500 text-sm mt-1">{errors.issueTopic}</p>}

              <textarea
                name="issueSummary"
                value={formData.issueSummary || ''}
                onChange={handleChange}
                placeholder="Issue Summary"
                className="input"
                rows={3}
              />
              {errors.issueSummary && <p className="text-red-500 text-sm mt-1">{errors.issueSummary}</p>}
            </div>
          );
        } else {
          return (
            <div>
              <input
                type="number"
                name="billNumber"
                value={formData.billNumber ?? ''}
                onChange={handleChange}
                placeholder="Bill Number (e.g., 123)"
                className="input"
              />
              {errors.billNumber && <p className="text-red-500 text-sm mt-1">{errors.billNumber}</p>}
            </div>
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
              <div key={field}>
                <input
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="input"
                  onChange={handleChange}
                  value={(formData as any)[field] || ''}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
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
                <strong>Topic:</strong> {formData.billType === 'issue' ? formData.issueTopic : `H.R. ${formData.billNumber}`}
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

      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="relative mb-6">
        <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div
          className="h-1 bg-blue-600 rounded-full absolute top-0 left-0"
          style={{ width: `${(step / (ALL_STEPS.length - 1)) * 100}%` }}
        />
        <div className="absolute inset-0 flex justify-between items-center px-0">
          {ALL_STEPS.map((_, idx) => (
            <div
              key={idx}
              className="w-4 h-4 rounded-full flex items-center justify-center bg-transparent"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-colors ${idx <= step
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-700'
                  }`}
              />
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (ALL_STEPS[step] === 'Review') {
            if (validateStep()) handleSubmit();
          } else {
            nextStep();
          }
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
