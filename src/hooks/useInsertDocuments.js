import { useEffect, useReducer, useState } from "react";
import {db, storage} from '../firebase/Config'
import 'firebase/storage';
import { collection, addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

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

    const insertFiles = async(file, progressCallback) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {

            const storageRef = ref(storage, file.name)

            const uploadTask = uploadBytesResumable(storageRef, file)

            // storageRef.on(`state_changed`, (snapshot) => {
            // })

            uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressCallback(progress)
                        console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                        // Handle unsuccessful uploads
                    }
            )
            

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
            const collectionDoc = collection(db, docCollection)
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertDocument = await addDoc(
                collectionDoc,
                newDocument
            )

            console.log(insertDocument.id);

            // const insertDocument = await db.collection(docCollection).add({
            //     newDocument
            // })

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertDocument,
            })

            return insertDocument.id

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
            console.log(error);
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {insertDocument, insertFiles, response}
}