import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,

        },

        summary: {
            type: [String],
        },

        tags: {
            type: [String],
            index: true,
        },

        // Soft delete fields
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },

        deletedAt: {
            type: Date,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },

    },
    { timestamps: true },
);

// Full-text search
NoteSchema.index({
    title: "text",
    content: "text",
    tags: "text",

});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
