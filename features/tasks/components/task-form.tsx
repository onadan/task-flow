"use client";

import { useState } from "react";
import { useTaskStore } from "../store/task-store";

export function TaskForm() {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description, status: "todo" });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-3">Add New Task</h3>
      <div className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm h-20 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
