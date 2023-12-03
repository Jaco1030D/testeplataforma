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
  return (
    <div className='inputs-select'>
        <SelectInput languages={state.languages} id={'origin'} title='Traduzir de' name='origin' values={state.selectValues.origin} update={update} oneElement={true}/>
        <SelectInputMultiple languages={state.languages} id={'translation'} title='Traduzir para' values={state.selectValues.origin} name='translation' update={update}/>
    </div>
  )
}

export default Inputs