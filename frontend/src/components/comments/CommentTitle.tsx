interface CommentitleProps {
  title?: string;
  editHandler?: () => void;
}

export function Commentitle({ title, editHandler }: CommentitleProps) {
  return (
    <button
      onClick={editHandler}
      className="pl-4 pb-0 w-full text-left text-base select-none"
    >
      {title}
    </button>
  );
}
