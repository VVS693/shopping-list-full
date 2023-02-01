import { useRef, useState } from "react";
import { CheckBox } from "./Checkbox";

interface AddItemProps {
  onAdd: (value: string) => void;
}

export function AddItem({ onAdd }: AddItemProps) {
  const [value, setValue] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().length === 0) {
      return setIsAddFormVisible(false);
    }
    onAdd(value.trim());
    setIsAddFormVisible(false);
    setValue("");
  };

  const inputRef = useRef<any>()

  return (
    <>
      {!isAddFormVisible ? (
        <button
          className="py-3 w-full h-14 text-left pl-16"
          onClick={() => {
            setIsAddFormVisible(true);
          }}
        />
      ) : (
        <div className="flex w-full px-4 items-center">
          <CheckBox isCompleted={false} onChangeCheckBox={() => {}} />
          <div className="fixed top-0 right-0 left-0 bottom-0" />
          <div className="w-full py-1 mb-0 bg-white relative">
            <form onSubmit={submitHandler}>
              <input
                ref={inputRef}
                type="text"
                style={{ width: inputRef.current ? inputRef.current.value.length + 'ch' : 'auto' }}
                placeholder="Add element..."
                className="w-full ml-2 p-2 text-xl select-text outline-none"
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
