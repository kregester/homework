import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { getAuthString } from "@/utils/marvel";
const marvelApiUrl = "http://gateway.marvel.com/v1/public/";
const comicsUrl = "comics?";
const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const search = async () => {
      try {
        const auth = getAuthString();
        const apiUrl = marvelApiUrl + "characters/";
        props.id +
          "/" +
          comicsUrl +
          `&apikey=${auth.pub_key}&ts=${auth.ts}&${auth.hash}`;
        console.log(apiUrl);
        //const response = await axios.get(apiUrl);
        const response = await fetch(apiUrl);
        const newData = await response.json();
        setData(newData.data.results);
        // console.log(newData.data.results);
      } catch (e) {}
    };
    const response = search();
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((item) => (
          <ListItem disableGutters>
            <img src={`${item.thmubnail.path}.${item.thmubnail.extension}`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
