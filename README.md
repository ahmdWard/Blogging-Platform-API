# Blogging Platform API (PostgreSQL)

## Description

This is a blogging platform API implemented using PostgreSQL. It supports CRUD operations for blog posts and allows for searching and filtering based on various criteria.

From [roadmap.sh](https://roadmap.sh/projects/blogging-platform-api)

## Endpoints

### `GET /blogs`
Retrieve all blog posts. Supports search with a query parameter `term`.

**Query Parameters:**
- `term`: The search term for filtering blog posts.

### `GET /blogs/:id`
Retrieve a single blog post by ID.

### `POST /blogs`
Create a new blog post.

**Request Body:**
```json
{
  "title": "String",
  "content": "String",
  "category": "String",
  "tags": ["Array of Strings"]
}
```

### PATCH /blogs/:id

Update an existing blog post by ID.

Request Body:

```json

{
  "title": "String (optional)",
  "content": "String (optional)",
  "category": "String (optional)",
  "tags": ["Array of Strings (optional)"]
}
```

### DELETE /blogs/:id

Delete a blog post by ID.
Database Schema
blogs

- id: SERIAL PRIMARY KEY
- title: TEXT
- content: TEXT
- category: TEXT
- tags: TEXT[]

## Setup

  **Clone the repository and switch to the PostgreSQL branch:**

```bash

git clone <https://github.com/ahmdWard/Blogging-Platform-API.git >
git checkout postgres
```
**Install dependencies:**

```bash

npm install
```

**Set up the PostgreSQL database by running migrations or using an existing database.**

**Update the dbConnections.js file with your PostgreSQL connection details.**

**Start the server:**

```bash

    npm start
```
## Environment Variables

 - DATABASE_URL: PostgreSQL connection string.