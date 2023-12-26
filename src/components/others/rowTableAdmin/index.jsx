import React, { useCallback, useEffect, useState } from 'react'
import { useUpdateDocument } from '../../../hooks/useUpdateDocument'
import Modal from '@mui/material/Modal';
import './style.css'
import { getUser } from '../../../hooks/useCalculateValue';
import { useInsertDocuments } from '../../../hooks/useInsertDocuments';
import axios from 'axios';

const RowTableAdmin = ({order}) => {
    console.log(order);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([])
    const [user, setUser] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [messageError, setMessageError] = useState()
    const {updateDocument} = useUpdateDocument("archives")
    const { insertFiles, response} = useInsertDocuments("archives")

    const handleDownload = async (downloadURL, fileName) => {
        const response = await axios.get(downloadURL, { responseType: 'blob' })
    
        console.log(response);
    
        const blobUrl = URL.createObjectURL(response.data);
    
        const link = document.createElement('a');
    
        link.href = blobUrl;
    
        link.download = fileName || order.file;
    
        document.body.appendChild(link);
    
        link.click();
    
        document.body.removeChild(link);
      }


    const handleClick = async () => {
        const arrayArchive = []

        console.log(files);

        for (let index = 0; index < files.length; index++) {

            const downloadArchive = await insertFiles(files[index])

            arrayArchive.push({downloadArchive, fileName: files[index].name})
            
        }

        updateDocument(order.id, {archivesTranslated: arrayArchive, finalized: true})

        handleClose()

    }

    const handleFileChange = (e) => {
        setMessageError("")
        const files = e.target.files
        console.log(files);
        if (order.language_translation.length < files.length) {
            setMessageError("Coloque apenas " + order.language_translation.length + " arquivo");
            e.target.value = ""
        }
        setFiles(files)
        
    }

    const handleLoadUser = useCallback(async (uid) => {

        const response = await getUser(uid)

        console.log(response.data.user);

        setUser(response.data.user)

    }, [])

    useEffect(() => {
       handleLoadUser(order.uid)

    },[handleLoadUser, order.uid])

  return (
        <tr>
            <td>{order.numOrder}</td>
            <td>{order.file}</td>
            <td><p style={{cursor: 'pointer', color: 'blue'}} onClick={() => handleDownload(order.archivelink)} >Link</p></td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            {
                order.statusPayment === 'unpaid'
                ?
                (
                    <>
                        <td>Não pago</td>
                        <td>Não pago</td>
                    </>
                )
                : 
                (
                    <>
                        <td>{order.initialDate.toLocaleString()}</td>
                        <td>{order.finalDate.toLocaleString()}</td>
                    </>
                )
            }
            <td>{order.language_origin}</td>
            <td>{order.language_translation.length} idioma(s)</td>
            <td>{order.value}</td>
            <td>{order?.finalized ? 'Entregue' : order.statusPayment}</td>
            <button onClick={handleOpen} disabled={order.statusPayment === 'unpaid'}>Informações do arquivo</button>
            <Modal
            open={open}
            onClose={handleClose}            
            >
                <div className='modal'>
                    {order.language_origin}
                    <br />
                    {order.language_translation}
                    <br />
                    {order.numPages}
                    <br />
                    {order.numWords}
                    <br />
                    {order?.archivesTranslated ? (
                        <div>
                            <p>Já entregue:</p>
                            {order.archivesTranslated.map(item => (
                                <p style={{cursor: 'pointer', color: 'blue'}} onClick={() => handleDownload(item.downloadArchive, item.fileName) } >{item.fileName}</p>
                            ))}
                        </div>
                    ) : <input type="file" onChange={handleFileChange} multiple />}
                    <br />
                    {response.loading && <p>Fazendo upload de arquivos...</p>}
                    {messageError && <p>{messageError}</p>}
                    <button onClick={handleClose}>Cancelar</button>
                    {!order?.archivesTranslated && <button onClick={handleClick} disabled={order.language_translation.length !== files?.length}>Entregar</button>}
                </div>
            </Modal>
        </tr>

  )
}

export default RowTableAdmin