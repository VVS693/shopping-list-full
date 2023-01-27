import { useEffect, useRef, useState } from "react";

interface ShopItemProps {
  title: string;
  onEdit: (el: string) => void;
  onDel: () => void;
}

export function ItemEdit({ title, onEdit, onDel }: ShopItemProps) {
  const [value, setValue] = useState(title);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const isDel = useRef(false);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDel.current) {
      if (value.trim().length !== 0) {
        onEdit(value);
      } else {
        onDel();
      }
    }
  };

  const inputReference: any = useRef(null);
  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const onFocusHandler = () => {
    isDel.current = true;
    onDel();
  };
  const onClickHandler = () => {
    isDel.current = true;
    onDel();
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0" />
      <div className="w-full py-1 bg-white relative flex flex-nowrap justify-between">
        <form onSubmit={submitHandler} className="w-full pr-2">
          <input
            type="text"
            ref={inputReference}
            className="w-full ml-2 pl-2 pr-12 pb-2 pt-2 text-xl select-text outline-none"
            onBlur={(el) => {
              setTimeout(() => {
                submitHandler(el);
              }, 0);
            }}
            value={value}
            onChange={changeHandler}
          />
        </form>
        <button
          className="absolute top-0 bottom-0 right-0"
          onFocus={onFocusHandler}
          onClick={onClickHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
