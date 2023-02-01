import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Loader } from "../Loader";
import { UserAvatar } from "../user/UserAvatar";

interface HeaderProps {
  title: string;
  isLoading?: boolean;
  isUserActive?: boolean;
}

export function Header({ isLoading, title, isUserActive }: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLoaderShow, setIsLoaderShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsLoaderShow(false), 800);
    } else {
      setIsLoaderShow(true);
    }
  }, [isLoading]);

  return (
    <div className=" z-50 sticky w-96 top-0 bg-white">
      <div className="flex justify-between w-full pt-6 pb-3 px-6 border-b">
        <div className="text-left text-blue-gray-800 font-bold text-2xl select-none">
          {title}
        </div>

        {isLoaderShow ? (
          <Loader />
        ) : (
          <div
            className=" cursor-pointer"
            onClick={() => navigate("/useraccount")}
          >
            <UserAvatar isUserActive={isUserActive} userAvatar={user.avatar} />
          </div>
        )}
      </div>
    </div>
  );
}
