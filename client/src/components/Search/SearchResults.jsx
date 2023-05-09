import { useEffect } from "react"
import SearchResultsRow from "./SearchResultsRow"

export default function SearchResults ({ loading, resultsData, handleClick }) {

  return (
    <div className="mt-4 w-full flex flex-col min-h-0 rounded bg-gray-900 overflow-hidden flex-1">
      {/* <p>{ loading ? 'Loading...' : 'Not Loading' }</p> */}
      <div className="overflow-auto">
        { resultsData.books 
          && resultsData.books.length > 0 
          && resultsData.books.map(
            b => <SearchResultsRow key={b.title} {...b} handleClick={handleClick} />
          ) }
      </div>
    </div>
  )
}