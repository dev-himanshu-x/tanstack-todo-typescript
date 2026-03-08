# ✅ Taskify

A clean, modern todo app built with **TanStack Start**, **React 19**, and **Tailwind CSS**. Features dark mode, inline editing, filtering, and browser-based persistence.

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TanStack](https://img.shields.io/badge/TanStack_Start-1.x-FF4154?logo=reactquery&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?logo=tailwindcss&logoColor=white)

## Features

- **Add, edit, delete** tasks with inline editing
- **Mark as done** with custom checkboxes and strikethrough
- **Filter** tasks — All, Active, or Done
- **Search** through tasks in real time
- **Dark mode** toggle with smooth transitions
- **Persistent storage** via localStorage
- **Responsive** layout that works on all screen sizes
- **SSR-ready** with TanStack Start

## Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Framework   | TanStack Start + React 19        |
| Language    | TypeScript                        |
| Styling     | Tailwind CSS 4                    |
| Icons       | Ant Design Icons                  |
| Routing     | TanStack Router                   |
| Build Tool  | Vite 7                            |
| Testing     | Vitest + Testing Library          |
| Linting     | ESLint 9 + TypeScript ESLint      |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/taskify.git
cd taskify

# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun run preview
```

### Run Tests

```bash
bun run test
```

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout with head tags
│   ├── index.tsx           # Main todo app page
│   └── demo/               # TanStack Start demo routes
│       ├── start.server-funcs.tsx
│       ├── start.api-request.tsx
│       └── start.ssr.*.tsx
├── components/
│   └── Header.tsx          # Navigation header
├── data/
│   └── demo.punk-songs.ts  # Demo server function data
├── router.tsx              # Router configuration
├── styles.css              # Global styles + Tailwind
└── App.css                 # Tailwind import
```

## License

MIT
