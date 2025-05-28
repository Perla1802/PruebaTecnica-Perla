import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";

export const TodosList = () => {
  const { todos } = useSelector((state) => state.users);

  if (todos.length === 0)
    return <p className="text-center text-gray-500">Datos no disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {todos.map((todo, index) => (
        <Card
          key={todo.id}
          title={
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              {todo.title}
            </span>
          }
          hoverable
          className="hover:shadow-xl transition-shadow duration-300"
          style={{
            border: "1px solid #e8e8e8",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
            maxWidth: "100%",
          }}
        >
          <p style={{ color: "#555" }}>
            Status:{" "}
            <span style={{ color: todo.completed ? "#13c16c" : "#C70039" }}>
              {todo.completed ? "Completada" : "No completada"}
            </span>
          </p>
        </Card>
      ))}
    </div>
  );
};
