import { useState } from "react";
import { IComment } from "../../types";
import { CommentAdd } from "./CommentAdd";
import { CommentItem } from "./CommentItem";

interface CommentsListProps {
  comments?: IComment[];
  onCommentsUpdate: (data: IComment[]) => void;
}

export function CommentsList({
  comments,
  onCommentsUpdate,
}: CommentsListProps) {
  const commentEditHandle = (commentData: IComment) => {
    const allCommentsData: IComment[] = structuredClone(comments);
    allCommentsData.map((el: IComment) => {
      if (el.idComment === commentData.idComment) {
        el.title = commentData.title;
      }
    });
    onCommentsUpdate(allCommentsData);
  };

  const commentDelHandle = (idComment: number) => {
    const allCommentsData: IComment[] = structuredClone(comments);
    allCommentsData.map((el: IComment, index) => {
      if (el.idComment === idComment) {
        allCommentsData.splice(index, 1);
      }
    });
    onCommentsUpdate(allCommentsData);
  };

  const commentAddVisible = () => {
    setIsAddVisible(true);
  };

  const onCommentAddValueHandler = (value: string) => {
    console.log(value);
    if (value.trim().length === 0) {
      setIsAddVisible(false);
      return;
    }
    const allCommentsData: IComment[] = structuredClone(comments);
    const commentData: IComment = {
      idComment: new Date().getTime(),
      title: value,
    };
    allCommentsData.push(commentData);
    onCommentsUpdate(allCommentsData);
    setIsAddVisible(false);
  };

  const [isAddVisible, setIsAddVisible] = useState(false);

  return (
    <div className="w-full">
      {comments?.map((el, index) => (
        <CommentItem
          comment={el}
          onCommentEdit={commentEditHandle}
          onCommentDel={commentDelHandle}
          onCommentAdd={commentAddVisible}
          isAddIcon={index + 1 === comments?.length ? true : false}
          key={el.idComment}
        />
      ))}

      <CommentAdd
        onCommentAddValue={onCommentAddValueHandler}
        isAddVisible={isAddVisible}
      />
    </div>
  );
}
