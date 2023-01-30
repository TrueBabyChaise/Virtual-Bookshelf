import PropType from "prop-types"
import BookCard from "@src/ui/Cards/BookCard"
import { MdOutlineLibraryAdd } from "react-icons/md"
import Router from 'next/router'

function BookList ({ booksInput, loading }) {
  const handleCardClick = book => {
    Router.push(`/book/${book.isbn}`)
  }

  console.log(booksInput)

  return (
    // <div className="grid grid-rows-[repeat(auto-fill,18rem)] grid-cols-[repeat(auto-fill,13rem)] gap-5 justify-center">
    <>
      {
        !loading && booksInput.length > 0 ? <div  className="grid gap-5 justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"> {
          booksInput.map((e,i) => (
            <BookCard cover={e.thumbnail}
              className="h-64"
              title={e.title}
              key={i}
              clickAction={() => handleCardClick(e)} /> 
        )) }</div>: !loading ? 
        <BookListInfo>You don't have a book yet... Try adding one by clicking on <MdOutlineLibraryAdd className="inline-block" />.</BookListInfo> : 
        "Loading..."
      }
    </>
  )
}

function BookListInfo ({ children }) {
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <p className="text-lg text-slate-100 font-light">{children}</p>
    </div>
  )
}

BookList.propTypes = {
  booksInput: PropType.array.isRequired
}

export default BookList