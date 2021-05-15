import React, { useState, useRef, useEffect, useMemo } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useTable, useGlobalFilter, useFilters, useSortBy, usePagination, useColumnOrder } from 'react-table';
import { Add, PeopleOutlineTwoTone, SortOutlined } from '@material-ui/icons';
import {  Button, Grid,  makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@material-ui/core';
import GlobalFilter from '../Components/GlobalFilter';
import axios from 'axios';
import PageHeader from '../Components/PageHeader';
import AddEmployee from './AddEmployee';
import Controls from '../Components/controls/Controls';
import Popup from '../Components/Popup';
const useStyles = makeStyles(theme => ({
    newButton: {
backgroundColor:'blue'

    },
    
}))
const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const employeeRef = useRef();
    employeeRef.current = employees
    const [openPopup,setOpenPopup]=useState(false)
    const [notify,setNotify]=useState({isOpen:false,message:'',type:''})
    const classes = useStyles()


    useEffect(() => {
        retrieveEmployees()
    }, []);
    const retrieveEmployees = () => {
        EmployeeService.getAll().
            then((response) => {
                setEmployees(response.data);
            })
            .catch((e) => {
                console.error(e);
            })
    }

    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "SURNAME",
            accessor: "surname"
        },
        {
            Header: "EMAIL",
            accessor: "email"
        },
        {
            Header: "ADDRESS",
            accessor: "addres"
        },
        {
            Header: "PHONE",
            accessor: "phone"
        },

    ], []);
    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        prepareRow,
        rows,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        setColumnOrder
    } = useTable({
        columns,
        data: employees,
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useColumnOrder
    );
    const { globalFilter, pageIndex, pageSize } = state

    /**  const getPdf=()=>{
         return(
             EmployeeService.getPdf()
             .then((response)=>{
                 console.log(response)
             })
         )*/


    const getPdf = () => {

        axios({
            url: 'http://localhost:8080/employees/document/pdf',
            method: 'GET',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        });


    }


    const viewPdf = () => {
        axios(`${'http://localhost:8080/employees/document/pdf'}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const getDocx = () => {
        EmployeeService.getWord()
            .then((response) => {
                console.log(response)
            })
    }
    const getXls = () => {
        EmployeeService.getExcell()
            .then((response) => {
                console.log(response)
            })
    }
const openEMployee=(rowIndex)=>{
const id=employeeRef.current[rowIndex].id;
props.history.push("/employees/"+id)
}
    return (
        <>
            <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoTone
                    fontSize="large" />}
            />
            
                    <Toolbar>
                        <Grid container alignItems="center">
                            

                                <Grid item>
                                    <Button  style={{marginRight:'16px'}}variant="contained" color="primary" onClick={getPdf} >Generate PDF</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" type="button" onClick={viewPdf} >View PDF</Button>
                                </Grid>
                                <Grid item sm={true} />

                                <Grid item>
                                    <Button variant="contained" color="primary" type="button" onClick={getDocx}  >GEBERATE DOCX</Button>
                                </Grid>
                                <Grid item >
                                    <Button style={{marginLeft:'16px'}} variant="contained" color="primary" type="button" onClick={getXls}  >GENERATE EXCELL</Button>
                                </Grid>
                            </Grid>
                       
                    </Toolbar>
             
           <Toolbar>
           <Grid container alignItems='center'>
           <Grid item>
           { /**<Button variant="contained" color="primary" component={Link} to={"/newEmployee"} className={classes.newButton} >New</Button> */}
           <Controls.Button
           text="Addd New"
           variant="outlined"
           startIcon={<Add/>}
           onClick={()=> setOpenPopup(true)}
           />
           </Grid>
           <Grid item sm={true} />

           <Grid item>
           <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
           </Grid>
           </Grid>
           </Toolbar>
            
            <TableContainer component={Paper} >
                <Table stickyHeader aria-label="sticky table" {...getTableProps()}>
                    <TableHead >
                        {headerGroups.map((headerGroup) => (
                            <TableRow hover role="checkbox"
                                {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableCell {
                                        ...column.getHeaderProps(
                                            column.getSortByToggleProps())} >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <SortOutlined /> : <SortOutlined />) : ''}
                                        </span>
                                    </TableCell>

                                ))}

                            </TableRow>
                        ))}


                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()} >
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell component="th" scope="row"  {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}



                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <span className="m-auto">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span className='m-2'>
                    || Go to page:{' '}
                    <input type="number" defaultValue={pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}
                        style={{ width: '100px' }} />
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {[5, 10, 25, 50, 75, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}> Show{pageSize}</option>
                    ))}
                </select>
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button className="m-3" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
            </div>


<Popup title="Employee form"
 openPopup={openPopup} 
setOpenPopup={setOpenPopup}>
<AddEmployee/>
</Popup>




        </>
    )
}

export default EmployeeList
