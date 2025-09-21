# Clothify store E-Commerce app (MERN) - Backend

## Overview
Backend for clothing e-commerce: auth (bcrypt + JWT), products, search/filters/pagination, cart, mock checkout, and Nodemailer order emails.

## Tech stack
Node.js, Express, MongoDB, Mongoose, bcrypt, JWT, Nodemailer.

## Quick start (local)
1. Clone:
   git clone <repo-url>
2. Install:
   cd backend
   npm install
3. Copy env:
   cp .env.example .env
   // set MONGO_URI, JWT_SECRET, ETHEREAL_USER, ETHEREAL_PASS
4. Seed products:
   npm run seed
5. Start:
   npm run dev

## Scripts
- `npm run dev` — start in dev (nodemon)
- `npm run seed` — seed products
- `npm test` — run tests

## API endpoints
Include in the list of pdf

## Environment variables

1. Frontend
- VITE_BACKEND_URL = "http://localhost:3000"

2. Backend
- MONGO_URL = "mongodb+srv://Thilina:thilina123@clothify-cluster.d22wzol.mongodb.net/?retryWrites=true&w=majority&appName=clothify-cluster"
- PORT = 3000
- JWT_KEY = "difnsjfniejnfkijrnfeijfnijnfw9283uisjdvksjddsksjdjnskjd"
- EMAIL_FROM = "thilinalakhewage99@gmail.com"
- ETHEREAL_USER=alfonzo61@ethereal.email
- ETHEREAL_PASS=aKEfZNZUj2Jx5AQx6F

## Implementation notes
(see IMPLEMENTATION_NOTES.md)

## Trade-offs & next steps
- Focused on backend correctness; frontend kept minimal.
- Improvements: production SMTP, payment gateway, order status workflow, inventory management, optimistic locking for cart updates, better search (Elasticsearch) and CI/CD.

