import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	const requestPromiseObj = axios.get(baseUrl);
	return requestPromiseObj.then(responseObj => responseObj.data);
}

const create = (newObject) => {
	const requestPromiseObj = axios.post(baseUrl, newObject);
	return requestPromiseObj.then(responseObj => responseObj.data)
}

const deletePerson = (personId) => {
	const requestPromiseObj = axios.delete(`${baseUrl}/${personId}`);
	return requestPromiseObj.then(responseObj => responseObj.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data);
}


export default { getAll, create, deletePerson, update }