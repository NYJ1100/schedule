import React, { useContext, useState } from "react";
import { TodoDispatchContext } from "../App";

function TodoEditor() {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("할 일을 입력하세요.");
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <div>
      <h1>할 일 추가</h1>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}

export default TodoEditor;



