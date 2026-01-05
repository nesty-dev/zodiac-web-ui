# Zodiac Web UI

A modern web application built with Next.js, featuring a component-based architecture following atomic design principles.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** CSS (with global styles)
- **Package Manager:** Bun
- **Linting:** ESLint

## 📁 Project Structure

```
zodiac-web-ui/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Component library (Atomic Design)
│   │   ├── atoms/        # Basic building blocks
│   │   ├── molecules/    # Simple component groups
│   │   ├── organisms/    # Complex UI sections
│   │   └── templates/    # Page-level templates
│   ├── constants/        # Application constants
│   ├── mock/            # Mock data for development
│   ├── styles/          # Global styles and style types
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine

### Installation

1. Clone the repository:

```bash
git clone git@github.com:nesty-dev/zodiac-web-ui.git
cd zodiac-web-ui
```

2. Install dependencies:

```bash
bun install
```

### Development

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page auto-updates as you edit files. Start by modifying [src/app/page.tsx](src/app/page.tsx).

### Build

Create a production build:

```bash
bun run build
```

### Start Production Server

Run the production build locally:

```bash
bun start
```

### Linting

Run ESLint to check code quality:

```bash
bun run lint
```

## 🎨 Component Architecture

This project follows the **Atomic Design** methodology:

- **Atoms:** Basic UI elements (buttons, inputs, labels)
- **Molecules:** Simple combinations of atoms (search bars, form fields)
- **Organisms:** Complex UI components (headers, forms, cards)
- **Templates:** Page layouts without actual content
- **Pages:** Actual pages in the `app/` directory

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Next.js App Router](https://nextjs.org/docs/app) - Understand the App Router architecture
- [Bun Documentation](https://bun.sh/docs) - Learn about Bun runtime and package manager

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
