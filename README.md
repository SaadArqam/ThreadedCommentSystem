# NestedComment

A full‑stack nested comments application with a Node/Express + Prisma (MongoDB) backend and a modern React (Vite + Tailwind CSS) frontend.

## Tech Stack
- Backend: Node.js, Express, Prisma (MongoDB)
- Frontend: React 19, Vite, Tailwind CSS
- Tooling: Nodemon (dev), date-fns (formatting)

## Project Structure
```
/Users/saadarqam/NestedComment /
  client/          # React app (Vite)
  server/          # Express API + Prisma
```

## Prerequisites
- Node.js LTS (>=18)
- npm (bundled with Node)
- A MongoDB connection string (Atlas or local)

---

## 1) Backend Setup (server)

1. Configure environment variables
   - Create `server/.env` with:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   PORT=3000
   ```

2. Install dependencies and generate Prisma client
   ```bash
   cd server
   npm ci
   npx prisma generate
   ```

3. Sync Prisma schema with the database (MongoDB)
   - For MongoDB, use `db push`:
   ```bash
   npx prisma db push
   ```

4. (Optional) Seed data
   ```bash
   node prisma/seed.js
   ```

5. Run the API server
   ```bash
   node server.js
   ```
   - The server will start on `http://localhost:3000`.

### API Endpoints
- `GET /comments` → Get all comments as a nested tree
- `POST /comments` → Create a comment or reply
  - body: `{ text: string, parentId?: string | null }`
- `PATCH /comments/:id/like` → Increment like count of a comment
- `GET /user` → Get the default (hardcoded) user
- `DELETE /comments` → Delete all comments (utility endpoint)

Notes:
- The server returns comments already nested via a `children` array. No client-side restructuring is needed.

---

## 2) Frontend Setup (client)

1. Install dependencies
   ```bash
   cd client
   npm ci
   ```

2. Run the development server
   ```bash
   npm run dev
   ```
   - Open the URL printed by Vite (usually `http://localhost:5173`).

3. Build for production
   ```bash
   npm run build
   ```

4. Preview the production build locally
   ```bash
   npm run preview
   ```

### Frontend Configuration
- The frontend currently calls the backend at `http://localhost:3000`.
- In production, update the base API URL in `client/src/services/api.js` to your deployed backend URL.

---

## 3) Development Workflow
- Start backend in one terminal:
  ```bash
  cd server && node server.js
  ```
- Start frontend in another terminal:
  ```bash
  cd client && npm run dev
  ```
- Open the app at `http://localhost:5173`.

### Key Frontend Files
- `client/src/App.jsx` → App composition (User context, layout)
- `client/src/services/api.js` → API service layer
- `client/src/contexts/UserContext.jsx` → Loads default user
- `client/src/components/CommentList.jsx` → Fetches and renders nested comments
- `client/src/components/Comment.jsx` → Single comment with replies and likes
- `client/src/components/CommentForm.jsx` → Add a top-level comment
- `client/src/components/ReplyForm.jsx` → Add a reply

---

## 4) Troubleshooting

- Server won’t start, or Prisma errors:
  - Ensure `server/.env` has a valid `DATABASE_URL`.
  - Run `cd server && npx prisma generate`.
  - For MongoDB schema sync: `npx prisma db push`.

- Frontend can’t reach the API (CORS or 404):
  - Make sure the API is running on `http://localhost:3000`.
  - Confirm the endpoints listed above respond via curl/Postman.

- Replies not visible / nesting issues:
  - The backend returns nested comments (with `children`). The client uses them as-is.
  - Ensure `GET /comments` includes nested `children` arrays.

- Likes don’t update:
  - Confirm `PATCH /comments/:id/like` returns updated comment with `likes`.

- Production build calling localhost:
  - Update API base URL in `client/src/services/api.js` before deploying.

---

## 5) Deployment Notes (Render example)

- Backend (Web Service):
  - Build Command: `cd server && npm ci && npx prisma generate`
  - Start Command: `cd server && node server.js`
  - Environment:
    - `DATABASE_URL` (required)
    - `PORT` is provided by Render (the server uses it)

- Frontend (Static Site):
  - Build Command: `cd client && npm ci && npm run build`
  - Publish Directory: `client/dist`
  - Ensure `client/src/services/api.js` points to your backend URL.

---

## 6) Sample Requests
```bash
# Get comments
curl http://localhost:3000/comments | jq .

# Post a top-level comment
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world"}' | jq .

# Reply to a comment
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{"text":"A reply","parentId":"<commentId>"}' | jq .

# Like a comment
curl -X PATCH http://localhost:3000/comments/<commentId>/like | jq .
```

---

## License
MIT
