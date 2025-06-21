/* eslint-disable react/react-in-jsx-scope */
import { Mail, ShieldCheck, Megaphone, Gavel, User, Users } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
                Questions, media inquiries, or just want to say hi? Reach out:
            </p>

            <ul className="space-y-4 text-base">
                <ContactItem
                    icon={<User className="w-5 h-5 text-blue-500" />}
                    label="General"
                    email="contact@civicecho.org"
                />
                <ContactItem
                    icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}
                    label="Developer"
                    email="abkhur@civicecho.org"
                />
                <ContactItem
                    icon={<Gavel className="w-5 h-5 text-blue-500" />}
                    label="Legal"
                    email="legal@civicecho.org"
                />
                <ContactItem
                    icon={<Megaphone className="w-5 h-5 text-blue-500" />}
                    label="Press"
                    email="press@civicecho.org"
                />
                <ContactItem
                    icon={<Mail className="w-5 h-5 text-blue-500" />}
                    label="Abuse Reports"
                    email="abuse@civicecho.org"
                />
                {/*
                <li className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span>
                        <strong>Or join the Discord:</strong>{' '}
                        <a
                            href="https://discord.gg/YOUR_INVITE"
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CivicEcho Community
                        </a>
                    </span>
                </li>
                */}
            </ul>
        </div>
    );
}

function ContactItem({ icon, label, email }: { icon: React.ReactNode; label: string; email: string }) {
    return (
        <li className="flex items-start space-x-3 p-3 rounded-md bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
            {icon}
            <span>
                <strong className="text-gray-900 dark:text-white">{label}:</strong>{' '}
                <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
            </span>
        </li>
    );
}
