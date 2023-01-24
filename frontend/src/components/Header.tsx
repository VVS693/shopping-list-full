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
    <div className=" sticky w-96 top-0 bg-white">
      <div className="flex justify-between w-full pt-6 pb-3 px-6 border-b">
        <div className="text-left text-blue-gray-800 font-bold text-2xl select-none">
          Shopping List
        </div>
        {isLoading ? (
          <Loader />
        ) : (
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
    </div>
  );
}
