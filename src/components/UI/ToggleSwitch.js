import classes from './ToggleSwitch.module.scss' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck ,faXmark } from '@fortawesome/free-solid-svg-icons'

const ToggleSwitch = props => {

    return (
        <label className={classes.ToggleSwitch} htmlFor={props.id}>
            <input type="radio" value={props.value} id={props.id} onChange={props.onChange} disabled={props.disabled} checked={props.checked} name={props.name}/>
            <div >
                <span className={classes.circle}>
                    <FontAwesomeIcon icon={faXmark} className={classes.off}/>
                    <FontAwesomeIcon icon={faCheck} className={classes.on}/>
                </span>
            </div>
        </label>
    )
} ;


export default ToggleSwitch ;