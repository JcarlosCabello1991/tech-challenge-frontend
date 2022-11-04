import type { NextPage } from 'next'
import { useState } from 'react'
import Navbar from '../components/navBar/Navbar'
import GifsContainer from '../components/gifsContainer/GifsContainer'
import Categories from '../components/categories/Categories'
import Modal from '../components/modal/Modal'
import Separator from '../components/separator/Separator'

const Home: NextPage = () => {
  const[category, setCategory] = useState<string>("trending");
  const [action, setAction] = useState<string>("upload");
  const[openModal, setOpenModal] = useState<boolean>(false);
  const initial_state = {typeData:"", name:"", image:"", id:""}
  const [inputValues, setInputValues] = useState(initial_state);
  return (
    <>
      <Navbar openModal={openModal} setOpenModal={setOpenModal}/>
      <Separator />
      <Categories setCategory={setCategory}/>
      {openModal == true && <Modal setOpenModal={setOpenModal} category={category} inputValues={inputValues} setInputValues={setInputValues}initial_state={initial_state} action={action} setAction={setAction}/>}
      <GifsContainer category={category} setOpenModal={setOpenModal} setInputValues={setInputValues} setAction={setAction}/>
    </>
  )
}

export default Home
