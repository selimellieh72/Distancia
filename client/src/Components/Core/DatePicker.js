import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { Collapse } from "react-collapse";
import { Button } from "@chakra-ui/react";

export default function DatePicker(props) {
  const [date, setDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.getDate(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <>
      <Button mb="1rem" mt="1rem" onClick={() => setIsOpen(!isOpen)} colorScheme="green">
        Set due Date
      </Button>
      <Collapse isOpened={isOpen}>
        <div>
          <p>
            Selected date:{" "}
            {date ? format(date, "dd MMM yyyy", { locale: enGB }) : ""}
          </p>
          <DatePickerCalendar
            date={date}
            onDateChange={setDate}
            locale={enGB}
          />
        </div>
      </Collapse>
    </>
  );
}
