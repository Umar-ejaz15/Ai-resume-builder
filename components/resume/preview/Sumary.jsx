'use client'
import React from 'react'

const Summary = ({ resumeInfo }) => {
  console.log(resumeInfo);
  return (
    <div className="my-4 ">
      {/* Section Title */}
   
      
      {/* Summary Content */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {resumeInfo?.summary || ""}
      </p>
      <hr className='border-gray-300 my-4' />
    </div>
  )
}

export default Summary
