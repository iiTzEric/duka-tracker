# Duka Tracker

Duka Tracker is a full-stack inventory management app for small stores. It includes a React + Vite frontend and an Express + MongoDB backend for creating, updating, viewing, and deleting inventory items.

## Features

- Add new inventory items with name, quantity, and price
- View current inventory in a responsive list
- Edit existing items inline
- Delete items from inventory
- Backend API with Express and MongoDB

## Repository Structure

- `client/` — React frontend built with Vite and Tailwind CSS
- `server/` — Express backend with Mongoose models and REST API routes

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB database (local or hosted)

## Backend Setup

1. Open a terminal in `server/`
2. Install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in `server/` with the following values:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   Or, if you want live reload during development:

   ```bash
   npx nodemon server.js
   ```

5. The API will be available at `http://localhost:3000/api/items`.

## Frontend Setup

1. Open a terminal in `client/`
2. Install dependencies:

   ```bash
   cd client
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at the URL shown by Vite, typically `http://localhost:5173`.

## API Endpoints

The backend exposes the following REST endpoints:

- `POST /api/items` — create a new inventory item
- `GET /api/items` — retrieve all items
- `GET /api/items/:id` — retrieve a single item by ID
- `PUT /api/items/:id` — update an item by ID
- `DELETE /api/items/:id` — delete an item by ID

## Notes

- The frontend currently points to `http://localhost:3000/api/items` for API requests.
- Adjust the backend URL in `client/src/App.jsx` if you serve the API from a different host or port.

## License

This project is built by eric :)
