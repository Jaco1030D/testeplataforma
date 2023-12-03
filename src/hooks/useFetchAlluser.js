import { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import { collection, query, orderBy, onSnapshot,where } from "firebase/firestore";

//para buscar varios
export const useFetchAllUser = (docCollection, search = null, uid = null) => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData(){
            if (cancelled) return

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
                    //Para mostrar todos os documentos do usuario logado
                    console.log('ta aqui');
                    q = await query(collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc"))
                        console.log(q);

                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))

                }
                
                await onSnapshot(q, (querySnapshot) =>{
                    setUsers(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
                 
            } catch (error) {
                setError(error.message)
                
                setLoading(false)
            }
        }
        loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() =>{
        return () => setCancelled(true)
    }, [])

    return {users, loading, error}
}