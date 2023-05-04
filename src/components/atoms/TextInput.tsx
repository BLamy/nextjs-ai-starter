
import React from 'react';

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const TextInput = ({ value, onChange }: TextInputProps) => {
  return (
    <input
      type="text"
      className="border border-red-500 p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
export type { TextInputProps };
```

To use this component, simply import it and render it like this:

```tsx
<TextInput
  value={text}
  onChange={(newValue) => setText(newValue)}
/>
