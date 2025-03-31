import React, { useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "../constants/url";

type TodoProps = {
  todo: TodoType;
};

function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, mutate } = useTodos();

  const handleEdit = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const response = await fetch(
        `http://localhost:8080/editTodo/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editedTitle,
          }),
        }
      );
      if (response.ok) {
        const editedTodo = await response.json();
        const udpateTodos = (todos ?? []).map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(udpateTodos, false);
        mutate();
      }
    }
  };

  const toggleTodoCompletion = async (id: number, isCompleted: boolean) => {
    const response = await fetch(`${API_URL}/editTodo/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    });
    if (response.ok) {
      const editedTodo = await response.json();
      const udpateTodos = (todos ?? []).map((todo: TodoType) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      mutate(udpateTodos, false);
      mutate();
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/delTodo/${todo.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const updateTodos = (todos ?? []).filter(
        (todo: TodoType) => todo.id == id
      );
      mutate(updateTodos, false);
      mutate();
    }
  };

  return (
    <>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
            border-gray-300 rounded"
              onChange={() => toggleTodoCompletion(todo.id, todo.isCompleted)}
              checked={todo.isCompleted}
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border rounded py-1 px-2"
                />
              ) : (
                <span
                  className={`text-lg font-medium mr-2 ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {" "}
                  {todo.title}{" "}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            >
              {isEditing ? "Save" : "✒"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            >
              ✖
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default Todo;
