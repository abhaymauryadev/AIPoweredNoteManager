import {create} from "zustand";
export const useNoteStore  = create((set)=>({
    notes: [],
    activeNote: null,
    loading: false,

    setNotes:(notes) => set({notes}),

    setActiveNote:(note) => set({activeNote:note}),

    addNote:(note)=>{
        set((state)=>({
            notes:[note,...state.notes],
        }));
    },

    updateNote:(updatedNote)=>{
        set((state)=>({
            notes:state.notes.map((note)=>
                note._id === updatedNote._id ? updatedNote : note
            ),

            activeNote:
            state.activeNote?._id === updatedNote._id
            ? updatedNote
            : state.activeNote,

        }));
    },

    deleteNote:(id) =>{
        set((state)=>({
            notes:state.notes.filter((note)=>note._id !== id),
            activeNote:
            state.activeNote?._id === id ? null : state.activeNote,
        }));
    },

    setLoading:(loading) => set({loading}),
    
}));