import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchDeleteItems,
  fetchEditItems,
} from "../../store/reducers/actionsItemsCreators";
import {
  deleteItemArray,
  editItemArray,
} from "../../store/reducers/itemsSlice";
import { IComment, IShopItem } from "../../types";
import { CheckBox } from "./Checkbox";
import { CommentsList } from "../comments/CommentsList";
import { ItemEdit } from "./ItemEdit";
import { ItemTitle } from "./ItemTitle";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

interface ShopItemProps {
  item: IShopItem;
}

export function ShopItem({ item }: ShopItemProps) {
  const dispatch = useAppDispatch();
  const { isShowComments } = useAppSelector((state) => state.itemsReducer);
  const [edit, setEdit] = useState(false);
  const [showComments, setShowComments] = useState(isShowComments);
  const [addNewComment, setAddNewComment] = useState(false);

  const onItemDel = () => {
    dispatch(deleteItemArray(item));
    dispatch(fetchDeleteItems(item));
  };

  const toggleCompleted = () => {
    const itemData: IShopItem = structuredClone(item);
    itemData.completed = !item.completed;
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const onItemEdit = (value: string) => {
    const itemData: IShopItem = structuredClone(item);
    itemData.title = value;
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const allCommentsUpdateHandler = (allCommentsData: IComment[]) => {
    const itemData: IShopItem = structuredClone(item);
    itemData.comments = allCommentsData;
    if (allCommentsData.length === 0) {
      setShowComments(false)
    }
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  useEffect(() => setShowComments(isShowComments), [isShowComments]);

  return (
    <div className="flexflex-col items-start pl-4 pr-3 border-b">
      <div className="flex items-center w-full">
        <CheckBox
          isCompleted={item.completed}
          onChangeCheckBox={toggleCompleted}
        />

        {edit ? (
          <ItemEdit
            title={item.title}
            editHandler={(el) => {
              setEdit(false);
              onItemEdit(el);
            }}
            delHandler={onItemDel}
          />
        ) : (
          <ItemTitle
            title={item.title}
            editHandler={() => {
              setEdit(true);
            }}
          />
        )}

        {!!item.comments?.length && !edit ? (
          <CommentOutlinedIcon
            onClick={() => {
              setShowComments(!showComments);
              setAddNewComment(false);
            }}
            className="cursor-pointer mr-1 text-blue-gray-800"
          />
        ) : (
          !edit && (
            <AddCommentOutlinedIcon
              onClick={() => {
                setShowComments(true);
                setAddNewComment(true);
              }}
              className="cursor-pointer mr-1 text-blue-gray-800"
            />
          )
        )}
      </div>

      {showComments && (
        <CommentsList
          comments={item.comments}
          onCommentsUpdate={allCommentsUpdateHandler}
          onAddNewComment={addNewComment}
          onAddNewCommentCancel={() => {
            setAddNewComment(false);
            setShowComments(false);
          }}
        />
      )}
    </div>
  );
}
