import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
        },
        
        password:{
            type:String,
            required:function() {
                // Password is only required if user is not using OAuth
                return !this.provider || this.provider === 'credentials';
            },
        },
        
        provider:{
            type:String,
            enum:["credentials","google","github"],
            default:"credentials",
        },
        
        providerId:{
            type:String,
            sparse:true,
        },

        role:{
            type:String,
            enum:["user","admin"],
            default:"user",
        },

        // User-level application preferences
        preferences: {
            theme: {
                type: String,
                enum: ["light", "dark", "system"],
                default: "light",
            },
            defaultView: {
                type: String,
                enum: ["grid", "list"],
                default: "grid",
            },
            aiAutoTagging: {
                type: Boolean,
                default: true,
            },
            showAISuggestions: {
                type: Boolean,
                default: true,
            },
            spellCheck: {
                type: Boolean,
                default: true,
            },
            includeSummariesInExport: {
                type: Boolean,
                default: true,
            },
        },

    },
    {timestamps:true},
);

export default mongoose.models.User || mongoose.model("User",UserSchema);