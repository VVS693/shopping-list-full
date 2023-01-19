// import { Avatar } from "@material-tailwind/react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { defaultAvatarImage } from "../store/reducers/usersSlice";
import { Loader } from "./Loader";

interface HeaderProps {
  isLoading: boolean;
}

export function Header({ isLoading }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <div className="flex justify-between  w-full p-2 px-6 border-b">
      <div className=" block text-left  font-bold text-2xl  select-none">
        Shopping List
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        // <Avatar
        // className={"cursor-pointer"}
        //   src={user.avatar}
        //   onError={() => {
        //     dispatch(
        //       defaultAvatarImage({
        //         avatar: "default_ava.png",
        //       })
        //     );
        //   }}
        //   variant="circular"
        //   size="sm"
        //   onClick={() => navigate("/useraccount")}
        // />

        <Avatar
          src={user.avatar}
          sx={{ width: 40, height: 40, cursor: "pointer" }}
          onError={() => {
            dispatch(
              defaultAvatarImage({
                avatar: "default_ava.png",
              })
            );
          }}
          onClick={() => navigate("/useraccount")}
        />
        
      )}
    </div>
  );
}
