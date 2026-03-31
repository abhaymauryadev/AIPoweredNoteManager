# AI-Powered Note Manager

A smart, responsive note-taking application built with Next.js 15+ App Router, featuring a rich text TiPtap editor with AI integrations.

## Features

- **Rich Text Editing**: Powered by [Tiptap](https://tiptap.dev/), providing a seamless block-style editor experience.
- **Dynamic AI Commands**: Trigger AI capabilities directly from the editor using the `/` command.
- **Media Support**: Drag-and-drop or paste images directly into your notes. Images auto-convert to Base64 for instant saving.
- **Smart Formatting**: Fully supported Markdown-like shortcuts and styling (bold, italic, links, lists, blockquotes, and code blocks).
- **Organization**: Group notes by folders/categories and filter them using custom tags.
- **Search & Sort**: Real-time filtering by text content, category, and tags, with sorting by creation or modification date.
- **Authentication**: Secure user login via NextAuth, Google Provider and GitHub Provider.
- **Database**: Integrated with MongoDB for robust, resilient data storage.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS V4 + Tailwind Typography
- **Editor:** Tiptap React
- **Icons:** Lucide React
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth.js

## Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine.
You will also need a MongoDB instance (e.g., MongoDB Atlas) and an authentication secret.

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ai-powered-note-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root of your project and configure the following variables:
   ```env
   # NextAuth Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key

   # Google OAuth (Required for Google Login)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # GitHub OAuth (Required for GitHub Login)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Database Connection (MongoDB)
   MONGODB_URI=mongodb://localhost:27017/ainotemanager # Or your MongoDB Atlas string

   # OpenAI (Required for AI features)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. ## Run the npm Scripts 
These are typical scripts defined inside `package.json`:

- **dev** → Start development server  
- **build** → Create production build  
- **start** → Run production server  
- **test** → Run tests  
- **lint** → Check code quality  
- **format** → Format code  
- **preview** → Preview production build (commonly used in Vite)

5. **Open the App:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

* **Creating Notes:** Click the "New Note" floating button or navigate to `/notes/new`.
* **Editor Commands:** Type `/` in the editor to see available AI commands.
* **Deleting Notes:** Click the Trash icon on the Note Card or the "Delete" button inside an individual Note's page to remove it.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add your MongoDB connection string and NextAuth secret to Vercel's environment variables.
