import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Student from './Student.jsx'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Student/>
  </StrictMode>,
)
