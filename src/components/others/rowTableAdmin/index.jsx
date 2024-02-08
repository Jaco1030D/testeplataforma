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
    const { insertFilesAdmin, response} = useInsertDocuments("archives")
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
    
      const multipleDownload = async (array) => {
        array.forEach(element => {
          handleDownload(element.downloadArchive, element.name)
        });
      }


      const progressCallback = (value) => {

      }
    const handleClick = async () => {
       try {
        const arrayArchive = []
        const namesTranslated = []

        for (let index = 0; index < files.length; index++) {

            const downloadArchive = await insertFilesAdmin(files[index])

            arrayArchive.push({downloadArchive, name: files[index].name})
            namesTranslated.push(files[index].name)
            
        }

        updateDocument(order.id, {archivesTranslated: arrayArchive, finalized: true, namesTranslated})

        axios.post("/.netlify/functions/sendEmail", {
            name: order.user.displayName,
            email: order.user.email,
            order,
            fromUser: true,
            finalized: true
        })
       } catch (error) {
        console.log(error);
       }

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
                order.paymentInfos.status === 'requires_payment_method'
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
                        <td>{order.initialDate}</td>
                        <td>{order.finalDate}h</td>
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

                    <p key={index} onClick={() => handleDownload(item.downloadArchive, item.name)} style={{cursor: 'pointer', color: 'blue'}}>{item?.name}</p>
                    ))}
                    <button onClick={() => multipleDownload(order.archivesURL)}>Baixar todos</button>
                    </div>
                    {order?.archivesTranslated && (
                        <div>
                            <p>Já entregue:</p>
                            {order.archivesTranslated.map(item => (
                                <p style={{cursor: 'pointer', color: 'blue'}} onClick={() => handleDownload(item.downloadArchive, item.name) } >{item.name}</p>
                            ))}
                        </div>
                    )}
                    <br />
                    <input type="file" onChange={handleFileChange} multiple />
                    <br />
                    {response.loading && <p>Fazendo upload de arquivos...</p>}
                    {messageError && <p>{messageError}</p>}
                    <button onClick={handleClose}>Cancelar</button>
                    {!order?.archivesTranslated ? <button onClick={handleClick} disabled={archivesTotal !== files?.length}>Entregar</button>: <button onClick={handleClick} disabled={archivesTotal !== files?.length}>Entregar Novamente</button>}
                </div>
            </Modal>
        </tr>

  )
}

export default RowTableAdmin