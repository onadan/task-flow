export type ID = string;
export type ISODate = string;

export type User = {
  id: ID;
  name: string;
  email: string;
  createdAt: ISODate;
};

export type Column = {
  id: ID;
  name: string;
  position: number;
};

export type Project = {
  id: ID;
  name: string;
  description?: string;
  ownerId: ID;
  color?: string;
  archived?: boolean;
  createdAt: ISODate;
  updatedAt?: ISODate;
};

export type Task = {
  id: ID;
  projectId: ID;
  title: string;
  description?: string;
  position: number;
  columnId: ID;
  assignedTo?: ID;
  dueDate?: ISODate;
  priority?: "low" | "medium" | "high";
  labels?: string[];
  createdAt: ISODate;
  updatedAt?: ISODate;
  completedAt?: ISODate;
};

export type ProjectMember = {
  id: ID;
  projectId: ID;
  userId: ID;
  name: string;
  email: string;
  role: "owner" | "collaborator";
  joinedAt: ISODate;
};

export type Comment = {
  id: ID;
  taskId: ID;
  userId: ID;
  userName: string;
  content: string;
  replyTo?: ID;
  createdAt: ISODate;
  editedAt?: ISODate;
};
