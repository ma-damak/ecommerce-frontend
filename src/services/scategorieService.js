import api from '../api/api'

const SCATEGORIE_API = 'scategories'

const getAll = () => {
  const request = api.get(SCATEGORIE_API)
  return request.then((response) => response.data)
}

export default {
  getAll,
}
