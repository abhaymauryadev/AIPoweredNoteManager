import Note from "../models/Note.js";

export async function searchNotes(userId, query){

    if (!query) return [];

    return await Note.find(
        {
        userId,
        $text: { $search: query },
        },

        {score: { $meta: "textScore" }}
    )
    .sort({ score: { $meta: "textScore" } })
    
}