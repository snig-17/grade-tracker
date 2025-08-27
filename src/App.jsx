import React, { useState } from 'react'
import './App.css'

function App() {

// variables, studentName (the current value), setStudentName (function to change the value), useState('') (starts with empty text)
const [studentName, setStudentName] = useState('')
// array to hold courses
const [courses, setCourses] = useState([])
// variables for the new course input fields
const [courseName, setCourseName] = useState('')
const [courseGrade, setCourseGrade] = useState('')


//function to add a new course
const addCourse = () => {
  //only add if both fields are filled
  if (courseName && courseGrade) {
    const newCourse = { 
      id: Date.now(),
      name: courseName, 
      grade: Number(courseGrade) }
  
  //add the new course to the courses array
  setCourses([...courses, newCourse])

  //clear the input fields
  setCourseName('')
  setCourseGrade('')
    }
}
  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Grade Tracker</h1>

     {/* Student Name Section */}
     <div className='mb-8 p-4 bg-blue-50 rounded'>
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
     {/* Add Course Section */}
     <div className='mb-8 p-4 bg-green-50-rounded'>
     <h2 className='text-xl font-bold mb-4'>Add Course</h2>
     <div className='flex gap-4 mb-4'>

      <input
      type='text'
      placeholder='Course Name'
      value={courseName}
      onChange={(e) => setCourseName(e.target.value)}
      className='border border-gray-300 rounded px-3 py-2 flex-1'
      />

      <input
      type='number'
      placeholder='Grade (0-100)'
      value={courseGrade}
      onChange={(e) => setCourseGrade(e.target.value)}
      className='border border-gray-300 rounded px-3 py-2 w-32'
      />

      <button
      onClick={addCourse}
      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Add Course 
      </button>

     </div>
     </div>
     {/* Show Courses Section */}
     <div className='p-4 bg-gray-50 rounded'>
      <h2 className='text-xl font-bold mb-4'>Your Courses({courses.length})</h2>
      {courses.length === 0 ?
         (<p className="text-gray-500">No courses added yet. Add one above! ☝️</p> ) : 
         (<div className='space-y-2'>
          {courses.map((course) => (
            <div key={course.id} className='bg-white p-3 rounded border'>
              <div className='flex justify-between'>
                <span className='font-medium'>{course.name}: </span>
                <span className='text-blue-600 font-bold'>{course.grade}%</span>
              </div>
            </div>
          ))}
         </div>
      )}
     </div>
    </div>
  )
}

export default App
