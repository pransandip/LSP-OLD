import React, { useEffect, useRef, useState } from "react";
import MainImage from "./MainImage";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios'
import moment from 'moment';

import './css/dashboard.css';
import { SubUrl } from '../Contants';
import { useHistory } from "react-router-dom";
import Navbars from './Navbars';

const Dashboard = (props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [yardList, setYardList] = useState([]);
    const [registerList, setRegisterList] = useState([]);
    const [waitingList, setWaitingList] = useState([]);
    const [openBarrierPopup, setOpenBarrierPopup] = useState(false);
    const [openOrderPop, setOpenOrderPop] = useState(false);
    const [orderList, setOrderList] = useState(null);

    const [openLoadingPop, setOpenLoadingPop] = useState(false);
    const [loadingList, setLoadingList] = useState(null);

    const [dropDown, setDropDown] = useState(false);
    const [dropDownIndex, setDropDownIndex] = useState(null);

    const [loadedWaitingList, setLoadedWaitingList] = useState([]);
    const [drivingMode, setDrivingMode] = useState(null);
    const [loadingPlace, setLoadingPlace] = useState(null);

    const token = 'Token ' + localStorage.getItem("auth_token");
    const history = useHistory();
    const role = localStorage.getItem("role");


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

    useEffect(() => {

        if (role == undefined) {
            history.push("/");
        }

        getYardList();
        getRegisterList();
        getWaitingList();
    }, [])

    const getYardList = () => {
        const url = SubUrl.getYardList;
        axios.get(url, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.status == 200) {
                if (res.data.length) {
                    setYardList(res.data);
                }
            } else {

            }
        }).catch((error) => {

        });
    }


    const getRegisterList = () => {
        const url = SubUrl.getRegistrationList
        axios.get(url, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.status == 200) {
                if (res.data.length) {
                    let l = []
                    res.data.forEach((dataObj) => {
                        if (dataObj.first_weight == null) {
                            l.push(dataObj);
                        }
                    });
                    l.sort((a, b) => {
                        if (a.driver_name < b.driver_name) {
                            return -1;
                        }
                    });
                    setRegisterList(l)

                }
            } else {

            }
        }).catch((error) => {

        });
    }

    const getWaitingList = () => {
        const url = SubUrl.getWaitingList
        axios.get(url, {
            headers: {
                Authorization: token
            },
            queryParams: {
                status: "2"
            }
        }).then((res) => {
            if (res.status == 200) {
                if (res.data.length) {
                    let l = []
                    res.data.forEach((dataObj) => {
                        if (dataObj.loading_place !== "0") {
                            l.push(dataObj);
                        }
                    });
                    let sorted_list = []
                    res.data.forEach((dataObj) => {
                        if (dataObj.loading_place == "0") {
                            sorted_list.push(dataObj);
                        }
                    });
                    res.data.forEach((dataObj) => {
                        if (dataObj.loading_place == "1" || dataObj.loading_place == "2" || dataObj.loading_place == "3" || dataObj.loading_place == "4" || dataObj.loading_place == "5") {
                            sorted_list.push(dataObj);
                        }
                    });
                    res.data.forEach((dataObj) => {
                        if (dataObj.loading_place == "100") {
                            sorted_list.push(dataObj);
                        }
                    });
                    setWaitingList(sorted_list);
                    setLoadedWaitingList(l);

                    //console.log('loadedWaitingList',loadedWaitingList);
                }
            } else {

            }
        }).catch((error) => {

        });
    }


    const getOrderList = (data) => {
        setOrderList(data);
    }

    const getLoadingList = (data) => {
        setLoadingList(data);
    }

    //handleDrivingModeChange handleLoadingPlaceChange
    const handleLoadingPlaceChange = (e) => {
        console.log(e.target.value);
        setLoadingPlace(e.target.value);
    };
    const handleDrivingModeChange = (e) => {
        setDrivingMode(e.target.value);
    };

    const changeStatus = (id, status) => {
        const url = `${SubUrl.changeStatusOfRegistrationList}${id}/`;
        axios.put(url, {
            status: status
        }, {
            headers: {
                Authorization: token
            }
        }).then((res) => {

            if (res.status == 200) {
                setDropDown(false);
                setDropDownIndex(null);
                getRegisterList();
                getYardList();
                getWaitingList();
            }
        }).catch(() => {

        })
    }

    const updateWaitingData = (id, type = 'loading') => {
        //console.log(id, drivingMode, loadingPlace, type);
        if (drivingMode != null) { //&& loadingPlace != null type == 'approve'
            var body = { loading_place: "0", driving_mode: "N" };
            if (loadingPlace != '') body = { loading_place: loadingPlace, driving_mode: drivingMode }; //N
            if (type == 'approve') body = { loading_place: '100' };
            //console.log(body);
            const url = `${SubUrl.updateWaitingList}${id}/`;
            axios.put(url, body, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                if (res.status == 200) {
                    setDropDown(false);
                    setDropDownIndex(null);
                    getRegisterList();
                    getYardList();
                    getWaitingList();
                }
            }).catch(() => {

            })
        }
    }

    useEffect(() => {
        if (orderList != null) {
            console.log("order ", orderList);
            setOpenOrderPop(true);
        }
    }, [orderList])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const hourAndMinutes = (minutes) => {

        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;

    }

    const YardListTable = () => {
        return (
            <>
                <TableContainer component={Paper} style={{ height: "600px" }}>
                    <Table sx={{ width: " 100%" }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Fahrzeug </StyledTableCell>
                                <StyledTableCell align="left">Material </StyledTableCell>
                                <StyledTableCell align="right">Dauer </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                yardList.length > 0 ? yardList.map((item, index) => {

                                    const firstWTime = item.firstw_date_time;

                                    var date1 = moment(firstWTime);
                                    var date2 = moment(new Date());

                                    let differenceInMs = date2.diff(date1); // diff yields milliseconds
                                    let duration1 = moment.duration(differenceInMs); // moment.duration accepts ms
                                    let differenceInMinutes = parseInt(duration1.asMinutes()); // if you would like to have the  

                                    let duration = hourAndMinutes(differenceInMinutes);

                                    let bgGreen = "white";
                                    let colorWhite = "black";

                                    if (item.status == "1") {
                                        bgGreen = "green";
                                        colorWhite = "white";
                                    }

                                    return (

                                        <TableRow key={index} style={{ backgroundColor: bgGreen, color: colorWhite }}>

                                            <TableCell><a onClick={(e) => getOrderList(item)} role="button">{item.vehicle ? item.vehicle : "No Vehicle"} </a> </TableCell>
                                            <TableCell>    {item.gate == null ? "No Material" : item.gate} </TableCell>
                                            <TableCell>
                                                {duration}
                                            </TableCell>
                                        </TableRow>

                                    )
                                }) : <>
                                    <TableRow>
                                        <TableCell colspan="3">
                                            No data found.
                                        </TableCell>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    const RegisterListTable = () => {
        return (
            <>
                <TableContainer component={Paper} style={{ height: "600px" }}>
                    <Table sx={{ width: " 100%" }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>

                                <StyledTableCell align="left">Fahrzeug </StyledTableCell>
                                <StyledTableCell>Material</StyledTableCell>
                                <StyledTableCell align="right">Dauer </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                registerList.length > 0 ? registerList.map((item, index) => {

                                    const firstWTime = item.created_date_time;

                                    var date1 = moment(firstWTime);
                                    var date2 = moment(new Date());

                                    let differenceInMs = date2.diff(date1); // diff yields milliseconds
                                    let duration1 = moment.duration(differenceInMs); // moment.duration accepts ms
                                    let differenceInMinutes = parseInt(duration1.asMinutes()); // if you would like to have the  

                                    let duration = hourAndMinutes(differenceInMinutes);

                                    let bgGreen = "white";
                                    let colorWhite = "black";

                                    if (item.status == "1") {
                                        bgGreen = "green";
                                        colorWhite = "white";
                                    }


                                    return (
                                        <TableRow key={index} style={{ backgroundColor: bgGreen, color: colorWhite }}>

                                            <TableCell><a role="button" onClick={(e) => getOrderList(item)}> {item.vehicle ? item.vehicle : "No Vehicle"} </a> </TableCell>
                                            <TableCell>
                                                {item.gate == null ? "No Material " : item.gate}
                                            </TableCell>
                                            <TableCell>
                                                <div className="dropdown">
                                                    <span style={{ cursor: "pointer" }} onClick={() => {
                                                        if (dropDown) {
                                                            setDropDown(false);
                                                            setDropDownIndex(null);
                                                        } else {
                                                            setDropDown(true);
                                                            setDropDownIndex(index);
                                                        }
                                                    }}> {duration}</span>
                                                    <div className="dropdown-content" style={{ display: dropDown && dropDownIndex == index ? "block" : "none" }}>
                                                        <Button onClick={() => changeStatus(item.id, item.status == "1" ? "0" : "1")} variant="contained" color="success">
                                                            Bestätigen
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    )
                                }) : <>
                                    <TableRow>
                                        <TableCell colspan="3">
                                            No data found.
                                        </TableCell>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    const WaitingListTable = () => {
        return (
            <>
                <TableContainer component={Paper} style={{ height: "600px" }}>
                    <Table sx={{ width: " 100%" }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>

                                <StyledTableCell align="left">Fahrzeug </StyledTableCell>
                                <StyledTableCell > Material</StyledTableCell>
                                <StyledTableCell align="right">Standzeit </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                waitingList.length > 0 ? waitingList.map((item, index) => {

                                    const firstWTime = item.created_date_time;

                                    var date1 = moment(firstWTime);
                                    var date2 = moment(new Date());

                                    let differenceInMs = date2.diff(date1); // diff yields milliseconds
                                    let duration1 = moment.duration(differenceInMs); // moment.duration accepts ms
                                    let differenceInMinutes = parseInt(duration1.asMinutes()); // if you would like to have the  

                                    let duration = hourAndMinutes(differenceInMinutes);

                                    let bgGreen = "white";
                                    let colorWhite = "black";

                                    if (item.loading_place !== "0") {
                                        bgGreen = "yellow";
                                        colorWhite = "white";
                                    }
                                    if (item.loading_place == "100") {
                                        bgGreen = "green";
                                        colorWhite = "white";
                                    }


                                    return (

                                        <TableRow key={index} style={{ backgroundColor: bgGreen, color: colorWhite }}>

                                            <TableCell>{item.vehicle ? item.vehicle : "No Vehicle"}</TableCell>
                                            <TableCell> {item.gate ? item.gate : "No Material "} </TableCell>
                                            <TableCell>
                                                <div className="dropdown">
                                                    <span style={{ cursor: "pointer" }} onClick={() => {
                                                        if (item.loading_place != "100") {
                                                            if (dropDown) {
                                                                setLoadingPlace(item.loading_place);
                                                                setDrivingMode(item.driving_mode);
                                                                setDropDown(false);
                                                                setDropDownIndex(null);
                                                            } else {
                                                                getLoadingList(item)
                                                                setLoadingPlace(null);
                                                                setDrivingMode('V');
                                                                setDropDown(true);
                                                                setDropDownIndex(index);
                                                            }
                                                        }
                                                    }}> {duration}</span>
                                                    <div className="dropdown-content" style={{ display: dropDown && dropDownIndex == index ? "block" : "none" }}  >
                                                        <div className="loadingPlacePopup">

                                                            <div className="header">
                                                                <h6> {item.driver_name}
                                                                    {(item.loading_place != '0' && item.loading_place != '100') ? <button class="btn-approve" onClick={() => updateWaitingData(loadingList.id, 'approve')}>Verladung beenden</button> : ''}
                                                                </h6>
                                                            </div>

                                                            <div className="body">
                                                                <div className="loading_place">
                                                                    <p>Abladestelle</p>
                                                                    <select name="loadingPlace" defaultValue={loadingPlace} onChange={handleLoadingPlaceChange}>
                                                                        <option ></option>
                                                                        {
                                                                            ["1", "2", "3", "4", "5"].map((itm, index) => {
                                                                                var disabled = false; var checked = false;
                                                                                if (loadedWaitingList.length > 0) {
                                                                                    loadedWaitingList.map((val, key) => {
                                                                                        if (val.loading_place == itm) {
                                                                                            disabled = true;
                                                                                        }
                                                                                        if (item.loading_place == itm) checked = true;
                                                                                    })
                                                                                }
                                                                                return (
                                                                                    <option key={index} hidden={disabled} selected={checked} >{itm}</option>
                                                                                )

                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="driving_mode">
                                                                    <p>Fahrmodus</p>
                                                                    <select onChange={handleDrivingModeChange}>
                                                                        {
                                                                            [{ key: 'vorwart', name: 'Vorwärt', val: 'V' }, { key: 'ruckwart', name: 'Rückwärt', val: 'R' }].map((itm1, index) => {
                                                                                return (
                                                                                    <option key={itm1.key} value={itm1.val} selected={item.driving_mode == itm1.val ? true : false} >{itm1.name}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Button onClick={() => updateWaitingData(item.id)} className="save">Bestätigen</Button>
                                                                <Button className="cancel" onClick={() => {
                                                                    if (dropDown) {
                                                                        setDropDown(false);
                                                                        setDropDownIndex(null);
                                                                    } else {
                                                                        setDropDown(true);
                                                                        setDropDownIndex(index);
                                                                    }
                                                                }}>Abrechen</Button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    )
                                }) : <>
                                    <TableRow>
                                        <TableCell colspan="3">
                                            No data found.
                                        </TableCell>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    useEffect(() => {
        console.log("driver ", orderList);
    }, [orderList]);

    return (
        <>
            <Navbars />
            <div className="grid-layout">

                <div className="presenter">
                    <div className="sidebar-left">
                        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs>
                            {
                                role == 'Admin' || role == 'Schrott' ?
                                    <>
                                        <Tab key="ta1" label="Admin Panel" style={{ cursor: "pointer" }} onClick={() => history.push("/view-user")} />
                                    </> : null
                            }
                                <Tab key="ta1" label="Profile" style={{ cursor: "pointer" }} onClick={() => history.push("/my-profile")} />
                                <Tab key="ta1" label="Logout" style={{ cursor: "pointer" }} onClick={() => history.push("/logout")} />
                            </Tabs>
                        </Box> */}

                        <Box sx={{ width: '100%' }}>

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab key="tab1" label="Hofliste" {...a11yProps(0)} />
                                    <Tab key="tab2" label="Anmeldeliste" {...a11yProps(1)} />
                                    <Tab key="tab3" label="Wartelist" {...a11yProps(2)} />
                                </Tabs>
                            </Box>

                            <TabPanel value={value} index={0}>
                                <YardListTable />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <RegisterListTable />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <WaitingListTable />
                            </TabPanel>
                        </Box>
                    </div>
                    <div className="mid-pnl-right">
                        <div className="image_main">
                            <MainImage
                                loadedWaitingList={loadedWaitingList}
                            />
                        </div>

                        <div>
                            <Dialog
                                open={openOrderPop}
                                onClose={() => setOpen(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                width="lg"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Detail
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {
                                            orderList ? <>
                                                <Table>
                                                    <TableHead>

                                                        {/* "licence_plate":	"vehicle",
                                                    "transport_number":"transport_number",
                                                    "driver_mobile":"driver_mobile",
                                                    "driver_name":"driver_name",
                                                    "location":"location",
                                                    "gate":"gate",
                                                    "carrier_creditor_number":"supplier"} */}

                                                        <TableRow>
                                                            <TableCell> Kfz-Kenzeichen </TableCell>
                                                            <TableCell> {orderList.vehicle || 'No Vehicle'}</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell> Transportauftrag  </TableCell>
                                                            <TableCell> {orderList.transport_number || "No Transport Number"}</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell> Handynummer   </TableCell>
                                                            <TableCell> {orderList.driver_mobile || "No Driver Mobile "}</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell> Fahrer    </TableCell>
                                                            <TableCell> {orderList.driver_name || " No Driver Name "}</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell> Ort  </TableCell>
                                                            <TableCell> {orderList.location || "No Location "}</TableCell>
                                                        </TableRow>


                                                        <TableRow>
                                                            <TableCell> Tor    </TableCell>
                                                            <TableCell> {orderList.gate || "No Gate"}</TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell> Fachauftragsnummer </TableCell>
                                                            <TableCell> {orderList.carrier_creditor_number || " No Carrier Creditor Number"}</TableCell>
                                                        </TableRow>

                                                        {
                                                            orderList.first_weight != null ? <>
                                                                <TableRow>
                                                                    <TableCell> First Weight  </TableCell>
                                                                    <TableCell> {orderList.first_weight || " No Carrier Creditor Number"}</TableCell>
                                                                </TableRow>

                                                            </> : null
                                                        }

                                                    </TableHead>
                                                </Table>
                                            </> : null
                                        }
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>

                                    <Button onClick={() => setOpenOrderPop(false)} variant="outlined" color="error">
                                        schließen
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <div>
                            <Dialog
                                open={openLoadingPop}
                                onClose={() => setOpen(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                width="lg"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Vehicle Parking
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {
                                            loadingList ? <>
                                                <Table>
                                                    <TableHead>
                                                        {
                                                            ["1", "2", "3", "4", "5"].map((item, index) => {
                                                                var disabled = false;
                                                                var checked = false;
                                                                var btnClass = 'green-button';
                                                                let showApprove = false;

                                                                if (loadedWaitingList.length > 0) {
                                                                    loadedWaitingList.map((val, key) => {
                                                                        if (val.loading_place == item) {
                                                                            btnClass = 'red-button';
                                                                            checked = true;
                                                                            if (val.id !== loadingList.id) disabled = true;
                                                                            else showApprove = true;
                                                                        }
                                                                    })
                                                                }

                                                                return (<TableRow>
                                                                    <TableCell style={{ border: 'none' }}>
                                                                        <div className="numcheck">
                                                                            <span>{item}</span>
                                                                            <input className={`btn-pop-check ${btnClass}`} key={`abc${item}`} type="checkbox" name="parking[]" defaultChecked={checked} disabled={disabled} onChange={() => updateWaitingData(loadingList.id, loadingList.loading_place == "0" ? { loading_place: item } : { loading_place: "0" })} />


                                                                            {/* <button className={`btn-pop ${btnClass}`}  disabled={disabled} onClick={() => updateWaitingData(loadingList.id,loadingList.loading_place=="0"?{loading_place: item}:{loading_place: "0"} )}>{ item }</button> */}

                                                                            {showApprove ? <button class="btn-approve" onClick={() => updateWaitingData(loadingList.id, { loading_place: "0", driving_mode: "N" })}>approve</button> : ''}
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>)
                                                            })
                                                        }
                                                    </TableHead>
                                                </Table>
                                            </> : null
                                        }
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>

                                    <Button onClick={() => setOpenLoadingPop(false)} variant="outlined" color="error">
                                        schließen
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
};
export default Dashboard;
