/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SexEnum } from "@/common/sex.enum";
import { User, userInitState } from "@/types/redux/initStates";
import FeedbackComponent from "@/components/feedback/feedbackComponent";
import { userBookingPayload } from "@/types/dto/apiPayloads/booking/userBookingsPayload";
import bookingApi from "@/api/booking/bookingApi";
import { userBookingsDto } from "@/types/dto/booking/bookingDtos";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@/api/apiService";
import { getUserById } from "@/api/constants";
import EditProfileDialog from "@/components/profile/profileWrapper/editProfileDialog/editProfileDialog";
import { toast } from "react-toastify";
import userApi from "@/api/user/userApi";
import { getTokenInfoThunk } from "@/redux/thunks/auth/getTokenThunk";
import { RoleEnum } from "@/common/role.enum";
import UserBookings from "../UserBookings/UserBookings";
import styles from "./styles.module.scss";

const ParticularUser = () => {
  const params = useParams();
  const appUser = useSelector<RootState, User>((state) => state.user);
  const [user, setUser] = useState<User>(userInitState);
  const [isMyself, setIsMyself] = useState(false);
  const [isEdit, setIsEdit] = useState<{ editPhoto: boolean; editBody: boolean }>({
    editPhoto: false,
    editBody: false,
  });
  const [isOpen, setOpen] = useState(false);
  const [firstName, setFirstNameValue] = useState("");
  const [lastName, setLastName] = useState("");
  const [paginationProps, setPaginationProps] = useState<{ limit: number; offset: number }>({ limit: 10, offset: 0 });
  const [userBookingsArray, setUserBookings] = useState<userBookingPayload>({
    data: [],
    limit: 0,
    offset: 0,
    total: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [file, setFile] = useState<{ selectedFile: File }>();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setFile({ selectedFile: event.target.files[0] });
    }
  };

  const onFileUpload = () => {
    const formData = new FormData();
    if (!file || !user) {
      toast.error("File wasn't selected");
      setNotEditPhoto();
      return;
    }
    formData.append("file", file.selectedFile, file.selectedFile.name);
    toast.promise(userApi.updateAvatar(formData, user?.id), {
      pending: "Updating",
      success: "Updated",
      error: "Somthing went wrong",
    });
    dispatch(getTokenInfoThunk());
  };

  const fetchUserBookings = async (id: string) => {
    const dto: userBookingsDto = {
      dateFilter: "ALL",
      userId: id,
      limit: paginationProps.limit,
      offset: paginationProps.offset,
    };
    const result = await bookingApi.userBooking(dto);
    setUserBookings(result);
    setTotalCount(result.total);
    return result;
  };

  const resetProfile = () => {
    console.log("kek");
    setUserBookings({ data: [], limit: 0, offset: 0, total: 0 });
  };

  const checkPermissions = () => user.id === appUser.id;

  useEffect(() => {
    async function load() {
      if (params.id) {
        const data = await request(getUserById(params.id), "GET");
        const suspect = await data.json();
        setUser(suspect);
        setIsMyself(false);
      } else {
        setUser(appUser);
        setIsMyself(true);
        fetchUserBookings(appUser.id);
      }
    }
    load();
  }, [params]);

  useEffect(() => {
    async function load() {
      if (!checkPermissions()) {
        return;
      }

      await fetchUserBookings(user.id);
    }
    load();
  }, [paginationProps]);

  const setEditPhoto = () => {
    setIsEdit((prevState) => ({ ...prevState, editPhoto: true }));
  };

  const setNotEditPhoto = () => {
    setIsEdit((prevState) => ({ ...prevState, editPhoto: false }));
  };

  const setEditBody = () => {
    setOpen(true);
    setIsEdit((prevState) => ({ ...prevState, editBody: true }));
  };

  const setNotEditBody = () => {
    setIsEdit((prevState) => ({ ...prevState, editBody: false }));
  };

  const updateUser = () => {
    if (!user) {
      toast.warn("User id is undefined");
      return;
    }
    toast.promise(
      userApi.updateUser(
        {
          firstName,
          lastName,
        },
        user?.id
      ),
      { success: "Updated", error: "Failed", pending: "Pending" }
    );
    dispatch(getTokenInfoThunk());
  };

  const saveHandler = () => {
    if (isEdit.editPhoto) {
      onFileUpload();
      setNotEditBody();
    }
    // if (isEdit.editBody) {
    // }
  };

  const openChat = (id: string) => {
    navigate(`/messenger/${id}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContaienr}>
        <div className={styles.columns}>
          <div className={styles.rightColumn}>
            <div className={styles.avatarContainer}>
              {isMyself ? (
                <>
                  <label htmlFor="my-file" onClick={setEditPhoto} onKeyDown={setEditPhoto}>
                    <img src={user?.profilePic || userInitState.profilePic} alt="pirkol" />
                  </label>
                  <input id="my-file" type="file" hidden onChange={(e) => onFileChange(e)} />
                </>
              ) : (
                <img src={user?.profilePic || userInitState.profilePic} alt="pirkol" />
              )}
            </div>
          </div>
          <div>
            <div className={styles.profileInfo}>
              <span className={styles.name}>
                {user?.firstName} {user?.lastName}
              </span>
              <span>{user?.sex === SexEnum.Female ? "Female" : "Male"}</span>

              <span>
                {new Date(user?.birthDate || "").toLocaleDateString()} (
                {new Date().getFullYear() - (new Date(user?.birthDate || "").getFullYear() || 2001)} years)
              </span>
            </div>

            <div className={styles.buttonContainer}>
              {!isMyself && (
                <button type="button" className={styles.outlineButton} onClick={() => openChat(user.id)}>
                  Open chat
                </button>
              )}

              {isMyself && (
                <>
                  {isEdit.editBody || isEdit.editPhoto ? (
                    <button type="button" onClick={saveHandler} className={styles.coloredButton}>
                      Save
                    </button>
                  ) : (
                    <button type="button" onClick={setEditBody} className={styles.coloredButton}>
                      Edit
                    </button>
                  )}
                  <EditProfileDialog
                    setOpen={(e: boolean) => {
                      setOpen(e);
                      setNotEditBody();
                    }}
                    setFirstNameValue={setFirstNameValue}
                    firstNameValue={firstName}
                    lastNameValue={lastName}
                    setLastNameValue={setLastName}
                    isOpen={isOpen}
                    updateUser={updateUser}
                  />
                </>
              )}
            </div>
            <FeedbackComponent entityId={user?.id || ""} />
          </div>
        </div>
        {userBookingsArray && (user.role === RoleEnum.Admin || isMyself) && (
          <div className={styles.table}>
            <UserBookings
              totalRows={totalCount}
              data={userBookingsArray.data}
              onChangeRowsPerPage={(e) => setPaginationProps((prevState) => ({ ...prevState, limit: e }))}
              onChangePage={(e) =>
                setPaginationProps((prevState) => ({ ...prevState, offset: (e - 1) * prevState.limit }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ParticularUser;
