import { useEffect, useRef, useState } from "react";
import { Input, Button, type InputProps, InputRef } from "antd";

import { useTodoContext } from "../../hooks";
import { createItem } from "./CreateItem.utils";
import styles from "./styles.module.css";

export const CreateItem = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  const { onAdd } = useTodoContext();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange: InputProps["onChange"] = (e) => setValue(e.target.value);

  const handleAdd = () => {
    if (!value) return null;

    onAdd(createItem(value));
    setValue("");
  };

  const handleKeyPress: InputProps["onKeyDown"] = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className={styles.container}>
      <Input
        ref={inputRef}
        data-testid="new-item"
        placeholder="Whats needs to be done?"
        value={value}
        onKeyDown={handleKeyPress}
        onChange={handleChange}
      />
      <Button
        data-testid="submit-btn"
        type="primary"
        onClick={handleAdd}
        disabled={!value}
      >
        Add
      </Button>
    </div>
  );
};
