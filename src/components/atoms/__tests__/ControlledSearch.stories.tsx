import { Story, Meta } from "@storybook/react";
import { useState } from "react";

import ControlledSearch, { ControlledSearchProps } from "../ControlledSearch";

export default {
  title: "Components/ControlledSearch",
  component: ControlledSearch,
} as Meta;

const Template: Story<ControlledSearchProps> = (args) => {
  const [searchValue, setSearchValue] = useState(args.value || "");

  return (
    <div>
      <ControlledSearch
        {...args}
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
      />
      <p className="mt-4">Search value: {searchValue}</p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "",
};
