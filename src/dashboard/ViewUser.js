import React, { useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './css/dashboard.css';
import axios from 'axios';

import editIcon from "./img/edit-icon-box.svg";
import deleteIcon from "./img/delete-icon-box.svg";
import Navbars from "./Navbars";
import { SubUrl } from '../Contants.js';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ViewUser = (props) => {

  const role = localStorage.getItem("role");

  const [userList, setUserList] = useState([]);
  const [rows, setRow] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, email, roll, action,) {
    return { name, email, roll, action, };
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let url = SubUrl.viewUser;
    let token = localStorage.getItem("auth_token");
    axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then((response) => {
      if (response.status == 200) {
        setUserList(response.data);
      }
    });
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const handleDeleteOpen = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const deleteUser = () => {
    let url = SubUrl.viewUser + deleteId + '/';
    let token = localStorage.getItem("auth_token");
    axios.delete(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then((response) => {
      //if (response.status == 204) {
      setOpenDelete(false);
      toast("User successfully deleted.")
      getData();
      //}
    });
  }


  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            x
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const history = useHistory();
  const location = (address) => {
    history.push(`/${address}`);
  }

  return (
    <>
      <Navbars />
      <div className="container">
        <br />
        {
          role == 'Admin' ?
            <>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <button onClick={() => location('add-user')} className="btn btn-primary">Benutzer hinzufügen</button>
              </Box>
            </> : null
        }
        <br />
        <div className="card">
          <div className="card-body">
            <div className="grid-layout">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell> Num</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="center">E-mail</StyledTableCell>
                      <StyledTableCell align="center">Benutzerrollen</StyledTableCell>
                      <StyledTableCell align="right">Aktion</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.name || "No Name"}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.email || "No Email"}</StyledTableCell>
                        <StyledTableCell align="center">{row.role || "No Roll"}</StyledTableCell>
                        <StyledTableCell align="right">
                          <img src={editIcon} style={{ cursor: 'pointer' }} variant="outlined" onClick={() => location('add-user/' + row.id)} />
                          {/* onClick={handleClickOpen} onClick={() => handleUserEdit(row)} */}
                          <img src={deleteIcon} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteOpen(row.id)} /></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Admin Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">Roll</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Operator</MenuItem>
                        <MenuItem value={20}>Super User</MenuItem>
                        <MenuItem value={30}>Self Service</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>
                    Speichern
                  </Button>
                </DialogActions>
              </BootstrapDialog>

              <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDeleteClose}>
                  Benutzer löschen
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <p> Sind Sie sicher, dass Sie diesen Benutzer löschen möchten ?</p>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteClose}>
                    Nein
                  </Button>
                  <Button onClick={deleteUser} >
                    Ja
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div >
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewUser;
