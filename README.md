# Payment Microservice

This is a simple Payment Microservice built with Node.js, TypeScript, and Express.  
It lets you create payments, check their status, and update them. The API is documented with Swagger.

## Features
- Create a payment
- Get a payment by ID
- Update payment status
- Swagger API documentation

## Tech Stack
- Node.js
- TypeScript
- Express.js
- Jest + Supertest for tests
- Swagger for API docs

## Setup
1. Clone the repo:
```bash
git clone <repo-url>
cd <repo-folder>
Install dependencies:

npm install
Start the server:

npm run dev
Server runs on http://localhost:3000.

Swagger docs are available at http://localhost:3000/api-docs.

Testing
Run tests with:

npm test
Tests cover creating a payment, fetching it, updating its status, and handling non-existent payments.

Example Requests
Create Payment

POST /api/payments
Content-Type: application/json

{
  "amount": 10,
  "currency": "USD",
  "description": "Test payment"
}
Get Payment

GET /api/payments/{id}
Update Payment Status

PATCH /api/payments/{id}
Content-Type: application/json

{
  "status": "succeeded"
}
Notes
Payments are stored in memory (no database for simplicity).

Valid statuses: pending, processing, succeeded, failed, cancelled.