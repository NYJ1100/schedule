
//매우 잘 돌아감
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AlarmScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");

  const handleSubmit = () => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const alarmDate = new Date(selectedDate);
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate > new Date()) {
      console.log(`알람 설정됨: ${alarmDate}`);
    } else {
      alert("현재 시간 이후로 설정하세요!");
    }
  };

  return (
    <div>
      <h1>알람 설정</h1>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
      <button onClick={handleSubmit}>알람 설정</button>
    </div>
  );
}

export default AlarmScheduler;





