<div align="center">

# ✦ QuickSum.AI

**Ringkas teks panjang dan dokumen PDF dalam hitungan detik, didukung kecerdasan buatan.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-F97316?style=flat-square)

</div>

---

## 📖 Tentang Proyek

**QuickSum.AI** adalah aplikasi web tiga layanan (*three-service*) yang memungkinkan pengguna meringkas teks panjang dan dokumen secara otomatis menggunakan model bahasa besar (LLM). Pengguna cukup menempelkan teks atau mengunggah file `.txt`/`.pdf`, memilih panjang ringkasan yang diinginkan, lalu mendapatkan hasilnya dalam hitungan detik.

Proyek ini dibangun sebagai bagian dari mata kuliah **Proyek Perangkat Lunak (PPL)** dengan tujuan mempraktikkan arsitektur layanan terpisah, integrasi API pihak ketiga, dan pengembangan antarmuka pengguna modern.

---

## ✨ Fitur Utama

| # | Fitur | Keterangan |
|---|---|---|
| 📄 | **Unggah Dokumen PDF** | Ekstraksi teks otomatis dari PDF biner menggunakan `pdfjs-dist` — bukan sekadar pembacaan teks mentah |
| ✍️ | **Input Teks Bebas** | Tempel teks langsung di textarea dengan indikator validasi minimum 50 karakter |
| 🤖 | **Ringkasan Berbasis LLM** | Didukung model `GLM-4.5-Air` via OpenRouter API dengan opsi panjang: **Pendek / Sedang / Panjang** |
| 🌗 | **Dark & Light Mode** | Toggle tema dengan persistensi preferensi di `localStorage` |
| 📋 | **Salin & Unduh Hasil** | Salin ringkasan ke clipboard atau unduh sebagai file `.txt` |
| 🔐 | **Autentikasi JWT** | Registrasi dan login pengguna dengan hashing bcrypt dan token JWT 24 jam |
| 📜 | **Riwayat Ringkasan** | Endpoint riwayat per-pengguna dengan eager loading relasi Teks, Ringkasan, dan Model AI |
| 📱 | **Desain Responsif** | Antarmuka menyesuaikan ukuran layar dari mobile (375px) hingga desktop (1440px) |
| ♿ | **Aksesibel (A11y)** | Focus states, `aria-label`, `role`, dan dukungan `prefers-reduced-motion` |

---

## 🏗️ Arsitektur Sistem

QuickSum.AI dibangun dengan pola **Three-Service Architecture**:

```
┌──────────────────────────────────────────────────────────────┐
│                     BROWSER PENGGUNA                         │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │   FRONTEND  ·  React + Vite  ·  :5173                │   │
│   │                                                      │   │
│   │   SummarizeForm ──► useSummarize hook ──► api.js     │   │
│   └──────────────────────┬───────────────────────────────┘   │
└─────────────────────────-┼───────────────────────────────────┘
                           │  POST /api/summarize { text, length }
                           ▼
┌──────────────────────────────────────────────────────────────┐
│   NODE BACKEND  ·  Express.js + MySQL  ·  :3000              │
│                                                              │
│   Route → validateMiddleware → Controller → aiService.js     │
│                    │                                         │
│             MySQL (Sequelize ORM)                            │
└──────────────────────┬───────────────────────────────────────┘
                       │  POST /summarize { text, length }
                       ▼
┌──────────────────────────────────────────────────────────────┐
│   AI BACKEND  ·  FastAPI + Uvicorn  ·  :8000                 │
│                                                              │
│   /summarize route → ai_service.py → OpenRouter API          │
└──────────────────────────────────────────────────────────────┘
                       │  HTTPS
                       ▼
             ┌──────────────────────┐
             │   OpenRouter API     │
             │   model: glm-4.5-air │
             └──────────────────────┘
```

---

## 🛠️ Tech Stack

### 🖥️ Frontend

| Teknologi | Versi | Peran |
|---|---|---|
| **React** | `^19` | UI framework berbasis komponen |
| **Vite** | `^8` | Build tool & dev server (HMR) |
| **Tailwind CSS** | `^4` | Utility-first CSS (terpasang) |
| **Axios** | `^1.17` | HTTP client ke Node backend |
| **pdfjs-dist** | `^5` | Parser teks PDF biner di browser |

### ⚙️ Node Backend

| Teknologi | Versi | Peran |
|---|---|---|
| **Node.js** | `≥18` | Runtime JavaScript server-side |
| **Express.js** | `^5` | HTTP server & routing (MVC) |
| **Sequelize** | `^6` | ORM untuk MySQL/MariaDB |
| **mysql2** | `^3` | Driver koneksi MySQL |
| **jsonwebtoken** | `^9` | Generate & verifikasi JWT |
| **bcrypt** | `^6` | Hashing password (salt: 10 rounds) |
| **dotenv** | `^17` | Manajemen environment variables |

### 🐍 AI Backend

| Teknologi | Peran |
|---|---|
| **FastAPI** | Async Python web framework |
| **Uvicorn** | ASGI server untuk FastAPI |
| **Pydantic** | Validasi request/response schema |
| **requests** | HTTP call ke OpenRouter API |
| **python-dotenv** | Memuat `.env` di Python |

### 🗄️ Database & Infrastruktur

| Teknologi | Peran |
|---|---|
| **MySQL 8.0** | Database relasional utama |
| **Docker + Compose** | Containerisasi Node Backend + MySQL |

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### Prasyarat

Pastikan semua software berikut sudah terinstal:

```
✅  Node.js  ≥ v18      →  https://nodejs.org
✅  Python   ≥ 3.9      →  https://python.org
✅  MySQL    = 8.0      →  https://dev.mysql.com/downloads
✅  Git                 →  https://git-scm.com
⬜  Docker  (opsional)  →  https://docker.com
```

Verifikasi cepat:
```bash
node --version   # v18.x.x atau lebih baru
python --version # 3.9.x atau lebih baru
mysql --version  # 8.0.x
```

---

### 1️⃣ Clone Repositori

```bash
git clone https://github.com/<username>/Quicksum_ai.git
cd Quicksum_ai
```

---

### 2️⃣ Instalasi Dependensi

**Frontend** (dari root repositori):
```bash
npm install
```

**Node Backend:**
```bash
cd backend/node-backend
npm install
```

**AI Backend:**
```bash
cd backend/ai-backend

# Buat dan aktifkan virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependensi
pip install -r requirements.txt
```

---

### 3️⃣ Konfigurasi Environment Variables

Proyek ini membutuhkan tiga file `.env` — satu untuk setiap layanan.

> ⚠️ **Jangan pernah meng-commit file `.env` ke repositori.** Pastikan sudah ada di `.gitignore`.

---

#### 📁 Frontend — `Quicksum_ai/.env.local`

```env
# URL base Node Backend (tanpa trailing slash)
VITE_API_BASE_URL=http://localhost:3000
```

---

#### 📁 Node Backend — `backend/node-backend/.env`

Salin dari `.env.example` yang tersedia:
```bash
cp backend/node-backend/.env.example backend/node-backend/.env
```

Kemudian isi nilainya:
```env
# ── Server ──────────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── Database MySQL ───────────────────────────────────
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=project_summary
DB_PORT=3306

# ── Autentikasi ──────────────────────────────────────
# Gunakan string acak yang panjang dan kompleks (min. 32 karakter)
JWT_SECRET=isi_dengan_string_rahasia_yang_sangat_panjang_dan_aman

# ── URL AI Backend ───────────────────────────────────
AI_BACKEND_URL=http://localhost:8000/summarize
```

---

#### 📁 AI Backend — `backend/ai-backend/.env`

Salin dari `.example.env` yang tersedia:
```bash
cp backend/ai-backend/.example.env backend/ai-backend/.env
```

Kemudian isi nilainya:
```env
# Dapatkan API Key gratis di: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 4️⃣ Buat Database MySQL

Jalankan perintah berikut di MySQL client atau workbench:
```sql
CREATE DATABASE IF NOT EXISTS project_summary
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

---

### 5️⃣ Menjalankan Proyek (Development)

Buka **tiga terminal terpisah** dan jalankan setiap layanan:

```bash
# ── Terminal 1: Frontend ─────────────────────────────
# (dari root repositori Quicksum_ai/)
npm run dev
# → Berjalan di http://localhost:5173

# ── Terminal 2: Node Backend ─────────────────────────
cd backend/node-backend
npm run dev
# → Berjalan di http://localhost:3000
# → Tabel database auto-sync saat pertama dijalankan

# ── Terminal 3: AI Backend ───────────────────────────
cd backend/ai-backend
# (aktifkan venv terlebih dahulu)
python run.py
# → Berjalan di http://localhost:8000
# → Swagger UI: http://localhost:8000/docs
```

---

### 🐳 Alternatif: Menjalankan via Docker

Docker Compose tersedia untuk **Node Backend + MySQL**:

```bash
cd backend/node-backend

# Build dan jalankan (foreground)
docker-compose up --build

# Jalankan di background
docker-compose up -d --build

# Hentikan container
docker-compose down

# Hentikan dan hapus data database
docker-compose down -v
```

> **Catatan:** AI Backend harus tetap dijalankan secara manual di luar container Docker.

---

## 📁 Struktur Folder

```
Quicksum_ai/
├── frontend/                    ← Aplikasi React (Vite)
│   ├── index.html
│   └── src/
│       ├── App.jsx              ← Root component
│       ├── components/          ← UI components (presentational)
│       │   ├── SummarizeForm.jsx
│       │   ├── FileUpload.jsx   ← PDF parser (pdfjs-dist)
│       │   ├── OutputArea.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── ThemeToggle.jsx
│       │   └── ToastNotification.jsx
│       ├── hooks/               ← Custom React hooks
│       │   ├── useSummarize.js  ← State & API call ringkasan
│       │   └── useClipboard.js
│       ├── services/api.js      ← Axios instance terpusat
│       └── styles/index.css     ← Design tokens (CSS variables)
│
├── backend/
│   ├── node-backend/            ← REST API (Express.js + MySQL)
│   │   ├── server.js
│   │   ├── config/              ← Konfigurasi database
│   │   ├── routes/              ← Definisi endpoint (/api/*)
│   │   ├── controllers/         ← Request handlers
│   │   ├── middlewares/         ← Auth, validasi, error handler
│   │   ├── models/              ← Sequelize models (5 tabel)
│   │   ├── services/            ← Logika bisnis & HTTP calls
│   │   └── utils/               ← responseHandler, logger
│   │
│   └── ai-backend/              ← Layanan AI (FastAPI + Python)
│       ├── run.py
│       └── app/
│           ├── main.py
│           ├── core/config.py
│           ├── routes/
│           ├── models/schema.py
│           └── services/ai_service.py
│
├── design-system/
│   └── quicksum.ai/MASTER.md    ← Panduan desain otoritatif
├── ARCHITECTURE.md              ← Dokumentasi teknis lengkap
├── AGENTS.md                    ← Panduan untuk AI coding agents
└── vite.config.js
```

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Ikuti alur berikut:

```bash
# 1. Fork dan clone repositori
git clone https://github.com/<username>/Quicksum_ai.git

# 2. Buat branch baru dari main
git checkout -b feature/nama-fiturmu

# 3. Lakukan perubahan dan commit
git commit -m "feat: deskripsi singkat perubahan"

# 4. Push dan buat Pull Request
git push origin feature/nama-fiturmu
```

**Format Commit Message (Conventional Commits):**

| Prefix | Digunakan Untuk |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Perubahan dokumentasi |
| `refactor:` | Refaktorisasi kode |
| `test:` | Penambahan/perbaikan test |
| `chore:` | Update dependensi, konfigurasi |

**Jalankan linter sebelum commit:**
```bash
# Frontend
npm run lint

# AI Backend
flake8 backend/ai-backend/app/
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">

Dibuat dengan ☕ oleh Tim QuickSum.AI · PPL 2026

</div>
