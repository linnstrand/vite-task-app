import { useCallback } from 'react';
import { Task } from '../models';

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
  const delay = async (time = 50) => {
    return new Promise<void>((resolve) => setTimeout(resolve, time));
  };

  const makeAsync = async <T>(item: T, time?: number) => {
    await delay(time);
    return item;
  };

  const getStorage = (): Task[] => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : (dummy as Task[]);
  };

  const setStorage = (tasks: Task[]) => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  };

  const getTasks = useCallback(
    async (
      filter?: { type: keyof Task; name?: string },
      sortedOn?: string
    ): Promise<Task[] | undefined> => {
      let tasks = getStorage();
      if (filter) tasks = tasks.filter((t) => t[filter.type] === filter?.name);
      if (sortedOn) tasks = tasks.sort();
      try {
        return await makeAsync(tasks);
      } catch (error: unknown) {
        console.error(error);
      }
    },
    []
  );

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

export const useApi = () => {
  const getTasks = useCallback(
    async (filter?: string, sortedOn?: string): Promise<Task[] | undefined> => {
      const params: { category?: string; sortBy?: string } = {};

      if (filter) params.category = filter;
      if (sortedOn) params.sortBy = sortedOn;

      try {
        const response = await fetch('/api/tasks?' + new URLSearchParams(params) + '&sortDir=desc');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return await response.json();
      } catch (error: unknown) {
        console.error(error);
      }
    },
    []
  );

  const createTask = async (task: Partial<Task>): Promise<Task | undefined> => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      return await response.json();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const updateTask = async (task: Task): Promise<Task | undefined> => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number): Promise<Task | undefined> => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { getTasks, createTask, updateTask, deleteTask };
};
