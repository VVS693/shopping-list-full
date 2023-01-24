import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDeleteItems,
  fetchEditItems,
} from "../../store/reducers/actionsItemsCreators";
import {
  deleteItemArray,
  editItemArray,
} from "../../store/reducers/itemsSlice";
import { IShopItem } from "../../types";
import { CheckBox } from "./Checkbox";
import { CommentsList } from "./CommentsList";
import { ItemEdit } from "./ItemEdit";
import { ItemTitle } from "./ItemTitle";

interface ShopItemProps {
  item: IShopItem;
}

export function ShopItem({ item }: ShopItemProps) {
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const onItemDel = () => {
    dispatch(deleteItemArray(item));
    dispatch(fetchDeleteItems(item));
  };

  const toggleCompleted = () => {
    const itemData: IShopItem = { ...item };
    itemData.completed = !item.completed;
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const onItemEdit = (value: string) => {
    const itemData: IShopItem = { ...item };
    itemData.title = value;
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  return (
    <div className="flexflex-col items-start px-4 border-b">
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

        {!!item.comments?.length && !edit && (
          <SmsOutlinedIcon
            onClick={() => setShowComments(!showComments)}
            className="cursor-pointer text-blue-gray-800"
          />
        )}
      </div>

      {showComments && <CommentsList item={item} />}
    </div>
  );
}
