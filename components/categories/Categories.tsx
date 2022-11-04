import styles from './styles.module.css'

type Props = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

function Categories({setCategory}:Props){

  return(
    <div className={styles.categoriesContainer}>
      <button className={styles.buttonCategory} onClick={() => setCategory("trending")}>Trending</button>
      <button className={styles.buttonCategory} onClick={() => setCategory("reactions")}>Reactions</button>
      <button className={styles.buttonCategory} onClick={() => setCategory("sports")}>Sports</button>
    </div>
  )
}

export default Categories;


