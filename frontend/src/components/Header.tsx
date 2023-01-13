import { Loader } from "./Loader";

interface HeaderProps {
    isLoading: boolean;
  }

export function Header({isLoading}: HeaderProps) {
  return (
    <div className="flex justify-between w-full p-2 px-6 border-b">
      <h1 className="text-left font-bold text-2xl  select-none">
        Shopping List
      </h1>
      {isLoading && <Loader />}
    </div>
  );
}
