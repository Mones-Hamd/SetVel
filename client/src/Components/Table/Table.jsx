import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import classes from './Styles.module.css';
import { Link } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { ContactContext } from '../../context/Contactcontext';
import { useAuth } from '../../hooks/useAuth';
import { useContact } from './../../hooks/useContact';




const DataTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {user}=useAuth();
  const {getContacts}=useContact(user.id)

  useEffect(()=>{
    getContacts.perform()
  },)
  const {contacts,setContact}=useContext(ContactContext);

  const handleChangePage = (event, newPage) => {
   
    setPage(newPage);
  };

  const handleDelete = (id) => {
  
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <thead>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </thead>

          <TableBody
            sx={{
              width: '100%',
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {contacts.map((item, index) => (
              <tr key={index}>
                <td className={classes.center}>{item.name}</td>
                <td className={classes.center}>{item.type}</td>
                <td className={classes.center}>{item.Phone}</td>
                <td className={classes.center}>{item.email  }</td>
                <td className={classes.center}>{item.address}</td>
                <td
                  className={classes.center}
                 
                >
                  <Link to={`contact/${item.id}`} onClick={()=>setContact(item)}>edit</Link>
                </td>
                <td className={classes.center}>
                  <button className={classes.deleteButton}onClick={handleDelete()}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default DataTable;
