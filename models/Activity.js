import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },

        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Note",
            
        },

        action:{
            type:String,
            enum:[
                "NOTE_CREATED",
                "NOTE_UPDATED",
                "NOTE_DELETED",
                "AI_SUMMARY_GENERATED",
                "AI_TAG_GENERATED",
            ],
            required:true,
            index:true,
        },

        noteId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Note",
            index:true,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.models.Activity || mongoose.model("Activity",ActivitySchema);