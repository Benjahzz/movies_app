import React, { useCallback, Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useMediaModal from "@/hooks/useMediaModal";
import ReactPlayer from 'react-player'
import useMedia from "@/hooks/useMedia";
import getGenre from "@/utils/getGenre";
import { Element } from "@/types/types";
import Button from "./Button";
import BtnFavorite from "./BtnFavorite";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  children: React.ReactNode
  onClose: ()=>void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose
}) => {
  return (
    <>

      <Transition appear show={isOpen} as={Fragment} >
        <Dialog as="div" className="relative z-30" onClose={onClose}>
          <div className={`fixed inset-0 overflow-y-auto ${isOpen && "bg-black bg-opacity-20"}`}>
            <div className="flex min-h-full h-full items-center justify-center md:p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-4xl h-fit transform overflow-y-scroll scrollbar-hide md:rounded-2xl bg-primary p-2 md:p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4 z-20">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >
    </>
  );
};

export default Modal;
