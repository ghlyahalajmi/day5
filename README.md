# A Gahwa Log

A private members-only gahwa collection app built with Next.js, Supabase, and Vercel.

> **Your private log of great gahwa.**
> Save the places, ratings, and memories behind every cup of gahwa — and keep them to yourself.

---

## Features

- Create an account with an email and password
- Log in and log out
- A personalised dashboard that greets you by name
- Add a gahwa experience: place, date, a 1–5 star rating, and optional notes
- See your collection as cards, sorted newest first
- A proper empty state when you have not saved anything yet
- Your records survive a page refresh, a new browser, and a new device
- **You can only ever see your own records** — enforced by the database, not by the app
- Responsive on desktop, laptop, tablet, and phone
- Clear loading, success, and error messages on every action

Deliberately **not** built yet: edit, delete, search, filtering, statistics, pictures, public sharing.

---

## Technology

| Piece | What it does here |
| --- | --- |
| **Next.js (App Router)** | The web framework. Renders pages on the server and in the browser. |
| **React** | Builds the interface out of reusable components. |
| **TypeScript** | Catches mistakes (like a typo in a column name) before the app runs. |
| **Tailwind CSS** | Styling, written as small utility classes directly on the markup. |
| **Design** | Sadu weaving patterns, arch shapes, espresso and saffron — drawn in CSS/SVG, no image files. |
| **Supabase Auth** | Handles signup, login, logout, and the session cookie. |
| **Supabase PostgreSQL** | The actual database that stores the gahwa records. |
| **Supabase Row Level Security** | The privacy lock. Decides which rows each user is allowed to see. |
| **GitHub** | Stores the code and its history. |
| **Vercel** | Turns the GitHub repository into a live website. |

Only two extra packages are installed: `@supabase/supabase-js` and `@supabase/ssr`.

---

## Project structure

```
src/
├── proxy.ts                     Runs before every page. Refreshes the login
│                                session and blocks /dashboard for strangers.
│                                (Next.js 16 renamed "middleware.ts" to this.)
├── app/
│   ├── layout.tsx               Page shell, fonts, and the browser tab title.
│   ├── globals.css              Colour palette and base styles.
│   ├── page.tsx                 "/"           Landing page.
│   ├── login/page.tsx           "/login"      Login page.
│   ├── signup/page.tsx          "/signup"     Signup page.
│   ├── dashboard/page.tsx       "/dashboard"  Private page. Checks who you are
│   │                                          on the server, then loads your rows.
│   └── auth/signout/route.ts    Clears the session, then sends you to /login.
├── components/
│   ├── LoginForm.tsx            Email + password, with validation and errors.
│   ├── SignupForm.tsx           Email, password, confirm password.
│   ├── DashboardNav.tsx         Brand, "My Log", your email, Log out button.
│   ├── LogSection.tsx           Opens the add form and refreshes the list.
│   ├── AddGahwaForm.tsx         The "Add to My Log" form and the insert.
│   ├── RatingInput.tsx          The 1–5 star picker (real radio buttons).
│   ├── GahwaCard.tsx            One saved gahwa, drawn as a card.
│   ├── EmptyState.tsx           "Your locker is empty ☕"
│   ├── SaduBand.tsx             The Sadu weave band and divider ornament.
│   ├── FinjalIcon.tsx           The finjal (gahwa cup) used as the mark.
│   └── ...                      Logo, Stars, Alert, AuthShell, SetupNotice.
└── lib/
    ├── supabase/client.ts       Supabase client for browser code.
    ├── supabase/server.ts       Supabase client for server code.
    ├── supabase/config.ts       Reads the environment variables.
    ├── auth-messages.ts         Turns technical errors into plain English.
    └── types.ts                 The shape of one gahwa row.

supabase/schema.sql              The SQL to create the table and its policies.
```

---

## Database structure

Table: **`gahwa_logs`**

| Column | Type | Required | What it means |
| --- | --- | --- | --- |
| `id` | `uuid` | yes, automatic | Unique id for the row. Postgres generates it. |
| `user_id` | `uuid` | yes | **The owner.** Points at `auth.users(id)`. This is what makes a row "mine". |
| `place_name` | `text` | yes | Where the gahwa was tried, e.g. `Qahwa House`. |
| `date` | `date` | yes | The day you tried it. |
| `rating` | `integer` | yes | 1 to 5. The database rejects anything else. |
| `notes` | `text` | no | Your personal comment. May be empty. |
| `created_at` | `timestamptz` | yes, automatic | When the row was saved. Used to sort newest first. |

There is one index, on `(user_id, created_at desc)`, because every query the app
makes is "my rows, newest first".

### Why `user_id` is necessary

Every user's records live in the **same** table. Without a column saying who owns
each row, the database would have no way to tell your gahwa from someone else's.
`user_id` is the label on the box. Row Level Security is the lock that reads the label.

---

## Authentication

Supabase Auth handles accounts, so this project never stores or checks a password itself.

1. You sign up. Supabase hashes your password and creates a row in `auth.users`.
2. You log in. Supabase checks the password and issues a **signed token** (a JWT)
   containing your user id, which is stored in a browser cookie.
3. Every request the app makes carries that cookie.
4. Supabase verifies the signature. Because the signature uses a secret only
   Supabase holds, you cannot edit the token to claim to be another user.
5. Inside the database, `auth.uid()` reads your id out of that verified token.

On the server the app calls `supabase.auth.getUser()`, which **re-checks the token
with Supabase** rather than trusting the cookie as-is.

---

## Security / RLS

Row Level Security is turned on for `gahwa_logs`, with two policies:

```sql
-- READ: you may see a row only if you own it.
create policy "Users can read their own gahwa logs"
  on public.gahwa_logs for select
  to authenticated
  using (auth.uid() = user_id);

-- WRITE: you may create a row only with your own id on it.
create policy "Users can add their own gahwa logs"
  on public.gahwa_logs for insert
  to authenticated
  with check (auth.uid() = user_id);
```

In plain language:

- **`enable row level security`** — from now on, no row leaves this table unless a
  policy below says so. The default answer is *no*.
- **`to authenticated`** — only logged-in requests are even considered. A logged-out
  visitor matches no policy, so they get an empty result. Not an error page — nothing at all.
- **`using (auth.uid() = user_id)`** — on every `SELECT`, Postgres silently adds
  "and only the rows whose `user_id` equals the id in your login token".
- **`with check (auth.uid() = user_id)`** — on every `INSERT`, the new row is rejected
  unless the `user_id` matches your own id. You cannot plant a record in someone else's log.
- **No `UPDATE` or `DELETE` policy** — those features are not built, and with RLS on,
  anything not explicitly allowed is denied.

### Why this is safer than filtering in JavaScript

The dashboard asks for rows like this — notice there is no `user_id` filter:

```ts
const { data } = await supabase
  .from("gahwa_logs")
  .select("id, place_name, date, rating, notes")
  .order("created_at", { ascending: false });
```

A tempting alternative is to fetch everything and filter in the browser:

```ts
// DO NOT DO THIS
const all = await supabase.from("gahwa_logs").select("*");
const mine = all.data.filter(row => row.user_id === myId);   // ❌
```

That is only a *disguise*. The database really did send every user's rows across the
network; the browser just chose not to draw them. Anyone can open DevTools, or skip the
website and call the Supabase API directly with the public key, and read the lot.

With RLS the other rows are **never selected in the first place**. The rule lives in
Postgres, so it protects the website, a `curl` command, Postman, and any future app
equally. Security that lives in the frontend is a suggestion; security that lives in the
database is a rule.

---

## Local development

**Requirements:** Node.js 20 or newer, and a free Supabase account.

**1. Install the dependencies**

```bash
npm install
```

**2. Create the database table**

In the Supabase dashboard, open **SQL Editor → New query**, paste the whole of
[`supabase/schema.sql`](supabase/schema.sql), and press **Run**.

**3. Add your environment variables**

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

Both values come from the Supabase dashboard under **Project Settings → API Keys**.
Use the **publishable** key. Never use the secret / service-role key in this project.

`.env.local` is listed in `.gitignore` and must never be committed.

**4. Run it**

```bash
npm run dev
```

Open <http://localhost:3000>.

Other useful commands:

```bash
npm run build   # production build + TypeScript check
npm run lint    # ESLint
```

---

## Deployment

The app is deployed on Vercel from this GitHub repository. See the deployment steps
in the project write-up: import the repo into Vercel, keep the auto-detected **Next.js**
framework preset, add the same two `NEXT_PUBLIC_…` environment variables in
**Settings → Environment Variables**, and deploy.

Environment variables added in Vercel are baked in at **build** time. If you add or
change one after a deployment, you must **redeploy** before production picks it up.

Production uses the same Supabase project as local development, so accounts and
records are shared between the two.

---

## Testing the privacy rule

Create two accounts and prove they cannot see each other.

**Account A**

1. Go to `/signup` and register `a@example.com`.
2. Log in, click **Add Gahwa**, and save:
   - Place: `Test Gahwa A`
   - Rating: `5`
   - Notes: `Private test for Account A`
3. Confirm the card appears, then **refresh the page** — it should still be there.

**Account B**

4. Log out. Register `b@example.com` in a private/incognito window.
5. Log in as B. The dashboard must show **"Your locker is empty ☕"**.
   Account B must not see `Test Gahwa A`.
6. Save `Test Gahwa B`, rating `3`, notes `Private test for Account B`.

**Cross-check**

7. Log back in as A. You should see only `Test Gahwa A` — never `Test Gahwa B`.

**The logged-out test**

8. Log out completely, then type `/dashboard` in the address bar.
   You are redirected to `/login` and no private data is shown.

**The direct-database test**

9. In the Supabase dashboard, open **Table Editor → `gahwa_logs`**. As the project
   owner you can see all rows there — that is expected, and it is the one place it
   should happen. Now open **Authentication → Policies** and confirm that
   `gahwa_logs` shows **RLS enabled** with the two policies listed above.
10. To prove that RLS actually filters, open **SQL Editor** and run:

    ```sql
    -- Pretend to be a logged-out visitor holding only the public key.
    set local role anon;
    select count(*) from public.gahwa_logs;   -- expect 0
    ```

    None of this exposes a secret key.
