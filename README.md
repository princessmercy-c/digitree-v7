# Digitree Innovation Website

## Quick Start
```bash
npm install
npm run dev

```

## Build for Production
```bash
npm run build

```

## Personalise the Site
Open `src/utils/constants.jsx` and update:
- `SITE.phone` + `SITE.whatsapp` — your WhatsApp number
- `SITE.email` — your email
- `SITE.instagram/tiktok/facebook` — your social handles
- `SITE.shopifyStore` — your Shopify URL
- `BANK.*` — your real bank account details
- `TEAM_MEMBERS` — replace with real team names & roles
- `BLOG_POSTS` — replace with real articles

## Adding Team Photos
1. Put photo in `/public/team/john.jpg`
2. In `TEAM_MEMBERS`, add: `photo: '/team/john.jpg'`

## Image Locations
- Logo: `src/assets/logo.jpg`
- Featured product: `src/assets/gadgets/gadget1.jpg`
- All images imported as ES modules — no path issues
