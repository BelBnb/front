import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./styles.module.scss";
import "./overrides.scss";
import ColoredButton from "../buttons/buttons";
import OutlinedButton from "../buttons/outlinedButton";

interface DialogProps {
  submitLabel: string;
  submitHandler?: () => void;
  cancelLabel: string;
  cancelHandler?: () => void;
  title: string;
  isOpen?: boolean;
  setOpen: (e: boolean) => void;
}

const DialogComponent: React.FC<DialogProps> = ({
  children,
  submitLabel,
  title,
  submitHandler,
  cancelLabel,
  cancelHandler,
  isOpen,
  setOpen,
}) => {
  const [isOpens, setIsOpen] = useState(true);
  const ancestHandler = (func: () => void) => {
    setOpen(false);
    return func();
  };
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 bg-black/30 ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 "
              enterTo="opacity-100 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 "
              leaveTo="opacity-0 "
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title>{title}</Dialog.Title>

                <div className="mt-2">{children}</div>

                <div className={styles.buttonContainer}>
                  {submitHandler && submitLabel && (
                    <ColoredButton coloredLabel={submitLabel} onClick={() => ancestHandler(submitHandler)} />
                  )}
                  {cancelHandler && cancelLabel && (
                    <OutlinedButton outlineLabel={cancelLabel} onClick={() => ancestHandler(cancelHandler)} />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;
