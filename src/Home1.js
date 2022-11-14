import React, { useEffect, useMemo, useRef } from 'react';
import '../src/StyleSheets/DashboardHome.css';
import backGroundImage from '../src/ImageAssests/BackgroundImage/backGround.png';
import axios from 'axios';
import { fetchFirstWeightData } from './api/HomeProcessApi'
import ServiceEngine from '../src/Services/ServiceEngine';
import { Modal, Button, Alert } from 'react-bootstrap';
import environment from './Environment/Environment';
import ImageMapper from 'react-image-mapper';

import MyVerticallyCenteredModal from './PopOver';

const Dashboardhome1 = (props) => {
    const [orderDetails, setOrderDetails] = React.useState([])
    const [show, setShow] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = React.useState("")
    const [modaldata, setModaldata] = React.useState("")
    const [allData, setAllData] = React.useState([])
    const [checkstore, setCheckstore] = React.useState([])
    const [imageWidth, setimageWidth] = React.useState(0);
    const [moveMsg, setmoveMsg] = React.useState('');
    const [selectedProcess, setselectedProcess] = React.useState('');
    const [map, setmap] = React.useState({
        name: "my-map",
        areas: [
            {
                name: "1",
                shape: "poly",
                coords: [526, 4, 526, 31, 579, 31, 579, 4],
                preFillColor: "green"
            },
            {
                name: "2",
                shape: "poly",
                coords: [90, 37, 90, 402, 243, 402, 243, 37],
                preFillColor: "pink"
            },
            {
                name: "3",
                shape: "poly",
                coords: [368, 37, 367, 402, 489, 402, 489, 37],
                preFillColor: "yellow"
            },
            {
                name: "4",
                shape: "poly",
                coords: [489, 252, 489, 402, 694, 402, 694, 252],
                preFillColor: "yellow"
            },
            {
                name: "5",
                shape: "poly",
                coords: [91, 405, 91, 601, 166, 602, 167, 405],
                preFillColor: "blue"
            },
            {
                name: "6",
                shape: "poly",
                coords: [221, 411, 221, 505, 471, 503, 469, 411],
                preFillColor: "grey"
            },
            {
                name: "7",
                shape: "poly",
                coords: [277, 503, 277, 648, 470, 648, 469, 503],
                preFillColor: "grey"
            },
            {
                name: "8",
                shape: "poly",
                coords: [478, 493, 480, 660, 517, 659, 514, 493],
                preFillColor: "black"
            },
            {
                name: "9",
                shape: "poly",
                coords: [525, 403, 525, 475, 570, 475, 570, 403],
                preFillColor: "orange"
            },
            {
                name: "10",
                shape: "poly",
                coords: [581, 461, 581, 600, 693, 600, 693, 461],
                preFillColor: "orange"
            },
            {
                name: "11",
                shape: "poly",
                coords: [854, 705, 854, 731, 1024, 730, 1021, 705],
                preFillColor: "purple"
            },
            {
                name: "12",
                shape: "poly",
                coords: [946, 629, 946, 654, 1105, 653, 1105, 629],
                preFillColor: "navy blue",
                value: 'process2'
            },
            {
                name: "13",
                shape: "poly",
                coords: [948, 590, 946, 616, 1105, 616, 1105, 590],
                preFillColor: "silver",
                value: 'process1'
            },
            {
                name: "14",
                shape: "poly",
                coords: [867, 71, 867, 406, 970, 406, 970, 71],
                preFillColor: "gold"
            },
            {
                name: "15",
                shape: "poly",
                coords: [969, 111, 969, 400, 1091, 398, 1090, 111],
                preFillColor: "gold"
            },
            {
                name: "16",
                shape: "poly",
                coords: [867, 405, 867, 431, 968, 431, 967, 405],
                preFillColor: "gold"
            },
            {
                name: "17",
                shape: "poly",
                coords: [868, 430, 877, 444, 967, 444, 968, 430],
                preFillColor: "gold"
            },
            {
                name: "18",
                shape: "poly",
                coords: [970, 399, 970, 406, 1001, 406, 1001, 399],
                preFillColor: "gold"
            },
            {
                name: "19",
                shape: "poly",
                coords: [1091, 111, 1092, 324, 1144, 324, 1144, 111],
                preFillColor: "white"
            },
            {
                name: "20",
                shape: "poly",
                coords: [1144, 128, 1144, 159, 1151, 159, 1151, 128],
                preFillColor: "white"
            },
            {
                name: "21",
                shape: "poly",
                coords: [1150, 129, 1150, 159, 1156, 154, 1155, 132],
                preFillColor: "white"
            },
            {
                name: "22",
                shape: "poly",
                coords: [1154, 133, 1154, 154, 1160, 148, 1161, 140],
                preFillColor: "white"
            },
            {
                name: "23",
                shape: "poly",
                coords: [1144, 277, 1144, 311, 1150, 311, 1151, 281],
                preFillColor: "white"
            },
            {
                name: "24",
                shape: "poly",
                coords: [1150, 280, 1150, 311, 1157, 305, 1157, 287],
                preFillColor: "white"
            },
            {
                name: "25",
                shape: "poly",
                coords: [1157, 287, 1157, 305, 1160, 302, 1161, 292],
                preFillColor: "white"
            },
            {
                name: "26",
                shape: "poly",
                coords: [1239, 164, 1239, 344, 1283, 344, 1284, 164],
                preFillColor: "aqua"
            }
        ]
    })

    const fetchFirstWeightData = async (yardTicket, authToken) => {
        let Maindata = [];
        let service = new ServiceEngine(
            'GET',
            `/api/OrderDetails/`,
            false,
            environment.API_BASEURL,
            '',
            '',
            '',
            authToken
        )
        try {
            let response = await service.doAxiosGet();
            if (response) {

                let dataArr = []
                response.data.forEach((x) => {
                    if (x.process_code) {
                        dataArr.push({ ...x })
                        setAllData([...dataArr])
                    }
                })

                await response?.data?.sort((a, b) => (a.process_code > b.process_code) ? 1 : ((b.process_code > a.process_code) ? -1 : 0));
                await response?.data?.map(async (item) => {
                    if (checkstore.length === 0 && item.store_number !== null) {
                        checkstore.push(item.store_number)
                    }
                    else {
                        let check = checkstore.some((numbers) => numbers === item.store_number)
                        if (!check && item.store_number !== null) {
                            checkstore.push(item.store_number)
                        }
                    }
                    if (item.process_code !== null && (/[a-zA-Z]/).test(item.process_code)) {
                        if (Maindata.length === 0) {
                            await Maindata.push({
                                process_code: item?.process_code, data: [
                                    {
                                        variety_number: item?.variety_number,
                                        license_plate: item?.license_plate,
                                        id: item?.id,
                                        store_number: item?.store_number
                                    },
                                ]
                            })

                        }


                        else {
                            let found = await Maindata && Maindata.find(element => item.process_code === element.process_code);
                            if (found) {
                                await found?.data?.push({
                                    variety_number: item?.variety_number,
                                    license_plate: item?.license_plate,
                                    id: item?.id,
                                    store_number: item?.store_number
                                })
                            }
                            else {
                                await Maindata.push({
                                    process_code: item?.process_code, data: [
                                        {
                                            variety_number: item?.variety_number,
                                            license_plate: item?.license_plate,
                                            id: item?.id,
                                            store_number: item?.store_number
                                        }
                                    ]
                                })
                            }
                        }
                    }
                })
                setOrderDetails(Maindata)
                return response
            }

        }
        catch (error) {
        }
    };
    useEffect(async () => {
        await fetchFirstWeightData();
    }, []);
    var auth = localStorage.getItem('auth_token');

    const updateAPI = async (id, value, yardTicket, authToken) => {
        var bodyFormData = new FormData();
        bodyFormData.append('store_number', value)
        let service = new ServiceEngine(
            'PUT',
            `/api/OrderDetails/${id}/`,
            false,
            environment.API_BASEURL,
            '',
            '',
            '',
            authToken
        )
        let response = await service.doAxiosPut(bodyFormData, id);
        if (response) {
            await fetchFirstWeightData()
        }
    }

    useEffect(() => {
        setimageWidth(window.innerWidth - 200);
    })

    const handleDisable = (e) => {
    }
    const title = useRef("")

    function clicked(area) {
        alert('coordinates: ' + JSON.stringify(area.coords) + area.value + " area clicked.");
        if (area.value === 'process1') {
            setselectedProcess('Einfahrtswaaage1')
        }
        if (area.value === 'process2') {
            setselectedProcess('Einfahrtswaaage2')
        }
    }
    function clickedOutside(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };

    }
    function moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        console.log(JSON.stringify(coords));
        setmoveMsg(JSON.stringify(coords))
        //alert(JSON.stringify(coords));
    }
    function enterArea(area) {

    }
    function leaveArea(area) {

    }
    function moveOnArea(area, evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };

    }



    return (
        <div className="grid">
            <div className="presenter">
                <div style={{ position: "relative" }}>
                    <ImageMapper
                        src={backGroundImage}
                        map={map}
                        width={1429}
                        // onLoad={() => this.load()}
                        onClick={area => clicked(area)}
                        onMouseEnter={area => enterArea(area)}
                        onMouseLeave={area => leaveArea(area)}
                        onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
                        onImageClick={evt => clickedOutside(evt)}
                        onImageMouseMove={evt => moveOnImage(evt)}
                    />
                </div>
            </div>
            <div className="source">
                <tabel className="tablemain">
                    <thead >Hoffliste:(YardList)</thead>
                    {
                        orderDetails && orderDetails?.map((item, index) => {
                            return (
                                <div >
                                    <tr >
                                        <th colSpan="2">Process {item.process_code}</th>
                                    </tr>
                                    {item.check_yard_list = true && item.process_code !== null && (/[a-zA-Z]/).test(item.process_code) ?
                                        (<div style={{ borderBottom: "1px solid black" }}>
                                            {item && item?.data.map((order, index) => {
                                                let checkradio = checkstore.some((el) => el === index + 1)
                                                return (
                                                    <tr className="trmain" >
                                                        <td colSpan="2">{order.variety_number} {order.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="click_popup" onDoubleClick={() => { setModalShow(true); setModaldata(allData && allData.find((x) => { return x.id === order.id })) }}>{order.license_plate}</span>
                                                            <div className={item.process_code === "A" ? "icon_book tooltip" : ""} key={index} onMouseEnter={handleShow}>
                                                                <span className={item.process_code === "A" ? "tooltiptext  popup_txt" : "none_display"}>
                                                                    {
                                                                        ["1", "2", "3", "4", "5", "6", "7", "8"].map((numbers) => {
                                                                            const checkradio = checkstore.some((el) => el === numbers)
                                                                            return (
                                                                                <label><input type="radio" disabled={checkradio} onChange={(e) => {
                                                                                    updateAPI(order.id, e.target.value)
                                                                                }} value={numbers} name="bookslot" />{numbers}</label>
                                                                            )
                                                                        })
                                                                    }

                                                                </span>
                                                                <i onDoubleClick={() => { window.alert("clicked") }}>{order.store_number && item.process_code === "A" ? order.store_number : ""}</i>
                                                            </div></td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </div>
                                        ) : ""}
                                </div>
                            )
                        })
                    }
                </tabel>
            </div>
        </div>
    )

}

export default Dashboardhome1;