import { useContext } from "react";

import { TodoContext } from "../context";
import type { ITodoContext } from "../Todo.types";

export const useTodoContext = (): ITodoContext => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
