import React from "react";
import { Input, InputLeftElement, InputGroup } from "@chakra-ui/input";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchBar(props) {
  return (
    <InputGroup onChange={(event) => props.setSearchTerm(event.target.value)}>
      <InputLeftElement
        height="30px"
        ml="1.5rem"
        pointerEvents="none"
        children={<Search2Icon color="#2b2b2b" />}
      />
      <Input
        placeholder="Search..."
        focusBorderColor="#2b2b2b"
        ml="1.5rem"
        height="30px"
        borderRadius="15px"
        borderColor="#2b2b2b"
      />
    </InputGroup>
  );
}
