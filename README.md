# CivicEcho Frontend

This is the React-based frontend for [CivicEcho](https://github.com/abkhur/civicecho) — a people-first tool for automating advocacy to congressional representatives.

## 🧠 Project Goals

- Generate professional, persuasive emails based on user input
- Educate users on the civic process in plain English
- Never collect or sell user data — ever
- Always open source, always transparent

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn (preferred) or npm

### Installation

```bash
git clone https://github.com/abkhur/civicecho-frontend.git
cd civicecho-frontend
yarn install
```

### Run in Development

```bash
yarn dev
```

Your app will be running at `http://localhost:5173`.

### Build for Production

```bash
yarn build
```

### Preview Production Build Locally

```bash
yarn preview
```

---

## 🗃️ Folder Structure

```
src/
├── app/                # Pages and layout
│   └── page.tsx        # Main page for generating emails
├── components/         # Reusable UI components
│   └── EmailForm.tsx   # The form for generating the email
├── assets/             # Icons, images, etc.
├── styles/             # Global CSS / Tailwind
│   └── globals.css     # Global styles including Tailwind
└── ...
```

---

## 🌐 Environment Variables

You’ll need to set up an environment file `.env` with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

> Change this to your backend URL in production.

---

## 🧩 Features (So Far)

- 🎯 Location-aware bill targeting
- ✍️ GPT-generated email drafts with your stance & context
- 📬 Option to send emails directly to reps (in progress)
- 🔒 Zero tracking, zero cookies, zero shady business

---

## 💡 Tech Stack

- **React** (w/ hooks)
- **Next.js** (server-side rendering, API routes)
- **Tailwind CSS** (for styling)
- **Axios** for HTTP requests

---

## 🤝 Contributing

CivicEcho is a project by the people, for the people. If you have ideas or want to help out:

- Fork the repo
- Open an issue or pull request
- Or just email us directly

---

## 📜 License

[GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)

