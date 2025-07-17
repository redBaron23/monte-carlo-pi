# Monte Carlo π Estimator

<img width="2424" height="1434" alt="image" src="https://github.com/user-attachments/assets/d3ead267-bb41-40c7-979c-5e6ed7ceb507" />

This is a fullstack application that estimates the value of π using the Monte Carlo method.  
The frontend is built with React (Vite + Tailwind), and the backend is a simple Python service.

---

### Live Demo

Puedes ver la aplicación funcionando en:  
[https://monte-carlo-pi.vercel.app/](https://monte-carlo-pi.vercel.app/)

---

## 🚀 Requirements

- **Node.js** v22.17.0
- **pnpm**
- **Python** 3.12.7
- **pip**

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/monte-carlo-pi.git
cd monte-carlo-pi

# Installs all dependencies (frontend + backend)
pnpm run install:all
```

### Prepare environment variables

Before running the frontend, make sure the `.env` file exists in `apps/frontend`.  
You can generate a default one by running:

```bash
pnpm run generate:env
```

The `.env` file contains:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Development

```bash
pnpm dev          # Run frontend and backend together
pnpm dev:frontend # Run frontend only
pnpm dev:backend  # Run backend only
```

## Build

```bash
pnpm build
```

## Sources

- https://en.wikipedia.org/wiki/Monte_Carlo_method#Overview
- https://www.youtube.com/watch?v=WJjDr67frtM
- https://ui.shadcn.com/docs
- https://zod.dev/
- https://stackoverflow.com/questions/2709818/fastest-way-to-generate-1-000-000-random-numbers-in-python
