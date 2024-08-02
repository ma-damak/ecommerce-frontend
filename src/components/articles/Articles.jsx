import { useEffect, useState } from 'react'

import articleService from '../../services/articleService'
import Pagination from '../shared/Pagination'
import ArticlesTable from './ArticlesTable'
import { Link } from 'react-router-dom'
import SelectSize from '../shared/SelectSize'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalArticles, setTotalArticles] = useState(0)
  // pagination states
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [search, setSearch] = useState('')

  const loadArticles = () => {
    articleService
      .getPage(page, size, search)
      .then(({ articles, totalPages, totalArticles }) => {
        setArticles(articles)
        setTotalPages(totalPages)
        setTotalArticles(totalArticles)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    loadArticles()
  }, [page, size, search])

  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const handlePageChange = (p) => {
    if (p !== page) {
      setPage(p)
    }
  }
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  if (articles.length !== 0) {
    return (
      <>
        {/* <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Designation</th>
                <th className="py-3 px-6 text-left">Prix</th>
                <th className="py-3 px-6 text-left">Quantite</th>
                <th className="py-3 px-6 text-left">Marque</th>
                <th className="py-3 px-6 text-left">Sous categorie</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {articles.map((article) => (
                <tr
                  key={article._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    <img
                      src={article.imageart}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">{article.designation}</td>
                  <td className="py-3 px-6 text-left">{article.prix}</td>
                  <td className="py-3 px-6 text-left">{article.qtestock}</td>
                  <td className="py-3 px-6 text-left">{article.marque}</td>
                  <td className="py-3 px-6 text-left ">
                    {article.scategorieID.nomscategorie}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        <Link
          to="/articles/add"
          className="mb-4 inline-flex items-center justify-center p-5 text-base font-medium text-gray-50 rounded-lg bg-gray-400 hover:text-gray-900 hover:bg-gray-300"
        >
          <span className="w-full">Create a new article</span>
          <svg
            className="w-4 h-4 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>

        <ArticlesTable articles={articles} loadArticles={loadArticles} />
        <SelectSize size={size} handleSizeChange={handleSizeChange} />
        <Pagination
          page={page}
          size={size}
          totalPages={totalPages}
          totalArticles={totalArticles}
          handlePageChange={handlePageChange}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </>
    )
  }
}

export default Articles
