import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import React from 'react'
import { sampleBooks } from '../constants'
import BookOverview from '@/components/BookOverview'


const page = () => {
  return (
    <>
      <BookOverview  { ...sampleBooks[0]}/>
      <BookList
      title ='latest Books'
      books ={sampleBooks}
      containerClassName="mt-28" />
    </>
  )
}

export default page