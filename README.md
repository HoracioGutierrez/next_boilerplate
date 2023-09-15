# NEXT.JS Boilerplate

This is a [Next.js](https://nextjs.org/) boilerplate with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [MongoDB](https://www.mongodb.com/), [NextAuth.js](https://next-auth.js.org/), and [OAuth](https://oauth.net/) made entirely from scratch to be used as a starting point for new projects with the latest technologies (I meant, the tech stack I can handle...) already set up.

## Features

- [x] Next.js
- [x] TypeScript
- [x] ESLint
- [x] App Router
- [x] Tailwind CSS
- [x] MongoDB
- [x] Server Actions
- [x] Server Components
- [x] NextAuth.js
- [x] OAuth and Credentials Providers
- [x] Google OAuth
- [x] Tailwind Merge
- [x] clsx (for conditional classes)

## Getting Started

First you need to clone this repository and install the dependencies:

```bash
git clone https://github.com/HoracioGutierrez/next_boilerplate
cd next_boilerplate
npm install
```

Then, you need to create a `.env.local` file with the following environment variables:

```bash
MONGODB_URI=
MONGODB_DB=
NEXTAUTH_URL=
GOOGLE_ID=
GOOGLE_SECRET=
```

Finally, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To Do

- [ ] Add more OAuth providers
- [ ] Add Profile Page with user info : ALMOST FINISHED!!!