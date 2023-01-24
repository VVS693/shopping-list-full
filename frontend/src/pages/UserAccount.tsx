import { Button, Input } from "@material-tailwind/react";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SlAvatarEditor } from "../components/user/SlAvatarEditor";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { authReset, defaultAvatarImage } from "../store/reducers/usersSlice";
import { eyeIcon, eyeSlashIcon } from "../components/icons";
import {
  delOldUserAvatar,
  fetchUploadUserAvatar,
  fetchUserNewPassword,
  fetchUserUpdateAvatar,
  fetchUserUpdateName,
} from "../store/reducers/actionUserCreators";
import { AlertDialog } from "../components/AlertDialog";

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
  const [dataForm, setDataForm] = useState<IAccountInput>();
  const [isAlertDialogApproveOpen, setAlertDialogApproveOpen] = useState(false);
  const [isAlertDialogErrorOpen, setAlertDialogErrorOpen] = useState(false);
  const [isAlertDialogSuccessOpen, setAlertDialogSuccessOpen] = useState(false);
  const [isAlertDialogExitOpen, setAlertDialogExitOpen] = useState(false);
  const [alertDialogText, setalertDialogText] = useState("");

  const navigate = useNavigate();

  const editAvatarHandler = async (data: FormData) => {
    try {
      await dispatch(delOldUserAvatar(user.avatar));
      const res = await dispatch(fetchUploadUserAvatar(data)).unwrap();
      const newUserData = {
        _id: user._id,
        avatar: res.url,
      };
      dispatch(fetchUserUpdateAvatar(newUserData));
    } catch (err) {
      console.log(err);
    }
    setEditAvatar(false);
  };

  const onSubmit = async () => {
    if (
      dataForm &&
      dirtyFields.newUserName &&
      !dirtyFields.currentPassword &&
      !dirtyFields.newPassword
    ) {
      const newUserData = {
        _id: user._id,
        name: dataForm.newUserName,
      };
      const res = await dispatch(fetchUserUpdateName(newUserData));

      if (res.meta.requestStatus === "rejected") {
        setAlertDialogApproveOpen(false);
        if (typeof res.payload === "string") {
          setalertDialogText(res.payload);
        }
        setAlertDialogErrorOpen(true);
      }
    }

    if (dataForm && dirtyFields.currentPassword && dirtyFields.newPassword) {
      const newUserData = {
        _id: user._id,
        name: dirtyFields.newUserName ? dataForm.newUserName : "",
        avatar: user.avatar,
        currentPassword: dataForm.currentPassword,
        newPassword: dataForm.newPassword,
      };
      const res = await dispatch(fetchUserNewPassword(newUserData));

      if (res.meta.requestStatus === "rejected") {
        setAlertDialogApproveOpen(false);
        if (typeof res.payload === "string") {
          setalertDialogText(res.payload);
        }
        setAlertDialogErrorOpen(true);
      }

      if (res.meta.requestStatus === "fulfilled") {
        setAlertDialogApproveOpen(false);
        setalertDialogText("The user's data has been successfully updated!");
        setAlertDialogSuccessOpen(true);
      }
    }
    setEditAccount(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setAlertDialogApproveOpen(false);
    reset();
  };

  const cancelHandler = () => {
    setEditAccount(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setAlertDialogApproveOpen(false);
    setAlertDialogErrorOpen(false);
    setAlertDialogSuccessOpen(false);
    setAlertDialogExitOpen(false);
    setalertDialogText("");
    reset();
  };

  const userApproveModalOpen = async (data: IAccountInput) => {
    setDataForm(data);
    setAlertDialogApproveOpen(true);
    setalertDialogText("Are you sure you want to change user's data?");
  };

  const userApproveModalSuccess = async () => {
    window.localStorage.removeItem("token");
    cancelHandler();
    dispatch(authReset());
  };

  const userExitModalOpen = async () => {
    setAlertDialogExitOpen(true);
    setalertDialogText("Are you sure you want to exit?");
  };

  return (
    <div className="container mx-auto max-w-sm flex flex-wrap justify-center pt-6">
      <AlertDialog
        isOpen={isAlertDialogExitOpen}
        text={alertDialogText}
        okFunc={userApproveModalSuccess}
        cancelFunc={cancelHandler}
      />
      <AlertDialog
        isOpen={isAlertDialogApproveOpen}
        text={alertDialogText}
        okFunc={onSubmit}
        cancelFunc={cancelHandler}
      />
      <AlertDialog
        isOpen={isAlertDialogErrorOpen}
        text={alertDialogText}
        cancelFunc={cancelHandler}
      />
      <AlertDialog
        isOpen={isAlertDialogSuccessOpen}
        text={alertDialogText}
        okFunc={userApproveModalSuccess}
      />

      <div className="text-center">
        {!editAvatar ? (
          <div className="flex flex-col items-center ">
            <Avatar
              src={user.avatar}
              sx={{
                cursor: editAccount ? "pointer" : "",
                width: 240,
                height: 240,
                mb: 2,
                mt: 2,
              }}
              onError={() => {
                dispatch(
                  defaultAvatarImage({
                    avatar: "default_ava.png",
                  })
                );
              }}
              onClick={() => {
                if (editAccount) {
                  setEditAvatar(true);
                }
              }}
            />

            <h2 className="pt-3 pb-3 text-center text-3xl font-medium text-gray-900">
              {user.name}
            </h2>
          </div>
        ) : (
          <SlAvatarEditor
            onEditAvatar={editAvatarHandler}
            onCancelAvatar={() => setEditAvatar(false)}
          />
        )}
      </div>
      {!editAccount && (
        <>
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
              className="w-28 tracking-wider"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
          <div className="flex fixed justify-end w-80 bottom-8">
            <Button
              size="sm"
              variant="outlined"
              className="w-20 tracking-wider"
              onClick={userExitModalOpen}
            >
              Exit
            </Button>
          </div>
        </>
      )}
      {editAccount && (
        <form onSubmit={handleSubmit(userApproveModalOpen)}>
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
                        {!showCurrentPassword ? eyeIcon : eyeSlashIcon}
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
                        {!showNewPassword ? eyeIcon : eyeSlashIcon}
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
                  className="w-28 tracking-wider"
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
