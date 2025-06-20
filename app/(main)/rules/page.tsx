// app/rules/page.tsx
import React from 'react';

export default function RulesPage() {
    return (
        <section className="max-w-3xl mx-auto py-12 px-4">
            {/* Page Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    The Only Rules
                </h1>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                    CivicEcho isn’t a club. As much as we wish it were, we still have some rules:
                </p>
            </header>

            {/* Accordion List */}
            <div className="space-y-4">
                <details className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <summary className="font-semibold text-xl text-gray-900 dark:text-gray-100 cursor-pointer">
                        No hate speech.
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        This isn’t about punching down or intimidation. Keep it human. If you
                        wouldn’t say it face-to-face, don’t send it.
                    </p>
                </details>

                <details className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <summary className="font-semibold text-xl text-gray-900 dark:text-gray-100 cursor-pointer">
                        No spam, no bots.
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        We built a tool for real voices. Flooding inboxes with garbage or
                        automating submissions kills the point. Not cool, man.
                    </p>
                </details>

                <details className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <summary className="font-semibold text-xl text-gray-900 dark:text-gray-100 cursor-pointer">
                        No soliciting.
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        This is for bills, policies, and civic issues. Don’t hijack it for
                        crypto promos or conspiracy theories or anything else.
                    </p>
                </details>

                <details className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <summary className="font-semibold text-xl text-gray-900 dark:text-gray-100 cursor-pointer">
                        Keep it civil.
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Remember: You’re sending these messages to actual congressmen. No harassment.
                    </p>
                </details>

                <details className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <summary className="font-semibold text-xl text-gray-900 dark:text-gray-100 cursor-pointer">
                        Truth over clickbait.
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        If you can’t back it up, don’t throw it in.
                    </p>
                </details>
            </div>
        </section>
    );
}
