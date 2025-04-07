/* eslint-disable react/react-in-jsx-scope */
import EmailForm from '../components/EmailForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50">
      <div className="max-w-2xl mx-auto py-16 px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            CivicEcho
          </h1>
          <p className="text-gray-600 text-lg">
            Write persuasive emails to your representatives — powered by people, not profit.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <EmailForm />
        </section>

        <footer className="mt-12 text-center text-sm text-gray-400">
          Made with love and care by the CivicEcho project.
        </footer>
      </div>
    </main>
  );
}
