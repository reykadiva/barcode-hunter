# Scan Chan — Setup Guide

## Prerequisites
- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free tier works)

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g. `scan-chan`) and set a strong database password
3. Wait for the project to spin up (~2 min)

---

## Step 2: Get Your Supabase Keys

In your Supabase dashboard → **Settings → API**:

| Variable | Where to find |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / `public` key |

In **Settings → Database → Connection String** → choose **URI**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Connection string (use **Transaction Pooler** port `6543`) |

---

## Step 3: Create Supabase Storage Bucket

In Supabase dashboard → **Storage → New Bucket**:
- **Name**: `product-images`
- **Public**: ✅ (enable public access)

Then add a **storage policy** so anyone can upload (or restrict to authenticated):

```sql
-- In SQL Editor: allow public read + authenticated upload
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Auth upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');
```

---

## Step 4: Configure Environment Variables

Edit `.env.local` at the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
DATABASE_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

---

## Step 5: Setup Database

Run these commands in the project directory:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase (creates tables)
npm run db:push

# Seed with sample data (optional)
npm run db:seed
```

---

## Step 6: Create Admin Account

In Supabase dashboard → **Authentication → Users → Add User**:
- Email: your admin email
- Password: strong password
- ✅ Auto Confirm User

---

## Step 7: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| Page | URL |
|---|---|
| Landing Page | `/` |
| Barcode Scanner | `/scan` |
| Admin Login | `/login` |
| Admin Dashboard | `/admin` |
| Products | `/admin/products` |
| Add Product | `/admin/products/new` |
| Scan History | `/admin/history` |
| Statistics | `/admin/statistics` |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Shadcn UI | Component library |
| Supabase | Database + Auth + Storage |
| Prisma ORM v7 | Database client |
| ZXing (react-zxing) | Barcode scanner |
| Motion (Framer Motion) | Animations |
| GSAP + ScrollTrigger | Scroll animations |
| Zustand | State management |
| Zod | Validation |
| Sonner | Toast notifications |
| Lucide React | Icons |
| Nunito + Fredoka | Google Fonts |

---

## Troubleshooting

### Camera not working
- Must use **HTTPS** or **localhost** — browsers block camera on HTTP
- Grant camera permissions in browser settings
- On iOS, use Safari (Chrome on iOS doesn't support camera API)

### Supabase connection error
- Check that `DATABASE_URL` uses the **Transaction Pooler** (port `6543`)
- Make sure your IP isn't blocked in Supabase network settings

### Admin login fails
- Ensure the user was created in **Supabase Auth → Users** (not just the database)
- Check that email is confirmed (`Auto Confirm` was enabled)

### Images not uploading
- Verify the `product-images` bucket exists and is set to **Public**
- Check the storage policies allow uploads
