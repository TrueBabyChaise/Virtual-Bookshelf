import Input from "@ui/Forms/Input"
import DefaultButton from "@ui/Buttons/DefaultButton"
import Router from 'next/router'
import Link from "next/link"
import { useAuth } from "@hooks/useAuth"
import { useEffect, createRef } from "react"
import toast from "react-hot-toast"

function SignupForm () {
  const {user, signup, signin} = useAuth()
  const passwordInput = createRef()
  const confirmPasswordInput = createRef()
  
  /**
   * Submit Signup form
   * @param {object} e 
   */
  const handleSubmit = async e => {
    e.preventDefault();
    const credentials = new FormData(e.target)
    try {
      const email = credentials.get('email')
      const username = credentials.get('username')
      const password = credentials.get('password')
      await signup(email, username, password)
      try {
        await signin(credentials.get('email'), credentials.get('password'))
      } catch (err) {
        toast.error(JSON.stringify(err.response.data))
      }
    } catch (err) {
      toast.error(JSON.stringify(err.response.data))
    }
	}

  /**
   * Verification passwords matches
   * @param {object} e 
   */
	const verificationPassword = e => {
		if(passwordInput.current.value !== confirmPasswordInput.current.value) {
			confirmPasswordInput.current.setCustomValidity("The confirm password and the password must match")
		} else {
			confirmPasswordInput.current.setCustomValidity('')
		}
	}

  useEffect(() => {
    if(user) {
      Router.replace('/')
    }
  }, [user])

  return (
    <div>

      <h2 className="text-3xl text-slate-100 font-bold text-center mb-4">
				Sign up to Bookshelf
			</h2>

      <form onSubmit={handleSubmit}>
        <Input label="Email" 
          name="email" 
          type="email" 
          placeholder="john@doe.com" 
					required={true}
          className="my-3" />
        <Input label="Username" 
          name="username" 
          type="text" 
          placeholder="johndoe" 
					required={true}
          className="my-3" />
        <Input label="Password" 
          name="password" 
          type="password"
					required={true}
          ref={passwordInput}
					onChange={verificationPassword}
          className="my-3" />
        <Input label="Confirm Password" 
          name="confirm_password" 
          type="password"
					required={true}
          ref={confirmPasswordInput}
					onChange={verificationPassword}
          className="my-3" />

        <DefaultButton className="mt-4 mx-auto" title="Submit" type="submit" id="submitForm" />

        <div className="mt-6">
          <Link className="text-slate-400 text-xs text-center block hover:text-slate-100" 
            href="/login">
            Already have an account ? Login here.
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignupForm