import api from '../api/api'

const ARTICLES_API = 'articles'

const getAll = () => {
  const request = api.get(ARTICLES_API)
  return request.then((response) => response.data)
}
const getArticle = (id) => {
  const request = api.get(`${ARTICLES_API}/${id}`)
  return request.then((response) => response.data)
}
const getPage = (page, size, search) => {
  const request = api.get(
    `${ARTICLES_API}/pagination?page=${page}&size=${size}&search=${search}`
  )
  return request.then((response) => response.data)
}
const deleteArticle = (id) => {
  const request = api.delete(`${ARTICLES_API}/${id}`)
  return request.then((response) => response.data)
}
const create = (articleObject) => {
  const request = api.post(ARTICLES_API, articleObject)
  return request.then((response) => response.data)
}
const update = (id, articleObject) => {
  const request = api.put(`${ARTICLES_API}/${id}`, articleObject)
  return request.then((response) => response.data)
}

export default {
  getAll,
  getArticle,
  getPage,
  deleteArticle,
  create,
  update,
}
