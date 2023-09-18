import { v4 } from "uuid";

import type { IItem } from "../../Todo.types";

export const createItem = (value: string): IItem => ({
  id: v4(),
  status: false,
  text: value,
});
