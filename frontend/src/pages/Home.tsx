import { useEffect } from "react";

import { ShopItem } from "../components/ShopItem";
import { IShopItem } from "../types";
import { AddItem } from "../components/AddItem";
import { ErrorMessage } from "../components/ErrorMessage";
import { SortButton } from "../components/SortButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItems,
} from "../store/reducers/actionsItemsCreators";
import { addItemArray, sortItemsArray } from "../store/reducers/itemsSlice";
import { Header } from "../components/Header";
import { animateScroll } from "react-scroll";
import { Navigate, useNavigate } from "react-router-dom";

export function Home() {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector(
    (state) => state.itemsReducer
  );

  const { user } = useAppSelector((state) => state.userReducer);

  const { isAuth } = useAppSelector((state) => state.userReducer);

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: "easeInQuad",
    });
    dispatch(sortItemsArray());
  };

  const onAddItemHandler = (value: string) => {
    animateScroll.scrollToBottom({
      duration: 1500,
      smooth: "easeInQuad",
    });

    const itemData: IShopItem = {
      id: new Date().getTime(),
      completed: false,
      title: value,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSortedItems());
  }, []);

  // if (!isAuth) {
  //   return <Navigate to="/login" />;
  // }

 
  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, [isAuth]);

  return (
    <div className="container mx-auto max-w-sm pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} />
      )}
      {items.map((el) => (
        <ShopItem item={el} key={el.id} />
      ))}
      <AddItem onAdd={onAddItemHandler} />
      <SortButton onSortClick={onSortHandler} />
    </div>
  );
}
