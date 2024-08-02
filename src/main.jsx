import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import Articles from './components/articles/Articles'
import AddArticle from './components/articles/AddArticle'
import UpdateArticle from './components/articles/UpdateArticle'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<div>welcome</div>} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/add" element={<AddArticle />} />
      <Route path="/articles/:id/update" element={<UpdateArticle />} />
      <Route path="/scategories" element={<div>scategories</div>} />
      <Route path="/categories" element={<div>categories</div>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  // <RouterProvider router={router} />
)
