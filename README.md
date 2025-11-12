## 🚀 Getting Started

### 1. Install Dependencies

```sh
bun install
```

### 2. Run the Development Server

```sh
bun run dev
```

Once running, visit [http://localhost:3000](http://localhost:3000) in your browser.

---
> #### 🛠️ **Environment Variables**  
> Copy the following block into your `.env` file and fill in your environment details:
>
> ```env
> # --- 🔗 Database ---
> MONGODB_URI=
>
> # --- ☁️ AWS S3 Storage ---
> AWS_ACCESS_KEY_ID=
> AWS_SECRET_ACCESS_KEY=
> AWS_ENDPOINT_URL_S3=https://t3.storage.dev
> AWS_ENDPOINT_URL_IAM=
> AWS_REGION=auto
>
> # --- 🪣 S3 Bucket ---
> AWS_BUCKET_NAME=
> ```


## 🛣️ API Routes Overview

<details>
<summary>🔐 <strong>Admin</strong> <code>/api/admin</code></summary>

- `POST   /create` — Create an admin
- `POST   /login` — Login as admin
- `GET    /getOne/:id` — Get admin by ID
- `PUT    /update/:id` — Update admin
- `DELETE /delete/:id` — Delete admin

</details>

<details>
<summary>📝 <strong>Content</strong> <code>/api/content</code></summary>

- `POST   /create` — Create content
- `GET    /getOne/:id` — Get content by ID
- `PUT    /update/:id` — Update content
- `DELETE /delete/:id` — Delete content

</details>

<details>
<summary>☁️ <strong>Upload</strong> <code>/api/upload</code></summary>

- `POST   /generate` — Generate S3 pre-signed URL

</details>

<details>
<summary>📦 <strong>Resource</strong> <code>/api/resource</code></summary>

- `POST   /create` — Create resource
- `GET    /getAll?limit=&skip=` — Get all resources (paginated)
- `GET    /getOne/:id` — Get resource by ID
- `GET    /search?q=` — Search resources
- `PUT    /update/:id` — Update resource
- `DELETE /delete/:id` — Delete resource

</details>

<details>
<summary>🎥 <strong>Meeting</strong> <code>/api/meeting</code></summary>

- `POST   /create` — Create meeting
- `GET    /latest` ⭐ — Get latest active meeting
- `GET    /getAll?limit=&skip=&includeInactive=` — Get all meetings
- `GET    /getOne/:id` — Get meeting by ID
- `PUT    /update/:id` — Update meeting
- `DELETE /delete/:id` — Delete meeting
- `PATCH  /activate/:id` — Activate meeting
- `PATCH  /deactivate/:id` — Deactivate meeting

</details>
