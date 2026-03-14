# AI-Powered Note Manager

A smart, responsive note-taking application built with Next.js 15+ App Router, featuring a rich text TiPtap editor with AI integrations.

## Features

- **Rich Text Editing**: Powered by [Tiptap](https://tiptap.dev/), providing a seamless block-style editor experience.
- **Dynamic AI Commands**: Trigger AI capabilities directly from the editor using the `/` command.
- **Media Support**: Drag-and-drop or paste images directly into your notes. Images auto-convert to Base64 for instant saving.
- **Smart Formatting**: Fully supported Markdown-like shortcuts and styling (bold, italic, links, lists, blockquotes, and code blocks).
- **Organization**: Group notes by folders/categories and filter them using custom tags.
- **Search & Sort**: Real-time filtering by text content, category, and tags, with sorting by creation or modification date.
- **Authentication**: Secure user login via NextAuth.
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
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

* **Creating Notes:** Click the "New Note" floating button or navigate to `/notes/new`.
* **Editor Commands:** Type `/` in the editor to see available AI commands.
* **Deleting Notes:** Click the Trash icon on the Note Card or the "Delete" button inside an individual Note's page to remove it.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to add your MongoDB connection string and NextAuth secret to Vercel's environment variables.
