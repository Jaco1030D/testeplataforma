import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import './style.css';
import LanguageValue from '../languageValue'
import { ThemeProvider, createTheme } from '@mui/material';
import Button from '../Button';

const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

const Values = ({value, setValue, languageCombinations, setLanguageCombinations}) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleAccordionChange = (index) => {
      setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

  return (
    <div className='value-box'>
        <ThemeProvider theme={theme}>

            <div className='value-per-word-default'>
                <p>Valor padrão por palavras:</p>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button text={'Mudar preço por linguagem'} handleClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='modal'>
                    <div className="languages">
                        {languageCombinations.map((languagesGroups, index) => (
                          <div key={index}>
                            <Accordion expanded={expandedIndex === index} onChange={() => handleAccordionChange(index)}>
                              <AccordionSummary>
                                <p>{languagesGroups[0].origin}</p>
                              </AccordionSummary>
                              <AccordionDetails>
                                {expandedIndex === index ? <LanguageValue languagesGroups={languagesGroups} indexGroup={index} setValue={setLanguageCombinations} /> : null}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                      </div>
                    <div className='container-button'>
                        <Button text={'Salvar alterações e fechar'} handleClick={handleClose} />
                    </div>
                </div>
            </Modal>
        </ThemeProvider>
    </div>
  )
}

export default Values