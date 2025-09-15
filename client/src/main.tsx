import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductList from './pages/ProductList.tsx'
import StudentList from './pages/StudentList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentList />
  </StrictMode>,
)
