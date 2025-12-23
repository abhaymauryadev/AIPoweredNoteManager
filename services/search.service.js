import {connectDB} from "../lib/db.js";
import Note from "../models/Note.js";


export async function searchNotes(userId, query){
    if (!query) return [];

    await connectDB();

    return Note.find(
        {
            userId,
            $text:{$search:query},
        },

        {
            score:{$meta:"textScore"}
        },

    ).sort({
        score:{$meta:"textScore"}
    });
}