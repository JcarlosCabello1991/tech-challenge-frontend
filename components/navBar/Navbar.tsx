import NavbarIcons from "../navbaricons/NavbarIcons";
import styles from './styles.module.css'

type Props = { 
  openModal:boolean,
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>> 
}

function Navbar({openModal,setOpenModal}:Props){

  return(
    <div className={styles.navBar}>
      <img src="../../images/logo.png" className={styles.logo}/>
      <h1 className={styles.title}>FreeGifs</h1>
      <NavbarIcons openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
    
  )
}

export default Navbar;