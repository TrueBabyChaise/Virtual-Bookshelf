import Head from 'next/head'
import api from "@src/configs/api"
import AppContainer from '@components/AppContainer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useBooks, useBooksSearchApi } from "@src/hooks/useBooks"
import toast from "react-hot-toast"

const Book = ({ data }) => {
  const router = useRouter()
  const { isbn } = router.query
  const [book, setBook] = useState({})
  const { books } = useBooks()
  const { getBookByISBN, loading } = useBooksSearchApi()

  async function fetchData() {
    try {
      const data = await getBookByISBN(isbn)
      setBook(data)
    } catch (e) {
      toast.error(JSON.stringify(e.message))
    }
    
  }

  useEffect(() => {
    const bArray = books.filter(b => b.isbn === isbn)
    if(bArray.length === 0) {
      // On va chercher le livre dans l'API
      fetchData()
    } else {
      setBook(bArray[0])
    }
  }, [])

  return (
    <>
      <Head>
        <title>Bookshelf - Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContainer>
        <p className="text-slate-100">ISBN : {book.isbn}</p>
        <p className="text-slate-100">Title : {book.title}</p>
      </AppContainer>
    </>
  )
}

export async function getServerSideProps () {
  // Fetch data from API
  
  const { isbn } = router.query
  const { data } = await api.get(`/book/isbn/${isbn}`)

  return {
    props: {
      data
    }
  }
}
export default Book