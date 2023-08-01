import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { todoSlice } from "../../redux/slice/todo";
import ColumnLayout from "../ColumnLayout";

export const ToDoColumn = () => {
  const { todo } = useSelector((state: StoreState) => state);
  const {
    actions: { remove, add },
  } = todoSlice;

  return (
    <>
      <Typography mb={3}>All todo tasks: {todo.length}</Typography>
      <ColumnLayout
        labelText="Type 'to do' item"
        removeHandler={remove}
        addHandler={add}
        selectorState={todo}
        fromTodo={true}
      />
    </>
  );
};
