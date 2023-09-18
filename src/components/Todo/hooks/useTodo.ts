import { useCallback, useState } from "react";
import { notification } from "antd";

import {
  Filter,
  IItem,
  ITodoContext,
  type TFilter,
  type TList,
} from "../Todo.types";
import { DEFAULT_LIST } from "../Todo.constants";

export const useTodo = (): ITodoContext => {
  const [list, setList] = useState<TList>(DEFAULT_LIST);
  const [filter, setFilter] = useState<TFilter>(Filter.All);

  const handleAdd = useCallback((value: IItem) => {
    setList((prevState) => [...prevState, value]);
    notification.success({ message: "Success!", description: "Task added" });
  }, []);

  const handleDelete = useCallback((value: string) => {
    setList((prevState) => prevState.filter(({ id }) => id !== value));
    notification.success({ message: "Success!", description: "Task deleted" });
  }, []);

  const handleDeleteCompleted = useCallback(() => {
    setList((prevState) => prevState.filter(({ status }) => !status));
    notification.success({
      message: "Success!",
      description: "Completed tasks deleted",
    });
  }, []);

  const handleChangeFilter = useCallback(
    (value: TFilter) => setFilter(value),
    [],
  );

  const handleChangeStatus = useCallback(
    (value: string) =>
      setList((prevState) =>
        prevState.map((item) => {
          if (item.id === value) {
            return { ...item, status: !item.status };
          }
          return item;
        }),
      ),
    [],
  );

  return {
    onAdd: handleAdd,
    onDelete: handleDelete,
    onDeleteCompleted: handleDeleteCompleted,
    onChangeFilter: handleChangeFilter,
    onChangeStatus: handleChangeStatus,
    list,
    filter,
  };
};
