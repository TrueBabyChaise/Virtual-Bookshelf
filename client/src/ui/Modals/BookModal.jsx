import PropType from "prop-types"
import Image from "next/image"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Input  from "../Forms/Input"
import PageSelector from "../Forms/PageSelector"
import Rating from "../Forms/Rating"
import Select from "../Forms/Select"
import { MdClose } from "react-icons/md"
import { useBooks } from "@src/hooks/useBooks"

function BookModal ({ isModalOpen, setIsModalOpen, book, className = '' }) {

  const [page, setPage] = useState(book.page ? book.page : 0)
  const [rating, setRating] = useState(book.rating ? book.rating : 0)
  const [status, setStatus] = useState(book.status ? book.status : 0)
  const [comment, setComment] = useState(book.comment ? book.comment : '')
  const [serie, setSerie] = useState(book.serie ? book.serie : -1)

  const [series, setSeries] = useState([])

  const { updateBookInfo, removeBook, getSeries } = useBooks()

  const loadSeries = async () => {
    const { data } = await getSeries()
    setSeries([{title: "No Series", _id: -1}, ...data])
  }

  useEffect(() => {
    setPage(book.page ? book.page : 0)
    setRating(book.rating ? book.rating : 0)
    setStatus(book.status ? book.status : 0)
    setComment(book.comment ? book.comment : '')
    setSerie(book.serie ? book.serie : -1)

    loadSeries()
  }, [book])

  const deleteBook = () => {
    removeBook(book)
    setIsModalOpen(false) 
  }

  const closeModal = () => {
    let params = {}
    params.page = page
    params.rating = rating
    params.status = status
    params.comment = comment
    params.serie = serie == -1 ? undefined : serie

    book.params = params

    updateBookInfo(book)
    setIsModalOpen(false)
  }

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50" >
        {/* Backdrop */}
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0" >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-gray-900 w-full max-w-4xl transform overflow-hidden rounded-xl text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 relative">
                  <div className="flex content-end p-12 pb-0 h-full relative z-10">
                    {/* Close button */}
                    <div className="absolute top-5 right-5">
                      <button onClick={closeModal} className="cursor-pointer">
                        <MdClose className="text-slate-100 text-xl" />
                      </button>
                    </div>

                    {/* Cover */}
                    <div className="rounded-sm -mb-7 w-[20%] h-60 overflow-hidden relative">
                      <Image src={book.thumbnail} fill={true} alt={book.title} sizes="100%" className="h-60 object-scale-down rounded-xl" />
                    </div>
                    <Dialog.Title as="h3" className="text-2xl font-bold text-slate-100 mt-auto w-[80%] p-5">
                      {book.title}
                    </Dialog.Title>
                  </div>
                </div>

                {/* Body */}
                <div className="p-12 pt-16">
                  <div className="mb-4">
                    <Dialog.Description as="p" className="text-slate-300 text-sm">
                      {book.synopsis}
                    </Dialog.Description>
                  </div>
                  <div className="w-full">
                      <PageSelector name="Page" label="Reading progress" pageMax={book.numberOfPages} setPage={setPage} page={page}/>
                    </div>
                  {/* Status, nbr de page lue, rating, personnal comment, étagère de rangement */}
                  <div className="grid grid-cols-3 gap-5 gap-x-10 mt-10">
                    <Select value={status} label="Status" name="Status" onChange={(e) => {
                      setStatus(e.target.value)}}
                      options={[
                        { value: 0, label: 'Reading' },
                        { value: 1, label: 'To read' },
                        { value: 2, label: 'Read' },
                        { value: 3, label: 'Abandoned'},
                        { value: 4, label: 'On hold'},
                      ]}
                    />
                    
                    <Rating value={rating} label="Rating" name="Rating" setValue={setRating} />
                    <Select value={serie} label="Serie" name="Serie" onChange={(e) => {
                      setSerie(e.target.value)}}
                      options={
                        series.map((s) => {
                          return {label: s.title, value: s._id}
                        })
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <Input type="text" value={comment} label="Comment" name="Comment" onChange={(e) => {
                      setComment(e.target.value)
                    }}/>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="py-6 px-12 border-t border-slate-700">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-100 bg-red-500 border border-red-700 rounded-md hover:bg-red-600"
                      onClick={deleteBook}>
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                      onClick={closeModal}>
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

BookModal.propTypes = {
  isModalOpen: PropType.bool.isRequired,
  setIsModalOpen: PropType.func.isRequired,
  book: PropType.object.isRequired,
  className: PropType.string
}

export default BookModal