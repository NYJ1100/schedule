//매우 잘 돌아감
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar({ setAlarm }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("12:00");

  const handleSubmit = () => {
    setAlarm(date, time); // 알람 설정
  };

  return (
    <div>
      <h1>알람 설정</h1>
      <Calendar onChange={setDate} value={date} />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
}

export default MyCalendar;



