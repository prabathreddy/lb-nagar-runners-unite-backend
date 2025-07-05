# lb-nagar-runners-unite-backend

Node.js/Express backend API for the LB Nagar Runners Unite application.

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication

## Project Structure
```plaintext
src/
  controllers/
  models/
  routes/
  middleware/
  utils/
  app.js
  server.js
.env.example
```

## Setup & Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/prabathreddy/lb-nagar-runners-unite-backend.git
   cd lb-nagar-runners-unite-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.

4. **Start MongoDB** (if running locally).

5. **Run the server:**
   ```sh
   npm run dev
   ```

## Environment Variables

See `.env.example` for required variables:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Port to run the server (default: 5000)

## Main API Endpoints

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Events:** `GET /api/events`, `POST /api/events` (admin), `POST /api/events/:id/register`
- **Blogs:** `GET /api/blog`, `POST /api/blog`, `PUT /api/blog/:id/approve` (admin)
- **Contact:** `POST /api/contact`

## Connecting Frontend

- Set your frontend `.env` to use the backend API base URL (e.g., `VITE_API_URL=http://localhost:5000/api`).

## Deployment

- Deploy to Render, Railway, Heroku, AWS, etc.
- Don’t forget to set your environment variables on your deployment platform.

## License

MIT

## Contact

For questions, reach out to [prabathreddy](https://github.com/prabathreddy).