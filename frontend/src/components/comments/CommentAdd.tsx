import { useState } from "react";

interface CommentAddProps {
  onCommentAddValue: (value: string) => void;
  isAddVisible: boolean;
}

export function CommentAdd({ onCommentAddValue, isAddVisible }: CommentAddProps) {
  const [value, setValue] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submit comment " + value)
    onCommentAddValue(value);
    setValue("");
  };

  return (
    <>
      {isAddVisible && (
        <div className="flex w-full pb-1 items-center">
          <div className="fixed top-0 right-0 left-0 bottom-0" />
          <div className="w-full  bg-white relative">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Add comment..."
                className="w-full ml-2 pl-2 text-base select-text outline-none"
                onBlur={submitHandler}
                autoFocus
                value={value}
                onChange={changeHandler}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
