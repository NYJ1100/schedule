import React from "react";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>메인 화면</h1>
      <p>원하는 기능을 선택하세요:</p>
      <div style={{ margin: "20px" }}>
        <Button onClick={() => navigate("/calendar")} label="알람 설정하기" />
        <Button onClick={() => navigate("/todo-list")} label="할 일 목록 보기" />
        <Button onClick={() => navigate("/todo-editor")} label="할 일 추가하기" />
      </div>
    </div>
  );
}

export default Home;
