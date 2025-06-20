/* eslint-disable react/react-in-jsx-scope */
// app/(main)/campaigns/[slug]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import EmailForm from '../../../../components/EmailForm';

type Campaign = {
    title: string;
    description?: string;
    issueTopic: string;
    issueSummary?: string;
    slug: string;
    createdBy?: string;
    createdAt?: string;
};

export default function CampaignDetail() {
    const path = usePathname();
    const slug = path.split('/').pop();
    const [camp, setCamp] = useState<Campaign | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        fetch(`https://civicecho.org/campaigns/${slug}`)
            .then(async res => {
                if (!res.ok) {
                    throw new Error((await res.json()).error || 'Failed to fetch campaign');
                }
                return res.json();
            })
            .then(setCamp)
            .catch(err => setError(err.message));
    }, [slug]);

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }
    if (!camp) return <div>Loading…</div>;

    return (
        <div className="space-y-6 max-w-2xl mx-auto p-4">
            {/* Title + meta */}
            <h1 className="text-4xl font-bold">{camp.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {camp.createdBy && <>By {camp.createdBy} — </>}
                {camp.createdAt && new Date(camp.createdAt).toLocaleDateString()}
            </p>

            {/* Description */}
            {camp.description && (
                <p className="text-gray-700 dark:text-gray-300">{camp.description}</p>
            )}

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Issue details */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Issue Topic</h2>
                <p>{camp.issueTopic}</p>

                {camp.issueSummary && (
                    <>
                        <h3 className="text-xl font-semibold mt-4">Issue Summary</h3>
                        <div className="prose dark:prose-invert">
                            {camp.issueSummary}
                        </div>
                    </>
                )}
            </div>

            {/* Abuse report */}
            <a
                href={`mailto:abuse@civicecho.org?subject=Reporting%20campaign%20${encodeURIComponent(camp.slug)}`}
                className="text-red-600 hover:underline text-sm"
            >
                Report Abuse
            </a>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Prefilled EmailForm */}
            <h2 className="text-2xl font-semibold">Send an Email</h2>
            <EmailForm defaultTopic={camp.issueTopic} defaultSummary={camp.issueSummary} />
        </div>
    );
}
