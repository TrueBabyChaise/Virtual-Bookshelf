import Input from "@src/ui/Forms/Input"
import { validateConfig } from "next/dist/server/config-shared";
import { useState } from "react"
const axios = require('axios');

async function loginUser(credentials) {
/*	return fetch('http:localhost:3001/api/', {
		method: 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
	.then(data => data.json())
}*/
    return new Promise(function (resolve, reject) {
      var config = {
        method: 'post',
        url: 'http://localhost:3001/api/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(credentials),
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      };
      
      axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        resolve(error)
      });
  })
}


function SigninForm () {

  const [user, setUser] = useState({username: '', password: ''})

  const handleSubmit = async e => {
		e.preventDefault();
		const {data, status} = await loginUser(user)
    //if (status > 299)
		alert(data.message);
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