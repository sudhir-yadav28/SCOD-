# WhatsApp Community Landing Page

Simple single-page static site to collect basic info and redirect users to a WhatsApp Community invite link. Designed for people with obesity, diabetes, or those interested in bariatric surgery support.

Files
- `index.html` — main landing page
- `styles.css` — styling
- `script.js` — client-side form handling (validates input, stores submission in localStorage, and redirects to WhatsApp)
 - `script.js` — client-side form handling (validates input with inline errors, stores submission in localStorage, modal preview, FAQ accordion)

WhatsApp Community link:
https://whatsapp.com/channel/0029VbBGe8vD38CbD7UrcE3E

How it works
1. User fills name and email (phone optional) and checks consent.
2. On submit, the page saves the submission to localStorage and redirects the user to the WhatsApp community link.
3. The free e-book link should be shared inside the WhatsApp community chat by the group admin after the user joins.

New features added
- Dark AI-themed UI with subtle animations and micro-interactions.
- Preview the demo e-book front page inside a modal.
- Expanded "What you'll get" cards covering diet after bariatric surgery, weight-control strategies, diabetes diet management, and healthy lifestyle tips.
- Testimonials and FAQ accordion to explain benefits and set expectations.
- Improved inline form validation and error messaging.

Run locally
- Open `index.html` directly in your browser.
- Recommended: Install the "Live Server" extension in VS Code and use it to serve the page for best local testing.

Customization ideas (next steps)
- Hook the form to a real backend (e.g., Google Sheets, Firebase, or your server) to record submissions centrally.
- Add analytics tracking (consent required).
- Add a small confirmation email flow or downloadable e-book after verifying email.

Notes
- This project intentionally keeps no backend to avoid collecting or storing sensitive data on a server by default. If you want server-side collection, tell me which platform you'd prefer and I can add it.
