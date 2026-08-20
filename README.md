# Petta Community Secondary School

A modern, responsive website for Petta Community Secondary School — a Ugandan secondary school offering both O-Level and A-Level education.

## Tech Stack

- React + Vite
- Tailwind CSS v4
- TypeScript
- pnpm workspaces

## Getting Started

```bash
pnpm install
PORT=5173 pnpm --filter @workspace/petta-school dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
packages/
├── petta-school/       # Main React frontend
├── api-server/         # Express backend
├── api-client-react/   # React API client
├── api-spec/           # OpenAPI spec
├── api-zod/            # Zod validation schemas
└── db/                 # Database layer (Drizzle ORM)
```

## License

Private — Petta Community Secondary School
