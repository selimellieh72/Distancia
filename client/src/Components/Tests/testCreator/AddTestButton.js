import React from "react";
import { Button } from "@chakra-ui/button";
import { ReactComponent as RoundedAddSvg } from "../../../assets/svg/roundedPlus.svg";

export default function AddTestButton() {
  return (
    <>
      <Button>
        <RoundedAddSvg className="add-component-button"/>
      </Button>
    </>
  );
}
