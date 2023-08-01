import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ToDoColumn } from "./components/columns/ToDo";
import { DoneColumn } from "./components/columns/Done";

function App() {
  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        TODO App
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={6}>
          <ToDoColumn />
        </Grid>
        <Grid item md={6}>
          <DoneColumn />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
