interface ShopItemProps {
  title: string;
  editHandler: () => void;
}

export function ItemTitle({ title, editHandler }: ShopItemProps) {
  return (
    <button
      onClick={editHandler}
      className="pl-4 py-3 w-full text-left text-xl select-none"
    >
      {title}
    </button>
  );
}
