# Star Board — App Icon Set

Gold star (`#F2B632`) on the brand ink tile (`#243334`). Generated from `assets/star-mark.svg`.

```
app-icon/
  ios/        icon-1024 (App Store) + 180/167/152/120/87/80/76/60/40 — square, OS rounds them
  android/    icon-512..48 (rounded) + adaptive-foreground-432 (transparent) + adaptive-background-432
  web/        favicon-16/32/48, apple-touch-icon-180, pwa-192/512, maskable-512, site.webmanifest
```

## 1. Web / laptop (HTML `<head>`)
Paste into every page's `<head>` (adjust the leading path if you don't serve from root):

```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/app-icon/web/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/app-icon/web/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/app-icon/web/apple-touch-icon-180.png">
<link rel="manifest" href="/assets/app-icon/web/site.webmanifest">
<meta name="theme-color" content="#243334">
```
The SVG favicon is served first (sharpest); PNGs are the fallback for older browsers. `pwa-192/512` + `maskable-512` are referenced by the manifest for "Add to Home Screen".

## 2. iOS (Xcode)
1. In Xcode open `Assets.xcassets` → **AppIcon**.
2. Drag `ios/icon-1024.png` into the **1024 App Store** slot. Modern Xcode (single-size) is done here — it downsamples the rest.
3. For older projects that show every slot, drop the matching `icon-<size>.png` into each. Do **not** pre-round; iOS applies the rounded mask itself, so these are square on purpose.

## 3. Android (Android Studio)
**Adaptive icon (API 26+):**
- `res/mipmap-anydpi-v26/ic_launcher.xml`:
  ```xml
  <adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
  </adaptive-icon>
  ```
- Put `adaptive-background-432.png` → `ic_launcher_background` and `adaptive-foreground-432.png` → `ic_launcher_foreground` (the foreground is transparent with the star inside the safe zone).
- **Legacy** densities: drop `icon-48/72/96/144/192.png` into `mipmap-mdpi … mipmap-xxxhdpi` as `ic_launcher.png`.
- Play Store listing uses `icon-512.png`.
- Easiest path: **Image Asset Studio** (right-click `res` → New → Image Asset) and point "Foreground" at `adaptive-foreground-432.png`, "Background" color `#243334`.

## Regenerate / re-theme
All sizes come from one script — change `INK`/`GOLD` or `starFrac` and rerun to recolor or resize the whole set.
