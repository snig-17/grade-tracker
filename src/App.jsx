import React, { useState } from 'react'
import './App.css'

function App() {
  // Variables
  const [studentName, setStudentName] = useState('')
  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseGrade, setCourseGrade] = useState('')

  // Function to add a new course
  const addCourse = () => {
    if (courseName && courseGrade) {
      const newCourse = { 
        id: Date.now(),
        name: courseName, 
        grade: Number(courseGrade) 
      }
      setCourses([...courses, newCourse])
      setCourseName('')
      setCourseGrade('')
    }
  }

  // Function to delete a course
  const deleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId))
  }

  // Function to convert percentage grade to GPA points
  const gradeToGPA = (grade) => {
    if (grade >= 97) return 4.0
    if (grade >= 93) return 3.7
    if (grade >= 90) return 3.3
    if (grade >= 87) return 3.0
    if (grade >= 83) return 2.7
    if (grade >= 80) return 2.3
    if (grade >= 77) return 2.0
    if (grade >= 73) return 1.7
    if (grade >= 70) return 1.3
    if (grade >= 67) return 1.0
    return 0.0
  }

  // Function to calculate overall GPA
  const calculateGPA = () => {
    if (courses.length === 0) return 0
    
    let totalGradePoints = 0
    courses.forEach(course => {
      totalGradePoints += gradeToGPA(course.grade)
    })
    
    return totalGradePoints / courses.length
  }

  // Function to get color based on grade
  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600 bg-green-50'
    if (grade >= 80) return 'text-blue-600 bg-blue-50'  
    if (grade >= 70) return 'text-yellow-600 bg-yellow-50'
    if (grade >= 60) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold mb-6 text-center text-gray-800'>🎓 Grade Tracker</h1>

      {/* Student Name Section */}
      <div className='mb-8 p-4 bg-blue-50 rounded-lg'>
        <input
          type='text'
          placeholder='Enter your name'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
        />
        {studentName && (
          <p className='text-lg font-medium'> Hello, {studentName}! 👋</p>
        )}
      </div>

      {/* GPA Display Section */}
      {courses.length > 0 && (
        <div className='mb-8 p-6 bg-purple-50 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4 text-purple-800'>Your Academic Performance</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            
            <div className='bg-white p-4 rounded-lg text-center'>
              <p className='text-3xl font-bold text-purple-600'>{calculateGPA().toFixed(2)}</p>
              <p className='text-gray-600'>Current GPA</p>
            </div>
            
            <div className='bg-white p-4 rounded-lg text-center'>
              <p className='text-3xl font-bold text-blue-600'>{courses.length}</p>
              <p className='text-gray-600'>Total Courses</p>
            </div>
            
            <div className='bg-white p-4 rounded-lg text-center'>
              <p className='text-3xl font-bold text-green-600'>
                {courses.length > 0 ? 
                  (courses.reduce((sum, course) => sum + course.grade, 0) / courses.length).toFixed(1) 
                  : 0}%
              </p>
              <p className='text-gray-600'>Average Grade</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Section */}
      <div className='mb-8 p-4 bg-green-50 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Add New Course</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='text'
            placeholder='Course Name (e.g., Math 101)'
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
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
            Add Course 
          </button>
        </div>
      </div>

      {/* Show Courses Section */}
      <div className='p-4 bg-gray-50 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Your Courses ({courses.length})</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No courses added yet. Add one above! ☝️</p> 
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {courses.map((course) => (
              <div key={course.id} className='bg-white p-4 rounded-lg border shadow-sm'>
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <h3 className='font-bold text-lg'>{course.name}</h3>
                  </div>
                  
                  <button 
                    onClick={() => deleteCourse(course.id)}
                    className='text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors'
                  >
                    ✕ Delete
                  </button>
                </div>
                
                <div className='flex justify-between items-center mb-3'>
                  <div>
                    <p className={`text-2xl font-bold px-3 py-1 rounded ${getGradeColor(course.grade)}`}>
                      {course.grade}%
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-xl font-semibold'>{gradeToGPA(course.grade).toFixed(1)}</p>
                    <p className='text-gray-500 text-sm'>GPA Points</p>
                  </div>
                </div>
                
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div 
                    className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${Math.min(course.grade, 100)}%` }}
                  ></div>
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
