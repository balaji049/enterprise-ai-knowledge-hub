# Enterprise AI Knowledge Hub

Enterprise AI Knowledge Hub is a web app that lets people in an organization ask questions about their company documents in plain English and get answers based on what those documents actually say.

Admins upload files like policies, guidelines, and manuals. The app breaks them into searchable pieces, and when someone asks a question, it finds the most relevant pieces and hands them to a language model to write the answer. Because the answer comes from the company's own documents, it is far more useful than a generic chatbot reply.

Live demo: https://enterprise-ai-knowledge-hub-client.onrender.com
Source code: https://github.com/balaji049/enterprise-ai-knowledge-hub

---

## Why I built it

In most organizations, the answer to a simple question like "what is the leave policy?" sits somewhere inside a long document that nobody wants to open. Keyword search helps a little, but it only matches exact words and misses the meaning behind a question. A general AI assistant is not the fix either, since it knows nothing about internal documents and can confidently make things up.

This project tries to fix both problems by using Retrieval-Augmented Generation (RAG). The model only answers after it has been shown the relevant parts of the company's own files.

---

## Features

**Login and access control**
Users sign in with JWT-based authentication, and passwords are hashed with bcrypt. Routes are protected on the backend, and what a person can see depends on their role and department.

**Employee management**
Department admins can add, view, update, and delete employee records for their department.

**Document management**
Admins can upload documents, view them, delete them, and tie each one to a department. Each document is indexed after upload so it becomes searchable.

**Ask AI**
Users type a question, and the system finds relevant document chunks, sends them to the language model, and returns an answer along with source information when it is available. Conversations and their messages are saved, so past chats can be opened again.

**Department-based knowledge**
Documents belong to departments, and retrieval is filtered by department on the server side. This matters because filtering only in the frontend would not be real access control.

**Dashboard**
A simple overview page for admins with employee and document information.

---

## Tech stack

| Area | Tools |
|------|-------|
| Frontend | React, React Router, Axios, CSS Modules, Lucide React |
| Backend | Node.js, Express |
| Application database | MongoDB with Mongoose |
| Auth | JWT, bcrypt |
| AI service | Python, FastAPI |
| Vector database | ChromaDB |
| Embedding model | BAAI/bge-small-en-v1.5 (Sentence Transformers) |
| LLM | Groq API, called through the OpenAI Python SDK |

---

## How it works

The project is split into three parts that talk to each other.

1. **React client** handles the interface: login, dashboard, employees, documents, and the Ask AI page.
2. **Node and Express server** handles REST APIs, authentication, authorization, and MongoDB. It is also the only thing that talks to the AI service, so the frontend never calls it directly.
3. **Python FastAPI service** handles everything related to AI: reading documents, chunking, embeddings, searching ChromaDB, and calling the language model.

MongoDB and ChromaDB each do a different job. MongoDB stores the normal app data: users, employees, departments, document records, conversations, and messages. ChromaDB stores the embeddings, the text chunks, and metadata like department, document name, and page number, so the app can search by meaning.

### What happens when a document is uploaded

1. An admin uploads a file from the Documents page.
2. The Node server receives it and saves the document record in MongoDB.
3. The Python service extracts the text and cleans it up.
4. The text is split into smaller chunks.
5. Each chunk is turned into an embedding with the Sentence Transformers model.
6. The embeddings and metadata are stored in ChromaDB.
7. Once indexing finishes, the document can be searched.

Chunking is what makes answers precise. Searching small sections means the model sees the relevant paragraph and not an entire document.

### What happens when someone asks a question

1. The user sends a question from the Ask AI page.
2. The Node server checks the user and their department.
3. The question and department are forwarded to the Python service.
4. The question is converted into an embedding.
5. ChromaDB returns the most similar chunks for that department.
6. Those chunks and the question are sent to the Groq API.
7. The model writes an answer using only that context.
8. The server saves the question and answer, then returns them to the frontend with the sources.

---

## Roles

**Department Admin**
Manages employees and documents for their own department, uses the AI assistant, and can see the dashboard and settings available to them.

**Employee**
Asks questions through the assistant, reads the answers, and can open earlier conversations. Employees only get answers from documents their department is allowed to see.

A Super Admin role for managing several departments at once is planned for later and is not part of the current version.

---

## API overview

| Route | What it does |
|-------|--------------|
| `/api/auth` | Login and authentication |
| `/api/dashboard` | Dashboard data |
| `/api/documents` | Document upload and management |
| `/api/employees` | Employee management |
| `/api/departments` | Department information |
| `/api/chat` | Ask AI questions |
| `/api/health` | Simple health check |

Example request to the chat endpoint:

```http
POST /api/chat
```

```json
{
  "conversationId": "CONVERSATION_ID",
  "question": "What is the leave policy?"
}
```

The response contains the generated answer and a list of sources. The server picks up the user's department from their login, so the client never has to send it.

---

## Project structure

```
enterprise-ai-knowledge-hub/
  client/       React frontend
  server/       Node and Express backend
  python-ai/    FastAPI service, embeddings, ChromaDB
  README.md
```

---

## Running it locally

You will need Node.js, npm, Python 3.10 or newer, Git, a MongoDB connection (a free Atlas cluster is enough), and a Groq API key. You will run three things in three terminals.

**1. Clone the repository**

```bash
git clone https://github.com/balaji049/enterprise-ai-knowledge-hub.git
cd enterprise-ai-knowledge-hub
```

**2. Start the Python AI service**

```bash
cd python-ai
python -m venv venv
```

Activate the environment. On Windows:

```bash
venv\Scripts\activate
```

On Linux or macOS:

```bash
source venv/bin/activate
```

Then install and run:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Create a `.env` file inside `python-ai`:

```
GROQ_API_KEY=your_groq_api_key
```

**3. Start the backend**

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside `server`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
PYTHON_AI_URL=http://127.0.0.1:8000
```

**4. Start the frontend**

```bash
cd client
npm install
npm start
```

If the client uses Vite, run `npm run dev` instead. The frontend expects the backend API at `http://localhost:5000/api`, which you can change in the API config file.

Keep all `.env` files out of Git.

---

## Security notes

- Passwords are hashed with bcrypt and never stored as plain text.
- Routes are protected with JWT and role checks.
- Department filtering happens on the backend and in the retrieval step, not only in the UI.
- API keys and secrets live in environment variables.
- Requests are validated on the server.

---

## Limitations

- Answer quality depends on how good the uploaded documents are and how well retrieval finds the right chunks.
- Scanned documents need OCR, which is not supported yet.
- Responses depend on the Groq API, so speed and cost depend on that service.
- Very large document collections will need more storage and a scaled vector database setup.
- Complex or vague questions may need further tuning of chunking and retrieval.

---

## Ideas for later

- Super Admin dashboard for managing multiple departments
- Hybrid search that combines semantic and keyword matching
- A reranking step to improve retrieval accuracy
- Support for more file types and OCR for scanned files
- Multilingual question answering
- Better citations with highlighted source text
- Usage analytics and audit logs
- Fine-grained permissions for individual documents

---

## References

1. React: https://react.dev/
2. Node.js: https://nodejs.org/docs/
3. Express: https://expressjs.com/
4. MongoDB: https://www.mongodb.com/docs/
5. FastAPI: https://fastapi.tiangolo.com/
6. ChromaDB: https://docs.trychroma.com/
7. Sentence Transformers: https://sbert.net/
8. Groq: https://console.groq.com/docs
9. Original RAG paper: https://arxiv.org/abs/2005.11401

---

## Author

Balaji Bhairwad
GitHub: https://github.com/balaji049
LinkedIn: https://linkedin.com/in/balaji-bhairwad/
Email: 049balaji@gmail.com

Built as a B.Tech final-year major project.
