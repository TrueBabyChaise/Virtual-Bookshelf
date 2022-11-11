import React, { useState, useContext, createContext, useEffect } from "react"
import apiAxios from "@src/configs/api"

function useBooks() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)


	/**
		* Function to recover a book
		* @returns {null}
		*/
	const getBookISBN = async (isbn) => {
		// Get an user's book
		try {
			const data = await apiAxios(`book/isbn/${isbn}`, 'GET')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	/**
		* Function to create a book
		* @returns {null}
		*/
	const createBookEntry = async (isbn) => {
		// Create a new book entry
		try {
			const data = await apiAxios(`book/isbn/${isbn}`, 'POST')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	/**
		* Function to rename a book
		* @returns {null}
		*/
	const renameBookISBN = async (isbn) => {
		// Rename an user's book
		try {
			const data = await apiAxios(`book/isbn/${isbn}`, 'PUT')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	/**
		* Function to delete a book
		* @returns {null}
		*/
	const deleteBookISBN = async (isbn) => {
		// Delete an user's book
		try {
			const data = await apiAxios(`book/isbn/${isbn}`, 'DELETE')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	/**
		* Function to get a book
		* @returns {null}
		*/
	const getBook = async (bookId) => {
		// Delete an user's book
		try {
			const data = await apiAxios(`book/${bookId}`, 'DELETE')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}


	/**
		* Function to rename a book
		* @returns {null}
		*/
	const renameBook = async (bookId) => {
		// Delete an user's book
		try {
			const data = await apiAxios(`book/${bookId}`, 'DELETE')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}

	/**
		* Function to delete a book
		* @returns {null}
		*/
	const deleteBook = async (bookId) => {
		// Delete an user's book
		try {
			const data = await apiAxios(`book/${bookId}`, 'DELETE')
			setLoading(false)
			return data
		} catch (error) {
			setLoading(false)
			throw error
		}
	}
}