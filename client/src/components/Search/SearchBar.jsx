import { useEffect, useState } from "react"
import PropType from "prop-types"
import { MdOutlineSearch, MdOutlineClose } from "react-icons/md"
import toast from "react-hot-toast"

export default function SearchBar ({ setResults, apiSearchBook, toggleSearch }) {

  const [search, setSearch] = useState('')

  /**
   * Handle search input changes
   * @param {object} e 
   */
  const handleChange = async e => {
    const inputValue = e.target.value
    setSearch(inputValue) 

    if(inputValue.length > 2) {
      await getSearchResults(inputValue)
    }
  }

  /**
   * Get books form search value
   * @param {string} value 
   */
  const getSearchResults = async value => {
    try {
      const results = await apiSearchBook(value)
      setResults(results)
    } catch (e) {
      if(e.code !== 'ERR_CANCELED') toast.error(JSON.stringify(e))
    }
  }

  return (
    <div className="mx-auto w-full flex flex-col min-h-0 rounded bg-gray-900 flex-none">
      {/* border-b border-gray-700 */}
      <header className="px-3">
        <div className="flex min-w-0 flex-1 items-center text-gray-300">
          <label htmlFor="global_search" className="mr-4">
            <MdOutlineSearch className="h-6 w-6" />
          </label>
          <input type="text" name="global_search" 
            className="appearance-none bg-transparent h-14 flex-auto outline-none"
            onChange={handleChange} value={search} />
          <button onClick={() => toggleSearch()} className="bg-gray-800 h-6 w-6 flex rounded">
            <MdOutlineClose className="m-auto" />
          </button>
        </div>
      </header>
    </div>
  )
}

SearchBar.propTypes = {
  setResults: PropType.func.isRequired,
  apiSearchBook: PropType.func.isRequired,
  toggleSearch: PropType.func.isRequired,
}