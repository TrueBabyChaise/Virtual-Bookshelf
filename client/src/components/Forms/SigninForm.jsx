import Input from "@src/ui/Forms/Input"
import Router from 'next/router'
import { useAuth } from "@hooks/useAuth"
import { useEffect } from "react"

// async function loginUser(credentials) {
//   await axios.post("auth/login", credentials).then(
//     async (r) => {
//       if (r.data)
//         console.log(r.data)
//     },
//     (err) => { throw err.response.data}
//   )
// }

function SigninForm () {
  const {user, signin} = useAuth()
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const credentials = new FormData(e.target)
      const email = credentials.get('email')
      const password = credentials.get('password')
      await signin(email, password)
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
	}

  useEffect(() => {
    if(user) {
      Router.replace('/')
    }
  }, [user])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input label="Email" 
          name="email" 
          type="email" 
          placeholder="john@doe.com" 
          className="my-2" />
        <Input label="Password" 
          name="password" 
          type="password"
          className="my-2" />

          <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SigninForm