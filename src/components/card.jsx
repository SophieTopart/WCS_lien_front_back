import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 175,
  },
  bullet: {
    display: "flex",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ id, product, price }) {
  const classes = useStyles();

  const [readOnly, setReadOnly] = useState(true)
  const [newValues, setNewValues] = useState({product, price})

  const handleChangeReadOnly = () => {
    readOnly ? setReadOnly(false) : setReadOnly(true)
  }

  const deleteIcon = () => {
    axios.delete(`http://localhost:8000/makeup/${id}`)
    .then((res) =>
    console.log("Status :", res.status),
    toast.success(`Le produit a été supprimé.`)
    )
    .catch(err => {
      console.error('Something went wrong', err)
      toast.error(`Le produit n'a pu être supprimé : ${err.message}`)
    })
  }

  const changeInputValue = (e) => {
    setNewValues({
      ...newValues,
      [e.target.name] : e.target.value
    })
  }

  const modifyInput = () => {
    axios.put(`http://localhost:8000/makeup/${id}`, newValues)
    .then((res) => {
      console.log("Status :", res.status)
      console.log("Datas :", res.data)
    }).catch(err => {
      console.err("Something went bad", err)
    })

  }


  return (
    <Card className={classes.root}>
      <CardContent>
        {
          readOnly ? (
            <>
          <Typography variant="h5" component="h2">
          {product}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {price} €
        </Typography>
            </>
          ) : (
            <div style={{display: "flex", flexDirection: 'column'}}>
            <FormControl>
                <InputLabel htmlFor="my-input">Product</InputLabel>
                <Input
                  value={newValues.product}
                  name="product"
                  onChange={changeInputValue}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input
                value={newValues.price}
                  name="price"
                  onChange={changeInputValue}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              </div>
          )
        }
       
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between"}}>
        <DeleteIcon onClick={deleteIcon}/>
        <Button onClick={handleChangeReadOnly}>
        {
          readOnly ? <CreateIcon /> : <CheckIcon onClick={modifyInput}/>
        }
        </Button>
        
      </CardActions>
    </Card>
  );
}
