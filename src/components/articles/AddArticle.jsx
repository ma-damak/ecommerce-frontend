import { useEffect, useState } from 'react'
import Input from '../shared/Input'
import scategorieService from '../../services/scategorieService'
import ImageInput from '../shared/ImageInput'
import articleService from '../../services/articleService'
import { Link, useNavigate } from 'react-router-dom'
import ErrorAlert from '../shared/ErrorAlert'

const articlesData = [
  {
    name: 'designation',
    label: 'Designation',
    type: 'text',
  },
  {
    name: 'marque',
    label: 'Marque',
    type: 'text',
  },
  {
    name: 'prix',
    label: 'Prix',
    type: 'number',
  },
  {
    name: 'qtestock',
    label: 'Stock',
    type: 'number',
  },
  {
    name: 'reference',
    label: 'Reference',
    type: 'text',
  },
]

const AddArticle = () => {
  const [formData, setFormData] = useState({
    designation: '',
    marque: '',
    prix: '',
    qtestock: '',
    reference: '',
    scategorieID: '',
    imageart: '',
  })
  const [scategories, setScategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    scategorieService
      .getAll()
      .then((scategories) => setScategories(scategories))
  }, [])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData({ ...formData, [name]: value })
  }

  const handleState = (imageUrl) => {
    setFormData({ ...formData, imageart: imageUrl })
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    articleService
      .create(formData)
      .then(() => {
        navigate('/articles')
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleCloseAlert = () => {
    setErrorMessage(null)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-xl font-bold leading-7 text-gray-900">
              Add an Article
            </h1>
            {errorMessage && (
              <ErrorAlert
                message={errorMessage}
                handleCloseAlert={handleCloseAlert}
              />
            )}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {articlesData.map((article) => (
                <Input
                  key={article.name}
                  name={article.name}
                  label={article.label}
                  value={formData[article.name]}
                  type={article.type}
                  handleChange={handleChange}
                />
              ))}
              {/* select sca*/}
              <div className="sm:col-span-3">
                <label
                  htmlFor="scategorieID"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sous categories
                </label>
                <div className="mt-2">
                  <select
                    id="scategorieID"
                    name="scategorieID"
                    value={formData.scategorieID}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">--Please choose a sous categorie--</option>
                    {scategories.map((sc) => (
                      <option key={sc._id} value={sc._id}>
                        {sc.nomscategorie}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ImageInput handleState={handleState} type="add" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/articles"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </>
  )
}

export default AddArticle
