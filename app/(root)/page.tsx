
import { Button } from '@/components/ui/button'
import React from 'react'
import { sampleBooks } from '../constants'
import BookOverview from '@/components/BookOverview'
import BookList from '@/components/BookList'


const page = () => {
  return (
    <>
      <BookOverview  totla_copies={0} available_copies={0} color={''} cover={''} video={''} isLoanedBook={undefined} {...sampleBooks[0]}/>
      <BookList
      title ='latest Books'
      books ={sampleBooks}
      containerClassName="mt-28" />
    </>
  )
}

export default page