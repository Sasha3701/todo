import { Checkbox, List, Typography, Button } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import { type IItem, type ITodoContext } from "../../../../Todo.types";
import styles from "./styles.module.css";

export const Item = ({
  onDelete,
  onChangeStatus,
  id,
  status,
  text,
}: IItem & Pick<ITodoContext, "onDelete" | "onChangeStatus">) => {
  const [isDelete, setIsDelete] = useState(false);

  const handleChange = () => onChangeStatus(id);

  const handleDelete = () => onDelete(id);

  const handleBlur = () => setIsDelete((prevState) => !prevState);

  return (
    <List.Item
      data-testid="item"
      className={styles.container}
      onMouseEnter={handleBlur}
      onMouseLeave={handleBlur}
    >
      <Checkbox data-testid="checkbox" onChange={handleChange} checked={status}>
        <Typography.Text
          className={styles.text}
          style={{ textDecoration: status ? "line-through" : "none" }}
        >
          {text}
        </Typography.Text>
      </Checkbox>
      {isDelete && (
        <Button
          data-testid="btn-delete"
          type="text"
          shape="circle"
          onClick={handleDelete}
          className={styles.button}
          icon={<DeleteOutlined />}
        />
      )}
    </List.Item>
  );
};
