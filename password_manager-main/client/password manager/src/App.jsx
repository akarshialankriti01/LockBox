import { useState } from 'react'

import SavePass from './components/SavePass'
import GetPass from './components/GetPass'
import {BrowserRouter, Route, Routes,NavLink} from "react-router-dom"

function App() {


  return (
    <>
      <BrowserRouter>
        <div className="nav">
            <h1>PASSWORD MANAGER</h1>
            <NavLink to='save_passwords'>Save password</NavLink>
            <NavLink to='get_passwords'>Get password</NavLink>
        </div>

      <Routes>
          <Route path="/save_passwords" element={<SavePass />} />
          <Route path="/get_passwords" element={<GetPass />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
