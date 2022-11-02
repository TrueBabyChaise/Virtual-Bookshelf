import BookCard from "@src/ui/Cards/BookCard"

function BookList () {
  return (
    <div className="grid grid-rows-[repeat(auto-fill,288px)] grid-cols-[repeat(auto-fill,208px)] gap-5 justify-center">
      <BookCard cover="/ngnl-covers/ngnl_tome_1.jpg" title="No Game No life - Tome 1" />
      <BookCard cover="/ngnl-covers/ngnl_tome_2.jpg" title="No Game No life - Tome 2" />
      <BookCard cover="/ngnl-covers/ngnl_tome_3.jpg" title="No Game No life - Tome 3" />
      <BookCard cover="/ngnl-covers/ngnl_tome_4.jpg" title="No Game No life - Tome 4" />
      <BookCard cover="/ngnl-covers/ngnl_tome_5.jpg" title="No Game No life - Tome 5" />
      <BookCard cover="/ngnl-covers/ngnl_tome_6.jpg" title="No Game No life - Tome 6" />
      <BookCard cover="/ngnl-covers/ngnl_tome_7.jpg" title="No Game No life - Tome 7" />
    </div>
  )
}

export default BookList