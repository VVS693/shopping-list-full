import { Button } from "@material-tailwind/react";

interface FooterMenuProps {
  onSortClick?: () => void;
  onShowCommentsClick?: () => void;
}

export function FooterMenu({
  onSortClick,
  onShowCommentsClick,
}: FooterMenuProps) {
  return (
    <div className="flex w-96 fixed justify-between bottom-0 px-4 pb-8 pt-3 border-t bg-white">
      <Button
        size="md"
        variant="outlined"
        className="w-32 tracking-wider mx-4 text-blue-gray-800 border-blue-gray-800 focus:ring-blue-gray-300"
        onClick={onShowCommentsClick}
      >
        Comments
      </Button>
      <Button
        size="md"
        variant="outlined"
        className="w-32 tracking-wider mx-4 text-blue-gray-800 border-blue-gray-800 focus:ring-blue-gray-300"
        onClick={onSortClick}
      >
        Sort
      </Button>
    </div>
  );
}
