import PropType from "prop-types"
import Image from "next/image"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Input from "../Forms/Input"
import { MdClose } from "react-icons/md"

function BookModal ({ isModalOpen, setIsModalOpen, className = '' }) {

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
                    <div className="rounded-sm -mb-7 w-24 h-32 overflow-hidden relative">
                      <Image src="/ngnl-covers/ngnl_tome_1.jpg" fill={true} className="w-24 h-32 object-cover" />
                    </div>
                    <Dialog.Title as="h3" className="text-2xl font-bold text-slate-100 mt-auto p-5">
                      No Game No Life
                    </Dialog.Title>
                  </div>
                </div>

                {/* Body */}
                <div className="p-12 pt-16">
                  <div className="mb-4">
                    <Dialog.Description as="p" className="text-slate-300 text-sm">
                      Social-phobic Sora and shut-in Shiro form a genius gamer sibling duo. The two find the world to be a lousy game…until someone claiming to be God transports them to a world where everything is decided by games!
                      <br /> <br />
                      Will these two failures at life become the saviors of a strange, new world?
                    </Dialog.Description>
                  </div>

                  {/* Status, nbr de page lue, rating, personnal comment, étagère de rangement */}
                  <div className="grid grid-cols-3 gap-5 gap-x-10 mt-10">
                    <Input label="Status" />
                    <Input label="Page progress" />
                    <Input label="Rating" />
                    <Input label="Shelf" />
                  </div>
                  <div className="mt-5">
                    <Input label="Comment" />
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
  className: PropType.string
}

export default BookModal