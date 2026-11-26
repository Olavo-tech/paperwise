# Paperwise

Next.js application for editable academic report drafts. PT/EN/ES, Supabase Auth, Groq, PDF/DOCX exports.

## Setup
1. Create a dedicated Supabase project. Run `supabase/setup.sql` in SQL Editor. In Authentication > Providers > Email, disable Confirm email only if you accept the security tradeoff. Enable email/password.
2. Copy .env.example to .env.local (never commit secrets). Set the project URL, publishable/anon key, server-only service role key, and a NEW Groq API key. The quota defaults are conservative application limits, not a guarantee of provider limits; adjust to the actual model and account quotas.
3. npm install && npm run build && npm run dev
4. Import this repository into Vercel as Next.js, configure the same environment variables, and deploy.
5. Test signup, login, logout, upload, quota, AI questions, draft editing and both exports.

Uploads: TXT/MD, text PDFs and DOCX up to 3 MB; scanned PDFs need OCR first. Images in PNG/JPEG may be added as figures for exports. AI text is a draft, and references are never invented intentionally; review every claim. Formatting is an ABNT-oriented baseline, not certified compliance with every institutional rule. PDF export uses Times and standard Latin text. The web app manifest enables standalone presentation where supported; offline operation is not implemented.
