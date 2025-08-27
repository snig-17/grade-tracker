import React, { useState } from 'react'
import './App.css'

function App() {
  // variables, studentName (the current value), setStudentName (function to change the value), useState('') (starts with empty text)
const [studentName, setStudentName] = useState('')
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-4'>Grade Tracker</h1>

     {/* Input field to enter student name */}
     <input
        type='text'
        placeholder='Enter student name'
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
     />
     {/* Show student name if there is one */}
     {studentName && (
      <p className='text-lg'> Hello, {studentName}! 👋</p>
     )}
    </div>
  )
}

export default App
