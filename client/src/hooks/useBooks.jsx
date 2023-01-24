import React, { useState, useContext, createContext, useRef } from "react"
import api from "@src/configs/api"

const booksContext = createContext()

export function ProvideBooks({ children }) {
  const books = useProvideBooks()
  return <booksContext.Provider value={books}>{children}</booksContext.Provider>
}

export const useBooks = () => {
  return useContext(booksContext)
}

export function useBooksSearch() {
	const [loading, setLoading] = useState(false)
	const abortControllerRef = useRef()

	const searchBook = async (searchValue) => {
		setLoading(true)
		if (abortControllerRef.current) abortControllerRef.current.abort();
	  abortControllerRef.current = new AbortController();
		try {
			const { data } = await api.post(`/book/search/${searchValue}`, {}, {
				signal: abortControllerRef.current.signal
			})
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	return {
		loading,
		searchBook
	}
}


function useProvideBooks() {
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])
	const abortControllerRef = useRef()
	
	const getUserBooks = async () => {
		setLoading(true)
		try {
			const { data } = await api.get('/user/book')
			setLoading(false)
			setBooks(data)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	const addBookISBN = async (book) => {
		setLoading(true)
		try {
			const { data } = await api.post(`/user/book/isbn/${book.isbn}`, book)
			setLoading(false)
			console.log(data)
			setBooks([...books, data.data])
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	return {
		loading,
		books,
		getUserBooks,
		addBookISBN
	}
}