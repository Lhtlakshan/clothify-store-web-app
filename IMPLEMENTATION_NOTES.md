Implementation notes — Clothify Store E-Commerce

What I prioritized
- Correct and secure user auth with bcrypt and JWT.
- Product model + robust search/filters + pagination.
- Persistent per-user cart with merge logic for guest carts.
- Checkout flow that creates Order records in MongoDB and sends confirmation emails (Nodemailer via Ethereal in dev).

Known gaps / trade-offs
- No real payment integration (spec asked for mock checkout).
- Basic frontend only (functional pages). Styling minimal ( but use tailwind css ).
- Email uses Ethereal by default — needs production SMTP credentials to send real emails.
- No queueing system for emails (would add e.g., Bull + Redis for reliability at scale).
- No rate limiting or advanced security hardening beyond password hashing and JWT.

What I'd do next / improvements
- Add payment gateway integration (Stripe).
- Add inventory management and order status lifecycle.
- Move email sending to background worker/queue.
- deploy pipeline with Mongo Atlas and CI/CD.
