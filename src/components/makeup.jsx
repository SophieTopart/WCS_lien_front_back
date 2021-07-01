import { useState, useEffect } from "react";
import axios from "axios";
import SimpleCard from "./card";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { toast } from 'react-toastify';


function Makeup() {
  const [makeup, setMakeup] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ product: "", price: "" });

  /*useEffect(() => {
        axios.get('http://localhost:8000/')
        .then(res => {
            setMakeup(res.data)
        })
        .catcg((err) => setError(err))
    })*/

  useEffect(() => {
    const getMakeup = async () => {
      try {
        const makeup = await axios.get("http://localhost:8000/");
        setMakeup(makeup.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getMakeup();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true)
        await axios.post("http://localhost:8000/makeup",
        {...data})
        toast.success("Le produit a été rajouté.")
    } catch(err) {
        console.log(error);
        toast.error(`Le produit n'a pu être rajouté : ${err.message}`);
    } finally {
        setLoading(false)
    }
  };

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data);

  return (
    <>
      {error ? (
        <h1>error</h1>
      ) : (
        makeup.length && (
          <>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "1rem"}}>
              {makeup.map((makeup, index) => (
                <SimpleCard
                  key={index}
                  id={makeup.id}
                  product={makeup.product}
                  price={makeup.price}
                />
              ))}
            </div>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <FormControl>
                <InputLabel htmlFor="my-input">Product</InputLabel>
                <Input
                  name="product"
                  onChange={onChangeData}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input
                  name="price"
                  onChange={onChangeData}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <Button disabled={loading} variant="outlined" style={{ margin: "1rem" }} onClick={handleSubmit}>
                Submit
              </Button>
            </form>
            
          </>
        )
      )}
    </>
  );
}

export default Makeup;
