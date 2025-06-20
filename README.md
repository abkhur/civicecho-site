
# CivicEcho – Frontend

This is the frontend for [**CivicEcho**](https://github.com/abkhur/civicecho-backend), a tool for sending persuasive, AI-generated emails to your congressional representatives. Built with Next.js and Tailwind, this is the public face of the platform — clean, fast, and people-first.

---

## 🧠 Project Goals

- Help regular people contact their representatives — no political knowledge required
- Generate professional, personalized emails with GPT based on real legislation
- Keep everything transparent, open source, and free to use
- Never collect or sell user data — ever

---

##  Getting Started

### Requirements

- Node.js (v18+)
- Yarn (recommended)

### Installation

```bash
git clone https://github.com/abkhur/civicecho-frontend.git
cd civicecho-frontend
yarn install
```

### Development

```bash
yarn dev
```

App runs at:
http://localhost:3001 (or whatever port you set)

### Production Build

```bash
yarn build
yarn start
```

### Optional: Preview Production Build

```bash
yarn preview
```

### Environment Variables

Create a .env.local file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```
Replace with your production backend URL when deploying.
This is used to hit endpoints like /generate-email.

##  Key Features

- 📍 Location-aware bill targeting using address → district mapping

- ✍️ AI-generated email drafts that adapt to your stance + context

- 💬 Campaign sharing and trend integration (in progress)

- 🔐 No tracking, no analytics, no cookies — period

## 🧪 Stack

   - Next.js – App router, server-side rendering

    - Tailwind CSS – Styling

    - React (w/ hooks) – UI logic

    - Axios – HTTP requests

    - TypeScript – Strictly typed frontend logic

## 🤝 Contributing

This is a solo project for now, but I'm open to help from people who care.
File an issue, fork it, or [email me.](mailto:abkhur@civicecho.org)

## 📜 License

GNU Affero General Public License v3.0 (AGPL-3.0)

 If you fork this and host it yourself, you need to open source your changes.

## Shoutouts

This project runs because people believe in the mission. Thanks for supporting it — and thanks for giving a damn.

Also, shoutouts to a couple people I like:

- Muhammad Khurram (my awesome little brother)
- Michael Terrando (my best friend)
- Dylan Singh ([stream his music](https://soundcloud.com/dsiides))
