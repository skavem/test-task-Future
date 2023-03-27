import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderIcon from '../icons/LoaderIcon'
import PictureSkeleton from '../icons/PictureSkeleton'
import { getBook } from '../store/books/booksAPI'
import { GoogleBook } from '../types'

const BookPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState<null | string>(null)
  const [book, setBook] = useState<null | GoogleBook>(null)

  useEffect(() => {
    const abortController = new AbortController()

    ;(async () => {
      setLoading(true)
      const book = await getBook(id!, abortController)
      if (abortController.signal.aborted) return
      if (book) {
        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.medium) {
          setImg(book.volumeInfo.imageLinks?.medium)
        }
        setBook(book)
      } else {
        setBook(null)
      }
      setLoading(false)
    })()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <article className='flex flex-col xl:flex-row w-full justify-center'>
      {loading 
        ? <LoaderIcon className='w-16 h-16 mt-20 text-slate-300 animate-spin fill-slate-900' /> 
        : (
          book
            ? (
              <>
                <div className='bg-slate-100 w-full xl:w-2/5 flex items-center justify-center 2xl:px-30 py-12'>
                  {img 
                    ? <img src={img} alt="" className='h-fit' /> : 
                    <PictureSkeleton className='h-full' />
                  }
                </div>
      
                <div className='flex flex-col p-12 gap-5 w-full xl:w-3/5'>
                  <p>
                    {new Intl.ListFormat('en-US').format(book.volumeInfo.categories ?? '')}
                  </p>
                  <h1 className='text-3xl font-semibold'>
                    {book.volumeInfo.title}
                  </h1>
                  <p className=''>
                    {new Intl.ListFormat('en-US').format(book.volumeInfo.authors ?? '')}
                  </p>
                  {
                    book.volumeInfo.description 
                      && <p className='border-2 border-slate-300 p-5 rounded-sm font-semibold'>
                        {book.volumeInfo.description}
                      </p>
                  }
                </div>
              </>
            )
            : (<h1 className='text-3xl font-bold'>Book not found</h1>)
        )
      }
    
    </article>
  )
}

export default BookPage