import { Avatar, Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SlAvatarEditor } from "../components/SlAvatarEditor";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchNewUserAvatar } from "../store/reducers/actionsCreators";
import { changeUserInfo } from "../store/reducers/usersSlice";
import { eyeIcon, eyeSlashIcon } from "./Login";

interface IAccountInput {
  newUserName: string;
  currentPassword: string;
  newPassword: string;
}

export function UserAccount() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IAccountInput>({
    defaultValues: {
      newUserName: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const [editAccount, setEditAccount] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const navigate = useNavigate();

  const editAvatarHandler = async (data: FormData) => {
    try {
      const res = await dispatch(fetchNewUserAvatar(data)).unwrap();
      dispatch(
        changeUserInfo({
          id: user.id,
          name: user.name,
          password: user.password,
          avatar: res.url,
        })
      );
    } catch (err) {
      console.log(err);
    }
    setEditAvatar(false);
    setEditAccount(false);
    reset();
  };

  const onSubmit: SubmitHandler<IAccountInput> = (data) => {
    console.log(data);

    if (dirtyFields.newUserName) {
      dispatch(
        changeUserInfo({
          id: user.id,
          name: data.newUserName,
          password: user.password,
          avatar: user.avatar,
        })
      );
    }
    setEditAccount(false);
    setEditAvatar(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    reset();
  };

  const cancelHandler = () => {
    setEditAccount(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setEditAvatar(false);
    reset();
  };

  return (
    <div className="container mx-auto max-w-sm flex flex-wrap justify-center pt-10">
      <div className=" text-center">
        {!editAvatar ? (
          <>
            <Avatar
              className={editAccount ? "cursor-pointer mb-3 mt-3" : "mb-3 mt-3"}
              src={user.avatar}
              // alt="USER"
              variant="circular"
              size="xxl"
              onClick={() => {
                if (editAccount) {
                  setEditAvatar(true);
                }
              }}
            />
            <h2 className="pt-3 pb-3 text-center text-3xl font-medium text-gray-900">
              {user.name}
            </h2>
          </>
        ) : (
          <SlAvatarEditor
            imageUrl={user.avatar}
            onEditAvatar={editAvatarHandler}
            onCancelAvatar={cancelHandler}
          />
        )}
      </div>
      {!editAccount && (
        <div className="flex justify-between w-80 pt-3 pb-3">
          <Button
            size="md"
            className="w-48 tracking-wider"
            onClick={() => setEditAccount(true)}
          >
            Edit profile
          </Button>
          <Button
            size="md"
            variant="outlined"
            className="w-30 tracking-wider"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      )}
      {editAccount && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {!editAvatar && (
            <>
              <div>
                <div className="w-80 pt-3 pb-0">
                  <Input
                    label="New username"
                    type="text"
                    {...register("newUserName", {
                      maxLength: {
                        value: 12,
                        message: "Maximum username length is twelve characters",
                      },
                      pattern: {
                        value: /^[A-Za-zА-Яа-я]+$/i,
                        message: "Username is not valid",
                      },
                    })}
                  />
                  {errors.newUserName ? (
                    <p className=" pt-1 text-xs text-red-900">
                      {errors.newUserName.message}
                    </p>
                  ) : (
                    <div className=" block h-5"></div>
                  )}
                </div>

                <div className="w-80 pt-3 pb-0">
                  <Input
                    label="Current password"
                    type={showCurrentPassword ? "text" : "password"}
                    icon={
                      <div
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? eyeIcon : eyeSlashIcon}
                      </div>
                    }
                    {...register("currentPassword", {
                      required:
                        dirtyFields.currentPassword || dirtyFields.newPassword
                          ? "Current password is required"
                          : false,
                    })}
                  />
                  {!!errors.currentPassword &&
                  (!!dirtyFields.currentPassword ||
                    !!dirtyFields.newPassword) ? (
                    <p className="pt-1 text-xs text-red-900">
                      {errors.currentPassword.message}
                    </p>
                  ) : (
                    <div className="block h-5"></div>
                  )}
                </div>

                <div className="w-80 pt-3 pb-0">
                  <Input
                    label="New password"
                    type={showNewPassword ? "text" : "password"}
                    icon={
                      <div onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? eyeIcon : eyeSlashIcon}
                      </div>
                    }
                    {...register("newPassword", {
                      required:
                        dirtyFields.currentPassword || dirtyFields.newPassword
                          ? "New password is required"
                          : false,
                      minLength: {
                        value: 5,
                        message: "Password should be at-least 5 characters.",
                      },
                    })}
                  />
                  {!!errors.newPassword &&
                  (!!dirtyFields.currentPassword ||
                    !!dirtyFields.newPassword) ? (
                    <p className=" pt-1 text-xs text-red-900">
                      {errors.newPassword.message}
                    </p>
                  ) : (
                    <div className=" block h-5"></div>
                  )}
                </div>
              </div>

              <div
                className={`flex w-80 pt-3 pb-3 ${
                  dirtyFields.currentPassword ||
                  dirtyFields.newPassword ||
                  dirtyFields.newUserName
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {(dirtyFields.currentPassword ||
                  dirtyFields.newPassword ||
                  dirtyFields.newUserName) && (
                  <Button
                    type="submit"
                    size="md"
                    className="w-48 tracking-wider"
                  >
                    Save
                  </Button>
                )}

                <Button
                  size="md"
                  variant="outlined"
                  className="w-30 tracking-wider"
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}
