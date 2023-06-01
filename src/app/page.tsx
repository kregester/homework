"use client"; // This is a client component
import { useState, useEffect } from "react";
import { Md5 } from "ts-md5";
import { Grid } from "@mui/material";
import BasicModal from "@/components/ComicModal";
const p_key = "6270c7a7851c6755007a0296770f05917455afb5";
const pub_key = "7620c866f7a8251c6aebeb639562c510";

const getAuthString = () => {
  const ts = Date.now();
  //md5(ts+privateKey+publicKey)
  const hash = Md5.hashStr(ts + p_key + pub_key);
  return { ts, hash: `hash=${hash}` };
};

const marvelApiUrl = "http://gateway.marvel.com/v1/public/";
const comicsUrl = "comics?";
const charactersUrl = "characters?";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const search = async () => {
      const auth = getAuthString();
      const apiUrl =
        marvelApiUrl +
        charactersUrl +
        `&apikey=${pub_key}&ts=${auth.ts}&${auth.hash}`;
      console.log(apiUrl);
      //const response = await axios.get(apiUrl);
      const response = await fetch(apiUrl);
      const newData = await response.json();
      setData(newData.data.results);
      console.log(newData.data.results);
    };
    const response = search();
  }, []);
  return (
    <>
      <div>
        <Grid
          style={{ gap: 1 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs sm={6} md={3}>
            <BasicModal />
          </Grid>
        </Grid>
        <Grid
          style={{ gap: 1 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {data.map((elem) => (
            <Grid item xs sm={6} md={3}>
              <img
                width={400}
                height={400}
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
