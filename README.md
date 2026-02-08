# DJ EPK — One-Page Site

Single-page Electronic Press Kit for DJ bookings. Plain HTML with embedded CSS, no build step. Ideal for GitHub Pages.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch `main` (or `master`) and folder `/ (root)`.
5. Save. Your site will be live at `https://<username>.github.io/DJEPK/`.

No build step required. Self-contained `index.html` only.

## Customizing Your EPK

Open `index.html` and look for `<!-- REPLACE: ... -->` comments. Each replaceable block has instructions:

- **Hero:** DJ name and tagline
- **Player:** SoundCloud (`https://w.soundcloud.com/player/?url=YOUR_TRACK_URL`) or Mixcloud (`https://www.mixcloud.com/widget/iframe/?feed=YOUR_SHOW_URL`) embed URL
- **Bio:** 3–4 sentence professional bio
- **Genres:** Style tags
- **Location:** Your city/region
- **Contact:** Email and social links (Twitter, Instagram, etc.)
- **Photos:** Replace `placehold.co` URLs with your image URLs (e.g., `assets/photo1.jpg`)
