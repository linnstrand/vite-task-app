import { useCallback } from 'react';
import { Filter, DisplayTasksConfig, Task } from '../models';

const dummy: Task[] = [
  {
    id: 1,
    name: 'Aardwark',
    category: 'Animals',
    dueDate: '2023-01-01',
    status: 'todo'
  },
  {
    id: 2,
    name: 'Seabass',
    category: 'Animals',
    dueDate: '2023-03-15',
    status: 'doing'
  },
  {
    id: 3,
    name: 'Milk',
    category: 'Shopping',
    dueDate: '2023-06-30',
    status: 'doing'
  },
  {
    id: 4,
    name: 'Task 3A',
    category: 'Category 3',
    dueDate: '2024-01-31',
    status: 'done'
  },
  {
    id: 6,
    name: 'Task 3B',
    category: 'Category 3',
    dueDate: '2023-07-06',
    status: 'done'
  }
];

export const useMockApi = () => {
  const getStorage = (): Task[] => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : (dummy as Task[]);
  };

  const setStorage = (tasks: Task[]) => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  };

  const filterTasks = (tasks: Task[], filter: Filter) => {
    return tasks.filter(
      (t) =>
        (!filter.category || filter.category === t.category) &&
        (!filter.status || filter.status === t.status)
    );
  };

  const sortTasks = (tasks: Task[], prop: keyof Task) => {
    switch (prop) {
      case 'dueDate':
        return tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
      case 'name':
        return tasks.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      case 'status':
        return tasks.sort((a, b) => {
          if (b.status === 'doing' || (b.status === 'todo' && a.status === 'done')) {
            return 1;
          }
          if (b.status === 'done' && a.status !== 'done') {
            return -1;
          }
          return 0;
        });

      default:
        throw new Error(`Sorting on ${prop} is not implemented`);
    }
  };

  const getTasks = useCallback(async (config?: DisplayTasksConfig): Promise<Task[] | undefined> => {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
      let fixedTasks = [...getStorage()];
      if (config?.filter) {
        fixedTasks = filterTasks(fixedTasks, config.filter);
      }
      if (config?.sort) {
        sortTasks(fixedTasks, config.sort);
      }
      return fixedTasks;
    } catch (error: unknown) {
      console.error(error);
    }
  }, []);

  const createTask = async (task: Omit<Task, 'id'>): Promise<Task | undefined> => {
    try {
      const tasks = getStorage();
      const id = Math.max(...tasks.map((t) => t.id)) + 1;
      const newTask: Task = { ...task, id };
      setStorage([...tasks, newTask]);
      return newTask;
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const updateTask = async (task: Task): Promise<Task | undefined> => {
    try {
      const tasks = getStorage().map((t) => (task.id === t.id ? task : t));
      setStorage(tasks);
      return task;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      const tasks = getStorage().filter((t) => t.id !== id);
      setStorage(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  return { getTasks, createTask, updateTask, deleteTask };
};
