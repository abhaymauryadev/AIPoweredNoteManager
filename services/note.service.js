import { connectDB } from "../lib/db.js";
import Note from "../models/Note.js";
import Activity from "../models/Activity.js";

export async function getUserNotes(userId) {
  await connectDB();
  return Note.find({ userId }).sort({ updatedAt: -1 });
}

export async function getNoteById(noteId, userId) {
  await connectDB();
  return Note.findOne({ _id: noteId, userId });
}

export async function createNote({ userId, title, content }) {
  await connectDB();

  const note = await Note.create({
    userId,
    title,
    content,
  });

  await Activity.create({
    userId,
    noteId: note._id,
    action: "NOTE_CREATED",
  });

  return note;
}

export async function updateNote(noteId, userId, data) {
  await connectDB();

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    data,
    { new: true }
  );

  if (note) {
    await Activity.create({
      userId,
      noteId,
      action: "NOTE_UPDATED",
    });
  }

  return note;
}

export async function deleteNote(noteId, userId) {
  await connectDB();

  await Note.findOneAndUpdate(
    { _id: noteId, userId },
    { isDeleted: true, deletedAt: new Date() }
  );

  await Activity.create({
    userId,
    noteId,
    action: "NOTE_DELETED",
  });

  return true;
}
