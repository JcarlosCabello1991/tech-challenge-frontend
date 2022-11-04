import { useState, useId, ChangeEvent, useEffect } from "react";
import { useUpdateGifMutation, useUploadGifsMutation } from "../../redux/apis/gifsAPI";
import styles from './styles.module.css'

type Props = {
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>,
  category:string,
  inputValues:{typeData:string, name:string, image:string, id:string},
  setInputValues:React.Dispatch<React.SetStateAction<{typeData:string, name:string, image:string, id:string}>>,
  initial_state:{typeData:string, name:string, image:string, id:string},
  action:string,
  setAction: React.Dispatch<React.SetStateAction<string>>
}

function Modal({setOpenModal, category, inputValues, setInputValues, initial_state, action, setAction}:Props){
  const [image, setImage] = useState<string>();
  const [type, setType] = useState<string>();
  const [inputValue, setInputValue] = useState({typeData:type, name:"", image:image, id:useId()});
  const [uploadGifs, {data: uploadData}] = useUploadGifsMutation();
  const [updateGif,{isSuccess}] = useUpdateGifMutation();

  const handleInput = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target

    if(action == "upload"){
      const newValues = {
        ...inputValue,
        [name]:value
      }

      setInputValue(newValues);
    }else{
      const newValues = {
        ...inputValues,
        [name]:value
      }

      setInputValues(newValues);
    }
  }

  const handleImage = ({ target }: ChangeEvent<HTMLInputElement>)=>{
    const file = target.files[0];
    const reader = new FileReader();
      reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader?.result
          ?.replace("data:", "")
          .replace(/^.+,/, "");
        action == "upload" && setInputValue({typeData:type, name: inputValue.name, image: base64String, id: inputValue.id})
        action == "update" && setInputValues({typeData:inputValues.typeData as string, name: inputValues.name, image: base64String, id: inputValues.id})
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(file);      
  }

  const uploadGif = () => {
    //Here send the gif to the backEnd
    setOpenModal(false)
    action == "upload" && uploadGifs(inputValue);
    if(action == "update"){
      console.log(inputValues)
      updateGif(inputValues);
      setAction("upload");
    }
  }

  useEffect(()=>{
    if(typeof window != "undefined"){
      const select = document.getElementById("select");
      select?.addEventListener('change', function(){
        setType(select.value);
      })
    }
  },[])

  return(
    <dialog className={styles.dialog} open>
      <select id="select" className={styles.select} required>
        <option value="default" selected={inputValues.typeData =="" && true}></option>
        <option value="Gif" selected={inputValues.typeData =="gif" && true}>Gif</option>
      </select>
      <input name="name" className={styles.title} value={inputValues.name!="" ? inputValues.name : inputValue.name} type="text" onChange={(e) => {handleInput(e)}} placeholder="Type your Gif's title" required/>
      <input type="file" accept="image/*" onChange={(e) => (!e.target.files ? null : handleImage(e))} required/>
      <div className={styles.modalButton}>
        <button className={styles.button} onClick={() =>{setInputValues(initial_state) ;setOpenModal(false)}}>Cancel</button>
        <button className={styles.button} onClick={()=>{uploadGif(); setInputValues(initial_state)}}>Send</button>
      </div>
    </dialog>
  )
}

export default Modal;