import Button from '@mui/material/Button'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import styles from './styles.module.css'

import { useCookies } from "react-cookie";
import { useContext} from 'react';

type Props = {
  openModal:boolean,
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

function NavbarIcons({openModal,setOpenModal}:Props){

  const handleModal = () => {
    setOpenModal(!openModal)
  }
  
  return(
    <div className={styles.iconsContainer}>
      <div style={{display:'flex', alignItems:'center', gap:'0.2rem'}}>
        <CloudUploadIcon sx={{fontSize:'2rem'}} onClick={handleModal}/>
        <span>Upload your gif</span>
      </div>      
    </div>    
  )
}

export default NavbarIcons;