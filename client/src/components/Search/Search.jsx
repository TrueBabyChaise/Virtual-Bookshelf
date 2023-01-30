import SearchBar from "@components/Search/SearchBar"
import SearchResults from "@components/Search/SearchResults"
import { createRef, useState } from "react"
import { useBooks, useBooksSearchApi } from "@src/hooks/useBooks"
import toast from "react-hot-toast"

export default function Search ({ toggleSearch }) {
  
  const [resultsData, setResultsData] = useState({})
  const { addBookISBN, loading } = useBooks()
  const { searchBook } = useBooksSearchApi()
  const backdrop = createRef()

  /**
   * Close search on backdrop click
   * @param {object} e 
   */
  const handleBackdropClick = e => {
    if(e.target === backdrop.current) {
      toggleSearch()
    }
  }

  const handleResultClick = async (book) => {
    if (book.target.tagName === 'P') {
      book.target = book.target.closest('div[isbn]')
    }

    const IBSN = book.target.getAttribute('isbn')
    if (IBSN) {
      const book = resultsData.books.find(b => b.isbn === IBSN)
      try {
        await addBookISBN(book)
        setResultsData({})
        toggleSearch()
      } catch (e) {
        toast.error(JSON.stringify(e.message))
      }
    } else {
      toast.error('No ISBN found, contact support')
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-screen w-screen bg-black/90 px-24 py-20 backdrop-blur-sm" ref={backdrop} onClick={handleBackdropClick}>
      <div className="flex flex-col max-w-3xl mx-auto w-full min-h-0">
        <SearchBar setResults={setResultsData} 
          apiSearchBook={searchBook}
          toggleSearch={toggleSearch} />
        <SearchResults loading={loading} resultsData={resultsData} handleClick={handleResultClick} />
      </div>
    </div>
  )
}