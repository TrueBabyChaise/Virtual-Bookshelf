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

/**
 * Hook that provides books search api
 * @returns {Object} {loading, searchBook, getBookByISBN}
 */
export function useBooksSearchApi() {
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

	const getBookByISBN = async (isbn) => {
		setLoading(true)
		try {
			const { data } = await api.get(`/book/isbn/${isbn}`)
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	return {
		loading,
		searchBook,
		getBookByISBN
	}
}

/**
 * Hook that provides books state and actions
 * @returns {Object} {loading, books, getUserBooks, addBookISBN}
 */
function useProvideBooks() {
	const [loading, setLoading] = useState(false)
	const [books, setBooks] = useState([])
	
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

	const updateBookInfo = async (book) => {
		setLoading(true)
		try {
			const { data } = await api.put(`/user/bookinfo/${book.fkBook}`, book)
			setLoading(false)
			books.forEach((b, i) => {
				if (b._id === book._id) {
					books[i] = book
				}
			})
			setBooks([...books])
			return data
		} catch (error) {ERR_EMPTY_RESPONSE
			setLoading(false)
			throw error
		}
	}

	const removeBook = async (book) => {
		setLoading(true)
		try {
			const { data } = await api.delete(`/user/book/${book.fkBook}`)
			setLoading(false)
			books.forEach((b, i) => {
				if (b._id === book._id) {
					books.splice(i, 1)
				}
			})
			setBooks([...books])
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
		updateBookInfo,
		addBookISBN,
		removeBook
	}
}