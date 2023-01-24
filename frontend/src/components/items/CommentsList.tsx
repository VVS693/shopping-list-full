import { useAppDispatch } from "../../hooks/redux";
import { fetchEditItems } from "../../store/reducers/actionsItemsCreators";
import { editItemArray } from "../../store/reducers/itemsSlice";
import { IComment, IShopItem } from "../../types";
import { CommentItem } from "../comments/CommentItem";

interface CommentsListProps {
  item: IShopItem;
}

export function CommentsList({ item }: CommentsListProps) {
  const dispatch = useAppDispatch();

  const commentEditHandle = (commentData: IComment) => {
    const itemData = structuredClone(item);
    itemData.comments?.map((el: IComment) => {
      if (el.idComment === commentData?.idComment) {
        el.title = commentData.title;
      }
    });
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const commentDelHandle = () => {
    console.log("Delete comment!!!!");
  };

  return (
    <div className="w-full transition-all: duration-7000">
      {item.comments?.map((el) => (
        <CommentItem
          comment={el}
          onCommentEdit={commentEditHandle}
          onCommentDel={commentDelHandle}
          key={el.idComment}
        />
      ))}
    </div>
  );
}
