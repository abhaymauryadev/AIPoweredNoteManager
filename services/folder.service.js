import { connectDB } from "../lib/db.js";
import Folder from "../models/Folder.js";

export async function getFolders(userId) {
  await connectDB();
  return Folder.find({ userId }).sort({ name: 1 });
}

export async function createFolder(userId, name) {
  await connectDB();

  return Folder.create({
    userId,
    name,
  });
}
