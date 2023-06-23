"use client"; // This is a client component
import { useState, useEffect } from "react";
import { Md5 } from "ts-md5";
import { Button, Grid, TextField } from "@mui/material";
import ComicModal from "@/components/ComicModal";
import { getAuthString } from "@/utils/marvel";
import axios from "axios";

const handleSearch = async (e) => {
  e.preventDefault();
};

export default function Home() {
  const marvelApiUrl = "http://gateway.marvel.com/v1/public/";
  const comicsUrl = "comics?";
  const charactersUrl = "characters?";
  const [data, setData] = useState([]);
  const [character, setCharacter] = useState([]);
  const handleSearch = async () => {};
  const search = async () => {
    const auth = getAuthString();
    const apiUrl =
      marvelApiUrl +
      charactersUrl +
      `&apikey=${auth.pub_key}&ts=${auth.ts}&hash=${auth.hash}` +
      `&nameStartsWith=Spider`;
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    setData(response.data.data.results);
    console.log(response.data.data.results);
  };

  useEffect(() => {
    const response = search();
  }, []);

  return (
    <>
      <div>
        <TextField variant="outlined"></TextField>
        <Button onClick={handleSearch}>Search</Button>
        <Grid
          style={{ gap: 1 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        ></Grid>
        <Grid
          style={{ gap: 1 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {data.map((elem) => {
            return (
              <Grid item xs sm={6} md={3}>
                <img
                  width={400}
                  height={400}
                  src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                />
                <ComicModal id={elem.id} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
