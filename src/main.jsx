import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Pokemon } from './Pokemon.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Pokemon />
  </>,
)
