import { useState } from "react";
import { IComment } from "../../types";
import { CommentEdit } from "./CommentEdit";
import { Commentitle } from "./CommentTitle";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

interface CommentItemProps {
  comment?: IComment;
  onCommentEdit: (data: IComment) => void;
  onCommentDel: (idComment: number) => void;
  onCommentAdd: () => void;
  isAddIcon: boolean;
}

export function CommentItem({
  comment,
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
    const commentData: IComment = structuredClone(comment);
    commentData.title = value;
    onCommentEdit(commentData);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center w-full">
        {edit ? (
          <CommentEdit
            title={comment?.title}
            editHandler={(el) => {
              setEdit(false);
              commentEditHandle(el);
            }}
            delHandler={commentDelHadle}
          />
        ) : (
          <Commentitle
            title={comment?.title}
            editHandler={() => {
              setEdit(true);
            }}
          />
        )}
        {isAddIcon && !edit && (
          <AddCommentOutlinedIcon
            onClick={onCommentAdd}
            className="cursor-pointer ml-1 text-blue-gray-800"
          />
        )}
      </div>
    </div>
  );
}
