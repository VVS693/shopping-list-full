import { useState } from "react";
import { IComment } from "../../types";
import { CommentEdit } from "./CommentEdit";
import { Commentitle } from "./CommentTitle";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "../../hooks/redux";

interface CommentItemProps {
  comment?: IComment;
  userAvatar?: string;
  onCommentEdit: (data: IComment) => void;
  onCommentDel: (idComment: number) => void;
  onCommentAdd: () => void;
  isAddIcon: boolean;
}

export function CommentItem({
  comment,
  userAvatar,
  onCommentEdit,
  onCommentDel,
  onCommentAdd,
  isAddIcon,
}: CommentItemProps) {
  const [edit, setEdit] = useState(false);

  const commentDelHadle = () => {
    if (typeof comment?.idComment === "number") {
      onCommentDel(comment.idComment);
    }
  };

  const commentEditHandle = (value: string) => {
    setEdit(false);
    const commentData: IComment = structuredClone(comment);
    commentData.title = value;
    onCommentEdit(commentData);
  };

  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center w-full">
        <div className=" pb-1 ml-3">
          <Avatar src={userAvatar} sx={{ width: 24, height: 24 }} />
        </div>
        {edit ? (
          <CommentEdit
            title={comment?.title}
            editHandler={commentEditHandle}
            delHandler={commentDelHadle}
          />
        ) : (
          <Commentitle
            title={comment?.title}
            editHandler={() => {
              if (comment?.userId === user._id) {
                setEdit(true);
              }
            }}
          />
        )}
        {isAddIcon && !edit && (
          <AddCommentOutlinedIcon
            onClick={onCommentAdd}
            className="cursor-pointer mr-1 mb-1 text-blue-gray-800"
          />
        )}
      </div>
    </div>
  );
}
