## Getting Started

Welcome! Here’s how you can set up and start developing.

### Installation

First things first: you’ll need the project dependencies.

```sh
bun install
```

### Start the Development Server

Spin up the dev server with:

```sh
bun run dev
```

After it starts, visit [http://localhost:3000](http://localhost:3000) to see the app running.

---

### Environment Variables Setup

Copy the block below into your `.env` file and replace the values as needed:

```env
# MongoDB connection
MONGODB_URI=

# AWS S3 credentials and endpoints
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_ENDPOINT_URL_S3=https://t3.storage.dev
AWS_ENDPOINT_URL_IAM=
AWS_REGION=auto

# S3 bucket to use
AWS_BUCKET_NAME=
```

---

## API Reference

Each endpoint below includes required inputs and a sample body where needed.

---

<details>
<summary>🔐 <strong>Admin API</strong> <code>/api/admin</code></summary>

#### `POST /create`  
Create a new admin user.

**Body:**  
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "name": "string (optional)"
}
```

---

#### `POST /login`  
Authenticate as an admin.

**Body:**  
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

---

#### `GET /getOne/:id`  
Fetch admin details by their unique ID.

---

#### `PUT /update/:id`  
Update admin details.

**Body:**  
```json
{
  "email": "string (optional)",
  "password": "string (optional)",
  "name": "string (optional)"
}
```

---

#### `DELETE /delete/:id`  
Remove an admin by ID.

</details>

---

<details>
<summary>📝 <strong>Content API</strong> <code>/api/content</code></summary>

#### `POST /create`  
Create new content.

**Body:**  
```json
{
  "title": "string (required)",
  "body": "string (required)",
  "tags": ["string", "..."] // optional
}
```

---

#### `GET /getOne/:id`  
Get content by its ID.

---

#### `PUT /update/:id`  
Update content by ID.

**Body:**  
```json
{
  "title": "string (optional)",
  "body": "string (optional)",
  "tags": ["string", "..."] // optional
}
```

---

#### `DELETE /delete/:id`  
Delete content.

</details>

---

<details>
<summary>☁️ <strong>Upload API</strong> <code>/api/upload</code></summary>

#### `POST /generate`  
Generate a pre-signed S3 upload URL.

**Body:**  
```json
{
  "filename": "string (required)",
  "mimeType": "string (required)"
}
```

**Response:**  
```json
{
  "url": "string (S3 presigned URL)",
  "fields": { /* form fields for direct S3 upload */ }
}
```

</details>

---

<details>
<summary>📦 <strong>Resource API</strong> <code>/api/resource</code></summary>

#### `POST /create`  
Create a new resource.

**Body:**  
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "type": "string (optional)",
  "tags": ["string", "..."] // optional,
  "data": {} // freeform object for resource details
}
```

---

#### `GET /getAll?limit=10&skip=0`  
List resources, paginated.

---

#### `GET /getOne/:id`  
Get a resource by its ID.

---

#### `GET /search?q=term`  
Search resources by keyword.

---

#### `PUT /update/:id`  
Update a resource.

**Body:**  
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "type": "string (optional)",
  "tags": ["string", "..."] // optional,
  "data": {} // optional
}
```

---

#### `DELETE /delete/:id`  
Delete a resource.

</details>

---

<details>
<summary>🎥 <strong>Meeting API</strong> <code>/api/meeting</code></summary>

#### `POST /create`  
Create a new meeting.

**Body:**  
```json
{
  "topic": "string (required)",
  "startTime": "ISO8601 string (required)",
  "endTime": "ISO8601 string (optional)",
  "participants": ["string (userId)", "..."] // optional
}
```

---

#### `GET /latest`  
Get the latest active meeting.

---

#### `GET /getAll?limit=10&skip=0&includeInactive=true`  
List meetings (pagination & optional inclusion of inactive records).

---

#### `GET /getOne/:id`  
Get meeting details by its ID.

---

#### `PUT /update/:id`  
Update a meeting.

**Body:**  
```json
{
  "topic": "string (optional)",
  "startTime": "ISO8601 string (optional)",
  "endTime": "ISO8601 string (optional)",
  "participants": ["string", "..."] // optional
}
```

---

#### `DELETE /delete/:id`  
Delete a meeting.

---

#### `PATCH /activate/:id`  
Set meeting as active.

---

#### `PATCH /deactivate/:id`  
Set meeting as inactive.

</details>

