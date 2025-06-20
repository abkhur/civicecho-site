/* eslint-disable react/jsx-no-target-blank */
// app/about/page.tsx

import React from 'react';

const aboutSections = [
    {
        title: 'What Is CivicEcho?',
        content: (
            <>
                <p>CivicEcho is the simplest way to make your voice heard by the people who represent you. One idea. One click. One paste. Done.</p>
            </>
        ),
    },
    {
        title: 'Why We Built It',
        content: (
            <ul className="list-disc list-inside space-y-1">
                <li><strong>People should have a voice.</strong> Democracy isn’t just for lawyers.</li>
                <li><strong>Change shouldn’t require a JD.</strong> You don’t need a fancy degree to speak up.</li>
                <li><strong>Lethargy is a virtue.</strong> Life’s busy. Most people never email Congress, so we fixed that.</li>
                <li><strong>The pipes must stay open.</strong> Someone else would build this eventually; we wanted it in the public’s hands.</li>
                <li><strong>Democracy chokes on inertia.</strong> When voices unite, they move mountains. We give you the tools, you do the work.</li>
            </ul>
        ),
    },
    {
        title: 'How It Works',
        content: (
            <ol className="list-decimal list-inside space-y-1">
                <li>You enter a few simple details: name, address, and what you care about.</li>
                <li>Our AI drafts a concise, persuasive message.</li>
                <li>You copy it (or, soon, hit “Fill Contact Form”) and send.</li>
                <li>Your rep’s inbox gets your thoughts, straight from you.</li>
            </ol>
        ),
    },
    {
        title: "Who's Behind This",
        content: (
            <>
                <p>I’m <a href="mailto:abkhur@civicecho.org" target="_blank"><strong>Abdullah Khurram</strong></a>, a student at Virginia Tech. I built CivicEcho on a beat-up ThinkPad while watching the news get weirder by the day.</p>
                <p>Here are a few fun facts about me:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>I skate</li>
                    <li>On repeat: <a href="https://www.youtube.com/watch?v=ryfCwiwNTYQ" target="_blank"><em>Bjork - It&apos;s Not Up To You</em></a></li>
                    <li>Current favorite movie: <em>Children of Men</em></li>
                    <li>Code hobbyist (lol)</li>
                    <li>I launched CivicEcho with my first summer paycheck</li>
                </ul>
            </>
        ),
    },
    {
        title: 'Get Involved',
        content: (
            <ul className="list-disc list-inside space-y-1">
                <li><strong>Code:</strong> <a href="https://github.com/abkhur/CivicEcho" target="_blank">We’re on GitHub—fork us, open a PR, make it yours.</a></li>
                <li><strong>Donate:</strong> Hosting and APIs cost real money. A few bucks keeps the lights on.</li>
                <li><strong>Spread the word:</strong> Share a link, tweet, or a Reddit post!</li>
            </ul>
        ),
    },
];

const faqSections = [
    {
        question: 'How do I find my representative?',
        answer:
            'Enter your street, city, state, and ZIP. We use official Census data to pinpoint your U.S. House district and deliver the correct contact form or email address.',
    },
    {
        question: 'Can I edit the AI-generated draft?',
        answer:
            'Absolutely. Think of it as a launchpad—tweak tone, add personal anecdotes, or rearrange paragraphs so it sounds like you.',
    },
    {
        question: 'Why do you need my address?',
        answer:
            'To map you to your exact House district. Without it, we’d be guessing—and you’d risk emailing the wrong office.',
    },
    {
        question: 'Is CivicEcho really free?',
        answer:
            'Yep. No paywalls, no hidden fees, no tracking. It’s under AGPL: free to use, free to remix, free to host.',
    },
    {
        question: 'How do you protect my privacy?',
        answer:
            'We don’t track you, sell your data, or store your info longer than it takes to generate your draft. Once you leave, your details vanish.',
    },
    {
        question: 'I’m outside the U.S.—can I use CivicEcho?',
        answer:
            'Not yet. Right now we only support U.S. House representatives. Feel free to fork the code and build for your country!',
    },
    {
        question: 'How accurate is the district lookup?',
        answer:
            'We rely on Census TIGER shapefiles and a solid geocoder. It’s accurate to your street.',
    },
    {
        question: 'Can I self-host my own copy?',
        answer:
            'You bet. Clone the GitHub repo, follow the README, and deploy anywhere. Remember: AGPL means any public instance stays open.',
    },
    {
        question: 'How do I report abuse or spam?',
        answer:
            'Email **abuse@civicecho.org** with screenshots or details. We’ll investigate, ban repeat offenders, and keep the platform clean.',
    },
    {
        question: 'Is there a public API?',
        answer:
            'Not yet, but it’s on the roadmap. Let us know which endpoints you need, and we’ll prioritize.',
    },
    {
        question: 'How can I contribute or file bugs?',
        answer:
            'Head over to our GitHub issues page or drop a note in Discord. We read everything and appreciate every PR.',
    },
];

export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">About &amp; FAQ</h1>

            {/* About Section */}
            {aboutSections.map(({ title, content }) => (
                <details
                    key={title}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 shadow-sm"
                >
                    <summary className="cursor-pointer text-xl font-semibold">
                        {title}
                    </summary>
                    <div className="mt-3 space-y-3 prose dark:prose-invert">{content}</div>
                </details>
            ))}

            {/* FAQ Heading */}
            <h2 className="text-2xl font-bold pt-4">FAQ</h2>

            {/* FAQ Section */}
            {faqSections.map(({ question, answer }) => (
                <details
                    key={question}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 shadow-sm"
                >
                    <summary className="cursor-pointer font-semibold">{question}</summary>
                    <p className="mt-2 prose dark:prose-invert">{answer}</p>
                </details>
            ))}
        </main>
    );
}
