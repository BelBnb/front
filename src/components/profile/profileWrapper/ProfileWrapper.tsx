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
import { request } from "@/api/apiService";
import { getUserById } from "@/api/constants";

const ParticularUser = () => {
  const params = useParams();

  const [user, setUser] = useState<User>();

  const [visitorUser, setVisitor] = useState<User>(useSelector<RootState, User>((state) => state.user));

  const [isMyself, setIsMyself] = useState(false);

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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContaienr}>
        <div className={styles.columns}>
          <div className={styles.rightColumn}>
            <div className={styles.avatarContainer}>
              <img src={user?.profilePic} alt="pirkol" />
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
                <button type="button" className={styles.coloredButton}>
                  Edit
                </button>
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
