import PropType from "prop-types"
import BookCard from "@src/ui/Cards/BookCard"
import useBooks from "@src/hooks/useBooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function BookList ({ booksInput }) {
  const [books, setBooks] = useState([])
  const { getUserBooks, loading } = useBooks()
  
  const handleClick = e => {
    console.log('Card clicked')
  }

  const getBooks = async () => {
    try {
      const books = await getUserBooks()
      setBooks(books)
      console.log(books)
    } catch (err) {
      toast.error(JSON.stringify(err))
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    // <div className="grid grid-rows-[repeat(auto-fill,18rem)] grid-cols-[repeat(auto-fill,13rem)] gap-5 justify-center">
    <div className="grid gap-5 justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {
        !loading ? books.map((e,i) => (
          <BookCard cover={e.thumbnail}
            className="h-64"
            title={e.title}
            key={i}
            clickAction={handleClick} />
        )) : 'Loading...'
      }
      
    </div>
  )
}

BookList.propTypes = {
  booksInput: PropType.array.isRequired
}

export default BookList