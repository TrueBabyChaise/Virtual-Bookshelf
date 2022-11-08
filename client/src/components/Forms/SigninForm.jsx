import Input from "@src/ui/Forms/Input"
import { useState } from "react"

async function loginUser(credentials) {
	return fetch('localhost:3001/api/auth/login', {
		method: 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
	.then(data => data.json())
}

function SigninForm () {

  const [user, setUser] = useState({username: '', password: ''})

  const handleSubmit = async e => {
		e.preventDefault();
		const res = await loginUser({
			username,
			password
		})
		alert(res.message);
	}

  return (
    <div>dddd
      <form onSubmit={handleSubmit}>
        <Input label="Username" 
          name="username" 
          type="text" 
          placeholder="john@doe.com" 
          className="my-2" 
          value={user.username}
          onChange={e => setUser({...user, username: e.target.value})}/>
        <Input label="Password" 
          name="password" 
          type="password"
          className="my-2" 
          value={user.password}
          onChange={e => setUser({...user, password: e.target.value})}/>

          <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SigninForm