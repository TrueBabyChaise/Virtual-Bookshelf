import React, { useState, useRef } from "react"
import api from "@src/configs/api"

export default function useBooks() {
	const [loading, setLoading] = useState(false)
	const abortControllerRef = useRef()
	
	/**
	 * Api call search book from search input
	 * @param {string} searchValue 
	 * @returns {object} data
	 */
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


	const getUserBooks = async () => {
		setLoading(true)
		try {
			const { data } = await api.get('/user/book')
			setLoading(false)
			console.log("Test", data)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	return {
		loading,
		searchBook,
		getUserBooks
	}
}