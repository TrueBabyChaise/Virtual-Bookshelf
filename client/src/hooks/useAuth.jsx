import React, { useState, useContext, createContext, useEffect } from "react"
import api from "@src/configs/api"

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  /**
   * Login function
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  const signin = async (email, password) => {
    // Login user and get JWT token
    try {
      const requestData = { email: email, password: password }
      const { data } = await api.post('/auth/login', requestData)
      // (`auth/login`, 'POST', requestData)
      setUser(data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  /**
   * Signup function
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  const signup = async (email, username, password) => {
    try {
      const requestData = { email: email, username: username, password: password }
      await api.post('/auth/register', requestData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  /**
   * Signout function
   * @returns {null}
   */
  const signout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    api.get('/auth/still_alive').then(({data}) => {
      setUser(data.user)
      setLoading(false)
    }, e => {
      setLoading(false)
    })
  }, [])

  return {
    user,
    loading,
    signin,
    signup,
    signout
  }
}