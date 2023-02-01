import { Button } from "@material-tailwind/react";

interface FooterMenuProps {
  onChatClick?: () => void
  onSortClick?: () => void;
  onShowCommentsClick?: () => void;
}

export function FooterMenu({
  onChatClick,
  onSortClick,
  onShowCommentsClick,
}: FooterMenuProps) {
  return (
    <div className="flex w-96 fixed justify-around bottom-0 px-4 pb-8 pt-3 border-t bg-white">
      <Button
        size="sm"
        variant="outlined"
        className="w-24 tracking-wider mr-2 text-blue-gray-800 border-blue-gray-800 focus:ring-blue-gray-300"
        onClick={onChatClick}
      >
        Chat
      </Button>

      <Button
        size="sm"
        variant="outlined"
        className="w-32 tracking-wider mx-2 text-blue-gray-800 border-blue-gray-800 focus:ring-blue-gray-300"
        onClick={onShowCommentsClick}
      >
        Comments
      </Button>
      <Button
        size="sm"
        variant="outlined"
        className="w-24 tracking-wider ml-2 text-blue-gray-800 border-blue-gray-800 focus:ring-blue-gray-300"
        onClick={onSortClick}
      >
        Sort
      </Button>
    </div>
  );
}
