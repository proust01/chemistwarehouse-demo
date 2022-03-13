import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { idID } from '@mui/material/locale';
import Button from '@mui/material/Button';

export default function PageSizeCustomOptions() {
    let navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const [products, setProducts] = React.useState(null);
  const url = 'https://wxxz7ruhxb.execute-api.ap-southeast-2.amazonaws.com/prod/products'

  useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get(url)
        if(data) {
            setProducts(data)
        }
        console.log(products)
      }
      fetchProducts()
  },[])

  const renderEditButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {navigate(`/product/1`)}}
            >
                Edit
            </Button>
        </strong>
    )
}
  const renderDeleteButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    console.log('clicked')
                }}
            >
                Delete
            </Button>
        </strong>
    )
}

//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     // maxColumns: 6,
//   });

//   console.log(data)

  const data = {
      columns: [
          {field: "id", hide: true},
          {field: "name", headerName: "Name", width: 150},
          {field: "price", headerName: "Price", width: 150},
          {field: "type", headerName: "Type", width: 150},
          {field: "active", headerName: "Active", width: 150},
          {field: "edit", headerName: "Edit", width: 100, renderCell: renderEditButton,},
          {field: "delete", headerName: "Delete", width: 100, renderCell: renderDeleteButton,},
      ],
      initialState: {},
      rows: products?.message?.map(p => {
          return {
              id: p.product_id,
              name: p.name,
              price: p.price,
              type: p.type,
              active: p.active,
          }
      })
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        {...data}
      />
    </div>
  );
}
