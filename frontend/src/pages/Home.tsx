import { ErrorMessage } from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllSortedItems } from "../store/reducers/actionsItemsCreators";
import { sortItemsArray } from "../store/reducers/itemsSlice";
import { Header } from "../components/Header";
import { animateScroll } from "react-scroll";
import { FooterMenu } from "../components/FooterMenu";
import { ItemsList } from "../components/items/ItemsList";

export function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.itemsReducer);

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: "easeInQuad",
    });
    dispatch(sortItemsArray());
    dispatch(fetchAllSortedItems());
  };

  return (
    <div className="container mx-auto max-w-sm pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} />
      )}
      <ItemsList />
      <FooterMenu onSortClick={onSortHandler} />
    </div>
  );
}
