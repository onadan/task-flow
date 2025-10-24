"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { useTaskflowStore } from "@/store/app-store";
import TaskCard from "@/features/tasks/components/task-card";
// import { notFound } from "next/navigation";
import { Project } from "@/types";

interface Props {
  project: Project;
}

const ProjectKanban: React.FC<Props> = ({ project }) => {
  const { tasks, lists } = project;
  const { moveTask } = useTaskflowStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [fromListId, taskId] = active.id.toString().split("|");
    const [toListId, newTaskId] = over.id.toString().split("|");

    if (fromListId === toListId && taskId === newTaskId) return;

    const tasksInList = tasks.filter((t) => t.listId === toListId);
    const newIndex = tasksInList.findIndex((t) => t.id === newTaskId);
    moveTask(taskId, toListId, newIndex >= 0 ? newIndex : tasksInList.length);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 overflow-x-auto">
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-gray-50 dark:bg-neutral-900 rounded p-2 min-w-[250px] shrink-0"
            >
              <h4 className="font-semibold mb-2 capitalize">{list.name}</h4>
              <div className="space-y-2">
                {tasks
                  .filter((t) => t.listId === list.id)
                  .map((task) => (
                    <div
                      key={`${list.id}|${task.id}`}
                      id={`${list.id}|${task.id}`}
                    >
                      <TaskCard task={task} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default ProjectKanban;
