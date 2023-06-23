import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { getAuthString } from "@/utils/marvel";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const marvelApiUrl = "http://gateway.marvel.com/v1/public/";
const comicsUrl = "comics?";
const style = {
  height: "100%",
  width: "100%",
  top: "50%",
  left: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflow: "scroll",
  display: "block",
};

export default function BasicModal(props: any) {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const search = async () => {
      const auth = getAuthString();
      const apiUrl =
        marvelApiUrl +
        "characters/" +
        props.id +
        "/" +
        comicsUrl +
        `&apikey=${auth.pub_key}&ts=${auth.ts}&hash=${auth.hash}`;
      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      setData(response.data.data.results);
      console.log(response.data.data.results);
    };
    const response = search();
  }, []);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        style={{
          overflow: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          onClick={(e) => {
            setOpen(false);
          }}
          style={{ marginTop: "auto", width: "auto" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data.map((elem) => (
            <Grid item xs sm={6} md={3} spacing={1}>
              <img
                width={"auto"}
                height={400}
                src={elem.thumbnail.path + "." + elem.thumbnail.extension}
              />
            </Grid>
          ))}
        </Grid>
      </Modal>
    </>
  );
}
