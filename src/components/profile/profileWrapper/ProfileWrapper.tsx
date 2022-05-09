import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SexEnum } from "@/common/sex.enum";
import { User } from "@/types/redux/initStates";
import FeedbackComponent from "@/components/feedback/feedbackComponent";
import { userBookingPayload } from "@/types/dto/apiPayloads/booking/userBookingsPayload";
import bookingApi from "@/api/booking/bookingApi";
import { userBookingsDto } from "@/types/dto/booking/bookingDtos";
import styles from "./styles.module.scss";
import UserBookings from "../UserBookings/UserBookings";
import { useParams } from "react-router-dom";
import { request, requestWithBody } from "@/api/apiService";
import { getUserById, updateUserRoute, userBookingsRoute } from "@/api/constants";
import EditProfileDialog from "@/components/profile/profileWrapper/editProfileDialog/editProfileDialog";
import { toast } from "react-toastify";

const ParticularUser = () => {
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [visitorUser, setVisitor] = useState<User>(useSelector<RootState, User>((state) => state.user));
  const [isMyself, setIsMyself] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(async () => {
    if (params.id) {
      const data = await request(getUserById(params.id), "GET");
      console.log(data);
      const user = await data.json();
      // todo: redirect to 404
      if (user?.error) alert("No such user");

      if (user.id === visitorUser.id) setIsMyself(true);
      setUser(user);
    } else {
      setIsMyself(true);
      setUser(visitorUser);
    }
  }, []);

  const [paginationProps, setPaginationProps] = useState<{ limit: number; offset: number }>({ limit: 10, offset: 0 });
  const [userBookingsArray, setUserBookings] = useState<userBookingPayload>({
    data: [],
    limit: 0,
    offset: 0,
    total: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [file, setFile] = useState<{ selectedFile: File }>();
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    if (event.target && event.target.files) {
      setFile({ selectedFile: event.target.files[0] });
    }
  };

  /*const onFileUpload = () => {
    const formData = new FormData();

    if (!file) {
      return;
      toast.error("Select file pizdoglazoye mudilo");
    }
    // Update the formData object
    formData.append("myFile", file.selectedFile, file.selectedFile.name);

    // Details of the uploaded file
    console.log(file.selectedFile);

    // Request made to the backend api
    // Send formData object
user  };*/

  const fetchUserBookings = async () => {
    const dto: userBookingsDto = {
      dateFilter: "ALL",
      userId: user.id,
      limit: paginationProps.limit,
      offset: paginationProps.offset,
    };
    const result = await bookingApi.userBooking(dto);
    setUserBookings(result);
    setTotalCount(result.total);
    return result;
  };

  useEffect(() => {
    async function load() {
      await fetchUserBookings();
    }
    load();
    console.log(user);
  }, [user]);

  useEffect(() => {
    async function load() {
      await fetchUserBookings();
    }
    load();
  }, [paginationProps]);

  const [isOpen, setOpen] = useState(false);

  const [firstName, setFirstNameValue] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const updateUser = () => {
    toast.promise(
      requestWithBody(updateUserRoute(user.id), "PUT", {
        firstName,
        lastName,
      }),
      { success: "Updated", error: "Failed", pending: "Pending" }
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContaienr}>
        <div className={styles.columns}>
          <div className={styles.rightColumn}>
            <div className={styles.avatarContainer}>
              <label htmlFor="my-file">
                <img src={user?.profilePic} alt="pirkol" />
              </label>
              <input id="my-file" type="file" hidden onChange={(e) => onFileChange(e)} />
            </div>
          </div>
          <div>
            <div className={styles.profileInfo}>
              <span className={styles.name}>
                {user?.firstName} {user?.lastName}
              </span>
              <span>{user?.sex === SexEnum.Female ? "feMale" : "Male"}</span>
              <span>Sex? {user?.sex === SexEnum.Female ? "Yes" : "No"}</span>

              <span className={styles.name}>
                {new Date().getFullYear() - (new Date(user?.birthDate || "").getFullYear() || 2001)} years
              </span>
            </div>

            <div className={styles.buttonContainer}>
              {!isMyself && (
                <button type="button" className={styles.outlineButton}>
                  Open chat
                </button>
              )}

              {isMyself && (
                <>
                  {isEdit ? (
                    <button type="button" onClick={} className={styles.coloredButton}>
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(true);
                      }}
                      className={styles.coloredButton}
                    >
                      Edit
                    </button>
                  )}
                  <EditProfileDialog
                    setOpen={setOpen}
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
        {userBookingsArray && (
          <UserBookings
            totalRows={totalCount}
            data={userBookingsArray.data}
            onChangeRowsPerPage={(e) => setPaginationProps((prevState) => ({ ...prevState, limit: e }))}
            onChangePage={(e) =>
              setPaginationProps((prevState) => ({ ...prevState, offset: (e - 1) * prevState.limit }))
            }
          />
        )}
      </div>
    </div>
  );
};
export default ParticularUser;
