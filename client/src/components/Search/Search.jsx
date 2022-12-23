import SearchBar from "@components/Search/SearchBar"
import SearchResults from "@components/Search/SearchResults"
import { createRef, useState } from "react"
import useBooks from "@src/hooks/useBooks"

export default function Search ({ toggleSearch }) {
  
  const [resultsData, setResultsData] = useState({})
  const { searchBook, loading } = useBooks()
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

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-screen w-screen bg-black/90 px-24 py-20 backdrop-blur-sm" ref={backdrop} onClick={handleBackdropClick}>
      <div className="flex flex-col max-w-3xl mx-auto w-full min-h-0">
        <SearchBar setResults={setResultsData} 
          apiSearchBook={searchBook}
          toggleSearch={toggleSearch} />
        <SearchResults loading={loading} resultsData={resultsData} />
      </div>
    </div>
  )
}