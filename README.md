# Cinematic Personalized Birthday Experience ❤️

A private, emotional, cinematic web application created specifically for her birthday. Designed as a short interactive movie centered around her childhood cartoons, present cartoon portrait, family, father-daughter memories, father's video wish, silence, boyfriend's wish, and birthday celebration.

---

## 🔒 Privacy Notice & Asset Rules

> **Important**: The original childhood and present reference photographs are PRIVATE and MUST NOT be placed in the React application repository. The website exclusively uses the generated cartoon images (`childhood-01-cartoon.png`, `childhood-02-cartoon.png`, `present-cartoon.png`) and the provided family/father photographs.

---

## 🎬 Narrative Acts

1. **Section 1 — Cinematic Intro**: Black screen, stardust particles, progressive line reveals (*"Before we celebrate today... Let's take a little moment... To remember the little girl she once was... And the beautiful person she has become. Himmu"*).
2. **Section 2 — Childhood Cartoon 1**: `childhood-01-cartoon.png` (*"Once upon a time... There was a little girl."*).
3. **Section 3 — Childhood Cartoon 2**: `childhood-02-cartoon.png` (*"Growing up... One little moment at a time."*).
4. **Section 4 — Present Cartoon**: `present-cartoon.png` (*"And then... That little girl grew up... Into the beautiful person she is today. Happy Birthday, Himmu ❤️"*).
5. **Section 5 — Family**: `family-01.jpg`, `family-02.jpg`, `family-03.jpg` (4-6s timed crossfade, *"Family. The people who make a house feel like home."*).
6. **Section 6 — Father + Daughter**: `father-daughter.jpg` (*"Some bonds... are forever. Especially the love between a father and his daughter."*).
7. **Section 7 — Father's Birthday Video**: `father-birthday-wish.mp4` (*"A message filled with love... For Himmu ❤️"*).
8. **Section 8 — Silence**: Mandatory **5–10 seconds of quiet reflection**, background audio stopped strictly, fade to black.
9. **Section 9 — My Birthday Video**: `my-birthday-wish.mp4` (*"And now... Something from me."*).
10. **Section 10 — Celebration**: Upbeat shift with `finale.mp3` (*"Okay... Enough emotions. Today is your day! 🎂"* + photo montage of core assets).
11. **Section 11 — Birthday Cake**: SVG interactive cake, candle blowing (tap/click & optional mic), confetti fireworks shower.
12. **Section 12 — Final Message & Replay**: *"You deserve all the happiness in the world. Happy Birthday, Himmu ❤️"*, hero photo zoom, and full in-state **Replay ❤️** reset without refreshing browser.

---

## 📁 Asset Placement Guide

Place your core media files directly inside `public/assets/`:

```text
public/
└── assets/
    ├── images/
    │   ├── childhood-01-cartoon.png
    │   ├── childhood-02-cartoon.png
    │   ├── present-cartoon.png
    │   ├── family-01.jpg
    │   ├── family-02.jpg
    │   ├── family-03.jpg
    │   └── father-daughter.jpg
    │
    ├── videos/
    │   ├── father-birthday-wish.mp4
    │   └── my-birthday-wish.mp4
    │
    └── audio/
        ├── intro.mp3
        ├── childhood.mp3
        ├── family.mp3
        ├── father.mp3
        └── finale.mp3
```

---

## ⚙️ Customizing Content (`src/data/birthdayData.js`)

Change names, captions, video URLs, and audio links in [`src/data/birthdayData.js`](file:///c:/PERSONAL/AnDev%20Formula/birthday/src/data/birthdayData.js).

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```
