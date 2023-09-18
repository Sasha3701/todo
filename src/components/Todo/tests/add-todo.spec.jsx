import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import { TodoProvider } from "../context";
import { CreateItem } from "../components/CreateItem";

vi.mock("uuid", () => ({
  v4: () => "1234",
}));

const onAdd = vi.fn();

const providerProps = {
  list: [],
  filter: "all",
  onAdd,
};

const item = {
  id: "1234",
  text: "Test",
  status: false,
};

afterEach(() => {
  vi.clearAllMocks();
});

const customRender = (ui, { providerProps, ...renderOptions }) =>
  render(<TodoProvider {...providerProps}>{ui}</TodoProvider>, renderOptions);

test("AddTodo renders without crashing", () => {
  customRender(<CreateItem />, { providerProps });
});

test("AddTodo contains input field and it has focus on mount", () => {
  const { getByTestId } = customRender(<CreateItem />, { providerProps });
  const inputField = getByTestId("new-item");

  expect(inputField).toHaveFocus();
});

test("Form submission should not call add method if input field is empty", () => {
  const { getByTestId } = customRender(<CreateItem />, { providerProps });
  const btn = getByTestId("submit-btn");
  fireEvent.click(btn);

  expect(onAdd).not.toHaveBeenCalledTimes(1);
});

test("Form submission should go through successfully", () => {
  const { getByTestId } = customRender(<CreateItem />, { providerProps });
  const input = getByTestId("new-item");
  const btn = getByTestId("submit-btn");

  fireEvent.change(input, { target: { value: "Test" } });
  fireEvent.click(btn);

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onAdd).toHaveBeenCalledWith(item);

  expect(input).toHaveValue("");
});
