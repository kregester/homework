"use client"; // This is a client component
import { useState, useEffect } from "react";
import { Md5 } from "ts-md5";
import { Button, Grid, TextField } from "@mui/material";
import ComicModal from "@/components/ComicModal";
const p_key = "6270c7a7851c6755007a0296770f05917455afb5";
const pub_key = "7620c866f7a8251c6aebeb639562c510";
import { getAuthString } from "@/utils/marvel";
import { Comic } from "@/types";
import axios from "axios";

export default function Home() {
  const marvelApiUrl = "http://gateway.marvel.com/v1/public/";
  const comicsUrl = "comics?";
  const charactersUrl = "characters?";
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Doctor Strange");

  const search = async (nameQuery: string) => {
    const auth = getAuthString();
    let apiUrl =
      marvelApiUrl +
      charactersUrl +
      `&apikey=${pub_key}&ts=${auth.ts}&${auth.hash}`;
    if (nameQuery) {
      apiUrl += `&name=${encodeURIComponent(nameQuery)}`;
    }
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    setData(response.data.data.results);
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    const response = await search(name);
    console.log(response);
  };

  useEffect(() => {
    const search = async (nameQuery: string) => {
      const auth = getAuthString();
      let apiUrl =
        marvelApiUrl +
        charactersUrl +
        `&apikey=${pub_key}&ts=${auth.ts}&${auth.hash}`;
      if (nameQuery) {
        apiUrl += `&name=${nameQuery}`;
      }
      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      // const response = await fetch(apiUrl);
      console.log(response);
      // const newData = await response.json();
      setData(response.data.data.results);
      console.log("data", response.data);
    };
    const response = search(encodeURIComponent(name));
  }, []);

  return (
    <>
      <br />
      <Grid
        style={{ gap: 1 }}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <TextField
            style={{ color: "red", backgroundColor: "white" }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="outlined-basic"
            label="Name"
            variant="filled"
          />
          <Button onClick={handleQuery}>Search</Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {data.map((elem: Comic) => {
          return (
            <Grid key={elem.id} item xs sm={6} md={3}>
              <img
                width={"400"}
                height={"400"}
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
              />
              <ComicModal key={elem.id} id={elem.id} open={open} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
