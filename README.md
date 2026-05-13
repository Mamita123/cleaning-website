# J & S Palvelut Oy — Professional Cleaning Services

A full-stack Micro Frontend web platform for J & S Palvelut Oy,
a professional cleaning company based in Helsinki, Finland.

## Live Website

- **Website:** https://js-palvelut-shell.vercel.app
- **Admin Panel:** https://js-palvelut-shell.vercel.app/js-admin-2024

## Tech Stack

- **Frontend:** React 19, Webpack 5 Module Federation
- **Backend:** Node.js, Express.js, PostgreSQL (Neon)
- **Deployment:** Vercel (frontend), Render (backend)

## Architecture

This project uses Micro Frontend Architecture with 8 independent MFEs:

| MFE | Port | URL |
|-----|------|-----|
| Shell | 3000 | js-palvelut-shell.vercel.app |
| Home | 3001 | js-palvelut-home.vercel.app |
| Services | 3002 | js-palvelut-services.vercel.app |
| Booking | 3003 | js-palvelut-booking.vercel.app |
| About | 3004 | js-palvelut-about.vercel.app |
| Pricing | 3005 | js-palvelut-pricing.vercel.app |
| Reviews | 3006 | js-palvelut-reviews.vercel.app |
| Contact | 3007 | js-palvelut-contact.vercel.app |
| Admin | 3008 | js-palvelut-admin.vercel.app |

## Features

- Bilingual website (Finnish / English)
- Dark mode and Light mode
- Online booking system
- Contact form
- Customer review system with admin approval
- Admin dashboard
- 7 cleaning services with detail pages
- Responsive design for mobile and desktop

## Services Offered

1. Home Cleaning — 35€/hour
2. Deep Cleaning — 45€/hour
3. Office Cleaning — 38€/hour
4. Move In / Move Out — 45€/hour
5. Window Cleaning — 35€/hour
6. Restaurant & Bar — 40€/hour
7. Store Cleaning — 38€/hour

*All prices exclude VAT 25.5%*

## Getting Started

### Install dependencies
npm install

### Start all MFEs
cd cleaning-website
npm start

### For backend
npm run dev

## Company Info

- **Company:** J & S Palvelut Oy
- **Y-tunnus:** 3354757-1
- **Founded:** 28.3.2023
- **Location:** Helsinki, Finland
- **Email:** mahmudul.shapan7@gmail.com
- **Phone:** 045 181 2636 / 040 593 3052