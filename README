```markdown
# Organization Portal — Starter

Overview
- Full-stack starter using Next.js + Prisma + PostgreSQL + Stripe.
- Public store for outsiders to browse and buy goods.
- Protected employee forms and admin pages to capture internal information and view orders.

Quick setup (local)
1. Clone repository
2. Install dependencies:
   - npm install
3. Create `.env` from `.env.example` and fill values:
   - DATABASE_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
4. Initialize Prisma:
   - npx prisma migrate dev --name init
5. Run dev server:
   - npm run dev
6. Create an employee/admin user (seed or via sign-up) and sign in to /admin.

Main features to implement
- Public product listing: /, /product/[slug]
- Cart & checkout with Stripe
- Webhook to capture completed payments and create Order records
- Admin: /admin (protected) — manage products, view orders, download CSVs
- Employee forms: /admin/employee-form (protected) — collect submissions stored in EmployeeSubmission

Notes
- Use NextAuth.js for employee/admin authentication.
- Use Prisma for DB access.
- Use Stripe Checkout or Payment Intents for payments (server-side).
- For production, set provider environment variables and a managed Postgres.
```
