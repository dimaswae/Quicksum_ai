# AGENTS.md — QuickSum.AI

Dokumen ini memberi konteks proyek untuk AI coding agent (OpenCode) agar perubahan kode konsisten dengan arsitektur, konvensi, dan kondisi aktual proyek.

---

## Ringkasan Proyek

QuickSum.AI adalah aplikasi web *abstractive text summarization* berbasis GLM-4.5-Air API (z.ai). Pengguna dapat mengetik/menempel teks, mengunggah dokumen (.txt/.pdf), memilih panjang ringkasan, dan mendapat hasil secara instan.

Dikembangkan dengan metodologi Scrum (8 sprint, 2 minggu/sprint) oleh tim 5 orang.

---

## Arsitektur Target

Pola **client-server**, tiga layanan terpisah:

```
Browser (React)
  └─→ POST /api/summary  →  node-backend (Express.js)
                                └─→ POST /summarize  →  ai-backend (FastAPI + GLM-4.5-Air)
                                                            └─→ z.ai API
```

| Layanan | Teknologi | Status | Hosting Target |
|---|---|---|---|
| Frontend | React + Vite | 🔴 Skeleton | Vercel |
| node-backend | Express.js + MongoDB | 🟢 Lengkap | Railway |
| ai-backend | FastAPI (Python) + GLM | 🟢 Lengkap | Railway |

---

## Kondisi Aktual (per 2026-06-29)

### Frontend (`frontend/src/`)

```
frontend/src/
  App.jsx          ← entry point, belum ada routing/komponen
  main.jsx         ← Vite entry
  styles/
    App.css
    index.css
  assets/
    hero.png
    react.svg
    vite.svg
```

**Komponen belum dibuat sama sekali.** Target struktur yang harus dibangun:

```
frontend/src/
  components/
    SummarizeForm.jsx     ← input teks + pilihan panjang + submit
    FileUpload.jsx        ← upload .txt/.pdf, validasi UI
    OutputArea.jsx        ← tampilan hasil + tombol copy
    LoadingSpinner.jsx    ← feedback saat request berjalan
    ToastNotification.jsx ← feedback error/sukses
    ThemeToggle.jsx       ← light/dark mode
  hooks/
    useSummarize.js       ← logic request ke node-backend
    useClipboard.js       ← copy-to-clipboard
  services/
    api.js                ← instance Axios terkonfigurasi
  styles/
    App.css               ← sudah ada
    index.css             ← sudah ada
```

### node-backend (`backend/node-backend/`)

```
server.js
config/database.js
controllers/  authController.js, historyController.js, modelController.js, summaryController.js
middlewares/  authMiddleware.js, errorMiddleware.js, validateMiddleware.js
models/       AI_Model.js, History.js, Summary.js, Text.js, User.js
routes/       authRoutes.js, historyRoutes.js, modelRoutes.js, summaryRoutes.js, index.js
services/     aiService.js          ← proxy ke ai-backend
utils/        logger.js, responseHandler.js
```

Status: **sudah lengkap**, belum diintegrasikan dengan frontend.

### ai-backend (`backend/ai-backend/`)

```
run.py
app/
  main.py
  core/config.py
  models/schema.py
  routes/summarize.py
  services/ai_service.py   ← memanggil GLM-4.5-Air API
requirements.txt
```

Status: **sudah lengkap**, menerima request dari node-backend.

---

## Environment Variables

### ai-backend (`.example.env` → `.env`)
- `GLM_API_KEY` — API key z.ai, **jangan pernah hardcode**

### node-backend (`.env.example` → `.env`)
- `AI_BACKEND_URL` — URL ai-backend (Railway)
- `MONGODB_URI` — koneksi database
- `JWT_SECRET` — untuk auth middleware

### frontend (`Vercel` env / `.env.local`)
- `VITE_API_BASE_URL` — base URL node-backend (Railway)

---

## Prioritas Development Sekarang

> **Frontend adalah bottleneck.** Backend sudah jalan. Fokus ke membangun komponen React dan menyambungkannya ke node-backend.

### Urutan build yang disarankan:

1. **`services/api.js`** — setup Axios instance dengan `VITE_API_BASE_URL`
2. **`hooks/useSummarize.js`** — POST ke `/api/summary`, kelola loading/error state
3. **`components/SummarizeForm.jsx`** — form utama (textarea + select panjang + submit)
4. **`components/OutputArea.jsx`** — tampilkan hasil ringkasan
5. **`components/LoadingSpinner.jsx`** + **`ToastNotification.jsx`** — UX feedback
6. **`components/FileUpload.jsx`** — upload file dengan validasi
7. **`hooks/useClipboard.js`** + **`components/ThemeToggle.jsx`** — polish

---

## Konvensi Kode

### Frontend
- Functional component, satu file per komponen di `src/components/`
- Logic reusable → custom hooks di `src/hooks/`, bukan inline di komponen
- Semua HTTP request lewat `src/services/api.js` (Axios), **jangan `fetch` langsung di komponen**
- CSS: pertahankan token tema di `index.css` agar `ThemeToggle` berfungsi
- Ikuti design system di `MASTER.md` (warna, spacing, typography, komponen spec)

### node-backend
- Pola MVC: `routes/` → `controllers/` → `services/`
- Business logic di `services/`, bukan di `routes/` atau `controllers/`
- Error handling terpusat lewat `middlewares/errorMiddleware.js`
- Response format konsisten lewat `utils/responseHandler.js`

### ai-backend
- Routing di `app/routes/`, logic di `app/services/ai_service.py`
- Config via `app/core/config.py`, bukan hardcode

---

## Aturan Keamanan (jangan dilanggar)

- API key GLM **hanya** di `.env` ai-backend, tidak pernah di frontend atau node-backend kode
- CORS node-backend: hanya domain frontend Vercel yang terdaftar
- Validasi input: teks minimum 50 karakter, file hanya `.txt`/`.pdf`, maksimum 5MB
- Sanitasi input sebelum dikirim ke ai-backend (cegah prompt injection)
- Rate limiting endpoint summary: 20 req/menit per IP
- Timeout ke ai-backend: 30 detik, retry 1 kali

---

## Batasan

- **Jangan** mengubah kontrak endpoint tanpa koordinasi antar layanan
- **Jangan** hardcode API key, URL, atau secret — selalu via environment variable
- **Jangan** taruh business logic di `routes/`
- Perubahan UI harus tetap responsif (mobile-first) dan tidak merusak alur file upload / loading state
- Ikuti design system `MASTER.md` untuk semua perubahan visual

---

## Testing

- Setelah perubahan frontend: `npm run dev` di `/frontend`, verifikasi manual input teks → submit → lihat hasil
- API testing: Postman ke node-backend, pastikan response format konsisten
- File upload: test dengan `.txt` dan `.pdf` valid, test juga file >5MB (harus ditolak)