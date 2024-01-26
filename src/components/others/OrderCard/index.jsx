import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import axios from 'axios';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';

const SmallRectangle = ({ withBorder, title, showDropdown, text, finalized = false, handleDonwload, arrayOriginArchives }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
  
    const handleMouseEnter = () => {
      setDropdownVisible(true);
    };
  
    const handleMouseLeave = () => {
      setDropdownVisible(false);
    };

    const handleClcik = async (array) => {
      setDropdownVisible(!isDropdownVisible)
      await handleDonwload(array)

    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div
        className={`small-rectangle ${withBorder ? 'with-border' : ''}`}
        ref={dropdownRef}
      >
        <div className={`content-test ${showDropdown && isDropdownVisible ? 'with-dropdown' : ''}`}>
          <span>{title}</span>
        </div>
        <div className="white-part">
          {showDropdown && isDropdownVisible && (
            <div className="dropdown">
              <div onClick={() => handleClcik(arrayOriginArchives)}>Download arquivos originais</div>
              {finalized && <div>Download dos arquivos traduzidos</div>}
            </div>
          )}
          {showDropdown && (
              <div className="button-arquivos" onClick={() => setDropdownVisible(!isDropdownVisible)}>
              Download
              </div>
          )}
          {!showDropdown && <span>{text}</span>}
        </div>
      </div>
    );
  };
const OrderCard = ({order}) => {
  const [status, setStatus] = useState()
  const {updateDocument} = useUpdateDocument("archives")

    const rectangles = [
        { withBorder: true, title: 'Número do projeto', text: order.numOrder },
        { withBorder: false, title: 'Par de idiomas', text: <div><p>{order.languageSetings.origin} &gt; <br/> {order.languageSetings.translation[0]}</p></div> },
        { withBorder: true, title: 'Tipo', text: <div><p className='typeService'>{order.typeService}</p><p className='numWords'>{order.numWords} palavras</p></div> },
        { withBorder: false, title: 'Arquivos', showDropdown: true, text: '', finalized: order?.finalized, arrayOriginArchives: order.archivesURL },
        { withBorder: true, title: 'Entrega', text: `${order.finalDate}h`},
        { withBorder: false, title: 'Área', text: order.archiveType },
        { withBorder: false, title: 'Status', text: status },
        { withBorder: true, title: 'Valor', text: <div><p className='typeService'>EUR</p><p className='numWords'>{order.value}</p></div> },
      ];
    const getAPIInfos = async () => {
        const response = await axios.post("/.netlify/functions/api", {
            id_payment: order.paymentInfos.id_payment
          })

          return response.data
    }
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
        handleDownload(element.downloadArchive, element.fileName)
      });
    }
      useEffect(() => {

        if (order.paymentInfos.status === 'succeeded' && !order.finalized) {

          setStatus(<div className='status-actual in-progress' >Em andamento</div>)

        } else if(order.paymentInfos.status === 'succeeded' && order.finalized) {

        } else {
          getAPIInfos().then(res => {
            if (res.status === 'succeeded') {
              setStatus(<div className='status-actual in-progress' >Em andamento</div>)

              updateDocument(order.id, {paymentInfos: {...order.paymentInfos, status: 'succeeded'}})
            } else {
              setStatus(<div className='status-actual button-start'>Iniciar</div>)
            }
          })
        }
        
      },[])

    
      return (
        <div className="container-test">
          {rectangles.map((rectangle, index) => (
            <SmallRectangle
              key={index}
              withBorder={rectangle.withBorder}
              title={rectangle.title}
              showDropdown={rectangle.showDropdown}
              text={rectangle.text}
              finalized = {rectangle.finalized}
              arrayOriginArchives = {rectangle.arrayOriginArchives}
              handleDonwload={multipleDownload}
            />
          ))}
          <div className="large-rectangle">
            {/* Content for the large rectangle */}
          </div>
        </div>
      );
}

export default OrderCard