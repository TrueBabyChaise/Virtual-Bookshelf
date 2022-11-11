import React, { useState, useContext, createContext, useEffect } from "react"
import apiAxios from "@src/configs/api"

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
   * Fonction de connexion
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  const signin = async (email, password) => {
    // Login user and get JWT token
    try {
      const requestData = { email: email, password: password }
      const data = await apiAxios(`auth/login`, 'POST', requestData)
      setUser(data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  /**
   * Fonction de déconnexion
   * @returns {null}
   */
  const signout = async () => {
    try {
      await apiAxios(`auth/logout`, 'POST')
      setUser(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  useEffect(() => {
    const data = apiAxios(`auth/still_alive`).then(data => {
      setUser(data)
      setLoading(false)
    }, e => {
      setLoading(false)
      console.log(e)
    })
    console.log(data)
  }, [])

  return {
    user,
    loading,
    signin,
    signout
  }
}