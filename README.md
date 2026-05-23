# UTH-Match

UTH-Match is a modern AI Talent and Resource Matching SaaS demo built for internal enterprise workforce planning.

## Stack
- React 19 + TypeScript + Vite
- Tailwind CSS (v4)
- React Router DOM
- Zustand
- TanStack Query
- Axios (central API client)
- React Hook Form + Zod
- Framer Motion
- Lucide React
- Recharts
- date-fns
- Sonner (global toasts)
- cmdk (command palette)

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Mock Login Users
- Admin: `admin@uth.com` / `123456`
- Project Manager: `pm@uth.com` / `123456`
- Employee: `employee@uth.com` / `123456`

## Highlights
- Feature-based scalable folder structure
- Route-based code splitting with lazy loading
- Protected routes + role-based access control
- Mock auth persisted in `localStorage`
- AI talent search with explainability reasoning
- AI team builder with chemistry/risk/missing skill insights
- Skill gap detector + hidden talent spotlight
- AI chat assistant with dynamic mock responses
- Dashboard + insights + analytics charts using Recharts
- Virtualized employee directory
- Debounced search + memoized derivations
- Error boundary + skeleton loading + global toasts
- Command palette (`Ctrl/Cmd + K`)
- Responsive SaaS layout with dark/light mode

## Structure
```txt
src/
  app/
  routes/
  layouts/
  pages/
  features/
  shared/
  components/
  hooks/
  services/
  store/
  mock/
  constants/
  utils/
  types/
  assets/
```

## Environment
Optional:
```env
VITE_API_BASE_URL=/api
```

## Notes
This is a high-fidelity mock platform for hackathon/demo use. AI logic is deterministic mock logic over generated employee datasets.