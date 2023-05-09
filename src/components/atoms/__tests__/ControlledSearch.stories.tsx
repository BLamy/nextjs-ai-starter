import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import ControlledSearch, {
  ControlledSearchProps,
} from "../components/ControlledSearch/ControlledSearch";

export default {
  title: "Example/ControlledSearch",
  component: ControlledSearch,
} as Meta;

const ControlledSearchTemplate: Story<ControlledSearchProps> = (args) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <ControlledSearch
      {...args}
      searchValue={searchValue}
      onSearchChange={(newValue) => setSearchValue(newValue)}
    />
  );
};

export const Default = ControlledSearchTemplate.bind({});
Default.args = {
  placeholderText: "Search...",
};
