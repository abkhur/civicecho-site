/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useEffect } from 'react';

export default function DonatePage() {
    useEffect(() => {
        // === Load Ko-fi Script ===
        if (!document.querySelector('script[src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"]')) {
            const kofiScript = document.createElement('script');
            kofiScript.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
            kofiScript.async = true;
            document.body.appendChild(kofiScript);

            kofiScript.onload = () => {
                // @ts-ignore
                if (window.kofiWidgetOverlay) {
                    // @ts-ignore
                    window.kofiWidgetOverlay.draw('civicecho', {
                        'type': 'floating-chat',
                        'floating-chat.donateButton.text': 'Support us',
                        'floating-chat.donateButton.background-color': '#00b9fe',
                        'floating-chat.donateButton.text-color': '#fff'
                    });
                }
            };
        }

        // === Load PayPal Script ===
        if (!document.querySelector('script[src^="https://www.paypal.com/sdk/js"]')) {
            const paypalScript = document.createElement('script');
            paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=BAAjYYmO_oIn3q9j03Jcc8vo2qaNnbxsG4-g9YAf7lM5kwtPjHuxhXAFR7FfTaSRtixXhsdcRpU2TEOiR8&components=hosted-buttons&enable-funding=venmo&currency=USD';
            paypalScript.async = true;
            paypalScript.crossOrigin = 'anonymous';
            document.body.appendChild(paypalScript);

            paypalScript.onload = () => {
                // @ts-ignore
                if (window.paypal && !document.querySelector('#paypal-container-7NSHZ5LCMWY5A > iframe')) {
                    // @ts-ignore
                    window.paypal.HostedButtons({
                        hostedButtonId: '7NSHZ5LCMWY5A'
                    }).render('#paypal-container-7NSHZ5LCMWY5A');
                }
            };
        } else {
            // Already loaded? Just render it
            // @ts-ignore
            if (window.paypal && !document.querySelector('#paypal-container-7NSHZ5LCMWY5A > iframe')) {
                // @ts-ignore
                window.paypal.HostedButtons({
                    hostedButtonId: '7NSHZ5LCMWY5A'
                }).render('#paypal-container-7NSHZ5LCMWY5A');
            }
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Support CivicEcho</h1>
            <p className="mb-6 text-lg">
                CivicEcho runs on people&apos;s time and energy as of now, but we need your help to keep it online.
                If you believe in what we’re building, please consider donating through Ko-fi or PayPal.
            </p>

            <div id="paypal-container-7NSHZ5LCMWY5A" className="mb-6" />

            <div className="mb-6">
                <a
                    href="https://ko-fi.com/civicecho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Donate via Ko-fi
                </a>
            </div>



            <p className="text-sm text-gray-500">
                All donations go toward keeping CivicEcho free, fast, and independent.
            </p>
        </div>
    );
}
