import { useState } from "react"
import PropType from "prop-types"
import { MdOutlineSearch, MdOutlineClose } from "react-icons/md"

export default function SearchBar ({ setResults, apiSearchBook, setOpened }) {

  const [search, setSearch] = useState('')

  const handleChange = async e => {
    const inputValue = e.target.value
    setSearch(inputValue)
    console.log(inputValue)

    if(inputValue.length > 2) {
      const results = await apiSearchBook(inputValue)
      console.log(results)
      setResults(results)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl flex flex-col min-h-0 rounded bg-gray-800">
      {/* border-b border-gray-700 */}
      <header className="px-3">
        <div className="flex min-w-0 flex-1 items-center text-gray-300">
          <label htmlFor="global_search" className="mr-4">
            <MdOutlineSearch className="h-6 w-6" />
          </label>
          <input type="text" id="global_search" 
            className="appearance-none bg-transparent h-14 flex-auto outline-none"
            onChange={handleChange} value={search} />
          <button onClick={() => setOpened(false)} className="bg-gray-700 h-6 w-6 flex rounded">
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
  setOpened: PropType.func.isRequired,
}