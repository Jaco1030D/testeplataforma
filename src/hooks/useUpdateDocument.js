import { useEffect, useReducer, useState } from "react";
import {db} from '../firebase/Config'
import { updateDoc, doc } from "firebase/firestore";

const initialstate = {
    loading: null,
    error: null
}
const updateReducer = (state, action) =>{
    switch (action.type) {
        case "LOADING":
            
            return {loading: true, error:null}
        case "UPDATE_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error:action.payload}
        default:
            return state
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialstate)
    
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) =>{
        if (!cancelled) {
            dispatch(action)
        }
    }

    const updateDocument = async(id, dat) =>{
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {
            const docref = await doc(db, docCollection, id)
            const updateDocument = await updateDoc(docref, dat)

            checkCancelBeforeDispatch({
                type: "UPDATE_DOC",
                payload: updateDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {updateDocument, response}
}