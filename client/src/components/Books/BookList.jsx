import PropType from "prop-types"
import BookCard from "@src/ui/Cards/BookCard"

function BookList ({ books }) {

  const handleClick = e => {
    console.log('Card clicked')
  }

  return (
    // <div className="grid grid-rows-[repeat(auto-fill,18rem)] grid-cols-[repeat(auto-fill,13rem)] gap-5 justify-center">
    <div className="grid gap-5 justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {
        books.map((e,i) => (
          <BookCard cover={e.cover}
            className="h-64"
            title={e.title}
            key={i}
            clickAction={handleClick} />
        ))
      }
      
    </div>
  )
}

BookList.propTypes = {
  books: PropType.array.isRequired
}

export default BookList