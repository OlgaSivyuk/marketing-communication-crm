import React, { useMemo } from 'react';
import { COLUMNS_STATUS } from '../../utils/columns'
import DATA_STATUS from '../../utils/DATA_STATUS.json'
import { useTable } from 'react-table'
import './SendsStatusTableau.css';

function SendsStatusTableau() {


    const columns = useMemo(() => COLUMNS_STATUS, []);
    const data = useMemo(() => DATA_STATUS, []);


  const {   
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
} = useTable({
    columns,
    data
}); 


    return (
      <div className="tableau__cell-wrapper send-status">
        <table className="tableau__table__wrapper" {...getTableProps()}>
          <thead className="tableau__table-header__wrapper">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="tableau__table-column" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="tableau__table-body__wrapper" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="tableau__table-row__wrapper" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="tableau__table-cell" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};

export default SendsStatusTableau;