import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "../redux/store";
import { IColumnLayoutProps, InitialTODO } from "../types";
import { todoSlice as todo } from "../redux/slice/todo";
import { doneSlice as done } from "../redux/slice/done";

type ToDoSlices = "todo" | "done";

const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  labelText,
  addHandler,
  removeHandler,
  selectorState,
  fromTodo,
}) => {
  const [isError, setIsError] = useState({
    isShow: false,
    text: "",
  });
  const appState = useSelector((state: StoreState) => state);
  const [textDescription, setTextDescription] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      // Clear the input box
      setTextDescription("");
    }
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      if ((target as HTMLInputElement).value.length > 0) {
        handleOnClick();
      } else {
        // Validation for empty input box
        setIsError({
          isShow: true,
          text: "The input value cannot be empty",
        });
      }
    }
  };

  const handleOnStatusChange = ({
    source,
  }: {
    source: string;
    isFinished: Boolean;
  }) => {
    let fromStatus = "";
    let toStatus = "";
    if (fromTodo) {
      fromStatus = "todo";
      toStatus = "done";
    } else {
      fromStatus = "done";
      toStatus = "todo";
    }
    const allSlices = { todo, done };
    const [filterState] = (
      (appState as any)[fromStatus] as InitialTODO[]
    ).filter(({ id }) => id === source);
    dispatch(allSlices[fromStatus as ToDoSlices].actions.remove(source));
    const result = { destination: { index: 0 } };
    dispatch(
      allSlices[toStatus as ToDoSlices].actions.update({
        ...result,
        filterState,
      })
    );
  };

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <TextField
        fullWidth
        label={labelText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleInputKeyDown}
        value={textDescription}
        variant="outlined"
        size="small"
      />

      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOnClick}
          onKeyDown={({ key }) => key === "Enter" && handleOnClick()}
          disabled={textDescription.length === 0}
        >
          {fromTodo ? "Add TODO" : "Add Done"}
        </Button>
      </Box>
      <List
        sx={{
          minHeight: "300px",
          li: {
            flexDirection: "column",
          },
          "& .MuiListItemText-root": {
            width: "100%",
          },
        }}
      >
        {selectorState.map(({ id, text, isFinished, createdAt, updatedAt }) => (
          <ListItem
            sx={{
              transition: ".3s ease background-color",
              color: "#000",
              bgcolor: "#fff",
              position: "relative",
              border: "1px solid #989898",
              my: 1,
              borderRadius: "3px",
              "& .MuiTypography-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <ListItemText
              sx={{
                textDecoration: isFinished ? "line-through" : "none",
                wordBreak: "break-word",
              }}
            >
              <Box
                component="span"
                width="100%"
                position="absolute"
                top="0"
                fontSize=".7rem"
              >
                {updatedAt ? "Updated" : "Created"} at: {updatedAt || createdAt}
              </Box>

              <Box component="span" width="100%">
                {text}
              </Box>

              <Box display="flex" component="span">
                <IconButton onClick={() => dispatch(removeHandler(id))}>
                  <DeleteIcon
                    sx={{
                      color: "#000",
                    }}
                  />
                </IconButton>
                <Checkbox
                  edge="end"
                  value={!fromTodo}
                  checked={!fromTodo}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={() =>
                    handleOnStatusChange({ source: id, isFinished })
                  }
                />
              </Box>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ColumnLayout;
