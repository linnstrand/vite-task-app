export interface Task {
  id: number;
  status: (typeof statoos)[number];
  name: string;
  category: string;
  dueDate: string;
}

// The only plural allowed by the Oxford English Dictionary is status pronounced statoos.
// export enum Status {
//   TODO = 'todo',
//   DOING = 'doing',
//   DONE = 'done'
// }
export const statoos = ['todo', 'doing', 'done'] as const;
