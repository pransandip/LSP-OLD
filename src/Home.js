import React, { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from 'react-hls-player';
import "../src/StyleSheets/DashboardHome.css";
import backGroundImage from "../src/ImageAssests/BackgroundImage/backGround.png";
import infoInactiveImage from "../src/ImageAssests/iconimages/EVO_Info_inaktiv.png";

import evoTorZuAktiv from "../src/ImageAssests/iconimages/EVO_Tor-Zu_aktiv.png";
import evoTorZuInAktiv from "../src/ImageAssests/iconimages/EVO_Tor-Zu_inaktiv.png";

import evoTorAufAktiv from "../src/ImageAssests/iconimages/EVO_Tor-Auf_aktiv.png";
import evoTorAufInAktiv from "../src/ImageAssests/iconimages/EVO_Tor-Auf_inaktiv.png";

import evoTorInAktiv from "../src/ImageAssests/iconimages/EVO_Tor_inaktiv.png";

import evoSchrankeAufaktiv from "../src/ImageAssests/iconimages/EVO_Schranke-Auf_aktiv.png";
import evoSchrankeAufInaktiv from "../src/ImageAssests/iconimages/EVO_Schranke-Auf_inaktiv.png";

import evoSchrankeZuaktiv from "../src/ImageAssests/iconimages/EVO_Schranke-Zu_aktiv.png";
import evoSchrankeZuInaktiv from "../src/ImageAssests/iconimages/EVO_Schranke-Zu_inaktiv.png";

import evoSchrankeInaktiv from "../src/ImageAssests/iconimages/EVO_Schranke_inaktiv.png";
import evoSchrankeaktiv from "../src/ImageAssests/iconimages/EVO_Schranke_aktiv.png";

import evoAmpelGruenInaktiv from "../src/ImageAssests/iconimages/EVO_Ampel_Gruen_inaktiv.png";
import evoAmpelGruenaktiv from "../src/ImageAssests/iconimages/EVO_Ampel_Gruen_aktiv.png";
import evoAmpelRotInaktiv from "../src/ImageAssests/iconimages/EVO_Ampel_Rot_inaktiv.png";
import evoAmpelRotaktiv from "../src/ImageAssests/iconimages/EVO_Ampel_Rot_aktiv.png";

import evoPfeilGreenInaktiv from "../src/ImageAssests/iconimages/EVO_Pfeil_Gruen_inaktiv.png";
import evoPfeilGreenaktiv from "../src/ImageAssests/iconimages/EVO_Pfeil_Gruen_aktiv.png";
import evoPfeilRotInaktiv from "../src/ImageAssests/iconimages/EVO_Pfeil_Rot_inaktiv.png"
import evoPfeilRotaktiv from "../src/ImageAssests/iconimages/EVO_Pfeil_Rot_aktiv.png"

import evoEinfahrtswaage1inaktiv from "../src/ImageAssests/iconimages/EVO_Einfahrtswaage1_inaktiv.png";
import evoEinfahrtswaage1aktiv from "../src/ImageAssests/iconimages/EVO_Einfahrtswaage1_aktiv.png";

import evoEinfahrtswaage2inaktiv from "../src/ImageAssests/iconimages/EVO_Einfahrtswaage2_inaktiv.png";
import evoEinfahrtswaage2aktiv from "../src/ImageAssests/iconimages/EVO_Einfahrtswaage2_aktiv.png";

import evoAusfahrtswaageInaktiv from "../src/ImageAssests/iconimages/EVO_Ausfahrtswaage_inaktiv.png";
import evoAusfahrtswaageaktiv from "../src/ImageAssests/iconimages/EVO_Ausfahrtswaage_aktiv.png";

import evoAusfahrtPKWInaktiv from "../src/ImageAssests/iconimages/EVO_Ausfahrt-PKW_inaktiv.png";
import evoAusfahrtPKWaktiv from "../src/ImageAssests/iconimages/EVO_Ausfahrt-PKW_aktiv.png";
import Iframe from 'react-iframe'

import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";
import { fetchFirstWeightData } from "./api/HomeProcessApi";
import ServiceEngine from "../src/Services/ServiceEngine";
import environment from "./Environment/Environment";
import ImageMapper from "react-image-mapper";

import MyVerticallyCenteredModal from "./PopOver";
import { useHistory } from "react-router";

const Dashboardhome = (props) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showDiv, setshowDiv] = useState(false);
  const [modalShow, setModalShow] = useState("");
  const [modaldata, setModaldata] = useState("");
  const [allData, setAllData] = useState([]);
  const [checkstore, setCheckstore] = useState([]);
  const [imageWidth, setimageWidth] = useState(0);
  const [moveMsg, setmoveMsg] = useState("");
  const [firstVehicleWait, setfirstVehicleWait] = useState(0);
  const [dateTime, setdateTime] = useState("");
  const [alibiNumber, setalibiNumber] = useState("");
  const [showTextArea, setshowTextArea] = useState(false);
  const [selectedProcess, setselectedProcess] = useState("");
  const [turProcess, setturProcess] = useState(false);
  const [rotate, setrotate] = useState(0);

  const [pro1, setpro1] = useState(false);
  const [pro2, setpro2] = useState(false);
  const [pro3, setpro3] = useState(false);
  const [pro4, setpro4] = useState(false);
  const [pro5, setpro5] = useState(false);
  const [pro6, setpro6] = useState(false);
  const [pro7, setpro7] = useState(false);
  const [pro8, setpro8] = useState(false);
  const [pro9, setpro9] = useState(false);


  const [tur1, settur1] = useState(false);
  const [tur2, settur2] = useState(false);
  const [tur3, settur3] = useState(false);
  const [tur4, settur4] = useState(false);
  const history = useHistory("")
  const [map, setmap] = useState({
    name: "my-map",
    areas: [
      // {
      //   name: "Annahamehalle",
      //   shape: "poly",
      //   coords: [225, 420, 225, 518, 285, 518, 285, 663, 482, 663, 482, 422],
      //   preFillColor: "",
      //   fillColor: "transparent",
      //   value: "Annahamehalle",
      // },
      // {
      //   name: "12",
      //   shape: "poly",
      //   coords: [965, 600, 965, 630, 1135, 630, 1136, 600],
      //   preFillColor: "",
      //   fillColor: "blue",
      //   value: "process1",
      // },
      // {
      //   name: "13",
      //   shape: "poly",
      //   coords: [965, 643, 965, 676, 1135, 676, 1136, 643],
      //   preFillColor: "",
      //   fillColor: "transparent",
      //   value: "process2",
      // },
      // {
      //   name: "14",
      //   shape: "poly",
      //   coords: [876, 722, 876, 750, 1056, 750, 1056, 722],
      //   preFillColor: "",
      //   fillColor: "transparent",
      //   value: "process3",
      // },
      {
        name: "5",
        shape: "circle",
        coords: [1148, 190, 17],
        preFillColor: "red",
        fillColor: "transparent",
      },
      {
        name: "5",
        shape: "circle",
        coords: [1298, 238, 17],
        preFillColor: "yellow",
        fillColor: "transparent",
      },
      {
        name: "5",
        shape: "circle",
        coords: [942, 438, 17],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "info1",
        shape: "circle",
        coords: [1286, 668, 11],
        preFillColor: "transparent",
        fillColor: "transparent",
        value: "info1",
      },
      {
        name: "4",
        shape: "circle",
        coords: [1226, 612, 9],
        preFillColor: "transparent",
        fillColor: "transparent",
        value: 'rotate1'
      },
      {
        name: "slot1",
        shape: "poly",
        coords: [270, 109, 307, 109, 307, 145, 270, 145],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot2",
        shape: "poly",
        coords: [270, 148, 307, 148, 307, 183, 270, 183],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot3",
        shape: "poly",
        coords: [270, 186, 307, 186, 307, 221, 270, 221],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot4",
        shape: "poly",
        coords: [270, 224, 307, 224, 307, 260, 270, 260],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot5",
        shape: "poly",
        coords: [270, 263, 307, 263, 307, 298, 270, 298],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot6",
        shape: "poly",
        coords: [270, 301, 307, 301, 307, 336, 270, 336],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot7",
        shape: "poly",
        coords: [270, 339, 307, 339, 307, 375, 270, 375],
        preFillColor: "green",
        fillColor: "transparent",
      },
      {
        name: "slot8",
        shape: "poly",
        coords: [270, 378, 307, 378, 307, 413, 270, 413],
        preFillColor: "green",
        fillColor: "transparent",
      },
    ],
  });



  function getWeight(process) {
    let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
    socket.onopen = function (e) {
      socket.send("GET WEIGHT" + process);
    };
    var tempData = "";
    socket.onmessage = function (event) {
      var tempData = JSON.parse(event.data);
      if (tempData.msg_type === "weight") {
        if (tempData.weight === "0") {
          socket.send("GET WEIGHT" + process);
        } else {
          setfirstVehicleWait(tempData.weight);
          setdateTime(tempData.date + " " + tempData.time);
          setalibiNumber(tempData.alibi_nr);
        }
      } else {
        setfirstVehicleWait("0");
      }
      socket.onerror = function (event) {
        setfirstVehicleWait(" ");
      };
    };
  }

  useEffect(() => {
    setimageWidth(window.innerWidth - 200);
    if (localStorage.getItem("auth_token") === undefined || !localStorage.getItem("auth_token")) {
      history.push("/Home")
    }
  }, []);

  const fetchFirstWeightData = async (yardTicket, authToken) => {
    let Maindata = [];
    let service = new ServiceEngine(
      "GET",
      `/api/OrderDetails/`,
      false,
      environment.API_BASEURL,
      "",
      "",
      "",
      authToken
    );
    try {
      let response = await service.doAxiosGet();
      if (response) {
        let dataArr = [];
        response.data.forEach((x) => {
          if (x.process_code) {
            dataArr.push({ ...x });
            setAllData([...dataArr]);
          }
        });

        await response?.data?.sort((a, b) =>
          a.process_code > b.process_code
            ? 1
            : b.process_code > a.process_code
              ? -1
              : 0
        );
        await response?.data?.map(async (item) => {
          if (
            item.check_yard_list === true &&
            checkstore.length === 0 &&
            item.store_number !== null
          ) {
            checkstore.push(item.store_number);
          } else {
            let check = checkstore.some((numbers) => numbers === item.store_number);
            if (
              item.check_yard_list === true &&
              !check &&
              item.store_number !== null
            ) {
              checkstore.push(item.store_number);
            }
          }
          if (
            item.process_code !== null &&
            /[a-zA-Z0-9]/.test(item.process_code)
          ) {
            if (Maindata.length === 0) {
              await Maindata.push({
                process_code: item?.process_code,
                data: [
                  {
                    vehicle_type: item?.vehicle_type,
                    license_plate: item?.license_plate,
                    id: item?.id,
                    store_number: item?.store_number,
                    check_yard_list: item.check_yard_list,
                    gross_datetime: item?.gross_datetime,
                    created_on: item?.created_on
                  },
                ],
              });
            } else {
              let found =
                (await Maindata) &&
                Maindata.find(
                  (element) => item.process_code === element.process_code
                );
              if (found) {
                await found?.data?.push({
                  vehicle_type: item?.vehicle_type,
                  license_plate: item?.license_plate,
                  id: item?.id,
                  store_number: item?.store_number,
                  check_yard_list: item?.check_yard_list,
                  gross_datetime: item?.gross_datetime,
                  created_on: item?.created_on
                });
              } else {
                await Maindata.push({
                  process_code: item?.process_code,
                  data: [
                    {
                      vehicle_type: item?.vehicle_type,
                      license_plate: item?.license_plate,
                      id: item?.id,
                      store_number: item?.store_number,
                      check_yard_list: item?.check_yard_list,
                      gross_datetime: item?.gross_datetime,
                      created_on: item?.created_on
                    },
                  ],
                });
              }
            }
          }
        });
        setOrderDetails(Maindata);
        return response;
      }
    } catch (error) { }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFirstWeightData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(async () => {
    const response = await fetchFirstWeightData();
    // let selected = [];
    // response && response.data.map((item)=>{
    //   if( item.check_yard_list &&
    //     item.process_code !== null &&
    //      (item.process_code ==='1' ||
    //      item.process_code ==='1A') &&
    //     item.store_number !=="" &&
    //     `slot${item.store_number}` ){
    //       console.log('selected', item);
    //       selected.push("slot"+item.store_number);
    //     }
    // })
    const selected = response && response.data.map(
      ({ store_number, check_yard_list, process_code }) =>
        check_yard_list &&
        process_code !== null &&
        (process_code === '1' ||
          process_code === '1A') &&
        store_number !== "" &&
        `slot${store_number}`
    )
      .filter((id) => id);
    const newPolys = map.areas.map((box) => {
      if (selected && selected.includes(box.name)) return { ...box, preFillColor: "red" };
      else return box;
    });
    setmap({ ...map, areas: newPolys });
  }, [checkstore]);
  var auth = localStorage.getItem("auth_token");

  const updateAPI = async (id, value, checked, data, authToken) => {
    var bodyFormData = new FormData();
    var tempSlot = "slot" + value;
    var tempSlot2 = "slot" + data;
    if (checked) {
      map.areas.map((item) => {
        if (item.name === tempSlot) {
          item.preFillColor = "red";
        }
      });
      bodyFormData.append("store_number", value);
    } else {
      map.areas.map((item) => {
        if (item.name === tempSlot2) {
          item.preFillColor = "green";
        }
      });

      bodyFormData.append("store_number", "");
    }
    bodyFormData.append("check_yard_list", true);
    let service = new ServiceEngine(
      "PUT",
      `/api/OrderDetails/${id}/`,
      false,
      environment.API_BASEURL,
      "",
      "",
      "",
      authToken
    );
    let response = await service.doAxiosPut(bodyFormData, id);
    if (response) {
      const { data } = await fetchFirstWeightData();
      if (data) setCheckstore([...data]);
    }
  };

  const updateeAPI = async (id, value, checked, data, authToken) => {
    var bodyFormData = new FormData();
    var tempSlot = "slot" + value;
    var tempSlot2 = "slot" + data;
    if (checked) {
      map.areas.map((item) => {
        if (item.name === tempSlot) {
          item.preFillColor = "red";
        }
      });
      bodyFormData.append("store_number", value);
    } else {
      map.areas.map((item) => {
        if (item.name === tempSlot2) {
          item.preFillColor = "green";
        }
      });

      bodyFormData.append("store_number", "Fertig");
    }
    bodyFormData.append("check_yard_list", true);
    let service = new ServiceEngine(
      "PUT",
      `/api/OrderDetails/${id}/`,
      false,
      environment.API_BASEURL,
      "",
      "",
      "",
      authToken
    );
    let response = await service.doAxiosPut(bodyFormData, id);
    if (response) {
      const { data } = await fetchFirstWeightData();
      if (data) setCheckstore([...data]);
    }
  };

  const handleDisable = (e) => { };
  const title = useRef("");

  function clicked(area) {
    if (area.value === "process1") {
      setselectedProcess("Einfahrtswaaage1");
      getWeight("0");
    }
    if (area.value === "process2") {
      setselectedProcess("Einfahrtswaaage2");
      getWeight("1");
    }
    if (area.value === "process3") {
      setselectedProcess("Ausfahrtswaage");
      getWeight("2");
    }
    if (area.value === "info1") {
      setshowTextArea(true)
    }
    if (area.value === "rotate1") {
      if (rotate === 1) {
        document.getElementById('pro11').src = evoPfeilGreenInaktiv
        document.getElementById('pro11').style.transform = 'rotate(180deg)'
        document.getElementById('pro10').src = evoPfeilRotInaktiv
        setrotate(0);
      } else {
        document.getElementById('pro10').src = evoPfeilGreenInaktiv
        // document.getElementById('pro10').style.transform = 'rotate(180deg)'
        document.getElementById('pro11').src = evoPfeilRotInaktiv
        setrotate(1);
      }
    }
  }

  function clicked_image(area) {

    if (!pro1) {
      document.getElementById('bar1').src = evoSchrankeZuInaktiv;
      document.getElementById('pro1').src = evoEinfahrtswaage1inaktiv
      document.getElementById('lamp1').src = evoAmpelRotInaktiv;
    } else {
      document.getElementById('bar1').src = evoSchrankeAufInaktiv;
      document.getElementById('pro1').src = evoEinfahrtswaage1inaktiv
      document.getElementById('lamp1').src = evoAmpelGruenInaktiv;
    }

    if (!pro2) {
      document.getElementById('bar2').src = evoSchrankeZuInaktiv;
      document.getElementById('pro2').src = evoEinfahrtswaage2inaktiv
      document.getElementById('lamp2').src = evoAmpelRotInaktiv;
    } else {
      document.getElementById('bar2').src = evoSchrankeAufInaktiv;
      document.getElementById('pro2').src = evoEinfahrtswaage2inaktiv
      document.getElementById('lamp2').src = evoAmpelGruenInaktiv;
    }

    if (!pro3) {
      document.getElementById('bar3').src = evoSchrankeZuInaktiv;
      document.getElementById('pro3').src = evoAusfahrtswaageInaktiv
      document.getElementById('lamp3').src = evoAmpelRotInaktiv;
    } else {
      document.getElementById('bar3').src = evoSchrankeAufInaktiv;
      document.getElementById('pro3').src = evoAusfahrtswaageInaktiv
      document.getElementById('lamp3').src = evoAmpelGruenInaktiv;
    }

    if (!pro4) {
      document.getElementById('bar4').src = evoSchrankeZuInaktiv;
      document.getElementById('pro4').src = evoAusfahrtPKWInaktiv
      document.getElementById('lamp4').src = evoAmpelRotInaktiv;
    } else {
      document.getElementById('bar4').src = evoSchrankeAufInaktiv;
      document.getElementById('pro4').src = evoAusfahrtPKWInaktiv
      document.getElementById('lamp4').src = evoAmpelGruenInaktiv;
    }


    // document.getElementById('bar2').src = evoSchrankeInaktiv;
    // document.getElementById('pro2').src = evoEinfahrtswaage2inaktiv
    // document.getElementById('lamp2').src = evoAmpelRotInaktiv;

    // document.getElementById('bar3').src = evoSchrankeInaktiv;
    // document.getElementById('pro3').src = evoAusfahrtswaageInaktiv
    // document.getElementById('lamp3').src = evoAmpelRotInaktiv;

    // document.getElementById('bar4').src = evoSchrankeInaktiv;
    // document.getElementById('pro4').src = evoAusfahrtPKWInaktiv
    // document.getElementById('lamp4').src = evoAmpelRotInaktiv;

    if (!tur1) {
      document.getElementById('pro5').src = evoTorZuInAktiv
    } else {
      document.getElementById('pro5').src = evoTorAufInAktiv
    }

    if (!tur2) {
      document.getElementById('pro6').src = evoTorZuInAktiv
    } else {
      document.getElementById('pro6').src = evoTorAufInAktiv
    }

    if (!tur3) {
      document.getElementById('pro7').src = evoTorZuInAktiv
    } else {
      document.getElementById('pro7').src = evoTorAufInAktiv
    }

    if (!tur4) {
      document.getElementById('pro8').src = evoTorZuInAktiv
    } else {
      document.getElementById('pro8').src = evoTorAufInAktiv
    }

    if (!pro9) {
      document.getElementById('pro9').src = evoSchrankeZuInaktiv;
    } else {
      document.getElementById('pro9').src = evoSchrankeAufInaktiv;
    }

    if (area === "process1") {
      document.getElementById('pro1').src = evoEinfahrtswaage1aktiv
      if (!pro1) {
        document.getElementById('bar1').src = evoSchrankeZuaktiv;
        document.getElementById('lamp1').src = evoAmpelRotaktiv;
      } else {
        document.getElementById('bar1').src = evoSchrankeAufaktiv;
        document.getElementById('lamp1').src = evoAmpelGruenaktiv;
      }
      setselectedProcess("Einfahrtswaaage1");
      getWeight("0");
      setturProcess(false);
    }
    if (area === "process2") {
      document.getElementById('pro2').src = evoEinfahrtswaage2aktiv
      if (!pro2) {
        document.getElementById('bar2').src = evoSchrankeZuaktiv;
        document.getElementById('lamp2').src = evoAmpelRotaktiv;
      } else {
        document.getElementById('bar2').src = evoSchrankeAufaktiv;
        document.getElementById('lamp2').src = evoAmpelGruenaktiv;
      }

      setselectedProcess("Einfahrtswaaage2");
      getWeight("1");
      setturProcess(false);
    }
    if (area === "process3") {
      document.getElementById('pro3').src = evoAusfahrtswaageaktiv
      if (!pro3) {
        document.getElementById('bar3').src = evoSchrankeZuaktiv;
        document.getElementById('lamp3').src = evoAmpelRotaktiv;
      } else {
        document.getElementById('bar3').src = evoSchrankeAufaktiv;
        document.getElementById('lamp3').src = evoAmpelGruenaktiv;
      }

      setselectedProcess("Ausfahrtswaage");
      getWeight("2");
      setturProcess(false);
    }
    if (area === "process4") {
      document.getElementById('pro4').src = evoAusfahrtPKWaktiv
      if (!pro4) {
        document.getElementById('bar4').src = evoSchrankeZuaktiv;
        document.getElementById('lamp4').src = evoAmpelRotaktiv;
      } else {
        document.getElementById('bar4').src = evoSchrankeAufaktiv;
        document.getElementById('lamp4').src = evoAmpelGruenaktiv;
      }
      setselectedProcess("Ausfahrt PKW");
      setturProcess(true);
    }

    if (area === "process5") {
      if (!tur1) {
        document.getElementById('pro5').src = evoTorZuAktiv
      } else {
        document.getElementById('pro5').src = evoTorAufAktiv
      }

      setselectedProcess("Tür1");
      setturProcess(true);
    }

    if (area === "process6") {
      if (!tur2) {
        document.getElementById('pro6').src = evoTorZuAktiv
      } else {
        document.getElementById('pro6').src = evoTorAufAktiv
      }


      setselectedProcess("Tür2");
      setturProcess(true);
    }

    if (area === "process7") {
      if (!tur3) {
        document.getElementById('pro7').src = evoTorZuAktiv
      } else {
        document.getElementById('pro7').src = evoTorAufAktiv
      }


      setselectedProcess("Tür3");
      setturProcess(true);
    }

    if (area === "process8") {
      if (!tur4) {
        document.getElementById('pro8').src = evoTorZuAktiv
      } else {
        document.getElementById('pro8').src = evoTorAufAktiv
      }


      setselectedProcess("Tür4");
      setturProcess(true);
    }

    if (area === "process9") {
      if (!pro9) {
        document.getElementById('pro9').src = evoSchrankeZuaktiv;
      } else {
        document.getElementById('pro9').src = evoSchrankeAufaktiv;
      }
      setselectedProcess('Einfahrt PKW');
      setturProcess(true);
    }

    // if (area === "process10") {
    //   document.getElementById('pro10').src = evoPfeilGreenaktiv
    //   document.getElementById('pro11').src = evoPfeilRotInaktiv
    //   setrotate(1);
    // }
    // if (area === "process11") {
    //   document.getElementById('pro11').src = evoPfeilRotaktiv
    //   document.getElementById('pro10').src = evoPfeilGreenInaktiv
    //   setrotate(0);
    // }


  }



  function clickedOutside(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  }
  function moveOnImage(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    console.log('coords', coords);
    setmoveMsg(JSON.stringify(coords));
  }
  function enterArea(area) { }
  function leaveArea(area) { }
  function moveOnArea(area, evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  }

  function openBarrier(process) {
    if (process === 'Einfahrtswaaage1') {
      document.getElementById('bar1').src = evoSchrankeaktiv;
      document.getElementById('lamp1').src = evoAmpelGruenaktiv;
      setpro1(true);
    } else if (process === 'Einfahrtswaaage2') {
      document.getElementById('bar2').src = evoSchrankeaktiv;
      document.getElementById('lamp2').src = evoAmpelGruenaktiv;
      setpro2(true);
    } else if (process === 'Ausfahrtswaage') {
      document.getElementById('bar3').src = evoSchrankeaktiv;
      document.getElementById('lamp3').src = evoAmpelGruenaktiv;
      setpro3(true);
    } else if (process === 'Ausfahrt PKW') {
      document.getElementById('bar4').src = evoSchrankeaktiv;
      document.getElementById('lamp4').src = evoAmpelGruenaktiv;
      setpro4(true);
    } else if (process === 'Tür1') {
      settur1(true);
      document.getElementById('pro5').src = evoTorAufAktiv;
    } else if (process === 'Tür2') {
      settur2(true);
      document.getElementById('pro6').src = evoTorAufAktiv;
    } else if (process === 'Tür3') {
      settur3(true);
      document.getElementById('pro7').src = evoTorAufAktiv;
    } else if (process === 'Tür4') {
      settur4(true);
      document.getElementById('pro8').src = evoTorAufAktiv;
    } else if (process === 'Einfahrt PKW') {
      document.getElementById('pro9').src = evoSchrankeaktiv;
      setpro9(true);
    }
  }

  function closeBarrier(process) {
    if (process === 'Einfahrtswaaage1') {
      document.getElementById('bar1').src = evoSchrankeZuaktiv;
      document.getElementById('lamp1').src = evoAmpelRotaktiv;
      document.getElementById('pro1').src = evoEinfahrtswaage1aktiv
      setpro1(false);
    } else if (process === 'Einfahrtswaaage2') {
      document.getElementById('bar2').src = evoSchrankeZuaktiv;
      document.getElementById('pro2').src = evoEinfahrtswaage2aktiv
      document.getElementById('lamp2').src = evoAmpelRotaktiv;
      setpro2(false);
    } else if (process === 'Ausfahrtswaage') {
      document.getElementById('bar3').src = evoSchrankeZuaktiv;
      document.getElementById('pro3').src = evoAusfahrtswaageaktiv
      document.getElementById('lamp3').src = evoAmpelRotaktiv;
      setpro3(false);
    } else if (process === 'Ausfahrt PKW') {
      document.getElementById('bar4').src = evoSchrankeZuaktiv;
      document.getElementById('pro4').src = evoAusfahrtPKWaktiv
      document.getElementById('lamp4').src = evoAmpelRotaktiv;
      setpro1(false);
    } else if (process === 'Tür1') {
      document.getElementById('pro5').src = evoTorZuInAktiv;
      settur1(false);
    } else if (process === 'Tür2') {
      document.getElementById('pro6').src = evoTorZuInAktiv;
      settur2(false);
    } else if (process === 'Tür3') {
      document.getElementById('pro7').src = evoTorZuInAktiv;
      settur3(false);
    } else if (process === 'Tür4') {
      document.getElementById('pro8').src = evoTorZuInAktiv;
      settur4(false);
    } else if (process === 'Einfahrt PKW') {
      document.getElementById('pro9').src = evoSchrankeZuaktiv;
      setpro9(false);
    }
  }

  function firstTrafficLamp(trafficLamp) {
    let socket = new WebSocket(environment.DEVICE_MANAGER_IP);
    if (trafficLamp === "lamp_1") {
      openBarrier(selectedProcess);
      socket.onopen = function (e) {
        socket.send("OUT2 OFF");
      };
      socket.onmessage = function (event) {
        var tempData = JSON.parse(event.data);
        if (tempData.state.toLowerCase() === "good") {
          socket.send("OUT1 ON");
        } else {
        }
      };

      socket.onerror = function (event) { };
    } else {
      closeBarrier(selectedProcess);
      socket.onopen = function (e) {
        socket.send("OUT1 OFF");
      };
      socket.onmessage = function (event) {
        var tempData = JSON.parse(event.data);
        if (tempData.state.toLowerCase() === "good") {
          socket.send("OUT2 ON");
        } else {
        }
      };

      socket.onerror = function (event) { };
    }
  }


  function closeDiv() {
    setshowDiv(false);
  }

  const DateTime = (props) => {
    var timeStart = new Date(
      props?.grossdatetime == null
        ? new Date()
        : props?.grossdatetime
    ).getTime();
    var timeEnd = new Date(props?.createdon).getTime();
    var hourDiff = timeEnd - timeStart;
    var secDiff = hourDiff / 1000;
    var minDiff = hourDiff / 60 / 1000;
    var hDiff = hourDiff / 3600 / 1000;
    var humanReadable = {};
    humanReadable.hours = Math.floor(Math.floor(hDiff));
    humanReadable.Hours = Math.floor(Math.floor(hDiff));

    humanReadable.minutes = minDiff - 60 * humanReadable.hours;
    return (
      <>
        {Math.abs(humanReadable.Hours)} : {parseInt(humanReadable.minutes)}

      </>)
  }

  function handleChange(event) {
    //console.log(event.target.value)
  }


  return (
    <div className="grid-layout">
      <div className="presenter">
        <div style={{ position: "relative" }} className="image_main">
          <ImageMapper
            src={backGroundImage}
            map={map}
            width={1429}
            toggleHighlighted={false}
            onClick={(area) => clicked(area)}
            onMouseEnter={(area) => enterArea(area)}
            onMouseLeave={(area) => leaveArea(area)}
            onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
            onImageClick={(evt) => clickedOutside(evt)}
            onImageMouseMove={(evt) => moveOnImage(evt)}
          />
          <Tooltip title="Text to be shown as lorem ipsum something. Text to be shown as lorem ipsum something.Text to be shown as lorem ipsum" placement="right">
            <img style={{ position: 'absolute', zIndex: 9, marginLeft: '180px', marginTop: '-365px', height: '40px' }} src={infoInactiveImage} />
          </Tooltip>

          <img id="pro5" style={{ position: 'absolute', zIndex: 9, marginLeft: '315px', marginTop: '-335px', height: '40px' }} src={evoTorZuInAktiv} onClick={() => clicked_image('process5')} />
          <img id="pro6" style={{ position: 'absolute', zIndex: 9, marginLeft: '400px', marginTop: '-335px', height: '40px' }} src={evoTorZuInAktiv} onClick={() => clicked_image('process6')} />
          <img id="pro7" style={{ position: 'absolute', zIndex: 9, marginLeft: '315px', marginTop: '-180px', height: '40px' }} src={evoTorZuInAktiv} onClick={() => clicked_image('process7')} />
          <img id="pro8" style={{ position: 'absolute', zIndex: 9, marginLeft: '400px', marginTop: '-180px', height: '40px' }} src={evoTorZuInAktiv} onClick={() => clicked_image('process8')} />

          <img id="pro9" style={{ position: 'absolute', zIndex: 9, marginLeft: '105%', marginTop: '-264px', height: '40px' }} src={evoSchrankeInaktiv} onClick={() => clicked_image('process9')} />

          <img id="pro10" style={{ position: 'absolute', zIndex: 9, marginLeft: '111%', marginTop: '-222px', height: '25px' }} src={evoPfeilGreenInaktiv} onClick={() => clicked_image('process10')} />
          <img id="pro11" style={{ position: 'absolute', zIndex: 9, marginLeft: '104%', marginTop: '-213px', height: '25px', transform: 'rotate(180deg)' }} src={evoPfeilRotInaktiv} onClick={() => clicked_image('process11')} />

          <img id="bar1" style={{ position: 'absolute', zIndex: 9, marginLeft: '80%', marginTop: '-182px', height: '35px' }} src={evoSchrankeInaktiv} />
          <img id="pro1" style={{ position: 'absolute', zIndex: 9, marginLeft: '84%', marginTop: '-182px', height: '35px' }} src={evoEinfahrtswaage1inaktiv} onClick={() => clicked_image('process1')} />
          <img id="lamp1" style={{ position: 'absolute', zIndex: 9, marginLeft: '101%', marginTop: '-182px', height: '35px' }} src={evoAmpelRotInaktiv} />

          <img id="bar2" style={{ position: 'absolute', zIndex: 9, marginLeft: '80%', marginTop: '-148px', height: '35px' }} src={evoSchrankeInaktiv} />
          <img id="pro2" style={{ position: 'absolute', zIndex: 9, marginLeft: '84%', marginTop: '-148px', height: '35px' }} src={evoEinfahrtswaage2inaktiv} onClick={() => clicked_image('process2')} />
          <img id="lamp2" style={{ position: 'absolute', zIndex: 9, marginLeft: '101%', marginTop: '-148px', height: '35px' }} src={evoAmpelRotInaktiv} />

          <img id="lamp3" style={{ position: 'absolute', zIndex: 9, marginLeft: '77%', marginTop: '-72px', height: '35px' }} src={evoAmpelRotInaktiv} />
          <img id="pro3" style={{ position: 'absolute', zIndex: 9, marginLeft: '79%', marginTop: '-72px', height: '35px' }} src={evoAusfahrtswaageInaktiv} onClick={() => clicked_image('process3')} />
          <img id="bar3" style={{ position: 'absolute', zIndex: 9, marginLeft: '96%', marginTop: '-72px', height: '35px' }} src={evoSchrankeInaktiv} />

          <img id="lamp4" style={{ position: 'absolute', zIndex: 9, marginLeft: '77%', marginTop: '-39px', height: '35px' }} src={evoAmpelRotInaktiv} />
          <img id="pro4" style={{ position: 'absolute', zIndex: 9, marginLeft: '79%', marginTop: '-39px', height: '35px' }} src={evoAusfahrtPKWInaktiv} onClick={() => clicked_image('process4')} />
          <img id="bar4" style={{ position: 'absolute', zIndex: 9, marginLeft: '96%', marginTop: '-39px', height: '35px' }} src={evoSchrankeInaktiv} />
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
              return (
                <div className={`count${item} common_inner`}>{item}</div>
              )
            })
          }

        </div>
        <table className="tablemain">
          <div className="overflow">
            <thead>Hoffliste:(YardList)</thead>

            {orderDetails &&
              orderDetails?.map((item, index) => {
                const selected = item.data.map(
                  ({ store_number }) => store_number
                );
                return (

                  <div>
                    <tr><th colSpan="2">{item.process_code === "1"
                      ? "Annahme Abfall"

                      : item.process_code === "2"
                        ? "Annahme Klarschlamm"
                        : item.process_code === "3"
                          ? "Input Nabi"
                          : item.process_code === "4"
                            ? "Input kalk"
                            : item.process_code === "5"
                              ? "Input Ammoniakwasser"
                              : item.process_code === "6"
                                ? "Output Schlacke"
                                : item.process_code === "7"
                                  ? "Output Flugasche"
                                  : item.process_code === "8"
                                    ? "Output Klarschlammasche"
                                    : ""
                    }</th>
                    </tr>
                    <tr>
                      <td className="tableHederText" style={{ paddingLeft: '5px' }}>
                        Fahrzeug
                      </td>

                      <td className="tableHederText">
                        {item.process_code === "1" ? 'Fahrzeugtyp' : 'Dauerzeit'}
                      </td>
                      {item.process_code === "1" ?
                        <td className="tableHederText" style={{ paddingRight: '5px' }}>
                          Standzeit
                        </td> : null}
                    </tr>

                    <div style={{ borderBottom: "1px solid black" }}>
                      {item &&
                        item?.data
                          .filter(
                            (x) =>
                              x.check_yard_list &&
                              x.process_code !== null &&
                              /[0-9a-zA-Z]/.test(x.process_code)
                          )
                          .map((order, index) => (
                            <tr
                              onDoubleClick={() => {
                                setModalShow(true);
                                setModaldata(
                                  allData &&
                                  allData.find((x) => {
                                    return x.id === order.id;
                                  })
                                );
                              }}
                              className=""
                              style={{
                                background:
                                  order.store_number === ""
                                    ? "transparent"
                                    : order.store_number === "Fertig"
                                      ? "green"
                                      : "Yellow",
                                color:
                                  order.store_number === ""
                                    ? "black"
                                    : order.store_number === "Fertig"
                                      ? "white"
                                      : "black",
                              }}
                            >
                              <td className="click_popup"
                                style={{ paddingLeft: '5px', width: '100px' }}
                              >

                                {order.license_plate}
                              </td>
                              {item.process_code === "1" ?
                                <td style={{ paddingLeft: '5px', width: '65px' }}>
                                  {order.vehicle_type}
                                </td> : null}
                              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                              <td style={{ paddingLeft: item.process_code === "1" ? '40px' : '0px', width: '120px' }}>
                                <DateTime grossdatetime={order?.gross_datetime} createdon={order?.created_on} />
                              </td>

                              <div
                                className={
                                  item.process_code !== ""
                                    ? "icon_book tooltip"
                                    : ""
                                }
                                style={{ width: '20px', height: '25px', marginLeft: '250px', marginTop: '-20px' }}
                                key={index}
                                onMouseEnter={handleShow}
                              >

                                <span
                                  className={
                                    item.process_code === "1" || item.process_code === "1A"
                                      ? "tooltiptext  popup_txt"
                                      : "none_display"
                                  }
                                >
                                  {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                                    (numbers) => {
                                      const checkradio = checkstore.some(
                                        (el) => el === numbers
                                      );

                                      return (
                                        <label>
                                          <input
                                            type="checkbox"
                                            checked={numbers === order.store_number}
                                            disabled={
                                              order.store_number
                                                ? numbers !== order.store_number ||
                                                order.store_number === "0"
                                                : checkradio
                                            }
                                            onChange={(e) => {
                                              updateAPI(
                                                order.id,
                                                e.target.value,
                                                e.target.checked,
                                                order.store_number
                                              );
                                            }}
                                            value={numbers}
                                            name="bookslot"
                                          />
                                          {numbers}
                                          {numbers === order.store_number ? (
                                            <button
                                              className="clear_btn"
                                              onClick={(e) => {
                                                updateeAPI(
                                                  order.id,
                                                  e.target.value,
                                                  false,
                                                  order.store_number
                                                );
                                              }}
                                            >
                                              beenden
                                            </button>
                                          ) : (
                                            ""
                                          )}
                                        </label>
                                      );
                                    }
                                  )}
                                </span>
                                <i

                                >
                                  {order.store_number &&
                                    item.process_code === "A"
                                    ? order.store_number
                                    : ""}
                                </i>
                              </div>
                            </tr>
                          ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </table>
        {/* {showDiv && (
          <div className="">
            <div
              style={{
                width: 300,
                height: "300px",
                background: "rgb(197, 197, 197)",
                position: "absolute",
                marginLeft: "-300px",
                marginTop: "-390px",
                display: "flex",
                alignSelf: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                zIndex: 999999,
                boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span
                style={{
                  marginLeft: "240px",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                <button
                  type="button"
                  style={{ marginLeft: "12px" }}
                  className="btn btn-danger"
                  onClick={() => closeDiv()}
                >
                  X
                </button>
              </span>
              <span
                style={{
                  marginLeft: "25px",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                <label>
                  Tür1 :
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-success"
                    onClick={() => firstTrafficLamp("lamp_1")}
                  >
                    Open
                  </button>{" "}
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-danger"
                    onClick={() => firstTrafficLamp("lamp_2")}
                  >
                    Close
                  </button>
                </label>
              </span>
              <span
                style={{
                  marginLeft: "25px",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                <label>
                  Tür2 :
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-success"
                    onClick={() => firstTrafficLamp("lamp_1")}
                  >
                    Open
                  </button>{" "}
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-danger"
                    onClick={() => firstTrafficLamp("lamp_2")}
                  >
                    Close
                  </button>
                </label>
              </span>
              <span
                style={{
                  marginLeft: "25px",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                <label>
                  Tür3 :
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-success"
                    onClick={() => firstTrafficLamp("lamp_1")}
                  >
                    Open
                  </button>{" "}
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-danger"
                    onClick={() => firstTrafficLamp("lamp_2")}
                  >
                    Close
                  </button>
                </label>
              </span>
              <span
                style={{
                  marginLeft: "25px",
                  fontWeight: "bold",
                  marginTop: "12px",
                }}
              >
                <label>
                  Tür4 :
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-success"
                    onClick={() => firstTrafficLamp("lamp_1")}
                  >
                    Open
                  </button>{" "}
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-danger"
                    onClick={() => firstTrafficLamp("lamp_2")}
                  >
                    Close
                  </button>
                </label>
              </span>
            </div>
          </div>
        )} */}

        <div className="input_boxes">
          <div
            style={{
              width: '1428px',
              height: "150px",
              background: "rgb(197, 197, 197)",
              position: "absolute",
              marginLeft: "-559px",
              display: "flex",
              alignSelf: "flex-start",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              {!showTextArea ?
                <div style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}>
                  {/* <video id="test_video" controls autoplay>
                  <source src="rtsp://admin:admin100@80.152.148.142:7777" />
                </video> */}
                  {/* <video id="test_video" controls autoplay src="rtsp://admin:admin100@80.152.148.142:7777/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif"></video> */}

                  {/* <ReactHlsPlayer
                  src="rtsp://admin:admin100@80.152.148.142:7777/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif"
                  autoPlay={true}
                  controls={true}
                  width="100%"
                  height="auto"
                /> */}
                  <span
                    style={{
                      marginLeft: "40px",
                      fontWeight: "bold",
                      marginTop: "12px",
                    }}
                  >
                    <label>
                      Name :
                      <label style={{ marginLeft: "20px", fontWeight: "400" }}>
                        {selectedProcess || "-"}
                      </label>{" "}
                    </label>
                  </span>
                  {!turProcess ? <span
                    style={{
                      marginLeft: "40px",
                      fontWeight: "bold",
                      marginTop: "12px",
                    }}
                  >
                    <label>
                      Gewicht :
                      <label style={{ marginLeft: "20px", fontWeight: "400" }}>
                        {firstVehicleWait}
                      </label>{" "}
                    </label>
                  </span> : null}
                  <span
                    style={{
                      marginLeft: "40px",
                      fontWeight: "bold",
                      marginTop: "12px",
                    }}
                  >
                    <label>
                      {!turProcess || selectedProcess === 'Ausfahrt PKW' || selectedProcess === 'Einfahrt PKW' ? 'Ampel :' : 'Tür'}
                      <button
                        type="button"
                        style={{ marginLeft: "12px" }}
                        className="btn btn-success"
                        onClick={() => firstTrafficLamp("lamp_1")}
                      >
                        {!turProcess || selectedProcess === 'Ausfahrt PKW' || selectedProcess === 'Einfahrt PKW' ? 'Grün' : 'Auf'}
                      </button>{" "}
                      <button
                        type="button"
                        style={{ marginLeft: "12px" }}
                        class="btn btn-danger"
                        onClick={() => firstTrafficLamp("lamp_2")}
                      >
                        {!turProcess || selectedProcess === 'Ausfahrt PKW' || selectedProcess === 'Einfahrt PKW' ? 'Rot' : 'Zu'}
                      </button>
                    </label>
                  </span>
                </div>
                :
                <span>
                  <input type="textarea"
                    style={{ marginLeft: '90px', height: "150px", width: '400px' }}
                    name="textValue"
                    onChange={() => handleChange()}
                  />
                  <button
                    type="button"
                    style={{ marginLeft: "12px" }}
                    className="btn btn-success"
                    onClick={() => setshowTextArea(false)}
                  >
                    Speichern
                  </button>{" "}
                </span>}
              <div style={{ marginRight: '70px' }}>
                <Iframe url="http://80.152.148.142:9000"
                  width="150px"
                  height="150px"
                  id="myId"
                  className=""
                  display="initial"
                  position="relative" />
              </div>
            </div>
          </div>
        </div>

        <>
          <MyVerticallyCenteredModal
            show={modalShow}
            modaldata={modaldata}
            onHide={() => setModalShow(false)}
          />
        </>
      </div>
    </div>
  );
};
export default Dashboardhome;
