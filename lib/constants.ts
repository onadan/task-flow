import { Column } from "../types";

export const DEFAULT_COLUMNS_TEMPLATE: Pick<Column, "name" | "position">[] = [
  { name: "To Do", position: 0 },
  { name: "In Progress", position: 1 },
  { name: "Review", position: 2 },
  { name: "Done", position: 3 },
];

export const STATIC_COLUMNS: Column[] = [
  { id: "todo", name: "To Do", position: 0 },
  { id: "in_progress", name: "In Progress", position: 1 },
  { id: "review", name: "Review", position: 2 },
  { id: "done", name: "Done", position: 3 },
];
