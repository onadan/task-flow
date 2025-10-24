// src/stores/taskflowStore.ts
import { create } from "zustand";
import type { Project, TaskList, Task, Comment, ProjectMember } from "../types";

type TaskflowState = {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addTaskList: (projectId: string, list: TaskList) => void;
  updateTaskList: (
    projectId: string,
    listId: string,
    data: Partial<TaskList>
  ) => void;
  reorderTaskLists: (projectId: string, newOrder: string[]) => void;

  addTask: (projectId: string, listId: string, task: Task) => void;
  updateTask: (projectId: string, taskId: string, data: Partial<Task>) => void;
  reorderTasks: (listId: string, newOrder: string[]) => void;

  addComment: (taskId: string, comment: Comment) => void;
  updateComment: (
    taskId: string,
    commentId: string,
    data: Partial<Comment>
  ) => void;
  deleteComment: (taskId: string, commentId: string) => void;
  moveTask: (taskId: string, newListId: string, newIndex: number) => void;

  lists: TaskList[];
};

export const useTaskflowStore = create<TaskflowState>((set) => ({
  lists: [
    {
      id: "l1",
      projectId: "p1",
      name: "Todo",
      position: 0,
      createdAt: new Date().toISOString(),
    } as TaskList,
    {
      id: "l2",
      projectId: "p1",
      name: "In Progress",
      position: 1,
      createdAt: new Date().toISOString(),
    } as TaskList,
    {
      id: "l3",
      projectId: "p1",
      name: "Done",
      position: 2,
      createdAt: new Date().toISOString(),
    } as TaskList,
  ],
  projects: [
    {
      id: "p1",
      name: "Taskflow",
      description: "Personal project management board",
      ownerId: "u1",
      members: [
        {
          id: "m1",
          userId: "u1",
          name: "Doc",
          email: "doc@example.com",
          role: "owner",
          joinedAt: new Date().toISOString(),
        } as ProjectMember,
      ],
      lists: [
        {
          id: "l1",
          projectId: "p1",
          name: "Todo",
          position: 0,
          createdAt: new Date().toISOString(),
        } as TaskList,
        {
          id: "l2",
          projectId: "p1",
          name: "In Progress",
          position: 1,
          createdAt: new Date().toISOString(),
        } as TaskList,
        {
          id: "l3",
          projectId: "p1",
          name: "Done",
          position: 2,
          createdAt: new Date().toISOString(),
        } as TaskList,
      ],
      tasks: [
        {
          id: "t1",
          projectId: "p1",
          listId: "l1",
          title: "Set up project",
          description:
            "Initialize the project repository and install dependencies.",
          position: 0,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["setup", "backend"],
          createdAt: new Date().toISOString(),
          comments: [
            {
              id: "c1",
              taskId: "t1",
              userId: "u1",
              userName: "Doc",
              content: "Don't forget to set up the .env file.",
              createdAt: new Date().toISOString(),
            },
          ],
        },
        {
          id: "t2",
          projectId: "p1",
          listId: "l2",
          title: "Design database schema",
          description: "Create the initial database schema for the project.",
          position: 1,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "medium",
          labels: ["design", "database"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t3",
          projectId: "p1",
          listId: "l3",
          title: "Deploy to production",
          description: "Deploy the application to the production environment.",
          position: 2,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["deployment"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t4",
          projectId: "p1",
          listId: "l1",
          title: "Write documentation",
          description: "Create project documentation for onboarding.",
          position: 3,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "medium",
          labels: ["docs", "writing"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t5",
          projectId: "p1",
          listId: "l2",
          title: "Implement authentication",
          description: "Add user authentication to the app.",
          position: 4,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["backend", "auth"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t6",
          projectId: "p1",
          listId: "l3",
          title: "Fix deployment bugs",
          description: "Resolve issues found during deployment.",
          position: 5,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["bugfix", "deployment"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t7",
          projectId: "p1",
          listId: "l1",
          title: "Set up CI/CD pipeline",
          description: "Automate testing and deployment.",
          position: 6,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "medium",
          labels: ["ci/cd", "automation"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t8",
          projectId: "p1",
          listId: "l2",
          title: "Design landing page",
          description: "Create a responsive design for the landing page.",
          position: 7,
          assignedTo: "u1",
          dueDate: new Date().toISOString(),
          priority: "low",
          labels: ["frontend", "design"],
          createdAt: new Date().toISOString(),
        },
      ],
      color: "#ff3131",
      archived: false,
      createdAt: new Date().toISOString(),
    } as Project,
    {
      id: "p2",
      name: "Marketing Campaign",
      description: "Plan and execute the new marketing campaign.",
      ownerId: "u2",
      members: [
        {
          id: "m2",
          userId: "u2",
          name: "Alice",
          email: "alice@example.com",
          role: "owner",
          joinedAt: new Date().toISOString(),
        },
      ],
      lists: [
        {
          id: "l4",
          projectId: "p2",
          name: "Ideas",
          position: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: "l5",
          projectId: "p2",
          name: "Execution",
          position: 1,
          createdAt: new Date().toISOString(),
        },
      ],
      tasks: [
        {
          id: "t4",
          projectId: "p2",
          listId: "l4",
          title: "Brainstorm ideas",
          description: "Come up with creative ideas for the campaign.",
          position: 0,
          assignedTo: "u2",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["brainstorm", "marketing"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t5",
          projectId: "p2",
          listId: "l5",
          title: "Create ad content",
          description: "Develop content for social media ads.",
          position: 1,
          assignedTo: "u2",
          dueDate: new Date().toISOString(),
          priority: "medium",
          labels: ["content", "ads"],
          createdAt: new Date().toISOString(),
        },
      ],
      color: "#31a2ff",
      archived: false,
      createdAt: new Date().toISOString(),
    } as Project,
    {
      id: "p3",
      name: "Website Redesign",
      description: "Redesign the company website for better UX.",
      ownerId: "u3",
      members: [
        {
          id: "m3",
          userId: "u3",
          name: "Bob",
          email: "bob@example.com",
          role: "owner",
          joinedAt: new Date().toISOString(),
        },
      ],
      lists: [
        {
          id: "l6",
          projectId: "p3",
          name: "Planning",
          position: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: "l7",
          projectId: "p3",
          name: "Design",
          position: 1,
          createdAt: new Date().toISOString(),
        },
      ],
      tasks: [
        {
          id: "t6",
          projectId: "p3",
          listId: "l6",
          title: "Research competitors",
          description: "Analyze competitor websites for inspiration.",
          position: 0,
          assignedTo: "u3",
          dueDate: new Date().toISOString(),
          priority: "medium",
          labels: ["research", "design"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t7",
          projectId: "p3",
          listId: "l7",
          title: "Create wireframes",
          description: "Design wireframes for the new layout.",
          position: 1,
          assignedTo: "u3",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["design", "wireframes"],
          createdAt: new Date().toISOString(),
        },
      ],
      color: "#ff9931",
      archived: false,
      createdAt: new Date().toISOString(),
    } as Project,
    {
      id: "p4",
      name: "Product Launch",
      description: "Coordinate the launch of the new product.",
      ownerId: "u4",
      members: [
        {
          id: "m4",
          userId: "u4",
          name: "Charlie",
          email: "charlie@example.com",
          role: "owner",
          joinedAt: new Date().toISOString(),
        },
      ],
      lists: [
        {
          id: "l8",
          projectId: "p4",
          name: "Preparation",
          position: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: "l9",
          projectId: "p4",
          name: "Launch",
          position: 1,
          createdAt: new Date().toISOString(),
        },
      ],
      tasks: [
        {
          id: "t8",
          projectId: "p4",
          listId: "l8",
          title: "Prepare launch materials",
          description: "Create presentations and marketing materials.",
          position: 0,
          assignedTo: "u4",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["launch", "materials"],
          createdAt: new Date().toISOString(),
        },
        {
          id: "t9",
          projectId: "p4",
          listId: "l9",
          title: "Coordinate launch event",
          description: "Plan and execute the product launch event.",
          position: 1,
          assignedTo: "u4",
          dueDate: new Date().toISOString(),
          priority: "high",
          labels: ["event", "launch"],
          createdAt: new Date().toISOString(),
        },
      ],
      color: "#31ff6f",
      archived: false,
      createdAt: new Date().toISOString(),
    } as Project,
  ],

  // -----------------------
  // Project CRUD
  // -----------------------
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),

  // -----------------------
  // TaskList CRUD
  // -----------------------
  addTaskList: (projectId, list) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, lists: [...p.lists, list] } : p
      ),
    })),
  updateTaskList: (projectId, listId, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              lists: p.lists.map((l) =>
                l.id === listId ? { ...l, ...data } : l
              ),
            }
          : p
      ),
    })),
  reorderTaskLists: (projectId, newOrder) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              lists: newOrder.map((id, index) => ({
                ...p.lists.find((l) => l.id === id)!,
                position: index,
              })),
            }
          : p
      ),
    })),

  // -----------------------
  // Task CRUD
  // -----------------------
  addTask: (projectId, listId, task) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
      ),
    })),
  updateTask: (projectId, taskId, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, ...data } : t
              ),
            }
          : p
      ),
    })),
  reorderTasks: (listId, newOrder) =>
    set((state) => ({
      projects: state.projects.map((p) => ({
        ...p,
        tasks: p.tasks.map((t) =>
          t.listId === listId ? { ...t, position: newOrder.indexOf(t.id) } : t
        ),
      })),
    })),

  // -----------------------
  // Comment CRUD
  // -----------------------
  addComment: (taskId, comment) =>
    set((state) => ({
      projects: state.projects.map((p) => ({
        ...p,
        tasks: p.tasks.map((t) =>
          t.id === taskId
            ? { ...t, comments: [...(t.comments || []), comment] }
            : t
        ),
      })),
    })),
  updateComment: (taskId, commentId, data) =>
    set((state) => ({
      projects: state.projects.map((p) => ({
        ...p,
        tasks: p.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                comments: t.comments?.map((c) =>
                  c.id === commentId ? { ...c, ...data } : c
                ),
              }
            : t
        ),
      })),
    })),
  deleteComment: (taskId, commentId) =>
    set((state) => ({
      projects: state.projects.map((p) => ({
        ...p,
        tasks: p.tasks.map((t) =>
          t.id === taskId
            ? { ...t, comments: t.comments?.filter((c) => c.id !== commentId) }
            : t
        ),
      })),
    })),

  moveTask: (taskId, newListId, newIndex) => {
    set((state) => {
      const projects = state.projects.map((project) => {
        const tasks = [...project.tasks];
        const taskIndex = tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return project;

        const [task] = tasks.splice(taskIndex, 1);
        task.listId = newListId;

        // Insert at newIndex
        tasks.splice(newIndex, 0, task);

        return { ...project, tasks };
      });
      return { projects };
    });
  },
}));
