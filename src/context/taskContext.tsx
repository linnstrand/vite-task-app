import React from 'react';
import { DisplayTasksConfig, Filter, Task } from '../models';
import { useMockApi } from '../hooks/useApi';

interface TaskProperties {
  categories: { [key: string]: number };
  statoos: { [key: string]: number };
}

export type TaskContext = {
  tasks: Task[] | undefined;
  config: DisplayTasksConfig | undefined;
  taskProperties: TaskProperties | undefined;
  editTask: (task: Task) => void;
  addTask: (task: Omit<Task, 'id'>) => void; // Making it clear ID is excluded on purpose
  sortTasks: (task?: keyof Task | undefined) => void;
  filterTasks: (filter: Filter) => void;
  removeTask: (id: number) => void;
};

export const TaskContext = React.createContext<TaskContext | undefined>(undefined);

export const TaskProvider = ({ children }: { children: JSX.Element }) => {
  const [tasks, setTasks] = React.useState<Task[]>();
  const [config, setConfig] = React.useState<DisplayTasksConfig | undefined>();

  // TaskContext should ideally be the only consumer of api hook.
  const { getTasks, updateTask, createTask, deleteTask } = useMockApi();

  // I am working with a limited backend in this scenario.
  // Here is how I work around it to show user more information
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
      const result = await getTasks(config);
      setTasks(result);
    }
    startFetching();

    return () => {
      loadData = false;
    };
  }, [config, getTasks]);

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
    setConfig({ ...config, filter: query });
  };

  const sortTasks = async (query?: keyof Task | undefined) => {
    setConfig({ ...config, sort: query });
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
        config,
        taskProperties,
        editTask,
        sortTasks,
        filterTasks,
        addTask,
        removeTask
      }}
      children={children}
    />
  );
};
