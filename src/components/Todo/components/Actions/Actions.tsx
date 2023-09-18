import { Radio, type RadioChangeEvent, Typography, Button } from "antd";
import { useMemo } from "react";

import { useTodoContext } from "../../hooks";
import { Filter, type TFilter } from "../../Todo.types";
import styles from "./styles.module.css";

export const Actions = () => {
  const { list, filter, onChangeFilter, onDeleteCompleted } = useTodoContext();

  const countActiveItems = useMemo(
    () => list.filter(({ status }) => !status).length,
    [list],
  );

  const isWithClear = useMemo(() => list.some(({ status }) => status), [list]);

  const handleChange = (e: RadioChangeEvent) =>
    onChangeFilter(e.target.value as TFilter);

  if (!list.length) return null;

  return (
    <div className={styles.container}>
      {filter === Filter.All && countActiveItems > 0 && (
        <div className={styles.count}>
          <Typography.Text>{`${countActiveItems} items left`}</Typography.Text>
        </div>
      )}
      <div className={styles.actions}>
        <Radio.Group onChange={handleChange} defaultValue={filter}>
          <Radio.Button value={Filter.All}>All</Radio.Button>
          <Radio.Button value={Filter.Active}>Active</Radio.Button>
          <Radio.Button value={Filter.Completed}>Completed</Radio.Button>
        </Radio.Group>
      </div>
      {filter === Filter.All && isWithClear && (
        <div className={styles.clear}>
          <Button type="primary" onClick={onDeleteCompleted}>
            Clear completed
          </Button>
        </div>
      )}
    </div>
  );
};
