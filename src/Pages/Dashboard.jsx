import { Card, DataTable, Page, Pagination, Select, TextField, } from '@shopify/polaris'
import React, { useCallback } from 'react';
import '../App.css'


const Dashboard = ({ setEmpty, rows, setRows, activePage, setActivepage, numberOfRows, setNumberOfRows, searchInput, selected, setSelected, setSearchInput, count }) => {
  

    // Number of Rows options
    const noOfRows = [
        { label: "10", value: '10' },
        { label: "20", value: '20' },
        { label: "30", value: '30' },
        { label: "40", value: '40' },
    ];

    // Function to change rows Numbers
    const changeRows = (e) => {
        setNumberOfRows(e); setEmpty(true); setRows([])
    }

    // Function to go to next page 
    const nextpage = useCallback(() => {
        setActivepage(activePage + 1); setEmpty(true); setRows([])
    }, [setActivepage, activePage, setEmpty, setRows])

    // Function to go to prev page
    const prevpage = useCallback((e) => {
        activePage > 1 && setActivepage(activePage - 1)
        activePage > 1 && setEmpty(true);
        activePage > 1 && setRows([])
    }, [setActivepage, activePage, setEmpty, setRows])


    // Options for Filter
    const options = [
        { label: "Equals", value: '1' },
        { label: "Not Equals", value: '2' },
        { label: "Contains", value: '3' },
        { label: "Does Not Contains", value: '4' },
        { label: "Starts With", value: '5' },
        { label: "Ends With", value: '6' },
    ];

    // Array to be appended in rows for drop down and search
    const filters = [
        <>
            <Select
                options={options}
                value={selected.user_id}
                onChange={(e) => setSelected({ ...selected, user_id: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,user_id:''})} value={searchInput.user_id} onChange={(e) => setSearchInput({ ...searchInput, user_id: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.Catalog}
                onChange={(e) => setSelected({ ...selected, Catalog: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,Catalog:''})} value={searchInput.Catalog} onChange={(e) => setSearchInput({ ...searchInput, Catalog: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.shops_domain}
                onChange={(e) => setSelected({ ...selected, shops_domain: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,shops_domain:''})} value={searchInput.shops_domain} onChange={(e) => setSearchInput({ ...searchInput, shops_domain: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.shops_email}
                onChange={(e) => setSelected({ ...selected, shops_email: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,shops_email:''})} value={searchInput.shops_email} onChange={(e) => setSearchInput({ ...searchInput, shops_email: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.shops_plan_Name}
                onChange={(e) => setSelected({ ...selected, shops_plan_Name: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,shops_plan_Name:''})} value={searchInput.shops_plan_Name} onChange={(e) => setSearchInput({ ...searchInput, shops_plan_Name: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.updated_At}
                onChange={(e) => setSelected({ ...selected, updated_At: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,updated_At:''})} value={searchInput.updated_At} onChange={(e) => setSearchInput({ ...searchInput, updated_At: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.created_At}
                onChange={(e) => setSelected({ ...selected, created_At: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,created_At:''})} value={searchInput.created_At} onChange={(e) => setSearchInput({ ...searchInput, created_At: e })} />
        </>,
        <>
            <Select
                options={options}
                value={selected.domain}
                onChange={(e) => setSelected({ ...selected, domain: e })} 
            />
            <TextField clearButton onClearButtonClick={()=>setSearchInput({...searchInput,domain:''})} value={searchInput.domain} onChange={(e) => setSearchInput({ ...searchInput, domain: e })} />
        </>,
    ];


    // //    Appending Filter in data array for table
    // let rowsPrint = [[...filter]]
    let rowsPrint = [[...filters], ...rows]
    rowsPrint.length < 2 && rowsPrint.push([<h1> No data found </h1>])

    return (
        <div className="dashboard">

            <Page title="Data Grid ">
                <h1>{` Showing ${(activePage - 1) * numberOfRows} to ${numberOfRows * activePage}  of ${count} users`}</h1>
                <div className='tableHeadContainer'>

                    <div className='paginationContainer'>
                        <Pagination label={activePage} hasPrevious
                            onPrevious={prevpage}
                            hasNext
                            onNext={nextpage} />
                        <Select options={noOfRows} label='Number of Rows' labelInline value={numberOfRows} onChange={changeRows} />
                    </div>
                    <button className='btn'> Columns </button>
                </div>

                {/* Table Part starts  */}
                <Card >
                    <DataTable
                        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text']}
                        headings={['User ID', 'Catalog', 'Shop Domain', 'Shop Email', 'Shop Plan Name', 'Updated At', 'Created At', 'Shop\'s myshopify domain']}
                        rows={rowsPrint}
                    />
                </Card>
                {/* Table Part ends */}
            </Page>
        </div>
    )
}

export default Dashboard