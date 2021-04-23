import React from "react";
import {
  Menu,
  Portal,
  MenuList,
  MenuItem,
  MenuButton,
  Flex,
  Button,
} from "@chakra-ui/react";
export default function SortHomeworks({ homeworksFilter, setHomeworksFilter }) {
  const MyMenuItem = ({ filter, children }) => (
    <MenuItem
      color={homeworksFilter === filter ? "white" : undefined}
      bg={homeworksFilter === filter ? "green.500" : undefined}
      onClick={() => setHomeworksFilter(filter)}
      _focus={{ bg: "gray.100", color: "#2b2b2b" }}
      _hover={{ bg: "gray.100", color: "#2b2b2b" }}
    >
      {children}
    </MenuItem>
  );
  return (
    <Flex mb="18px" justifyContent="end">
      <Menu>
        <MenuButton ml="auto" as={Button} colorScheme="blue">
          Sort by
        </MenuButton>
        <Portal>
          <MenuList>
            <MyMenuItem filter="all">All</MyMenuItem>
            <MyMenuItem filter="done">Done</MyMenuItem>
            <MyMenuItem filter="undone">Undone</MyMenuItem>
            <MyMenuItem filter="expired">Expired</MyMenuItem>
            <MyMenuItem filter="notExpired">Not expired</MyMenuItem>
            <MyMenuItem filter="seen">Seen</MyMenuItem>
            <MyMenuItem filter="notSeen">Not seen</MyMenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  );
}
