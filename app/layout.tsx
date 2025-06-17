/* eslint-disable react/react-in-jsx-scope */
'use client'; // Mark this as a client component

import './globals.css';
import { useEffect, useState } from 'react';
import { metadata } from './metadata';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set initial dark mode based on user's preference stored in localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newDarkMode = !prev;
      localStorage.setItem('dark-mode', String(newDarkMode)); // Save user preference
      return newDarkMode;
    });
  };

  // Apply dark mode class to the body element only on the client-side
  useEffect(() => {
    // Check localStorage only after the component is mounted
    const storedDarkMode = localStorage.getItem('dark-mode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Apply dark mode class to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto:wght@400;700&display=swap"
        />
        {/* Set metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}