import React, { useState } from 'react'
import './App.css'

function App() {
  // Variables
  const [studentName, setStudentName] = useState('')
  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseGrade, setCourseGrade] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
const [assignmentName, setAssignmentName] = useState('')
const [assignmentType, setAssignmentType] = useState('homework')
const [pointsEarned, setPointsEarned] = useState('')
const [totalPoints, setTotalPoints] = useState('')
const [assignmentWeight, setAssignmentWeight] = useState('20')

  // Function to add a new course
  const addCourse = () => {
    if (courseName) {
      const newCourse = { 
        id: Date.now(),
        name: courseName, 
        assignments: []
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
    const courseGrade = calculateCourseGrade(course)
    totalGradePoints += gradeToGPA(courseGrade)
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
  const calculateCourseGrade = (course) => {
  if (!course.assignments.length) return 0
  
  let totalWeightedScore = 0
  let totalWeight = 0
  
  course.assignments.forEach(assignment => {
    const percentage = (assignment.pointsEarned / assignment.totalPoints) * 100
    totalWeightedScore += percentage * (assignment.weight / 100)
    totalWeight += assignment.weight / 100
  })
  
  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0
}

// Function to add assignment to a course
const addAssignment = (courseId) => {
  if (assignmentName && pointsEarned && totalPoints && assignmentWeight) {
    const newAssignment = {
      id: Date.now(),
      name: assignmentName,
      type: assignmentType,
      pointsEarned: Number(pointsEarned),
      totalPoints: Number(totalPoints),
      weight: Number(assignmentWeight),
      dateAdded: new Date().toLocaleDateString()
    }
    
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, assignments: [...course.assignments, newAssignment] }
        : course
    ))
    
    // Clear form
    setAssignmentName('')
    setPointsEarned('')
    setTotalPoints('')
    setAssignmentWeight('20')
  }
}

// Function to delete assignment
const deleteAssignment = (courseId, assignmentId) => {
  setCourses(courses.map(course => 
    course.id === courseId 
      ? { 
          ...course, 
          assignments: course.assignments.filter(assignment => assignment.id !== assignmentId)
        }
      : course
  ))
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

    <button
      onClick={addCourse}
      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
      Add Course 
    </button>
  </div>
</div>


      {/* Show Courses Section */}
<div className='space-y-6'>
  <h2 className='text-2xl font-bold text-gray-800'>Your Courses ({courses.length})</h2>
  
  {courses.length === 0 ? (
    <div className='text-center py-12 bg-gray-50 rounded-lg'>
      <p className="text-gray-500 text-lg">No courses added yet. Add one above! ☝️</p>
    </div>
  ) : (
    <div className='space-y-6'>
      {courses.map((course) => {
        const courseGrade = calculateCourseGrade(course)
        return (
          <div key={course.id} className='bg-white border rounded-lg shadow-sm'>
            {/* Course Header */}
            <div className='p-4 border-b bg-gray-50'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-xl font-bold text-gray-800'>{course.name}</h3>
                  <p className='text-gray-600'>
                    {course.assignments.length} assignment{course.assignments.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-right'>
                    <p className={`text-2xl font-bold px-3 py-1 rounded ${getGradeColor(courseGrade)}`}>
                      {courseGrade.toFixed(1)}%
                    </p>
                    <p className='text-sm text-gray-500'>
                      {gradeToGPA(courseGrade).toFixed(1)} GPA
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteCourse(course.id)}
                    className='text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition-colors'
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className='p-4'>
              {/* Add Assignment Form */}
              <div className='mb-6 p-4 bg-blue-50 rounded-lg'>
                <h4 className='font-semibold mb-3 text-blue-800'>Add Assignment</h4>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                  <input
                    type='text'
                    placeholder='Assignment name'
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    className='border rounded px-3 py-2'
                  />
                  
                  <select
                    value={assignmentType}
                    onChange={(e) => setAssignmentType(e.target.value)}
                    className='border rounded px-3 py-2'
                  >
                    <option value='homework'>Homework</option>
                    <option value='quiz'>Quiz</option>
                    <option value='exam'>Exam</option>
                    <option value='project'>Project</option>
                    <option value='participation'>Participation</option>
                  </select>
                  
                  <input
                    type='number'
                    placeholder='Points earned'
                    value={pointsEarned}
                    onChange={(e) => setPointsEarned(e.target.value)}
                    className='border rounded px-3 py-2'
                  />
                  
                  <input
                    type='number'
                    placeholder='Total points'
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(e.target.value)}
                    className='border rounded px-3 py-2'
                  />
                  
                  <div className='flex gap-2'>
                    <input
                      type='number'
                      placeholder='Weight %'
                      value={assignmentWeight}
                      onChange={(e) => setAssignmentWeight(e.target.value)}
                      className='border rounded px-3 py-2 w-20'
                    />
                    <button
                      onClick={() => addAssignment(course.id)}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap'
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Assignments List */}
              {course.assignments.length === 0 ? (
                <p className='text-gray-500 text-center py-6'>No assignments yet. Add one above!</p>
              ) : (
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-700 mb-3'>Assignments</h4>
                  {course.assignments.map(assignment => {
                    const assignmentGrade = (assignment.pointsEarned / assignment.totalPoints) * 100
                    return (
                      <div key={assignment.id} className='flex justify-between items-center p-3 bg-gray-50 rounded border'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3'>
                            <span className='font-medium'>{assignment.name}</span>
                            <span className='text-xs bg-gray-200 px-2 py-1 rounded uppercase'>
                              {assignment.type}
                            </span>
                            <span className='text-xs text-gray-500'>
                              {assignment.weight}% weight
                            </span>
                          </div>
                          <p className='text-sm text-gray-600 mt-1'>
                            {assignment.pointsEarned}/{assignment.totalPoints} points • Added {assignment.dateAdded}
                          </p>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                          <span className={`font-bold px-2 py-1 rounded text-sm ${getGradeColor(assignmentGrade)}`}>
                            {assignmentGrade.toFixed(1)}%
                          </span>
                          <button
                            onClick={() => deleteAssignment(course.id, assignment.id)}
                            className='text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50'
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )}
</div>

    </div>
  )
}

export default App
