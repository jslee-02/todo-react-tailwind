import React from "react";
import styles from "@/styles/TodoList.module.css";

const AdminTodoItem = ({ todo }) => {
  // Parse timestamp
  const timestamp = new Date(todo.timestamp);
  const offsetMs = timestamp.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(timestamp.getTime() - offsetMs);
  const timestampString = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

  // 각 할 일 항목을 렌더링합니다.
  return [
    <div key = "userId" style={{ color: todo.completed ? "#a3a3a3" : "black" }}>
      {todo.userIdZ}
    </div>,
    <div
      key = "content"
      className="ml-2.5"
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "#a3a3a3" : "black"
      }}
    >
      {todo.text}
    </div>,
    <div
      key = "timestamp"
      className="ml-2.5"
      style={{ color: todo.completed ? "#a3a3a3" : "black" }}
    >
        {timestampString}
    </div>
  ];
};

// TodoItem 컴포넌트를 내보냅니다.
export default AdminTodoItem;
