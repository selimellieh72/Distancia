import React from "react";
import { Button } from "@chakra-ui/button";

export default function TestCard(props) {
  return (
    <>
      <div className="card-test">
        <div className="card-test__heading">
          <h1 className="card-test__title">Test en Philosophie Chapitre 1</h1>
          <div className="card-test__date">
            <span>Test on:</span>
            <span> 29/06/2007</span>
          </div>
        </div>
        <div className="card-test__body">
          <p className="car-test__body__content">Content content content content content content content content</p>
        </div>
        <div className="card-test__footer">
          {!props.isTeacher ?<Button className="card-test__button" colorScheme="blue">Take quiz</Button> : <Button className="card-test__button" colorScheme="blue">See answers</Button>}
        </div>
      </div>
      <hr className="card-test__divider"/>
    </>
  );
}
