import styles from './styles.module.css'

type Props = {
}

function Separator(props:Props){
  return(
    <div className={styles.separator}>
      <hr className={styles.hr}/>
    </div>
  )
}

export default Separator;