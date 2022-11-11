import SearchBar from "@components/Search/SearchBar"
import SearchResults from "@components/Search/SearchResults"
import { useState } from "react"
import useBooks from "@src/hooks/useBooks"

export default function Search ({ setOpened }) {
  
  const [resultsData, setResultsData] = useState({})
  const { searchBook, loading } = useBooks()

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-screen w-screen bg-black/90 px-24 pt-20">
      <SearchBar setResults={setResultsData} apiSearchBook={searchBook} setOpened={setOpened} />
      <SearchResults loading={loading} resultsData={resultsData} />
    </div>
  )
}