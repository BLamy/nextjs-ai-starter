
import { useState } from 'react';

interface InputFieldProps {
  label: string;
}

const InputField = ({ label }: InputFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor="input-field">
        {label}
      </label>
      <input
        id="input-field"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="ring ring-purple-500 focus:ring-2 outline-none border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
};

export default InputField;

