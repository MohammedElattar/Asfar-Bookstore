import s from './FormLoadingButton.module.scss'

function FormLoadingButton({ loading, text }) {
    return (
        <button type='submit' className={s.button}>
            {
                loading ? <span className={s.loading}></span> : text
            }
        </button>
    )
}

export default FormLoadingButton