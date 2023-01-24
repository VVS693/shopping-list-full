import { useState } from "react";
import { IComment } from "../../types";
import { CommentEdit } from "./CommentEdit";
import { Commentitle } from "./CommentTitle";

interface CommentItemProps {
  comment?: IComment;
  onCommentEdit: (value: IComment) => void;
  onCommentDel: () => void
}

export function CommentItem({ comment, onCommentEdit, onCommentDel }: CommentItemProps) {
  const [edit, setEdit] = useState(false);

  const commentDelHadle = () => {
    onCommentDel()
  };

  const commentEditHandle = (value: string) => {
    const commentData = { ...comment };
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
      </div>
    </div>
  );
}
