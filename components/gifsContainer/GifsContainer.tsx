import { useDeleteGifMutation, useGetGifsDataBaseQuery, useUploadGifsMutation} from "../../redux/apis/gifsAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';

import { ToastContainer, toast } from 'react-toast'

import styles from'./styles.module.css'
import { useState } from "react";

type Props = {
  category: string,
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>,
  setInputValues:React.Dispatch<React.SetStateAction<{typeData:string, name:string, image:string, id:string}>>,
  setAction:React.Dispatch<React.SetStateAction<string>>
}
function GifsContainer({category, setOpenModal,setInputValues, setAction}:Props){
  const {data: dataGifs, isSuccess:succesDB} = useGetGifsDataBaseQuery(category);
  const [deleteGif] = useDeleteGifMutation();
  const [showToaster, setShowToaster] = useState<boolean>(false)

  const deleteGifFromDB = (id:string) => {
    //Here we call to the rtk query function to delete this gif
    deleteGif(id);
  }

  const copyToClipboard = (url:string) => {
    if(typeof window != undefined){
      if (navigator && navigator.clipboard && navigator.clipboard.writeText){
        setShowToaster(true);
        toast('Copied')
        
        hideToaster();
        return navigator.clipboard.writeText(url);
      }
        
      return Promise.reject('The Clipboard API is not available.');
    }
  }

  const hideToaster = () => {
    setTimeout(()=>{
      setShowToaster(false);
    },3000)
  }

  console.log(dataGifs)
  return(
    <div className={styles.gifContainer}>
    {
      dataGifs?.msg.map((gif:any) => {
        return(
          <div className={styles.gifCard} key={gif.id}>
            <img src={`${gif.image}`} className={styles.gif}/>
            <div className={styles.footerGifCard}>
              <span>{`${gif.name.substr(0,10)}...`}</span>
              <div>
                {
                category == "trending" && 
                  <>
                    <EditIcon onClick={()=>{setAction("update");setInputValues({typeData:gif.typeData, name:gif.name, image: gif.image, id:gif.id});setOpenModal(true)}}/>
                    <DeleteIcon onClick={()=>deleteGifFromDB(gif.id)}/>
                    <ContentCopyIcon onClick={()=>copyToClipboard(gif.image)}/>
                  </>
                }
                {showToaster == true && <ToastContainer />}
              </div>
            </div>
          </div>          
        )
      })
    }
    </div>
  )
}

export default GifsContainer;