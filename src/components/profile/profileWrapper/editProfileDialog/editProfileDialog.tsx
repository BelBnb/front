import DialogComponent from "@/elements/common/dialog/dialog";
import React from "react";
import UserInputs from "@/components/feedback/commentInputs/userInputs";

interface EditUserDialogOptions {
  setOpen: (e: boolean) => void;
  isOpen: boolean;
  updateUser: () => Promise<void>;
  firstNameValue: string;
  setFirstNameValue: (e: string) => void;
  lastNameValue: string;
  setLastNameValue: (e: string) => void;
}

const EditProfileDialog: React.FC<EditUserDialogOptions> = ({
  setOpen,
  isOpen,
  updateUser,
  firstNameValue,
  setFirstNameValue,
  lastNameValue,
  setLastNameValue,
}) => (
  <DialogComponent
    cancelLabel="Back"
    setOpen={setOpen}
    submitLabel="Submit"
    title="Update user"
    submitHandler={async () => {
      await updateUser();
    }}
    isOpen={isOpen}
  >
    <UserInputs
      firstNameValue={firstNameValue}
      setFirstNameValue={setFirstNameValue}
      lastNameValue={lastNameValue}
      setLastNameValue={setLastNameValue}
    />
  </DialogComponent>
);

export default EditProfileDialog;
