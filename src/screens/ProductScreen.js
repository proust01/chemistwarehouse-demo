import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'

export default function ProductScreen() {
  let navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selected, setSelected] = React.useState(false);
  const [age, setAge] = React.useState('');
  const url = 'https://wxxz7ruhxb.execute-api.ap-southeast-2.amazonaws.com/prod/product'

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const submitHandler = async (data) => {

    try {
      delete data.exampleRequired
      console.log(data)
  
      const res = await axios.post(url, data)
      console.log(res)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box
          sx={{
            width: 800,
            px: 3,
            py: 3,
            maxWidth: '100%',
          }}
        >
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField fullWidth label="Name" id="fullWidth" margin="normal" {...register("name", { required: true })} />

          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <TextField fullWidth label="Price" id="fullWidth" margin="normal" {...register("price", { required: true })} />
          
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              {...register("type", { required: true })}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={'books'}>Books</MenuItem>
              <MenuItem value={'electronics'}>Electronics</MenuItem>
              <MenuItem value={'food'}>Food</MenuItem>
              <MenuItem value={'furniture'}>Furniture</MenuItem>
              <MenuItem value={'toy'}>Toy</MenuItem>
            </Select>

          <InputLabel id="demo-simple-select-label">Active</InputLabel>
          <ToggleButton
            {...register("active")}
            value={selected}
            fullWidth
            selected={selected}
            style={{ marginBottom: 10 }}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <CheckIcon />
            Active
          </ToggleButton>

          <div>
            <Button type='submit' variant="contained" style={{ margin: 10 }}>Submit</Button>
            <Button variant="contained" color="error" onClick={() => {navigate(`/`)}}>Cancel</Button>
          </div>
        </Box>
        
      </form>
    </div>
    
  );
}
