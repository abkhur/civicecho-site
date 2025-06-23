/* eslint-disable react/react-in-jsx-scope */
import EmailForm from '../components/EmailForm';

export default function Home() {
    return (
        <main className="bg-white dark:bg-gray-900 dark:text-gray-200">
            <div className="max-w-2xl mx-auto py-16 px-6 ">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
                        CivicEcho
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Write persuasive emails to your representatives in minutes.
                    </p>
                </header>
                <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <EmailForm />
                </section>
            </div>
        </main>
    );
}
