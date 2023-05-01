// AnimatedTabs.tsx
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "react-aria-components";

type TabType = {
  id: string;
  label: string;
};

type AnimatedTabsProps = {
  tabs: TabType[];
  onChange: (index: number, id: string) => void;
};

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ tabs, onChange }) => {
  const handleTabChange = (index: string) => {
    const selectedTab = tabs[index];
    onChange(index, selectedTab.id);
  };

  return (
    <Tabs className="w-fit max-w-[350px] mx-auto my-12">
       <TabList className="flex space-x-1" items={tabs} onSelectionChange={handleTabChange}>
        {(tab) => (
          <Tab
            className={({ isSelected }) =>
              `${
                isSelected
                  ? ""
                  : "data-[hovered]:text-white/70 data-[pressed]:text-white/60"
              } group relative rounded-full cursor-default px-3 py-1.5 text-md sm:text-sm text-white transition outline-none touch-none`
            }
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {({ isSelected }) => (
              <>
                {isSelected && (
                  <motion.span
                    layoutId="bubble"
                    layoutDependency={false}
                    className="absolute inset-0 z-10 bg-white mix-blend-difference group-data-[focus-visible]:ring-2 ring-sky-400 ring-offset-2 ring-offset-gray-800"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </>
            )}
          </Tab>
        )}
      </TabList>
      <TabPanels items={tabs}>
        {(tab) => (
          <TabPanel className="px-2 my-4 text-white font-light text-sm outline-none data-[focus-visible]:ring-2 ring-sky-400 rounded">
            <h2 className="mb-2 font-semibold">{tab.label} contents...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              sit amet nisl blandit, pellentesque eros eu, scelerisque eros. Sed
              cursus urna at nunc lacinia dapibus.
            </p>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default AnimatedTabs;
