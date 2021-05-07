import styles from'./Search.module.css'

function SearchBar(){
    return (
        <div className={styles.stock_search}>
            <input className={styles.stock_input} type='text' placeholder='Search Symbol'/>
        </div>
    )
}

export default SearchBar
