interface ShopItemProps {
  title: string;
  onClick: () => void;
}

export function ItemTitle({ title, onClick }: ShopItemProps) {
  return (
    <button
      onClick={onClick}
      className="pl-4 py-3 w-full text-left text-xl select-none"
    >
      {title}
    </button>
  );
}
