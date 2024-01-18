import { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

//para mostar individualmente os arquivos
export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const collectionRef = collection(db, docCollection)

    useEffect(() => {

        async function loadDocument(){
            console.log("sendo chamado");
            if (cancelled) return

            setLoading(true)
            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }

            
        }
        onSnapshot(collectionRef, (snapshot) => { 
            loadDocument()
          })
        loadDocument()
    }, [docCollection, cancelled, id, collectionRef])

    useEffect(() =>{
        return () => setCancelled(true)
    }, [])

    return {document, loading, error}
}