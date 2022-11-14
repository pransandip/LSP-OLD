import React, { useEffect, useMemo, useRef } from 'react';
import '../StyleSheets/DashboardHome.css';
import backGroundImage from '../ImageAssests/BackgroundImage/backGround.png';
import axios from 'axios';
import { fetchFirstWeightData } from '../api/HomeProcessApi'
import ServiceEngine from '../Services/ServiceEngine';
import { Modal,Button } from 'react-bootstrap';
import ImageMapper from 'react-image-mapper';
import environment from '../Environment/Environment';



const Dashboardhome = (props) => {
    const [orderDetails, setOrderDetails] = React.useState([])
    const [show, setShow] = React.useState(false);
    const [radioValue , setRadioValue] =React.useState("")
    console.warn(radioValue , "radioValue")

    const tooltip = useRef("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        try
        {
            let response = await service.doAxiosGet();
            if(response)
            {
                await response?.data?.sort((a, b) => (a.process_code > b.process_code) ? 1 : ((b.process_code > a.process_code) ? -1 : 0));
                await response?.data?.map(async(item) => {
                    if(item.process_code !== null && (/[a-zA-Z]/).test(item.process_code))
                    {
                        if(Maindata.length === 0)
                        {
                            await  Maindata.push({process_code:item?.process_code,data:[
                                {
                                    variety_number:item?.variety_number,
                                    license_plate:item?.license_plate,
                                    id:item?.id,
                                    store_number:item?.store_number
                                },
                            ]})
                        }
                        else
                        {
                            let found = await Maindata && Maindata.find(element => item.process_code === element.process_code);
                            if(found)
                            {
                                await found?.data?.push({
                                    variety_number:item?.variety_number,
                                    license_plate:item?.license_plate,
                                    id:item?.id,
                                    store_number:item?.store_number
                                })
                            }
                            else
                            {
                                await Maindata.push({process_code:item?.process_code,data:[
                                    {
                                        variety_number:item?.variety_number,
                                        license_plate:item?.license_plate,
                                        id:item?.id,
                                        store_number:item?.store_number
                                    }
                                ]})
                            }
                        }
                    }
                })
                setOrderDetails(Maindata)
                return response
            }

        }
        catch(error) 
        {
            console.log("Error", error)
        }
    };
    useEffect(async () => {
        await fetchFirstWeightData();
    }, []);
    var auth = localStorage.getItem('auth_token');

    const updateAPI = async(id,value,yardTicket, authToken) =>{
        var bodyFormData = new FormData();
        bodyFormData.append('store_number',value)
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
    let response = await service.doAxiosPut(bodyFormData , id);
    if(response){
        console.log(response)
    }
    }

    

    const title = useRef("")
    return (
        <div className="inner_main ">
            {/* <div class="text1">Text1</div> */}
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
                                    (<div style={{borderBottom:"1px solid black"}}>
                                        {
                                        item && item?.data.map((order,index) =>
                                        
                                        {
                                            return(
                                                <tr className="trmain" >

                                                    <td colSpan="2">{order.variety_number} {order.id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{order.license_plate} <div className="icon_book tooltip" ref={tooltip} key={index} onMouseEnter={handleShow}> 
 

                                                    <span className="tooltiptext popup_txt">
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="1" name="bookslot" />1</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="2" name="bookslot" />2</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="3" name="bookslot" />3</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="4" name="bookslot" />4</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="5" name="bookslot" />5</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="6" name="bookslot" />6</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="7" name="bookslot" />7</label>    
                                                        <label><input type="radio" onChange={(e)=>{updateAPI(order.id , e.target.value)}} value="8" name="bookslot" />8</label>    
                                                    </span>
                                                   
                                                    <i>{order.store_number?order.store_number:"-"}</i>
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

            {/* <div className="input_boxes">
                <div className="input_inner">
                    <input type="text" className="input-1"/>
                    <input type="text" className="input-2"/>
                    <input type="text" className="input-3"/>
                    <input type="text" className="input-4"/>
                    <input type="text" className="input-5"/>
                    <input type="text" className="input-6"/>
                    <input type="text" className="input-7"/>
                    <input type="text" className="input-8"/>
                </div>
            </div> */}
            {/* <div class="text2">Text2</div>
            <div class="text3">Text3</div>
            <div class="text4">Text4</div>
            <div class="text5">Text5</div>
            <div class="text6">Text6</div>
            <div class="text7">Text7</div>
            <div class="text8">Text8</div>
            <div class="text9">Text9</div>
            <div class="text10">Text10</div>
            <div class="text11">Text11</div>
            <div class="text12">Text12</div>
            <div class="text13">Text13</div>
            <div class="text14">Text14</div>
            <div class="text15">Text15</div>
            <div class="text16">Text16</div> */}
        </div>


    )

}

export default Dashboardhome;

