import { useState, useCallback } from "react";

type SearchComponentProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchComponent = ({ value, onChange }: SearchComponentProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  return (
    <div className="mt-4 w-full flex justify-center">
      <input
        type="text"
        className="p-2 border w-80 rounded"
        placeholder="Search"
        value={value ?? inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
export type { SearchComponentProps };
