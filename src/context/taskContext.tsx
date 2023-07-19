import React from 'react';
import { Task } from '../models';
import { Filter, useMockApi } from '../hooks/useApi';

interface TaskProperties {
  categories: { [key: string]: number };
  statoos: { [key: string]: number };
}

export type TaskContext = {
  tasks: Task[] | undefined;
  filter: Filter | undefined;
  sortedOn: string | undefined;
  taskProperties: TaskProperties | undefined;
  editTask: (task: Task) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  sortTasks: (query?: string) => void;
  filterTasks: (filter: Filter) => void;
  removeTask: (id: number) => void;
};

export const TaskContext = React.createContext<TaskContext | undefined>(undefined);

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
  const [tasks, setTasks] = React.useState<Task[]>();
  const [filter, setFilter] = React.useState<Filter | undefined>();
  const [sortedOn, setSortedOn] = React.useState<string | undefined>();

  // const { getTasks, updateTask, createTask, deleteTask } = useApi()
  const { getTasks, updateTask, createTask, deleteTask } = useMockApi();

  const taskProperties = React.useMemo(() => {
    if (!tasks) return;
    const data: TaskProperties = {
      categories: {},
      statoos: {}
    };
    tasks.forEach((d: Task) => {
      data.categories[d.category] = (data.categories[d.category] || 0) + 1;
      data.statoos[d.status] = (data.statoos[d.status] || 0) + 1;
    });
    return data;
  }, [tasks]);

  React.useEffect(() => {
    let loadData = true;
    async function startFetching() {
      if (!loadData) return;
      const result = await getTasks(filter, sortedOn);
      setTasks(result);
    }
    startFetching();

    return () => {
      loadData = false;
    };
  }, [filter, getTasks, sortedOn]);

  const editTask = async (task: Task) => {
    if (!tasks) {
      throw new Error('No list of tasks available');
    }
    const updated = await updateTask(task);
    if (!updated) {
      throw new Error('Task failed to update');
    }
    const updatedList: Task[] = tasks.map((t) => {
      return t.id === updated.id ? updated : t;
    });

    setTasks(updatedList);
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    const newTask = await createTask(task);
    newTask && setTasks([newTask, ...(tasks || [])]);
  };

  const filterTasks = async (query: Filter) => {
    console.log(query);
    setFilter(query);
  };

  const sortTasks = async (query?: string) => {
    setSortedOn(query);
  };

  const removeTask = async (id: number) => {
    const filtered = tasks?.filter((t) => t.id !== id);
    setTasks(filtered);
    deleteTask(id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        sortedOn,
        taskProperties,
        editTask,
        filterTasks,
        addTask,
        sortTasks,
        removeTask
      }}
      children={children}
    />
  );
};
