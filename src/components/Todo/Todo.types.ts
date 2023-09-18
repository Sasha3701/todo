import type { PropsWithChildren } from "react";

export enum Filter {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export type TFilter = `${Filter}`;

export interface IItem {
  id: string;
  text: string;
  status: boolean;
}

export type TList = Array<IItem>;

export interface ITodoContext extends PropsWithChildren {
  onAdd: (value: IItem) => void;
  onDelete: (value: string) => void;
  onDeleteCompleted: () => void;
  onChangeFilter: (value: TFilter) => void;
  onChangeStatus: (value: string) => void;
  list: TList;
  filter: TFilter;
}
