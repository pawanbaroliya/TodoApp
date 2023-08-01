import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { doneSlice } from "../../redux/slice/done";
import ColumnLayout from "../ColumnLayout";

export const DoneColumn = () => {
  const { done } = useSelector((state: StoreState) => state);
  const {
    actions: { remove, add },
  } = doneSlice;

  return (
    <>
      <Typography mb={3}>All done tasks: {done.length}</Typography>
      <ColumnLayout
        labelText="Type 'done' item"
        removeHandler={remove}
        addHandler={add}
        selectorState={done}
        fromTodo={false}
      />
    </>
  );
};
