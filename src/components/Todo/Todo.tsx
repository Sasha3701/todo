import { App } from "antd";

import { Actions, CreateItem, List } from "./components";
import { TodoProvider } from "./context";
import { useTodo } from "./hooks";
import styles from "./styles.module.css";

export const Todo = () => {
  const data = useTodo();

  return (
    <TodoProvider {...data}>
      <App>
        <div className={styles.container}>
          <CreateItem />
          <List />
          <Actions />
        </div>
      </App>
    </TodoProvider>
  );
};
