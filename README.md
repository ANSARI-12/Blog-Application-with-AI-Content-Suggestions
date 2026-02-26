# Blog Application

A full-stack blog application with AI-powered suggestions. Built with React (frontend) and Express.js (backend).

## Features

- 📝 Create, read, update, and delete blog posts
- 🤖 AI-powered blog suggestions using GROQ CLOUD
- 🗂️ Organized by title, content, author, and timestamps
- 🎨 Clean and responsive user interface

## Live Deployment
🌐 Frontend (Live App)
👉 https://blog-application-with-ai-content.onrender.com

🔗 Backend API
👉 https://blog-application-with-ai-content-67cv.onrender.com


## Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend

- **Express.js** - Web framework
- **SQLite3** - Database
- **GROQ_CLOUD** - AI suggestions

## Project Structure

```
blog-app/
├── backend/
│   ├── controllers/
│   │   ├── aiController.js      # AI suggestion logic
│   │   └── blogController.js    # Blog CRUD operations
│   ├── db/
│   │   └── blog.db              # SQLite database
│   ├── models/
│   │   └── blogModel.js         # Database model
│   ├── routes/
│   │   └── blogRoutes.js        # API routes
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AiSuggestions.jsx  # AI suggestions component
    │   │   ├── BlogDetail.jsx      # Single blog view
    │   │   ├── BlogList.jsx        # Blog listing
    │   │   └── WriteBlog.jsx       # Create/edit blog
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## API Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/blogs`          | Create a new blog  |
| GET    | `/api/blogs`          | Get all blogs      |
| GET    | `/api/blogs/:id`      | Get a single blog  |
| PUT    | `/api/blogs/:id`      | Update a blog      |
| DELETE | `/api/blogs/:id`      | Delete a blog      |
| POST   | `/api/ai-suggestions` | Get AI suggestions |

## Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm

### Backend Setup

1. Navigate to the backend directory:

```
bash
   cd backend

```

2. Install dependencies:

```
bash
   npm install

```

3. Create a `.env` file in the backend directory:

```
env
   PORT=3000
   GROQ_API_KEY=your_GROQ_api_key_here

```

4. Start the backend server:

```
bash
   npm start

```

The server will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:

```
bash
   cd frontend

```

2. Install dependencies:

```
bash
   npm install

```

3. Start the development server:

```bash
   npm run dev

```

The application will run on http://localhost:5173

## Usage

1. **View Blogs**: The home page displays all blog posts
2. **Create Blog**: Click on "Write Blog" to create a new post
3. **View Details**: Click on any blog to read the full content
4. **Edit/Delete**: Use the options on each blog post to modify or remove
5. **AI Suggestions**: While writing a blog, get AI-powered suggestions for your content

## Environment Variables

### Backend (.env)

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| PORT         | Server port (default: 3000)        |
| GROQ_API_KEY | Groq Cloud API key for AI features |

## License

ISC
