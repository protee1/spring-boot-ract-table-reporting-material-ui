   <div className="list row">
            <div className="col-md-8 list">
                <Button variant="contained"  color="primary" onClick={getPdf} >Generate PDF</Button>
                <Button variant="contained"  color="primary" type="button" onClick={viewPdf} >View PDF</Button>
                <Button variant="contained"  color="primary" type="button" onClick={getDocx}  >GEBERATE DOCX</Button>
                <Button variant="contained"  color="primary" type="button" onClick={getXls}  >GENERATE EXCELL</Button>
            </div>
          <div className="col-md-4 list">
                <div classname="input-group mb-auto p-auto">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
            </div>
            <div className="col-md-12 list">
                <table className="table table-striped table-bordered" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <SortOutlined /> : <SortOutlined />) : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {

                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
            </div>

        </div>