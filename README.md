# TabTally

A collaborative restaurant ordering and bill-splitting platform for shared food orders, expense allocation, and payment management.

## Frontend home dashboard

The mobile-first home dashboard is built with reusable components in `frontend/src/components/home`. The App Router page composes those components, while the shared palette and card radius are defined as Tailwind theme tokens in `frontend/src/app/globals.css`.

The dashboard includes a sample active restaurant session, balances, recent sessions, section navigation, and a working quick bill-split calculator. The displayed dashboard data is currently illustrative.

To run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

Run `npm run lint` and `npm run build` from `frontend` to check the frontend.
