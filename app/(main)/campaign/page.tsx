/* eslint-disable react/react-in-jsx-scope */
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Campaign = {
    title: string;
    description?: string;
    slug: string;
    createdAt: string;
};

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        fetch('https://civicecho.org/campaigns')
            .then(res => res.json())
            .then(setCampaigns);
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <Link href="/campaign/new" className="btn-primary inline-block">
                + Create New Campaign
            </Link>
            <ul className="space-y-2">
                {campaigns.map(c => (
                    <li key={c.slug} className="card">
                        <Link href={`/campaign/${c.slug}`} className="text-xl font-semibold">
                            {c.title}
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400">{c.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
