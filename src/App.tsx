import React, { useState } from 'react'
import './App.css'

function App () {
  const [name, setName] = useState('')

  const handleName = (e: any) => {
    e.preventDefault()
  }

  return (
    <div>
      <h2>Login plz</h2>
      <form onSubmit={handleName}>
        <input type="email" placeholder="Enter name" value={name} onChange={(e) => { setName(e.target.value) }} required />
      </form>

    </div>
  )
}

export default App
