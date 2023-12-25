import { useMainContext } from '../../../context/MainContext';
import SelectInput from '../Select';
import SelectInputMultiple from '../selectMultiple';
import './styles.css';


const Inputs = () => {
  const [state, action] = useMainContext()
  const update = (key) => {
    console.log(key);
    action.changeSelectedLanguages(key)
  }
  const updateArchiveType = (value) => {
    action.changeArchiveType(value.archiveType)
  }
  return (
    <div>
      <div className='inputs-select'>
          <SelectInput languages={state.languages} id={'origin'} title='Traduzir de' name='origin' values={state.selectValues.origin} update={update} oneElement={true}/>
          <SelectInputMultiple languages={state.languages} id={'translation'} title='Traduzir para' values={state.selectValues.origin} name='translation' update={update}/>
      </div>
      <SelectInput languages={state.archiveTypes} id={'archiveTypes'} title='tipo de arquivo:' name='archiveType' values={state.archiveTypeSelected} update={updateArchiveType} oneElement={true}/>
    </div>
  )
}

export default Inputs