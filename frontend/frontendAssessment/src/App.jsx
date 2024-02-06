/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const sampleData = [
  {
    "course_prefix": "COMP",
    "course_code": 1511,
    "course_title": "Programming Fundamentals",
    "average_stars": 4.8,
    "total_reviews": 68,
    "offered_terms": ["Term 1", "Term 2", "Term 3"]
  },
  {
    "course_prefix": "COMP",
    "course_code": 1531,
    "course_title": "Software Engineering Fundamentals",
    "average_stars": 3.9,
    "total_reviews": 47,
    "offered_terms": ["Term 1", "Term 2", "Term 3"]
  },
  {
    "course_prefix": "COMP",
    "course_code": 1521,
    "course_title": "Computer Systems Fundamentals",
    "average_stars": 4,
    "total_reviews": 40,
    "offered_terms": ["Term 1", "Term 2", "Term 3"]
  },
  {
    "course_prefix": "COMP",
    "course_code": 2521,
    "course_title": "Data Structures and Algorithms",
    "average_stars": 4,
    "total_reviews": 36,
    "offered_terms": ["Summer", "Term 1", "Term 2", "Term 3"]
  },
  {
    "course_prefix": "COMP",
    "course_code": 2511,
    "course_title": "Object-Oriented Design & Programming",
    "average_stars": 3,
    "total_reviews": 33,
    "offered_terms": ["Term 1", "Term 2", "Term 3"]
  },
  {
    "course_prefix": "COMP",
    "course_code": 3311,
    "course_title": "Database Systems",
    "average_stars": 4,
    "total_reviews": 33,
    "offered_terms": ["Term 1", "Term 3"]
  }
]

const SearchBar = ({ onClick }) => {
  return <div className='border-[#a5b4ea] border-solid border-2 rounded px-3 py-2.5 w-full flex space-x-5' onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a5b4ea" className="size-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    <input
    className="ml-4 placeholder-[#a5b4ea] font-bold w-[90%] text-xl cursor-pointer focus:outline-none"
    placeholder="Search for a course e.g. COMP1511"
    type="search"
    />
  </div>
}

const DropDown = () => {
  return (
    <div className="bg-white shadow-md rounded-md py-3 px-7 flex items-center justify-between w-[300px] border-2 border-gray-400">
      <p className="text-2xl text-gray-400 font-semibold">Sort by</p>
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    </div>
  )
}

const CourseNode = ({ info }) => {
  return <div className='shadow-lg w-[500px] h-[300px] rounded-2xl bg-[#fafafa] flex flex-col p-8 mb-14 justify-between'>
    <div className='flex flex-col space-y-5'>
      <div className='flex justify-between items-start text-5xl'>
        <h1 className='text-4xl font-extrabold'>{info.course_prefix + info.course_code.toString()}</h1>
        <div className='flex-col'>
          <h1 className='text-[#dddddd]'>
            <span className='text-[#b789e5]'>
              {Array.from({ length: Math.round(info.average_stars) }, () => {
                return <>★</>
              })}
            </span>
              {Array.from({ length: 5 - Math.round(info.average_stars) }, () => {
                return <>★</>
              })}
          </h1>
          <p className='text-lg text-gray-500'>{info.total_reviews} reviews</p>
        </div>
        
      </div>
      <p className='text-lg font-semibold'>{info.course_title}</p>
    </div>
    
    <div className='flex space-x-3'>
      {info.offered_terms.map((val, index) => {
        return <div key={index} className='bg-[#ccebf6] py-1 px-2 rounded-full font-semibold'>
          {val}
        </div>
      })}
    </div>
  </div>
}

const Overlay = ({ onClick }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg h-auto w-[500px] flex justify-center border-black border-4">
        <button onClick={onClick} className='bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded'>
          Dismiss
        </button>
      </div>
    </div>
  );
};


const App = () => {
  const [titleClicked, setTitleClicked] = useState(false)
  const [displayDiv, setDisplayDiv] = useState(false)
  return (<>
    {displayDiv && <Overlay onClick={() => setDisplayDiv(false)} />}
    <div className='flex h-[100%] absolute w-full'>
      <div className='h-[100%] bg-[#f9fafb] w-[115px] flex flex-col justify-between pt-10 pb-[75px] items-center'>
        <div className='flex flex-col space-y-7 w-[70%] items-center'>
          <img src="src/assets/unilectives.svg" className='size-12' />
          <hr className="w-full max-w-md border-[#e5e7eb] border-t-4 rounded-full" />
          <div className='flex flex-col space-y-12 w-[70%] items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>

        </div>

        <div className='flex flex-col space-y-12 w-[70%] items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 transform rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>

        </div>
      </div>
      <div className='flex flex-col px-[300px] py-7 space-y-4 w-full'>
        <h1 className='font-semibold text-2xl'>DevSoc presents</h1>
        <h1 
          className={`text-9xl font-bold cursor-pointer select-none`} 
          style={{
            color : titleClicked ? 'red' : '#1479f2'
          }}
          onClick={() => setTitleClicked(!titleClicked)}
        >
          unilectives
        </h1>
        <h1 className='font-extrabold text-2xl pb-14'>Your one-stop shop for UNSW course and elective reviews.</h1>
        
        <SearchBar onClick={() => setDisplayDiv(true)} />
        <DropDown />
        <div className='flex py-10 flex-wrap w-full justify-between'> {
          sampleData.map((val, index) => {
            return <CourseNode key={index} info={val} />
          })
        }
          
        </div>
      </div>
    </div>
  </>)
}

export default App
