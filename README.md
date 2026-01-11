# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Siap bro. Ini **urutan pengerjaan yang logis, efisien, dan realistis** buat 25 file tadi — dari yang **paling penting untuk lolos**, sampai yang **naikkan nilai ke bintang 5**.

Urutan ini bukan asal, tapi sesuai praktik engineering (test → E2E → ecosystem → CI/CD → bukti).

---

# 🧠 URUTAN PENGERJAAN 25 FILE (1 → 25)

## 🔥 PRIORITAS 1 — Automation Testing (inti penilaian)

Ini yang paling berat bobotnya. Kerjakan dulu semua ini.

### Reducer & Thunk Test (8 file)

1. `src/features/auth/__tests__/authSlice.test.js`

2. `src/features/auth/__tests__/authThunks.test.js`

3. `src/features/threads/__tests__/threadsSlice.test.js`

4. `src/features/threads/__tests__/threadsThunks.test.js`

5. `src/features/threadDetail/__tests__/threadDetailSlice.test.js`

6. `src/features/threadDetail/__tests__/threadDetailThunks.test.js`

7. `src/features/users/__tests__/usersSlice.test.js`

8. `src/features/users/__tests__/usersThunks.test.js`

> Setelah nomor 1–8 selesai →
> `npm test` sudah mulai valid dan reviewer sudah bisa kasih nilai baik.

---

### Component Test (6 file)

9. `src/components/__tests__/Button.test.jsx`
10. `src/components/__tests__/Navbar.test.jsx`
11. `src/components/__tests__/ThreadItem.test.jsx`
12. `src/components/__tests__/CommentItem.test.jsx`
13. `src/components/__tests__/ThreadFilter.test.jsx`
14. `src/components/__tests__/LeaderboardItem.test.jsx`

> Sampai sini:
>
> * Syarat utama testing sudah **lebih dari cukup**
> * Nilai sudah aman ke **rating 4–5**

---

## ⚡ PRIORITAS 2 — E2E Testing (Cypress)

Masih bagian kriteria utama.

15. `cypress/e2e/login.cy.js`
16. `cypress/e2e/create-thread.cy.js`

> Setelah ini:
>
> * `npm run e2e` jalan
> * Reviewer melihat project lu sudah **serius dan profesional**

---

## 🌿 PRIORITAS 3 — Ecosystem React (Storybook)

Ini buat lolos kriteria ecosystem + poin tambahan.

17. `.storybook/main.js`

18. `.storybook/preview.js`

19. `.storybook/manager.js`

20. `src/stories/Button.stories.jsx`

21. `src/stories/ThreadItem.stories.jsx`

> Sampai sini:
>
> * Ecosystem tambahan valid
> * Ada ≥2 stories
> * Nilai kuat ke **bintang 5**

---

## 🤖 PRIORITAS 4 — CI/CD

Wajib, tapi secara pengerjaan biasanya setelah test sudah stabil.

22. `.github/workflows/ci.yml`

> Setelah ini:
>
> * GitHub Actions jalan
> * PR → CI pass/fail bisa dibuktikan

---

## 📸 PRIORITAS 5 — Bukti Screenshot (wajib administratif)

Ini bukan coding, tapi **submission bisa ditolak kalau tidak ada**.

23. `screenshots/1_ci_check_error.png`
24. `screenshots/2_ci_check_pass.png`
25. `screenshots/3_branch_protection.png`

---

# 🧩 Kenapa urutannya harus begini?

Karena kalau dibalik, lu bakal:

* Setup CI tapi test belum ada → CI useless
* Setup Storybook dulu tapi test belum jalan → buang waktu
* Screenshot dulu tapi belum ada hasil → palsu

Urutan ini bikin:

> Setiap tahap saling menguatkan dan bisa langsung dites.

---

# Ringkasannya:

| Tahap | File | Nomor |
|------|------|
| Testing utama | 14 file | 1–14 |
| Cypress | 2 file | 15–16 |
| Storybook | 5 file | 17–21 |
| CI/CD | 1 file | 22 |
| Screenshot | 3 file | 23–25 |

---

Kalau lu mau kita jalan **beneran sampai selesai**, step paling tepat sekarang:

👉 Mulai dari **file nomor 1**
`src/features/auth/__tests__/authSlice.test.js`

Lu kirim isi:

```
src/features/auth/authSlice.js
```

Gue buatin test-nya langsung sesuai struktur project lu.
trigger 
"# trigger" 
