/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* components/CampaignList.tsx */
'use client';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';

type Campaign = {
    title: string;
    description?: string;
    slug: string;
    createdAt: string; // ISO date string
};

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

    useEffect(() => {
        fetch('http://localhost:3000/campaigns')
            .then(res => res.json())
            .then(setCampaigns)
            .catch(console.error);
    }, []);

    // Memoize sorted list
    const sorted = useMemo(() => {
        return [...campaigns].sort((a, b) => {
            const da = new Date(a.createdAt).getTime();
            const db = new Date(b.createdAt).getTime();
            return order === 'newest' ? db - da : da - db;
        });
    }, [campaigns, order]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Campaigns</h1>
                <Link href="/campaign/new" className="btn-primary inline-block">
                    + Create New Campaign
                </Link>
            </div>

            {/* Sort control */}
            <div className="flex items-center space-x-2">
                <label htmlFor="sortOrder" className="font-medium">Sort:</label>
                <select
                    id="sortOrder"
                    value={order}
                    onChange={e => setOrder(e.target.value as any)}
                    className="border rounded p-1"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            <ul className="space-y-2">
                {sorted.map(c => (
                    <li key={c.slug} className="card">
                        <Link href={`/campaign/${c.slug}`} className="text-xl font-semibold">
                            {c.title}
                        </Link>
                        {c.description && (
                            <p className="text-gray-600 dark:text-gray-400">{c.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
