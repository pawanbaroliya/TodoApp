import { AnyAction } from "@reduxjs/toolkit";

export interface InitialTODO {
  id: string;
  text: string;
  isFinished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TActionSlice = Omit<InitialTODO, "text">;

export interface IColumnLayoutProps {
  labelText?: string;
  addHandler: (v: string) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  selectorState: InitialTODO[];
  fromTodo: boolean;
}
