import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'

const BookCard = ({id, title, genre, color, coverUrl, isLoanedBook = false}: Book) => {
  return (
    <li>
        <Link href={`/books/${id}`}>
            <BookCover coverColor={color} coverImage={coverUrl} variant='regular' />
        </Link>
    </li>
  )
}

export default BookCard