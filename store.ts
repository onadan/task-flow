import {
  Column,
  ID,
  Project,
  ProjectMember,
  Task,
  Comment,
  User,
} from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STATIC_COLUMNS } from "./lib/constants";

interface AppState {
  projects: Project[];
  tasks: Task[];
  columns: Column[];
  projectMembers: ProjectMember[];
  comments: Comment[];
  users: User[];
  currentUserId: ID | null;
  isLoading: boolean;
}

interface AppActions {
  register: (userData: Pick<User, "name" | "email">) => {
    user?: User;
    error?: string;
  };
  login: (credentials: Pick<User, "email">) => { user?: User; error?: string };
  logout: () => void;
  getCurrentUser: () => User | null;
  updateUser: (updates: Partial<Pick<User, "name" | "email">>) => {
    user?: User;
    error?: string;
  };
  clearAllData: () => void;
  deleteAccount: () => void;

  // Project Actions
  addProject: (
    newProjectData: Pick<Project, "name" | "color"> &
      Partial<Pick<Project, "description">>
  ) => Project | null;
  updateProject: (projectId: ID, updates: Partial<Project>) => void;
  archiveProject: (projectId: ID) => void;
  deleteProject: (projectId: ID) => void;

  // Task Actions
  addTask: (
    newTaskData: Pick<Task, "projectId" | "title" | "columnId"> &
      Partial<
        Pick<
          Task,
          "description" | "assignedTo" | "dueDate" | "priority" | "labels"
        >
      >
  ) => Task;
  updateTask: (taskId: ID, updates: Partial<Task>) => void;
  deleteTask: (taskId: ID) => void;
  moveTask: (taskId: ID, newColumnId: ID, newPosition: number) => void;

  // Member Actions
  addMemberToProject: (
    newMemberData: Pick<ProjectMember, "projectId" | "email">
  ) => { member?: ProjectMember; error?: string };
  updateMemberRole: (memberId: ID, newRole: "owner" | "collaborator") => void;
  removeMemberFromProject: (memberId: ID) => void;

  // Comment Actions
  addComment: (
    newCommentData: Pick<Comment, "taskId" | "userId" | "userName" | "content">
  ) => void;
  updateComment: (commentId: ID, newContent: string) => void;
  deleteComment: (commentId: ID) => void;
}

const initialState: AppState = {
  projects: [],
  tasks: [],
  columns: STATIC_COLUMNS,
  projectMembers: [],
  comments: [],
  users: [],
  currentUserId: null,
  isLoading: true,
};

export const useTaskFlowStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      register: (userData) => {
        const { users } = get();
        const userExists = users.find((u) => u.email === userData.email);
        if (userExists) {
          return { error: "A user with this email already exists." };
        }
        const now = new Date().toISOString();
        const newUser: User = {
          ...userData,
          id: crypto.randomUUID(),
          createdAt: now,
        };
        set((state) => ({ users: [...state.users, newUser] }));
        get().login({ email: newUser.email });
        return { user: newUser };
      },

      login: (credentials) => {
        const { users } = get();
        const user = users.find((u) => u.email === credentials.email);
        if (user) {
          set({ currentUserId: user.id });
          return { user };
        }
        return { error: "Invalid credentials." };
      },

      logout: () => {
        set({ currentUserId: null });
      },

      getCurrentUser: () => {
        const { users, currentUserId } = get();
        if (!currentUserId) return null;
        return users.find((u) => u.id === currentUserId) || null;
      },

      updateUser: (updates) => {
        const { users, currentUserId } = get();
        if (!currentUserId) {
          return { error: "No user is logged in." };
        }

        const currentUser = users.find((u) => u.id === currentUserId);
        if (!currentUser) {
          return { error: "User not found." };
        }

        // Check if email is already taken by another user
        if (updates.email && updates.email !== currentUser.email) {
          const emailExists = users.find(
            (u) => u.email === updates.email && u.id !== currentUserId
          );
          if (emailExists) {
            return { error: "This email is already taken." };
          }
        }

        const updatedUser = { ...currentUser, ...updates };
        set((state) => ({
          users: state.users.map((u) =>
            u.id === currentUserId ? updatedUser : u
          ),
        }));

        return { user: updatedUser };
      },

      clearAllData: () => {
        const { currentUserId } = get();
        if (!currentUserId) return;

        // Clear all projects, tasks, comments, and members created by this user
        set((state) => {
          const userProjects = state.projects.filter(
            (p) => p.ownerId === currentUserId
          );
          const userProjectIds = new Set(userProjects.map((p) => p.id));

          return {
            projects: state.projects.filter((p) => p.ownerId !== currentUserId),
            tasks: state.tasks.filter((t) => !userProjectIds.has(t.projectId)),
            projectMembers: state.projectMembers.filter(
              (m) => !userProjectIds.has(m.projectId)
            ),
            comments: state.comments.filter((c) => {
              const task = state.tasks.find((t) => t.id === c.taskId);
              return !task || !userProjectIds.has(task.projectId);
            }),
          };
        });
      },

      deleteAccount: () => {
        const { currentUserId } = get();
        if (!currentUserId) return;

        // First clear all user data
        get().clearAllData();

        // Then remove the user
        set((state) => ({
          users: state.users.filter((u) => u.id !== currentUserId),
          currentUserId: null,
        }));
      },

      // --- PROJECT ACTIONS ---

      addProject: (newProjectData) => {
        const { currentUserId, addMemberToProject } = get();
        if (!currentUserId) {
          console.error("No user is logged in to create a project.");
          return null;
        }

        const now = new Date().toISOString();
        const newProject: Project = {
          ...newProjectData,
          id: crypto.randomUUID(),
          ownerId: currentUserId,
          archived: false,
          createdAt: now,
        };

        set((state) => ({
          projects: [...state.projects, newProject],
        }));

        const currentUser = get().getCurrentUser();
        if (currentUser) {
          addMemberToProject({
            projectId: newProject.id,
            email: currentUser.email,
          });
          const member = get().projectMembers.find(
            (m) => m.projectId === newProject.id && m.userId === currentUser.id
          );
          if (member) {
            get().updateMemberRole(member.id, "owner");
          }
        }

        return newProject;
      },

      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      archiveProject: (projectId) => {
        get().updateProject(projectId, { archived: true });
      },

      deleteProject: (projectId) => {
        set((state) => {
          // Get tasks associated with the project to be deleted
          const tasksToDelete = state.tasks.filter(
            (t) => t.projectId === projectId
          );
          const taskIdsToDelete = new Set(tasksToDelete.map((t) => t.id));

          // Filter out the project, its tasks, its members, and comments on its tasks
          return {
            projects: state.projects.filter((p) => p.id !== projectId),
            tasks: state.tasks.filter((t) => t.projectId !== projectId),
            projectMembers: state.projectMembers.filter(
              (m) => m.projectId !== projectId
            ),
            comments: state.comments.filter(
              (c) => !taskIdsToDelete.has(c.taskId)
            ),
          };
        });
      },

      // --- TASK ACTIONS ---

      addTask: (newTaskData) => {
        const now = new Date().toISOString();
        // Get all tasks in the target column to determine the new position
        const tasksInColumn = get().tasks.filter(
          (t) =>
            t.projectId === newTaskData.projectId &&
            t.columnId === newTaskData.columnId
        );

        const newTask: Task = {
          ...newTaskData,
          id: crypto.randomUUID(),
          position: tasksInColumn.length, // Add to the end of the list
          createdAt: now,
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        return newTask;
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, ...updates, updatedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          // Remove the task and all its associated comments
          tasks: state.tasks.filter((t) => t.id !== taskId),
          comments: state.comments.filter((c) => c.taskId !== taskId),
        }));
      },

      moveTask: (taskId, newColumnId, newPosition) => {
        set((state) => {
          let tasks = [...state.tasks];
          const taskToMove = tasks.find((t) => t.id === taskId);

          if (!taskToMove) return state;

          const oldColumnId = taskToMove.columnId;
          const oldPosition = taskToMove.position;
          const projectId = taskToMove.projectId;

          // 1. Remove task from old position:
          // Decrement position of all tasks in the old column that were after it
          tasks = tasks.map((t) => {
            if (
              t.id !== taskId &&
              t.projectId === projectId &&
              t.columnId === oldColumnId &&
              t.position > oldPosition
            ) {
              return { ...t, position: t.position - 1 };
            }
            return t;
          });

          // 2. Add task to new position:
          // Increment position of all tasks in the new column that are at or after newPosition
          tasks = tasks.map((t) => {
            if (
              t.id !== taskId &&
              t.projectId === projectId &&
              t.columnId === newColumnId &&
              t.position >= newPosition
            ) {
              return { ...t, position: t.position + 1 };
            }
            return t;
          });

          // 3. Update the task itself
          tasks = tasks.map((t) => {
            if (t.id === taskId) {
              return {
                ...t,
                columnId: newColumnId,
                position: newPosition,
                updatedAt: new Date().toISOString(),
              };
            }
            return t;
          });

          return { tasks };
        });
      },

      // --- MEMBER ACTIONS ---

      addMemberToProject: (newMemberData) => {
        const { users, projectMembers } = get();
        const userToAdd = users.find((u) => u.email === newMemberData.email);
        if (!userToAdd) {
          return { error: "No user found with this email." };
        }
        const memberExists = projectMembers.find(
          (m) =>
            m.projectId === newMemberData.projectId && m.userId === userToAdd.id
        );
        if (memberExists) {
          return { error: "This user is already a member of the project." };
        }

        const now = new Date().toISOString();
        const newMember: ProjectMember = {
          projectId: newMemberData.projectId,
          email: userToAdd.email,
          id: crypto.randomUUID(),
          userId: userToAdd.id,
          name: userToAdd.name,
          role: "collaborator",
          joinedAt: now,
        };

        set((state) => ({
          projectMembers: [...state.projectMembers, newMember],
        }));
        return { member: newMember };
      },

      updateMemberRole: (memberId, newRole) => {
        set((state) => ({
          projectMembers: state.projectMembers.map((m) =>
            m.id === memberId ? { ...m, role: newRole } : m
          ),
        }));
      },

      removeMemberFromProject: (memberId) => {
        set((state) => ({
          projectMembers: state.projectMembers.filter((m) => m.id !== memberId),
        }));
      },

      // --- COMMENT ACTIONS ---

      addComment: (newCommentData) => {
        const currentUser = get().getCurrentUser();
        if (!currentUser) {
          console.error("No user is logged in to add a comment.");
          return null;
        }

        const now = new Date().toISOString();
        const newComment: Comment = {
          ...newCommentData,
          id: crypto.randomUUID(),
          userId: currentUser.id,
          userName: currentUser.name,
          createdAt: now,
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
        return newComment;
      },

      updateComment: (commentId, newContent) => {
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  content: newContent,
                  editedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      deleteComment: (commentId) => {
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== commentId),
        }));
      },
    }),
    {
      name: "taskflow-store",

      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.isLoading = false;
          }
        };
      },
    }
  )
);
