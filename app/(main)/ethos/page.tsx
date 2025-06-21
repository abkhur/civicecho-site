// app/ethos/page.tsx

import React from 'react';

const sections = [
    {
        title: 'What CivicEcho Is',
        content: (
            <>
                <p>CivicEcho is a tool that lets you send messages to your political representatives as quickly as possible.</p>
                <p>That’s it.</p>
                <p>Not a party. Not a platform. Not a product. Not a campaign. Not a brand.</p>
                <p>It doesn’t tell you what to believe.</p>
                <p>It won’t lean you in one direction or another.</p>
                <p>It won’t track you.</p>
                <p>And it will never sell you out.</p>
                <p>
                    It takes your voice, your concerns, your values, your outrage, your hope,
                    and delivers it where it needs to go: into the inboxes and contact forms of the people who represent you.
                </p>
                <p>That’s all. And that’s enough.</p>
            </>
        ),
    },
    {
        title: 'Who CivicEcho Is For',
        content: (
            <>
                <p>This is for you.</p>
                {[
                    'the teacher in Queens, stretching her paycheck between rent and school supplies.',
                    'the farmer outside Lexington, praying the corn doesn’t burn up in the summer heat.',
                    'the journeyman in Welch, watching his town crumble from years of neglect and deindustrialization.',
                    'the nurse in Lafayette, who couldn’t save the man dying from a lack of insulin.',
                    'the engineer in San Jose, six figures deep and still skipping meals to make rent.',
                    'the student in Madison, told the only way up is under a mountain of debt.',
                    'the boy in San Antonio, who watched ICE detain his dad without cause.',
                    'the factory worker in Detroit, laid off from General Motors and waiting for a call that will never come.',
                    'the teenager in Stockton, grieving the loss of her best friend to fentanyl.',
                    'the Union worker in Cincinnati, on the third day of strike.',
                    'the kid in Gary, who just wants a fair shot.',
                ].map((line) => (
                    <p key={line}>This is for {line}</p>
                ))}
                <br></br>
                <p>
                    This is for anyone, anywhere, who’s ever felt unheard. <br></br>Who feels like the powers that be don’t listen.<br></br>Who rents and doesn’t own. <br></br>Whose parents don’t have a vacation home in Aspen. <br></br>Who cares enough to speak but has never been heard.
                </p>
                <p>This is for you, and this is for us. <br></br>The rest of us. <br></br>The ones who have to wait in line. <br></br>The ones who get told they’re asking too much. <br></br>The ones who don’t get a seat at the table but still pick up the tab. <br></br>This is for us. <br></br>This is for you.</p>
            </>
        ),
    },
    {
        title: 'Why It’s Free (Really Free)',
        content: (
            <>
                <p>CivicEcho is licensed under the AGPL.</p>
                <p>
                    That means anyone can use it, remix it, deploy it; but if you serve it to others, you have to keep it open.
                </p>
                <p>We did that because this tool isn’t a product. It’s a piece of infrastructure. No one should own the pipes of civic communication.</p>
                <p>If you try to close it, hide it, or profit from it without sharing it back to the world, we’ll find out. Don’t do it.</p>
                <p>
                    Also, if you do decide to fork CivicEcho, or remix it, or mod it, just know that we do NOT endorse it. The only official version of CivicEcho lives here, at civicecho.org. We don’t endorse any forks, rebrands, or derivatives of CivicEcho unless otherwise stated. If you turn this tool into something partisan or nonsensical — that’s on you. Not us.
                </p>
                <p>Don’t know what AGPL means? That’s okay. It just means we (and you) have to keep the code open and free.</p>
            </>
        ),
    },
    {
        title: 'What We Believe (The Bare Minimum)',
        content: (
            <>
                <ul className="list-disc list-inside space-y-1">
                    <li>That people have the right to be heard, even if they don’t speak like politicians</li>
                    <li>That freedom of expression means nothing if no one’s listening</li>
                    <li>That technology should amplify the public, not the powerful</li>
                    <li>That civic action should be as easy as opening a bag of chips</li>
                </ul>
                <p>We don’t care what side you’re on, only that you have the means to speak your piece and see what happens next.</p>
            </>
        ),
    },
    {
        title: 'What CivicEcho Will Never Be',
        content: (
            <ul className="list-disc list-inside space-y-1">
                {[
                    'It will never endorse candidates.',
                    'It will never take ad money from political parties, PACs, or discourse farms.',
                    'It will never sell user data.',
                    'It will never require a login to use the basic tool.',
                    'It will never be closed-source.',
                    'It will never be yours alone, or ours alone.',
                ].map((line) => (
                    <li key={line}>{line}</li>
                ))}
            </ul>
        ),
    },
    {
        title: 'Where It’s Going',
        content: (
            <>
                <p>Maybe CivicEcho stays simple.</p>
                <p>Maybe one day it powers live town halls, mobile organizing, or real-time policy feedback loops.</p>
                <p>Maybe it creates some real change.</p>
                <p>But even if it never evolves past what it is right now, it still matters.</p>
                <p>Because it works. Because it’s yours. Because someone, somewhere, needed this. And now it exists.</p>
            </>
        ),
    },
];

export default function EthosPage() {
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">The CivicEcho Manifesto <span className="text-sm font-normal text-gray-400">not-a-Manifesto</span></h1>
            {/* Subtitle / wrench line */}
            <p className="text-lg italic text-gray-500 dark:text-gray-400">
                “This isn’t a movement, it’s a wrench.”
            </p>

            {sections.map(({ title, content }) => (
                <details
                    key={title}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 shadow-sm"
                >
                    <summary className="cursor-pointer text-xl font-semibold">
                        {title}
                    </summary>
                    <div className="mt-3 space-y-3 prose dark:prose-invert">
                        {content}
                    </div>
                </details>
            ))}
        </main>
    );
}
