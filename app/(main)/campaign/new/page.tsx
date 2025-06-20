/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCampaign() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [issueTopic, setIssueTopic] = useState('');
    const [issueSummary, setIssueSummary] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const res = await fetch('https://civicecho.org/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, issueTopic, issueSummary, createdBy }),
        });

        if (res.status === 409) {
            // Duplicate slug/title
            const payload = await res.json();
            setError(payload.error || 'A campaign with that title already exists.');
            return;
        }

        if (!res.ok) {
            // Other error
            const payload = await res.json().catch(() => ({}));
            setError(payload.error || 'Failed to create campaign.');
            return;
        }

        const camp = await res.json();
        // Navigate to the new campaign page
        router.push(`/campaigns/${camp.slug}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Create Campaign</h1>

            {error && (
                <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <input
                name="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="input"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="input"
            />

            <input
                name="issueTopic"
                placeholder="Issue Topic"
                value={issueTopic}
                onChange={e => setIssueTopic(e.target.value)}
                required
                className="input"
            />

            <textarea
                name="issueSummary"
                placeholder="Optional news context"
                value={issueSummary}
                onChange={e => setIssueSummary(e.target.value)}
                className="input"
            />

            <input
                name="createdBy"
                placeholder="Your name or email (or enter anonymous)"
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                className="input"
            />

            <button type="submit" className="btn-primary mt-2">
                Create
            </button>
        </form>
    );
}
