import s from './InputControl.module.scss';


function InputControl({ props, label, required = false }) {
    return (
        <div className={`${s.inputControl} ${props.error ? s.error : ''}`}>
            <label htmlFor="nameInput">{label}{required ? '*' : ''}</label>
            <input type="text" id='nameInput' onChange={props.onChange} value={props.value} />
            {props.error ? <p className={s.helperText}>{props.helperText}</p> : null}
        </div>
    )
}

export default InputControl