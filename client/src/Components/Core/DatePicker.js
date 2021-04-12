import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
export default function DatePicker(props) {
  const [date, setDate] = useState();

  useEffect(() => props.getDate(date), [date]);

  return (
    <div>
      <p>
        Selected date:{" "}
        {date ? format(date, "dd MMM yyyy", { locale: enGB }) : ""}
      </p>
      <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
    </div>
  );
}
