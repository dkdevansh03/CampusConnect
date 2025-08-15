# CampusConnect Backend

## Quickstart
1. Copy `.env.example` to `.env` and edit values.
2. `npm install`
3. Make sure MongoDB is running locally (default URI in .env).
4. (Optional) Seed an admin: `npm run seed:admin`
5. `npm run dev`

## API Base
All routes are prefixed with `/api`.

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Posts: `/api/posts`
- Comments: `/api/posts/:postId/comments`
- Events: `/api/events`
- Users: `/api/users`
- Uploads: `/api/upload` (accepts images/PDFs)
- Messages: `/api/messages`
