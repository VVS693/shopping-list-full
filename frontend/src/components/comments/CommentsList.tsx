import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IComment, IUser } from "../../types";
import { CommentAdd } from "./CommentAdd";
import { CommentItem } from "./CommentItem";

interface CommentsListProps {
  comments?: IComment[];
  onCommentsUpdate: (data: IComment[]) => void;
  onAddNewComment: boolean;
  onAddNewCommentCancel: () => void;
}

export function CommentsList({
  comments,
  onCommentsUpdate,
  onAddNewComment,
  onAddNewCommentCancel,
}: CommentsListProps) {
  const { user, users } = useAppSelector((state) => state.userReducer);

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
    if (value.trim().length === 0) {
      setIsAddVisible(false);
      onAddNewCommentCancel();
      return;
    }
    const allCommentsData: IComment[] = structuredClone(comments);
    const commentData: IComment = {
      idComment: new Date().getTime(),
      title: value,
      userId: user._id,
    };
    allCommentsData.push(commentData);
    onCommentsUpdate(allCommentsData);
    setIsAddVisible(false);
  };

  const [isAddVisible, setIsAddVisible] = useState(onAddNewComment);

  const userAvatarSearch = (el: IComment) => {
    const commentsUser = users.find((item: IUser) => item._id === el.userId);
    return commentsUser?.avatar;
  };

  return (
    <div className="w-full">
      {comments?.map((el, index) => (
        <CommentItem
          comment={el}
          userAvatar={userAvatarSearch(el)}
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
