import React, { useReducer, useRef, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TodoList from "./component/TodoList";
import TodoEditor from "./component/TodoEditor";
import Calendar from "./pages/Calendar";
import Header from "./component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [alarmDetails, setAlarmDetails] = useState(null);
  const navigate = useNavigate();

  // 알람 설정 시 호출
  const setAlarm = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const alarmDate = new Date(date);
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate > new Date()) {
      setAlarmDetails(alarmDate);
      navigate("/todo-editor"); // 할 일 추가 화면으로 이동
    } else {
      toast.error("현재 시간 이후로 설정하세요!");
    }
  };

  const onCreate = (content) => {
    if (!alarmDetails) {
      toast.error("알람 설정이 필요합니다.");
      return;
    }

    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        alarmTime: alarmDetails.getTime(),
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
    setAlarmDetails(null); // 알람 설정 초기화
    toast.success("할 일이 추가되었습니다!");
    navigate("/todo-list"); // 할 일 목록 화면으로 이동
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      data.forEach((item) => {
        if (!item.isDone && item.alarmTime && item.alarmTime <= now) {
          toast.info(`⏰ 알림: ${item.content}`);
          dispatch({ type: "UPDATE", targetId: item.id }); // 알람 발생 후 완료 처리
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const actions = { onCreate, setAlarm };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={actions}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo-list" element={<TodoList />} />
            <Route path="/todo-editor" element={<TodoEditor />} />
            <Route
              path="/calendar"
              element={<Calendar setAlarm={setAlarm} />}
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;


