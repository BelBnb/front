import React, { useCallback, useEffect, useRef, useState } from "react";
import * as debounce from "lodash.debounce";
import userApi from "@/api/user/userApi";
import { User } from "@/types/redux/initStates";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const UsersSearch: React.FC = () => {
  const [tex, setText] = useState("");
  const ref = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const nameChangerDebouncer = useCallback(
    debounce(async () => {
      const t = ref.current.value;
      if (t) {
        const data = await userApi.getUsersFiltered({ limit: 7, offset: 0, text: t });
        if (data.data) {
          setUsers(data.data);
        }
      } else {
        setUsers([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    console.log(tex);
    nameChangerDebouncer();
  }, [tex]);

  const nameChanger = (val: string) => {
    setText(val);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        onFocus={onFocus}
        onBlur={() => {
          setTimeout(() => {
            onBlur();
          }, 200);
        }}
        ref={ref}
        value={tex}
        onChange={(e) => nameChanger(e.currentTarget.value)}
      />
      {users.length > 0 && focused && (
        <div className={styles.items}>
          {users.map((user) => (
            <>
              <Link to={`/profile/${user.id}`} className={styles.item}>
                {user.username && <span>@{user.username}</span>}
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </Link>
              <span />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersSearch;
