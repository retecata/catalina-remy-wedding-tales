# Guest Photo Upload & Gallery (Netherlands)

## Flow
1. QR code (printed at venue) → `/upload` page
2. Guests snap photos on phone → instantly stored in Lovable Cloud
3. Photos auto-publish but stay hidden behind a midnight reveal
4. `/pictures` page unlocks at midnight NL time → public gallery with download
5. Hidden quick-delete (code-gated) on each photo for moderation

## Pages
- **`/upload`** — Mobile-first. Big "Take a photo" button (uses `<input type="file" accept="image/*" capture="environment">`), optional name field, upload progress, thumbnail of just-uploaded shots, friendly success message. No login.
- **`/pictures`** — Before midnight NL (Sep 5, 2026 → reveals Sep 6 00:00 Europe/Amsterdam): countdown + teaser. After: masonry grid, click to open lightbox, per-photo download button. Each photo shows a small trash icon → prompts for delete code → removes it.

## Backend (Lovable Cloud)
- **Storage bucket** `wedding-photos-nl` (public read, anonymous insert, 10MB limit, image MIME types only)
- **Table** `photos`: `id, event ('netherlands'), uploader_name, storage_path, created_at`
- **RLS**:
  - Anonymous INSERT allowed
  - Public SELECT allowed only after `reveal_at` (enforced via a server-side check in an edge function that returns the photo list — table itself stays locked down)
- **Edge functions**:
  - `list-photos` — returns photos only if current time ≥ reveal time (NL midnight)
  - `delete-photo` — accepts photo id + delete code (stored as a secret), removes row + storage object

## Reveal logic
Hardcoded `REVEAL_AT_NL = 2026-09-06T00:00:00+02:00`. Server-side check in `list-photos` is the source of truth (client countdown is just UX).

## Delete protection
A single shared "moderator code" stored as a Lovable Cloud secret (e.g. `PHOTO_DELETE_CODE`). The delete button asks for it, sends to the edge function, function compares server-side. Simple, no auth needed.

## Translations
Add NL/EN/RO copy for upload page, gallery countdown, and reveal state.

## Routes to add in `App.tsx`
- `/upload` → UploadPage
- `/pictures` → GalleryPage

---

## Storage cost — do I need to pay?

**No separate provider needed** — Lovable Cloud handles storage natively (it's powered by Supabase under the hood).

What you should know:
- Every workspace gets **$25/month free Cloud balance** (covers storage + bandwidth + DB).
- A typical wedding generates maybe 200–500 photos × ~3MB avg = ~1–1.5 GB. That's well within free tier.
- Storage is ~$0.021/GB/month, bandwidth ~$0.09/GB. So even with heavy download traffic on reveal day, you're looking at single-digit dollars at most — almost certainly $0 after the free credit.
- Free plan users can't top up; if you're on a paid plan you can add funds in Settings → Cloud & AI balance if ever needed.

Bottom line: just confirm the plan and I'll wire it up — no extra accounts, no extra payment expected.

---

## Open mini-question before I build
Do you want the **delete code** to be something you pick now (tell me the value and I'll store it as a secret), or should I generate a random one and show it to you once?
