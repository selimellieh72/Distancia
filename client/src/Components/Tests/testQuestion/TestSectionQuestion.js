import React from "react";
import MultipleQuestion from "./MultipleQuestion";
import SingleQuestion from "./SingleQuestion";
import TextQuestion from "./TextQuestion";

export default function TestSectionAnswer() {
  return (
    <div className="test-section__creator">
      <h1 className="test-section__question__title">Question 1</h1>
      <hr className="test-section__divider" />
      <div className="test-section__question__content">
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis massa nec arcu bibendum dapibus non quis est. Quisque massa diam,
          pellentesque sed ante quis, venenatis placerat turpis. Fusce sed nisi
          sit amet nisi semper porta. Quisque ultrices feugiat tincidunt. Duis
          aliquet fringilla lectus, eu scelerisque ligula consequat ac. Sed diam
          velit, elementum non risus vitae, luctus viverra magna. Maecenas
          tempus, neque ullamcorper mattis fringilla, leo eros vehicula arcu, ut
          dapibus neque dolor non nisi. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.{" "}
        </span>
      </div>
      <TextQuestion />
      <SingleQuestion/>
      <MultipleQuestion/>
    </div>
  );
}
