import PropType from "prop-types"
import Image from "next/image"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Input  from "../Forms/Input"
import PageSelector from "../Forms/PageSelector"
import { MdClose } from "react-icons/md"

function BookModal ({ isModalOpen, setIsModalOpen, book, className = '' }) {

  const closeModal = () => {
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
                      <PageSelector name="Page" label="Reading progress" pageMax={book.numberOfPages}/>
                    </div>
                  {/* Status, nbr de page lue, rating, personnal comment, étagère de rangement */}
                  <div className="grid grid-cols-3 gap-5 gap-x-10 mt-10">
                    <Input type="text" label="Status" name="Status" />
                    
                    <Input type="text" label="Rating" name="Rating" />
                    <Input type="text" label="Shelf" name="Shelf" />
                  </div>
                  <div className="mt-5">
                    <Input type="text" label="Comment" name="Comment" />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="py-6 px-12 border-t border-slate-700">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-100 bg-red-500 border border-red-700 rounded-md hover:bg-red-600"
                      >
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