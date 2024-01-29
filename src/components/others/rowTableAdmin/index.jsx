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
    const archivesTotal = order.languageSetings.translation.length * order.names.length

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

        for (let index = 0; index < files.length; index++) {

            const downloadArchive = await insertFiles(files[index])

            arrayArchive.push({downloadArchive, fileName: files[index].name})
            
        }

        updateDocument(order.id, {archivesTranslated: arrayArchive, finalized: true})

        axios.post("/.netlify/functions/sendEmail", {
            name: order.user.displayName,
            email: order.user.email,
            order,
            fromUser: true,
            finalized: true
        })

        handleClose()

    }

    const handleFileChange = (e) => {
        setMessageError("")
        const files = e.target.files
        console.log(files);
        if (archivesTotal < files.length) {
            setMessageError("Coloque apenas " + archivesTotal + " arquivo");
            e.target.value = ""
        }
        setFiles(files)
        
    }

  return (
        <tr>
            <td>{order.numOrder}</td>
            <td>{order.archivesURL.length}</td>
            <td>{order.user?.displayName}</td>
            <td>{order.user?.email}</td>
            {
                order.paymentInfos.statusPayment === 'unpaid'
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
                        <td>{order.paymentInfos.datePayment}</td>
                        <td>{order.paymentInfos.dateDelivery}</td>
                    </>
                )
            }
            <td>{order.languageSetings.origin}</td>
            <td>{order.languageSetings.translation.length} idioma(s)</td>
            <td>{order.value}</td>
            <td>{order?.finalized ? 'Entregue' : order.paymentInfos.status}</td>
            <button onClick={handleOpen} disabled={order.paymentInfos.statusPayment === 'unpaid'}>Informações do arquivo</button>
            <Modal
            open={open}
            onClose={handleClose}            
            >
                <div className='modal'>
                    {order.id}
                    possui {order.names.length} arquivos <br />
                    {order.languageSetings.origin}
                    <br />
                    {order.languageSetings.translation}
                    <br />
                    {order.numPages}
                    <br />
                    {order.numWords}
                    <br />
                    <p>Arquivos para tradução</p>
                    <div className='archives_download' >
                    {order.archivesURL.map((item, index) => (

                    <p key={index} onClick={() => handleDownload(item.downloadArchive, item.fileName)} style={{cursor: 'pointer', color: 'blue'}}>{item.fileName}</p>
                    ))}

                    </div>
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
                    {!order?.archivesTranslated && <button onClick={handleClick} disabled={archivesTotal !== files?.length}>Entregar</button>}
                </div>
            </Modal>
        </tr>

  )
}

export default RowTableAdmin