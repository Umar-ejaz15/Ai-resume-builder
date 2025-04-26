import React from 'react'

const Sumary = ({resumeInfo}) => {
  console.log(resumeInfo);
  return (
      <p className='text-xs'>{resumeInfo?.summary}</p>
  )
}

export default Sumary
