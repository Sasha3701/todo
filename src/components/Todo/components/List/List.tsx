import { List as ListAntd } from "antd";
import { useMemo } from "react";

import { Item } from "./components";
import { useTodoContext } from "../../hooks";
import { Filter } from "../../Todo.types";
import styles from "./styles.module.css";

export const List = () => {
  const { list, filter, onDelete, onChangeStatus } = useTodoContext();

  const filterList = useMemo(() => {
    if (filter === Filter.All) {
      return list;
    }

    return list.filter(({ status }) =>
      filter === Filter.Active ? !status : status,
    );
  }, [list, filter]);

  if (!list.length && filter === Filter.All) return null;

  return (
    <ListAntd
      className={styles.list}
      dataSource={filterList}
      renderItem={(item) => (
        <Item {...item} onDelete={onDelete} onChangeStatus={onChangeStatus} />
      )}
      locale={{
        emptyText: "Everything is done or nothing needs to be done...",
      }}
      bordered
    />
  );
};
