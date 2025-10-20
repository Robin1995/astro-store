# 🛍️ Astro E-Commerce Store

A modern e-commerce platform built with Astro, React, and TailwindCSS. Features server-side rendering, authentication, shopping cart functionality, and admin product management.

## ✨ Features

- 🔐 User Authentication (Auth.js)
- 🛒 Shopping Cart with Persistent Storage
- 📱 Responsive Design with TailwindCSS
- 🏬 Product Catalog with Image Management
- 👤 Admin Dashboard
- 🔍 Product Search and Filtering
- 💳 Order Management (coming soon)

## 🚀 Tech Stack

- [Astro](https://astro.build) - Web Framework
- [React](https://reactjs.org) - UI Components
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Auth.js](https://authjs.dev) - Authentication
- [Nanostores](https://github.com/nanostores/nanostores) - State Management
- [@astrojs/db](https://docs.astro.build/en/guides/integrations-guide/db/) - Database
- [SweetAlert2](https://sweetalert2.github.io) - Notifications

## 📂 Project Structure

```text
/
├── db/                   # Database configuration and seed data
├── public/              
│   └── images/          # Product images and static assets
├── src/
│   ├── actions/         # Server actions (auth, cart, products)
│   ├── components/      # Reusable UI components
│   ├── interfaces/      # TypeScript interfaces
│   ├── layouts/         # Page layouts
│   ├── pages/          # Application routes
│   ├── store/          # Client-side state management
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
└── package.json
```

## 🛠️ Development

1. Clone the repository:
```bash
git clone https://github.com/Robin1995/astro-store.git
cd astro-store
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```env
# Add your environment variables here
# See .env.template for required variables
```

4. Start the development server:
```bash
npm run dev
```

## 📦 Build & Deploy

This project is configured for deployment on Netlify with server-side rendering.

### Build Commands
```bash
npm run build     # Production build
npm run preview   # Preview build locally
```

### Deployment

1. Push your changes to GitHub
2. Connect your repository to Netlify
3. Configure environment variables in Netlify dashboard
4. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Robin1995/astro-store)

## 🔑 Authentication

The application uses Auth.js for authentication with the following features:
- Email/Password Registration
- Secure Login
- Protected Routes
- Admin Access Control

## � License

MIT License - feel free to use this code for your own projects!

## 🙋‍♂️ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
