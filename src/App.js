import React, { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  InputBase,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function App() {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState({});
  const [foundMovie, setFoundMovie] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // get movie from OMDb API
    fetch(`https://www.omdbapi.com/?apikey=59354c85&t=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        if (data["Response"] === "True") {
          setFoundMovie(true);
        } else {
          setFoundMovie(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Typography variant="h2" align="center" component="div">
        ABR Movie Finder!
      </Typography>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={2} mb={2} width="100%" maxWidth={500}>
          <Paper
            elevation={24}
            component="form"
            color="primary"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <Box p={1}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <InputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search movies" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{ flexGrow: "1" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Search
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
      <br />
      {foundMovie ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Card key={movie.imdbID}>
            <CardMedia component="img" image={movie.Poster} />
            <CardContent
              style={{
                textAlign: "center",
                justifyContent: "center",
                minHeight: "90px",
              }}
            >
              <Typography variant="h5" component="div">
                {movie.Title}
              </Typography>
              <Typography color="textSecondary" component="div">
                Genre(s): {movie.Genre}
              </Typography>
              <Typography color="textSecondary" component="div">
                Director(s): {movie.Director}
              </Typography>
              <Typography color="textSecondary" component="div">
                Release Date: {movie.Year}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Typography
          variant="h4"
          align="center"
          component="div"
          style={{ color: "red" }}
        >
          {movie.Error}
        </Typography>
      )}
      <br />
      <br />
      <br />
    </>
  );
}

export default App;
