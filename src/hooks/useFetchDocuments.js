import { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import { collection, query, orderBy, onSnapshot,where, limit } from "firebase/firestore";

//para buscar varios
export const useFetchDocuments = (docCollection, search = null, uid = null, admin = false, onlyLast = false, limitValue = 0) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData(){
            if (cancelled && admin === false) return
            setLoading(true)

            const collectionRef = await collection(db, docCollection)
            try {
                let q
                if (search) {
                    //caso venha parametro de buscas
                    q = await query(collectionRef,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc"))

                }else if(uid){
                    q = await query(collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc"))
                        console.log(q);

                } else if(onlyLast) {
                    q = await query(collectionRef, orderBy("createdAt", "desc"), limit(1))

                } else if(limitValue) {
                    q = await query(collectionRef, orderBy("createdAt", "desc"), limit(limitValue))

                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }
                
                await onSnapshot(q, (querySnapshot) =>{
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
                 
            } catch (error) {
                console.log(error);
                setError(error.message)
                
                setLoading(false)
            }
        }
        loadData()
    }, [docCollection, search, uid, cancelled, onlyLast, admin, limitValue])

    useEffect(() =>{
        return () => setCancelled(true)
    }, [])

    return {documents, loading, error}
}