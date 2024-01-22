import React from 'react'
import './style.css'
import button from './Button.svg'
import frame from './Frame.svg'
import l from './Label.svg'

const languages = [
  { language: 'portugues', type: ['Portugal', 'Brasil'] },
  { language: 'ingles', type: ['Inglês (EUA)', 'Inglês (Reino Unido)'] },
  { language: 'espanhol', type: ['Espanhol (Espanha)', 'Espanhol (México)'] },
  { language: 'frances', type: ['Francês (França)', 'Francês (Canadá)'] },
  { language: 'alemao', type: ['Alemão (Alemanha)', 'Alemão (Áustria)'] },
  { language: 'italiano', type: ['Italiano (Itália)', 'Italiano (Suíça)'] },
  { language: 'chines', type: ['Chinês (Mandarim)', 'Chinês (Cantonês)'] },
  { language: 'japones', type: ['Japonês (Japão)', 'Japonês (Brasil)'] },
  { language: 'coreano', type: ['Coreano (Coreia do Sul)', 'Coreano (Coreia do Norte)'] },
  { language: 'russa', type: ['Russa (Rússia)', 'Russa (Cazaquistão)'] },
  { language: 'arabe', type: ['Árabe (Arábia Saudita)', 'Árabe (Emirados Árabes Unidos)'] },
  { language: 'turco', type: ['Turco (Turquia)', 'Turco (Chipre)'] },
  { language: 'grego', type: ['Grego (Grécia)', 'Grego (Chipre)'] },
  { language: 'hindi', type: ['Hindi (Índia)', 'Hindi (Fiji)'] },
  { language: 'sueco', type: ['Sueco (Suécia)', 'Sueco (Finlândia)'] },
  { language: 'polones', type: ['Polonês (Polônia)', 'Polonês (Lituânia)'] },
  { language: 'holandes', type: ['Holandês (Holanda)', 'Holandês (Bélgica)'] },
  { language: 'portugues_br', type: ['Português (Brasil)', 'Português (Angola)'] },
  { language: 'ingles_au', type: ['Inglês (Austrália)', 'Inglês (Nova Zelândia)'] }
]


const InputSelect = ({handleClose}) => {
  return (
    <div className="destinoidiomas">
      <div className="div">
        <div className="botoes">
          <div className="botaoresetar">
            <div className="text-wrapper">Resetar</div>
          </div>
          <div className="button">
            <div className="text-wrapper-2">Continue</div>
            <div className="text-wrapper-3">⟶</div>
          </div>
        </div>

        <div className="container-inputSelect">
          <div className="content-inputSelect">
            {languages.map((item, index) => (
              <div className='languages_group pointer' >
                <span className='name-language'>{item.language}</span>
                {item.type.map((item, index) => (
                  <div>
                   <div className="l"></div> <p className='type-language'>{item}</p>

                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
        <div className="overlap">
          <div className="busca">
            <p className="frasehero">Para quais idiomas você está traduzindo?</p>
            <img className="img pointer" alt="Button" onClick={handleClose} src={button} />
            <div className="separator" />
            <div className="separator-2" />
            <div className="overlap-group">
              <img className="frame-2" alt="Frame" src={frame} />
              <div className="inputbusca">
                <input type="text" />
              </div>
              <div className="fieldset" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputSelect

    
