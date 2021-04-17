import React, { useState } from "react";
import TestTextSection, { TestMultipleSection } from "./TestSection";
import AddTestButton from "../testCreator/AddTestButton";
import { Center, Button } from "@chakra-ui/react";
import { ReactComponent as RoundedAddSvg } from "../../../assets/svg/roundedPlus.svg";

export default function TestSectionList() {
  var [testSectionNumber, addTestSection] = useState(1);
  console.log(testSectionNumber);
  return (
    <div className="test-sections__list">
      {[...Array(testSectionNumber)].map((e, i) =>  <TestTextSection />)}
      <Center>
        <Button onClick={() => addTestSection(testSectionNumber + 1)}>
          <RoundedAddSvg className="add-component-button" />
        </Button>
      </Center>
    </div>
  );
}
