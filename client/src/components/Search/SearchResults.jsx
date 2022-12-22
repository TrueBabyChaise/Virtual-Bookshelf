import { useEffect } from "react"
import SearchResultsRow from "./SearchResultsRow"

export default function SearchResults ({ loading, resultsData }) {

  useEffect(() => {
    console.log(resultsData)
  }, [resultsData])

  return (
    <div className="mt-4 mx-auto w-full max-w-3xl flex flex-col min-h-0 rounded bg-gray-800">
      <p>{ loading ? 'Loading...' : 'Not Loading' }</p>
      { resultsData.books && resultsData.books.map(b => <SearchResultsRow key={b.title} title={b.title} image={b.image} />) }
    </div>
  )
}