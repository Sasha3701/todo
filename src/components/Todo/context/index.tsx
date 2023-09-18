import { createContext } from "react";

import { ITodoContext } from "../Todo.types";

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children, ...props }: ITodoContext) => (
  <TodoContext.Provider value={props}>{children}</TodoContext.Provider>
);
