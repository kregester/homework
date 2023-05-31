"use client"; // This is a client component
import Image from "next/image";
import { useState, useEffect } from "react";
import { Md5 } from "ts-md5";
import axios from "axios";
import { Grid, Card, CardHeader, CardContent, Typography } from "@mui/material";
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
const characters = "characters?";

// export default async function handler(req, res) {

// let errorMsg = ""
//     try {
//         console.log("hitting marvel")
//         const response = await search()
//         console.log(response.data);
//         res.status(200).json(response.data);
//     }
//     catch(error) {
//         console.log("hitting marvel failed ")
//         const response = await search()
//         console.log(response);
//         res.status(500).json({error});
//     }
//   }

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const search = async () => {
      const auth = getAuthString();
      const apiUrl =
        marvelApiUrl +
        comicsUrl +
        `&apikey=${pub_key}&ts=${auth.ts}&${auth.hash}`;
      console.log(apiUrl);
      //const resp = await axios.get(apiUrl);
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
        <Grid container spacing={24}>
          {data.results.map((elem) => (
            <Grid item md={3}>
              <img src="" />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
