import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import Table from '../components/Table'
import axios from 'axios'

const MainPage = () => {
  const [tableData, setTableData] = useState([]);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    try {
      const api = async () => {
        const { data } = await axios.get("http://localhost:1337/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTableData(data);
        console.log(data);
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, [callApi]);

  const renderApi = () => {
    setCallApi(!callApi);
  };

  return (
    <>
      <Form
        renderApi={renderApi}
      />
      <Table renderApi={renderApi} data={tableData} />
    </>

  )
}

export default MainPage
