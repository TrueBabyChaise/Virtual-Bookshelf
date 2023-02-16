import Input from "@ui/Forms/Input"
import DefaultButton from "@ui/Buttons/DefaultButton"
import Router from 'next/router'
import Link from "next/link"
import { useAuth } from "@hooks/useAuth"
import { useEffect } from "react"
import toast from "react-hot-toast"

function SigninForm () {
  const {user, signin} = useAuth()
  
  /**
   * Submit Signin form
   * @param {object} e 
   */
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const credentials = new FormData(e.target)
      const email = credentials.get('email')
      const password = credentials.get('password')
      await signin(email, password)
    } catch (err) {
      toast.error(JSON.stringify(err.response.data))
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
        Welcome back!
      </h2>

      <form onSubmit={handleSubmit}>
        <Input label="Email" 
          name="email" 
          type="email" 
          placeholder="john@doe.com"
					required={true}
          className="my-3" />
        <Input label="Password" 
          name="password" 
          type="password"
					required={true}
          className="my-3" />

        <DefaultButton className="mt-4 mx-auto" title="Submit" type="submit" />
        <div className="mt-6">
          <Link className="text-slate-400 text-xs text-center block hover:text-slate-100" 
            href="/signup">
            Don&apos;t have an account ? Sign up here.
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SigninForm