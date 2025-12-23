"use client";

import {useEffect} from "react";


export function useOfflineSync() {
    useEffect(() => {
        
        function handleOnline(){
            console.log("Back online --- sync pending Changes");
        }
        
        function handleOffline(){
            console.log("Offline mode enabled");
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    
}
