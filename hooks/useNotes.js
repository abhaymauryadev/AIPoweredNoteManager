"use client";

import {useState, useEffect} from "react";

export function usNotes(){
    const [notes, setNotes] = useState([]);
    const [loading, setLoading]  = useState([]);

    async function fetchNotes(){
        setLoading(true);
        const res = fetch("api/notes");
        const data = (await res).json();
        setNotes(data);
        setLoading(false);
        }   

        async function createNote(note) {
            const  res = await fetch("api/notes",{
                method:"POST",
                body:JSON.stringify(note),

            });

            const newNote = await res.json();
            setNotes(prev => [newNote, ...prev]);
            
        }

        async function deleteNote(id){
            await fetch(`api/notes/${id}`, {
                method:"DELETE"
            });
            
            setNotes(prev => prev.filter(n => n.id !== id));
        }

        useEffect(() => {
            fetchNotes();
        }, []);


        return {
            notes,
            loading,
            createNote,
            deleteNote,
            refetch:fetchNotes,
        };
    

}