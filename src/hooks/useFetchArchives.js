import { useEffect, useState } from 'react'
import {storage} from '../firebase/Config'
import { getDownloadURL, ref } from 'firebase/storage'

export const useFetchArchives = (fileName) => {
    const [archive, setArchive] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadArchive(){
            if (cancelled) return

            setLoading(true)
            try {

                const storageRef = ref(storage, fileName)

                const downloadURL = await getDownloadURL(storageRef);

                setArchive(downloadURL)

                setLoading(false)

            } catch (error) {

                setError(error.message)

                setLoading(false)

            }

            
        }
        loadArchive()
    }, [cancelled, fileName])

    useEffect(() =>{
        return () => setCancelled(true)
    }, [])

    return {archive, loading, error}
}