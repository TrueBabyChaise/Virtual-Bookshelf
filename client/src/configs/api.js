import axios from "axios"

export default async function apiAxios(url, method = 'GET', data) {

	console.log(process.env.NEXT_PUBLIC_API_URL)

	const config = {
		url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	}
	if (data) config.data = JSON.stringify(data)
	return new Promise((resolve, reject) => {
		axios(config).then(response => {
			console.log(response)
			resolve(response.data ? response.data : {})
		}, error => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				reject(error)
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				reject(error)
			} else {
				reject(error)
			}
		})
	})
}