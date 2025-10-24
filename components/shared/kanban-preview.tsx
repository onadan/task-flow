// features/dashboard/KanbanPreview.tsx
import React from "react";
import type { TaskList, Task } from "@/types";
import TaskCard from "@/features/tasks/components/task-card";

interface Props {
  lists: TaskList[];
  tasks: Task[];
}

const KanbanPreview: React.FC<Props> = ({ lists, tasks }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto">
      {lists.map((list) => (
        <div
          key={list.id}
          className="bg-gray-50 dark:bg-neutral-900 rounded p-2 min-w-[200px]"
        >
          <h4 className="font-semibold mb-2">{list.name}</h4>
          <div className="space-y-2">
            {tasks
              .filter((t) => t.listId === list.id)
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanPreview;
