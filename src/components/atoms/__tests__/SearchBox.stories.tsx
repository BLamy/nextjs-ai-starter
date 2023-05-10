import SearchBox, { SearchBoxProps } from "../SearchBox";
import { Meta, Story } from "@storybook/react";

export default {
  title: "SearchBox",
  component: SearchBox,
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (searchTerm: string) => console.log("Search term: ", searchTerm),
};
