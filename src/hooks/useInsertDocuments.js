import { useEffect, useReducer, useState } from "react";
import {db, storage} from '../firebase/Config'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const initialstate = {
    loading: null,
    error: null
}
const insertReducer = (state, action) =>{
    switch (action.type) {
        case "LOADING":
            return {loading: true, error:null}
        case "INSERTED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error:action.payload}
        default:
            return state
    }
}

export const useInsertDocuments = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialstate)
    
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) =>{
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertFiles = async(file) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {

            const storageRef = ref(storage, file.name)

            await uploadBytes(storageRef, file)

            const downloadURL = await getDownloadURL(storageRef);
            
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
            })
            
            return downloadURL

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }
    const insertDocument = async(document) =>{
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
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

    return {insertDocument, insertFiles, response}
}