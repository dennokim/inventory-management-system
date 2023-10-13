import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Button from '../common/Button'
import firebase_app from '../../pages/firebase/config'
import { getFirestore, deleteDoc, doc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

const DeleteProduct = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', productId))
      console.log('Document successfully deleted!')
      handleClose()
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  return (
    <>
      <Button onClick={handleOpen} variant="text" type="button">
        Delete
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 text-lg font-semibold leading-6 text-gray-800"
                  >
                    Delete Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you really want to delete the product?
                    </p>
                  </div>

                  <div className="mt-4 flex w-full items-center space-x-4">
                    <Button
                      className="flex-1"
                      variant="text"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteProduct
