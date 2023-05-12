import React, { useState, useEffect } from "react";
import AdminTodoItem from "@/components/AdminTodoItem";
import styles from "@/styles/TodoList.module.css";

// firebase 관련 모듈 import
import { db } from "@/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

const todoCollection = collection(db, "todos");

const AdminPanel = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const getTodos = async () => {
    // Firestore 쿼리를 만듭니다.
    const q = query(
      todoCollection,
      orderBy("userId"),
      orderBy("timestamp")
    );

    // Firestore 에서 할 일 목록을 조회합니다.
    const results = await getDocs(q);
    const newTodos = [];

    // 가져온 할 일 목록을 newTodos 배열에 담습니다.
    results.docs.forEach((doc) => {
      // console.log(doc.data());
      // id 값을 Firestore 에 저장한 값으로 지정하고, 나머지 데이터를 newTodos 배열에 담습니다.
      newTodos.push({ id: doc.id, ...doc.data() });
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={`max-w-[600px] mb-5 mx-auto p-5
                    bg-white rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.1)]
                    grid grid-cols-[18fr_52fr_30fr] gap-y-2.5`}>
      <h1 className="col-span-3 text-xl mb-6 font-bold">
        Todo List of All Users
      </h1>

      {/* 할 일 목록을 렌더링합니다. */}

        <div> User Id </div>
        <div className="ml-2.5"> Content </div>
        <div className="ml-2.5"> Timestamp </div>
        <hr className="h-px bg-gray-500 border-0 mr-0.5"></hr>
        <hr className="h-px bg-gray-500 border-0 mr-0.5 ml-2.5"></hr>
        <hr className="h-px bg-gray-500 border-0 ml-2.5"></hr>
        {todos.map((todo) => (
          <AdminTodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
    </div>
  );
};

export default AdminPanel;