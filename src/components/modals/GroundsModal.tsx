import { Dialog, Transition } from '@headlessui/react';
import useGroundsModal from '@hooks/useGroundsModal';
import { Fragment } from 'react';

export const GroundsModal = () => {
  const groundsModal = useGroundsModal();

  const closeModal = () => groundsModal.onClose();

  return (
    <Transition appear show={groundsModal.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-md overflow-hidden border-8 border-smol-brown bg-smol-brown-alternative p-3 text-gray-200">
                <div className="mx-auto flex h-full w-fit flex-col justify-center p-2">
                  <h2 className="my-2 uppercase">Grounds Closed</h2>
                  <p>Stake more $BONES in the Pits to open the grounds</p>

                  <button className="btn mx-auto mt-4 flex px-8 text-white" onClick={closeModal}>
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
