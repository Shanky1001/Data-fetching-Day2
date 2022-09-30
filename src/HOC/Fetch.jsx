
import React, { useEffect, useState } from "react";


const Fetch = (Component) => {
  const NewComponent = (props) => {
    // Rows to be display
    const [rows, setRows] = useState([]);
    const [empty, setEmpty] = useState(true);
    const [count, setCount] = useState(0);

    // Active Page to be appended in the fetch url and changed by user to move btw pages
    const [activePage, setActivepage] = useState(1);

    // State for number of rows per page
    const [numberOfRows, setNumberOfRows] = useState('10');
    // State for Select dropdown value
    const [selected, setSelected] = useState({
      'user_id': "1",
      'Catalog': "1",
      'shops_domain': "1",
      'shops_email': "1",
      'shops_plan_Name': "1",
      'updated_At': "1",
      'created_At': "1",
      'domain': "1",
    });
    // State for search Filtering value
    const [searchInput, setSearchInput] = useState({
      'user_id': "",
      'Catalog': "",
      'shops_domain': "",
      'shops_email': "",
      'shops_plan_Name': "",
      'updated_At': "",
      'created_At': "",
      'domain': "",
    });


    useEffect(() => {
      let a = [];
      const filter = sessionStorage.getItem('FilterString');
      let url = `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${activePage}&count=${numberOfRows}${filter}`
      fetch(url,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("userToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setCount(json.data.count)
          json.data.rows.forEach((value) => {
            let arr = [
              value.user_ids,
              value.catalog,
              value.username,
              value.email,
              value.shopify_plan,
              value.updated_at,
              value.created_at,
              value.shop_url,
            ];
            a.unshift(arr)
          });
          console.log(a);
          setRows([...a])
          setEmpty(false);
        });

    }, [activePage, numberOfRows, searchInput, selected])


    // Debouncing for seaching input value
    useEffect(() => {
      const getData = setTimeout(() => {
        let filter = ''
        Object.entries(searchInput).forEach(([keys, value]) => {
          if (value !== '') {
            filter += `&filter[${keys}][${selected[keys] === undefined ? 1 : selected[keys]}] = ${value}`;
          }
        })
        sessionStorage.setItem('FilterString', filter);
      }, 100)
      return () => clearTimeout(getData)
    }, [searchInput, selected])



    if (empty) return <Loading />

    return <Component {...props} setEmpty={setEmpty} rows={rows} setRows={setRows} activePage={activePage} setActivepage={setActivepage} numberOfRows={numberOfRows} setNumberOfRows={setNumberOfRows} selected={selected} searchInput={searchInput} setSelected={setSelected} setSearchInput={setSearchInput} count={count} />
  };

  return NewComponent;
};

export default Fetch;



const Loading = () => {
  return (
    <>
      <h1> Loading ...</h1>
    </>
  );
};
