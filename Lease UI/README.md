# Pinnacle Towers Tenant Portal — Primoz Otieno Scope

Frontend build for **Primoz Otieno's role: Property & Lease Lead**, from the Pinnacle Towers Tenant Web Portal project brief.

## Included scope

1. **Property Information** — Building, floor, unit number, unit type, square footage, occupancy status.
2. **Lease Management** — View lease agreement, download lease documents, view lease duration, view renewal status, submit renewal requests, accept lease renewals online.

The app renders **only My lease**. Sidebar navigation, global search, notifications, and profile are shown as disabled placeholders for other team members (e.g. Rose Mulewa for search/comms). They do not navigate to separate module pages.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`). The app opens on **My lease** by default.

## Production build

```bash
npm run build
npm run preview
```

## Notes

- Sample tenant data is static UI only. Replace with REST API calls when the backend is available.
- Module owner names live in `src/data/moduleOwners.js` — update as the full team roster is confirmed.
