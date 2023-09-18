import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import { Item } from "../components/List/components/Item";

const item = {
  id: "1234",
  text: "Test",
  status: false,
};

const onChangeStatus = vi.fn();
const onDelete = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

test("Todo is marked completed on checkbox click", () => {
  const { getByTestId } = render(
    <Item {...item} onChangeStatus={onChangeStatus} />,
  );

  const checkbox = getByTestId("checkbox");
  fireEvent.click(checkbox);

  expect(onChangeStatus).toHaveBeenCalledTimes(1);
  expect(onChangeStatus).toHaveBeenCalledWith(item.id);
});

test("Todo item to be deleted on click of delete button", () => {
  const { getByTestId } = render(<Item {...item} onDelete={onDelete} />);

  const container = getByTestId("item");
  fireEvent.mouseEnter(container);

  const deleteBtn = getByTestId("btn-delete");
  fireEvent.click(deleteBtn);

  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith(item.id);
});
