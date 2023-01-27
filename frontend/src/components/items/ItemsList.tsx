import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItems,
} from "../../store/reducers/actionsItemsCreators";
import { fetchAllUsers } from "../../store/reducers/actionUserCreators";
import { addItemArray } from "../../store/reducers/itemsSlice";
import { IShopItem } from "../../types";
import { AddItem } from "./AddItem";
import { ShopItem } from "./ShopItem";
import { v4 } from 'uuid';
export function ItemsList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.itemsReducer);

  const onAddItemHandler = (value: string) => {
    animateScroll.scrollToBottom({
      duration: 1500,
      smooth: "easeInQuad",
    });

    const itemData: IShopItem = {
      id: v4(),
      completed: false,
      title: value,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllSortedItems());
  }, []);

  return (
    <>
      {items.map((el) => (
        <ShopItem item={el} key={el.id} />
      ))}
      <AddItem onAdd={onAddItemHandler} />
    </>
  );
}
