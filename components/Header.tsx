/* eslint-disable react/react-in-jsx-scope */
/* components/Header.tsx */
'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropOpen, setDropOpen] = useState(false)
    const dropRef = useRef<HTMLDivElement>(null)

    // close dropdown if clicked outside
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
                setDropOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])

    const navItems = [
        { href: '/campaign', label: 'Campaigns' },
        { href: '/rules', label: 'Rules' },
        { href: '/about', label: 'About' },
        { href: '/ethos', label: 'Manifesto' },
        { href: '/blog', label: 'Blog' },
    ]

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold dark:text-white">
                        CivicEcho
                    </span>
                </Link>

                {/* mobile toggle — fully transparent */}
                <button
                    onClick={() => setMobileOpen(o => !o)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden 
                     bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 
                     focus:ring-gray-200 dark:focus:ring-gray-600"
                    aria-label="Toggle navigation"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 17 14"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l15 12M1 13L16 1" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        )}
                    </svg>
                </button>

                {/* menu */}
                <div className={`${mobileOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg 
                         bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white 
                         dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        {/* Contribute dropdown — also transparent */}
                        <li ref={dropRef} className="relative">
                            <button
                                onClick={() => setDropOpen(o => !o)}
                                className="flex items-center w-full py-2 px-3 text-gray-900 rounded-sm 
                           bg-transparent hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                           md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 
                           dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                            >
                                Contribute
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {dropOpen && (
                                <div className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <Link href="https://github.com/abkhur/CivicEcho" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                GitHub
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contactpage" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Socials and Email
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="https://discord.gg/your" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Discord
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <Link href="/donate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Donate
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* other nav links */}
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent 
                             md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 
                             dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
