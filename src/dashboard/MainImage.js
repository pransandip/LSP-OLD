
import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { BARRIER, SOCKET1, SOCKET2, BARRIER_NUMBER } from './../Contants';


const MainImage = (props) => {


    const [openBarrierPopup, setOpenBarrierPopup] = useState(false);
    const [openBarrierPopupSecond, setOpenBarrierPopupSecond] = useState(false);

    const [socketUrl, setSocketUrl] = useState(SOCKET1);
    const [messageHistory, setMessageHistory] = useState([]);
    const [weight, setWeight] = useState(0);

    const [barrierModalOpen, setBarrierModalOpen] = useState(false);
    const [barrierCurrentNumber, setBarrierCurrentNumber] = useState(0);

    const {
        sendMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);


    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory(prev => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickChangeSocketUrl = useCallback(() =>
        setSocketUrl(SOCKET2), []);

    const getWeight = useCallback(() => sendMessage('GET WEIGHT0'), []);

    const green = useCallback(() => {
        sendMessage('OUT2 OFF');
        sendMessage('OUT1 ON');
        setOpenBarrierPopup(false);
        setOpenBarrierPopupSecond(false);
    })

    const red = useCallback(() => {
        sendMessage('OUT1 ON');
        sendMessage('OUT2 OFF');
        setOpenBarrierPopup(false);
        setOpenBarrierPopupSecond(false);
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {

        if (messageHistory.length > 0) {
            const m = messageHistory[messageHistory.length - 1];
            const data = m.data;
            //GET WEIGHT0
            //res = {"msg_type": "weight", "state": "good", "alibi_nr": "   0", "weight": "    2420", "date": "14.03.22", "time": "10:13"}
            console.log("data ", data);
            if (data != 'Connected' && data) {
                let data1 = JSON.parse(data);
                setWeight(data1.weight);
            }
        }
    }, [messageHistory]);

    useEffect(() => {

        console.log("last message ", lastMessage, " message history ", messageHistory);

    }, [lastMessage, messageHistory]);

    useEffect(() => {
        document.onkeyup = function (event) {
            if (event.key == 'Escape') {
                setBarrierModalOpen(false);
            }
        };
    }, [])

    // const GetWebSocketData = () => {
    //     return (
    //         <div>
    //             <button
    //                 onClick={handleClickChangeSocketUrl}
    //             >
    //                 Click Me to change Socket Url
    //             </button>
    //             <button
    //                 onClick={green}
    //                 disabled={readyState !== ReadyState.OPEN}
    //             >
    //                 Click Me to send 'Hello'
    //             </button>
    //             <br />
    //             <span>The WebSocket is currently {connectionStatus}</span><br /><br />
    //             {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} <br /><br />
    //             <ul>
    //                 {messageHistory
    //                     .map((message, idx) => <span key={idx}>{message ? message.data : null}</span>)}
    //             </ul>
    //         </div>
    //     );
    // }

    const clickFirstBarier = () => {
        setOpenBarrierPopup(true);
        getWeight();
    }

    const clickSecondBarrier = () => {
        setOpenBarrierPopupSecond(true);
        getWeight();
    }


    const openBarrier3 = () => {

        sendMessage(BARRIER.BARRIER3OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier3 = () => {
        sendMessage(BARRIER.BARRIER3CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrier4 = () => {
        sendMessage(BARRIER.BARRIER4OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier4 = () => {
        sendMessage(BARRIER.BARRIER4CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrier5 = () => {
        sendMessage(BARRIER.BARRIER5OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier5 = () => {
        sendMessage(BARRIER.BARRIER5CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrier6 = () => {
        sendMessage(BARRIER.BARRIER6OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier6 = () => {
        sendMessage(BARRIER.BARRIER6CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrier7 = () => {
        sendMessage(BARRIER.BARRIER7OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier7 = () => {
        sendMessage(BARRIER.BARRIER7CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrier8 = () => {
        sendMessage(BARRIER.BARRIER8OPEN);
        setBarrierModalOpen(false);
    }

    const closeBarrier8 = () => {
        sendMessage(BARRIER.BARRIER8CLOSE);
        setBarrierModalOpen(false);
    }

    const openBarrierModal = (barrierNumber) => {
        setBarrierModalOpen(true);
        setBarrierCurrentNumber(barrierNumber);
    }

    const openActionBarrier = () => {
        switch (barrierCurrentNumber) {
            case 3: openBarrier3(); break;
            case 4: openBarrier4(); break;
            case 5: openBarrier5(); break;
            case 6: openBarrier6(); break;
            case 7: openBarrier7(); break;
            case 8: openBarrier8(); break;
        }
    }

    const closeActionBarrier = () => {
        switch (barrierCurrentNumber) {
            case 3: closeBarrier3(); break;
            case 4: closeBarrier4(); break;
            case 5: closeBarrier5(); break;
            case 6: closeBarrier6(); break;
            case 7: closeBarrier7(); break;
            case 8: closeBarrier8(); break;
        }
    }

    const DialogBarrier = () => {
        return (
            <>
                <Dialog
                    open={barrierModalOpen}
                    onClose={() => setBarrierCurrentNumber(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    width="lg"
                >

                    <DialogTitle>
                        <div>
                            <div onClick={() => setBarrierModalOpen(false)} style={{ float: "right", cursor: "pointer" }}>
                                X
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Barrier : {barrierCurrentNumber}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={openActionBarrier} variant="contained" color="success">
                            Schranke öffnen
                        </Button>
                        <Button onClick={closeActionBarrier} variant="outlined" color="error">
                            Schranke schließen
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const DiaFirst = () => {
        return (
            <>
                <Dialog
                    open={openBarrierPopup}
                    onClose={() => setOpenBarrierPopup(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    width="lg"
                >
                    <DialogTitle id="alert-dialog-title">

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Name : 3 Pforte <br />
                            Weight : {weight} Kg  <br />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={green} variant="contained" color="success">
                            Open
                        </Button>
                        <Button onClick={red} variant="outlined" color="error">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const DiaSecond = () => {
        return (
            <>
                <Dialog
                    open={openBarrierPopupSecond}
                    onClose={() => setOpenBarrierPopup(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    width="lg"
                >
                    <DialogTitle id="alert-dialog-title">

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Name : 7 Pforte <br />
                            Gewicht : {weight} Kg  <br />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={green} variant="contained" color="success">
                            offen
                        </Button>
                        <Button onClick={red} variant="outlined" color="error">
                            schließen
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const Image = () => {
        return (
            <>
                <span>
                    <span className='buttons-position'>

                        {
                            ["1", "2", "3", "4", "5"].map((item, index) => {
                                var btnClass = 'green-button';
                                if (props.loadedWaitingList.length > 0) {
                                    props.loadedWaitingList.map((val, key) => {
                                        if (val.loading_place == item) {
                                            btnClass = 'red-button';
                                        }
                                    })
                                }

                                return (
                                    <button className={`${btnClass}`} >{item}</button>
                                )
                            })
                        }
                        {/* <button className='green-button' disabled>1</button>
                    <button className='green-button' disabled>2</button>
                    <button className='green-button' disabled>3</button>
                    <button className='green-button' disabled>4</button>
                    <button className='green-button' disabled>5</button> */}
                    </span>
                    {/* <span className='only1button-position'>
                    <button className='green-button clkable'>V/R</button>
                </span> */}
                    {/*?xml version="1.0" encoding="UTF-8" standalone="no"?*/}
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 960 540">
                        <g enableBackground="new">
                            <g>
                                <g id="Layer-1" data-name="Artifact">
                                    <clipPath id="cp0">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 0 .00012207 L 960 .00012207 L 960 540.0001 L 0 540.0001 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp0)">
                                        <clipPath id="cp1">
                                            <path transform="matrix(1,0,0,-1,0,540)" d="M 0 .000061035 L 960 .000061035 L 960 540.00009 L 0 540.00009 Z " fillRule="evenodd" />
                                        </clipPath>
                                        <g clipPath="url(#cp1)">
                                            <symbol id="pac2" style={{ overflow: 'visible' }}>
                                                <g transform="matrix(.375,0,0,.375,0,-6)">
                                                    <use xlinkHref="#im3" x={0} y={0} width={16} height={16} />
                                                </g>
                                            </symbol>
                                            <pattern id="pa2" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                                <g transform="matrix(2.6666668,0,0,-2.6666668,-0,0)">
                                                    <use x={0} y={0} xlinkHref="#pac2" />
                                                </g>
                                            </pattern>
                                            <symbol id="im3" viewBox="0 0 16 16">
                                                <image width={16} height={16} xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAPUlEQVR4nGPcv38/AwODsbExkDx79ixBNiPJGj59+kSkUgibdA0D
7QdkQJQfsGgYaD8MpXjADD4CfiBeAwDbwsSpK042bwAAAABJRU5ErkJggg==" />
                                            </symbol>
                                            <rect transform="matrix(.375,0,0,-.375,0,0)" fill="url(#pa2)" x={0} y="-1439.9999" width={2560} height={1440} />
                                        </g>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 57.72 126.12 L 277.08003 126.12 L 277.08003 170.04001 L 57.72 170.04001 Z " fill="#6c6c6c" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 57.72 126.12 L 277.08003 126.12 L 277.08003 170.04001 L 57.72 170.04001 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 58.8 76.2 L 278.16 76.2 L 278.16 120 L 58.8 120 Z " fill="#6c6c6c" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 58.8 76.2 L 278.16 76.2 L 278.16 120 L 58.8 120 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp4">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 404.4 176.16 L 476.76 176.16 L 476.76 187.56 L 404.4 187.56 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp4)">
                                        <symbol id="pac5" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,402,342)">
                                                <use xlinkHref="#im6" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa5" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-1072,928)">
                                                <use x={0} y={0} xlinkHref="#pac5" />
                                            </g>
                                        </pattern>
                                        <symbol id="im6" viewBox="0 0 16 16">
                                            <image width={16} height={16} xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAASUlEQVR4nGOMnn2VgYFhSYoWA24QM+canM1Isob///8TqZTaGjCV
QpxNDQ24lOJ0Egka8CulTAMxSsnVAEkaxCilhgZikiDJGgB03VK1ct3x1QAAAABJ
RU5ErkJggg==" />
                                        </symbol>
                                        <rect style={{ cursor: "pointer" }} onClick={clickFirstBarier} transform="matrix(.375,0,0,-.375,402,348)" fill="url(#pa5)" x="6.4000246" y="-42.23999" width="192.96009" height="30.399964" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 404.4 176.16 L 476.76 176.16 L 476.76 187.56 L 404.4 187.56 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp7">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 431.28 158.64 L 503.64 158.64 L 503.64 170.04 L 431.28 170.04 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp7)">
                                        <symbol id="pac8" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,426,360)">
                                                <use xlinkHref="#im6" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa8" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-1136,976)">
                                                <use x={0} y={0} xlinkHref="#pac8" />
                                            </g>
                                        </pattern>
                                        <rect style={{ cursor: "pointer" }} onClick={clickSecondBarrier} transform="matrix(.375,0,0,-.375,426,366)" fill="url(#pa8)" x="14.080078" y="-40.95996" width="192.95996" height="30.399903" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 431.28 158.64 L 503.64 158.64 L 503.64 170.04 L 431.28 170.04 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp9">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 525.36 321.6 L 581.27999 321.6 L 581.27999 429.48 L 525.36 429.48 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp9)">
                                        <symbol id="pac10" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,522,102)">
                                                <use xlinkHref="#im11" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa10" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-1392,288)">
                                                <use x={0} y={0} xlinkHref="#pac10" />
                                            </g>
                                        </pattern>
                                        <symbol id="im11" viewBox="0 0 16 16">
                                            <image width={16} height={16} xlinkHref="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAAH0lEQVR4nGOMnn2VgRTASLKG////j2ogqGE0HgaFBgAMuSsZtxmZ
SAAAAABJRU5ErkJggg==" />
                                        </symbol>
                                        <rect transform="matrix(.375,0,0,-.375,522,108)" fill="url(#pa10)" x="8.959961" y="-294.40003" width="149.12" height="287.68006" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 525.36 321.6 L 581.27999 321.6 L 581.27999 429.48 L 525.36 429.48 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp12">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 525.36 200.64 L 580.2 200.64 L 580.2 315.47999 L 525.36 315.47999 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp12)">
                                        <symbol id="pac13" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,522,216)">
                                                <use xlinkHref="#im11" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa13" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-1392,592)">
                                                <use x={0} y={0} xlinkHref="#pac13" />
                                            </g>
                                        </pattern>
                                        <rect transform="matrix(.375,0,0,-.375,522,222)" fill="url(#pa13)" x="8.959961" y="-312.95997" width="146.24011" height="306.23988" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 525.36 200.64 L 580.2 200.64 L 580.2 315.47999 L 525.36 315.47999 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 614.4 200.64 L 742.68008 200.64 L 742.68008 433.8 L 614.4 433.8 Z " fill="#515151" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 614.4 200.64 L 742.68008 200.64 L 742.68008 433.8 L 614.4 433.8 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 611.28 465.36 L 731.28 465.36 L 731.28 489 L 611.28 489 Z " fill="#92d050" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 611.28 465.36 L 731.28 465.36 L 731.28 489 L 611.28 489 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 745.8 201.6 L 803.76 201.6 L 803.76 432.96003 L 745.8 432.96003 Z " fill="#6c6c6c" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 745.8 201.6 L 803.76 201.6 L 803.76 432.96003 L 745.8 432.96003 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp14">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .00001719 540 L 960 540 L 960 .00012207 L .00001719 .00012207 " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp14)">
                                        <clipPath id="cp15">
                                            <path transform="matrix(1,0,0,-1,0,540)" d="M 848.76 431.64 L 862.2 431.64 L 862.2 492.96003 L 848.76 492.96003 Z " fillRule="evenodd" />
                                        </clipPath>
                                        <g clipPath="url(#cp15)">
                                            <symbol id="pac16" style={{ overflow: 'visible' }}>
                                                <g transform="matrix(.375,0,0,.375,858,36)">
                                                    <use xlinkHref="#im6" x={0} y={0} width={16} height={16} />
                                                </g>
                                            </symbol>
                                            <pattern id="pa16" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                                <g transform="matrix(2.6666668,0,0,-2.6666668,-2288,112)">
                                                    <use x={0} y={0} xlinkHref="#pac16" />
                                                </g>
                                            </pattern>
                                            <rect transform="matrix(.375,0,0,-.375,858,42)" fill="url(#pa16)" x="-24.639893" y="-176.95996" width="35.840089" height="163.52002" />
                                        </g>
                                    </g>
                                    <clipPath id="cp17">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .00001719 540 L 960 540 L 960 .00012207 L .00001719 .00012207 " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp17)">
                                        <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 848.76 431.64 L 862.2 431.64 L 862.2 492.96003 L 848.76 492.96003 Z " />
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp18">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M -.00000701 540 L 960 540 L 960 .00012207 L -.00000701 .00012207 " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp18)">
                                        <clipPath id="cp19">
                                            <path transform="matrix(1,0,0,-1,0,540)" d="M 306.6 92.4 L 320.04 92.4 L 320.04 153.72 L 306.6 153.72 Z " fillRule="evenodd" />
                                        </clipPath>
                                        <g clipPath="url(#cp19)">
                                            <symbol id="pac20" style={{ overflow: 'visible' }}>
                                                <g transform="matrix(.375,0,0,.375,318,378)">
                                                    <use xlinkHref="#im6" x={0} y={0} width={16} height={16} />
                                                </g>
                                            </symbol>
                                            <pattern id="pa20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                                <g transform="matrix(2.6666668,0,0,-2.6666668,-848,1024)">
                                                    <use x={0} y={0} xlinkHref="#pac20" />
                                                </g>
                                            </pattern>
                                            <rect transform="matrix(.375,0,0,-.375,318,384)" fill="url(#pa20)" x="-30.399964" y="-169.6001" width="35.840028" height="163.52002" />
                                        </g>
                                    </g>
                                    <clipPath id="cp21">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M -.00000701 540 L 960 540 L 960 .00012207 L -.00000701 .00012207 " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp21)">
                                        <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 306.6 92.4 L 320.04 92.4 L 320.04 153.72 L 306.6 153.72 Z " />
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 392.52 174.96 L 399 174.96 L 399 191.76001 L 392.52 191.76001 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 392.52 174.96 L 399 174.96 L 399 191.76001 L 392.52 191.76001 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 392.52 192.6 L 399 192.6 L 399 209.40001 L 392.52 209.40001 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 392.52 192.6 L 399 192.6 L 399 209.40001 L 392.52 209.40001 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 273 222.6 L 371.28 222.6 L 371.28 424.2 L 273 424.2 Z " fill="#cbcbcb" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 273 222.6 L 371.28 222.6 L 371.28 424.2 L 273 424.2 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 508.44 123.24 L 517.08 123.24 L 517.08 146.16 L 508.44 146.16 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 508.44 123.24 L 517.08 123.24 L 517.08 146.16 L 508.44 146.16 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 508.44 147.12 L 517.08 147.12 L 517.08 170.04 L 508.44 170.04 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 508.44 147.12 L 517.08 147.12 L 517.08 170.04 L 508.44 170.04 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 34.92 176.4 L 52.799997 176.4 L 52.799997 183.12 L 34.92 183.12 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 34.92 176.4 L 52.799997 176.4 L 52.799997 183.12 L 34.92 183.12 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 15 176.64 L 35.16 176.64 L 35.16 183.12 L 15 183.12 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 15 176.64 L 35.16 176.64 L 35.16 183.12 L 15 183.12 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 325.56 158.4 L 345.6 158.4 L 345.6 163.56 L 325.56 163.56 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 325.56 158.4 L 345.6 158.4 L 345.6 163.56 L 325.56 163.56 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 303.24 158.64 L 325.8 158.64 L 325.8 163.56 L 303.24 163.56 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 303.24 158.64 L 325.8 158.64 L 325.8 163.56 L 303.24 163.56 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 328.56 84 L 348.6 84 L 348.6 89.16 L 328.56 89.16 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 328.56 84 L 348.6 84 L 348.6 89.16 L 328.56 89.16 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 306.24 84.24 L 328.8 84.24 L 328.8 89.159999 L 306.24 89.159999 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 306.24 84.24 L 328.8 84.24 L 328.8 89.159999 L 306.24 89.159999 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 843.36 496.2 L 863.39999 496.2 L 863.39999 501.36003 L 843.36 501.36003 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 843.36 496.2 L 863.39999 496.2 L 863.39999 501.36003 L 843.36 501.36003 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 821.04 496.44 L 843.6 496.44 L 843.6 501.36003 L 821.04 501.36003 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 821.04 496.44 L 843.6 496.44 L 843.6 501.36003 L 821.04 501.36003 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp22">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 530.76 18 L 580.8 18 L 580.8 131.28 L 530.76 131.28 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp22)">
                                        <symbol id="pac23" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,528,402)">
                                                <use xlinkHref="#im11" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa23" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-1408,1088)">
                                                <use x={0} y={0} xlinkHref="#pac23" />
                                            </g>
                                        </pattern>
                                        <rect transform="matrix(.375,0,0,-.375,528,408)" fill="url(#pa23)" x="7.3601076" y={-304} width="133.43994" height="302.07997" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 530.76 18 L 580.8 18 L 580.8 131.28 L 530.76 131.28 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp24">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 797.16 438.84 L 819.83999 438.84 L 819.83999 478.8 L 797.16 478.8 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp24)">
                                        <g transform="matrix(0,.3632727,-.36,0,819.83999,61.200014)">
                                            <symbol id="im25" viewBox="0 0 110 63">
                                                <image width={110} height={63} xlinkHref="data:image/jpeg;base64,
/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkS
Ew8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJ
CQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy
MjIyMjIyMjIyMjIyMjL/wAARCAA/AG4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEA
AAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIh
MUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6
Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZ
mqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx
8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREA
AgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAV
YnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hp
anN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPE
xcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCp
rGoahY6tcQQXbIi7eNqnqAxycc5J5qomr3xYyPKjs7ZbdGOT1pniRt/iG7faxLbW
A6/wis8MABkN+VWoRa1QNu5trr2ppCyJJCiM25kWPAJ98HnrTv7b1BNLubkLDIba
SN1TyzjLbgT164A5rEUjurcj+7Vk5/4R/VtknlHMGCTjqzChwjbYSY9PFN9HcjNh
a+cCQB5b5yPbd+lXrHx3rVikjWkUMKSuC2xH+YnOOS3POf1rlzNdpeqy6krsGJDL
OePQ5/D+VTK98kiwR6sgVSArC6IXA9/xP60lCK2QXOq/4Wl4jjAQzRgn/Y9OvWkP
xR8QxylvNTd90gj06cdAfwrlnW7dvMkv4WZWdRunGR8uc9fw+vFODahOQTqMYG7e
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" />
                                            </symbol>
                                            <use xlinkHref="#im25" x={0} y={0} width={110} height={63} />
                                        </g>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 825.36 94.32 L 862.07998 94.32 L 862.07998 104.52 L 825.36 104.52 Z " fill="#515151" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.36 94.32 L 862.07998 94.32 L 862.07998 104.52 L 825.36 104.52 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp26">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 825.24 78.6 L 862.44 78.6 L 862.44 89.759998 L 825.24 89.759998 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp26)">
                                        <symbol id="pac27" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,822,444)">
                                                <use xlinkHref="#im11" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa27" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-2192,1200)">
                                                <use x={0} y={0} xlinkHref="#pac27" />
                                            </g>
                                        </pattern>
                                        <rect transform="matrix(.375,0,0,-.375,822,450)" fill="url(#pa27)" x="8.640137" y="-30.400025" width="99.19995" height="29.76001" />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.24 78.6 L 862.44 78.6 L 862.44 89.759998 L 825.24 89.759998 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp28">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 825.24 64.68 L 864 64.68 L 864 73.68 L 825.24 73.68 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp28)">
                                        <symbol id="pac29" style={{ overflow: 'visible' }}>
                                            <g transform="matrix(.375,0,0,.375,822,456)">
                                                <use xlinkHref="#im6" x={0} y={0} width={16} height={16} />
                                            </g>
                                        </symbol>
                                        <pattern id="pa29" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
                                            <g transform="matrix(2.6666668,0,0,-2.6666668,-2192,1232)">
                                                <use x={0} y={0} xlinkHref="#pac29" />
                                            </g>
                                        </pattern>
                                        <rect transform="matrix(.375,0,0,-.375,822,462)" fill="url(#pa29)" x="8.640137" y="-35.52002" width="103.35986" height={24} />
                                    </g>
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.24 64.68 L 864 64.68 L 864 73.68 L 825.24 73.68 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 825.36 51.24 L 863.39999 51.24 L 863.39999 60.120004 L 825.36 60.120004 Z " fill="#cbcbcb" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.36 51.24 L 863.39999 51.24 L 863.39999 60.120004 L 825.36 60.120004 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 845.64 40.08 L 864 40.08 L 864 46.2 L 845.64 46.2 Z " fill="#ff0000" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 845.64 40.08 L 864 40.08 L 864 46.2 L 845.64 46.2 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 825.12 40.32 L 845.88 40.32 L 845.88 46.2 L 825.12 46.2 Z " fill="#ffffff" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.12 40.32 L 845.88 40.32 L 845.88 46.2 L 825.12 46.2 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 825.24 108.84 L 861.95999 108.84 L 861.95999 117.6 L 825.24 117.6 Z " fill="#92d050" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 825.24 108.84 L 861.95999 108.84 L 861.95999 117.6 L 825.24 117.6 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp30">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp30)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-110.02" x="874.7 880.94 886.916 891.248 899.648 905.396 908.156 912.236 918.584 924.824">Verwaltung</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp31">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp31)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize="12.024" fontFamily="Calibri"><tspan y="-95.784" x="875.59 883.1772 889.16519 895.4778 901.2373 907.6221 913.97079">Gebäude</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp32">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp32)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-81.192" x="876.43 881.47 887.21798 892.74996 898.72598 902.9379 906.6459 909.4059 915.1539 920.22988 926.55386">Lagerfläche</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp33">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp33)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-65.976" x="876.43 886.75 892.498 898.246 903.79">Waage</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp34">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp34)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-38.592" x="877.15 882.658 887.734 894.058 898.01797 903.7659 910.1259 915.16598">Schranke</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp35">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp35)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-52.92" x="876.84 882.84 888.588 892.776 898.2 904.548 907.308 912.948 917.016">Parkplatz</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp36">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp36)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-193.13" x="12.696 24.324002 33.81 39.822004">Nord</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp37">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp37)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-466.78" x="872.69 880.952 890.40206">Süd</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp38">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp38)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize="18.024" fontFamily="Calibri"><tspan y="-116.33" x="332.28 340.4449 349.42085 358.81135 364.84938 370.68916 379.32264">Zentral</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp39">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp39)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-207.53" x="424.18 433.486 438.706 448.192 454.474 460.18">Pforte</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp40">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp40)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-317.95" x="289.75 298.624 307.246 313.528 321.66404 331.11405 335.25407 343.75007 349.78007">Parkplatz</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp41">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 6.24 447.36 L 204.96 447.36 L 204.96 532.92 L 6.24 532.92 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp41)">
                                        <g transform="matrix(.7498868,0,0,.7505263,6.24,7.080017)">
                                            <symbol id="im42" viewBox="0 0 265 114">
                                                <image width={265} height={114} xlinkHref="data:image/png;base64,
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
SrT+B2lGXhyLeOiSAAAAAElFTkSuQmCC" />
                                            </symbol>
                                            <use xlinkHref="#im42" x={0} y={0} width={265} height={114} />
                                        </g>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 384.72 244.44 L 403.92 244.44 L 403.92 260.88 L 384.72 260.88 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 384.72 244.44 L 403.92 244.44 L 403.92 260.88 L 384.72 260.88 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp43">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp43)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-246.62" x="389.78">1</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 406.68 244.44 L 425.88 244.44 L 425.88 260.88 L 406.68 260.88 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 406.68 244.44 L 425.88 244.44 L 425.88 260.88 L 406.68 260.88 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp44">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp44)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-246.62" x="411.72">2</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 488.88 175.2 L 508.08003 175.2 L 508.08003 191.64 L 488.88 191.64 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 488.88 175.2 L 508.08003 175.2 L 508.08003 191.64 L 488.88 191.64 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp45">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(3)} clipPath="url(#cp45)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-177.36" x="494.02">{BARRIER_NUMBER.THREE}</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 826.92 472.8 L 846.12 472.8 L 846.12 489.24 L 826.92 489.24 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 826.92 472.8 L 846.12 472.8 L 846.12 489.24 L 826.92 489.24 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp46">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(4)} clipPath="url(#cp46)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-475.01" x="832.13">{BARRIER_NUMBER.FOUR}</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 283.92 136.08 L 303.12004 136.08 L 303.12004 152.52 L 283.92 152.52 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 283.92 136.08 L 303.12004 136.08 L 303.12004 152.52 L 283.92 152.52 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp47">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(5)} clipPath="url(#cp47)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-138.26" x="288.96">{BARRIER_NUMBER.FIVE}</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 324.36 94.92 L 343.56 94.92 L 343.56 111.479999 L 324.36 111.479999 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 324.36 94.92 L 343.56 94.92 L 343.56 111.479999 L 324.36 111.479999 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp48">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(6)} clipPath="url(#cp48)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-97.104" x="329.42">{BARRIER_NUMBER.SIX}</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 0 152.52 L 19.2 152.52 L 19.2 169.08 L 0 169.08 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <clipPath id="cp49">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M 0 .00018311 L 960 .00018311 L 960 540.0002 L 0 540.0002 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp49)">
                                        <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 0 152.52 L 19.2 152.52 L 19.2 169.08 L 0 169.08 Z " />
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp50">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(8)} clipPath="url(#cp50)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-154.73" x="5.04">{BARRIER_NUMBER.EIGHT}</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 823.56 126.48 L 842.76 126.48 L 842.76 142.92 L 823.56 142.92 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 823.56 126.48 L 842.76 126.48 L 842.76 142.92 L 823.56 142.92 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp51">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp51)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-128.66" x="828.7">1</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp52">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp52)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-130.58" x="874.03 878.83 884.806 889.018 898.606 901.366 907.726 913.474 916.234 920.926 923.566">Terminals 1</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp53">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp53)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-130.58" x="929.71">-</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp54">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g clipPath="url(#cp54)">
                                        <text xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={12} fontFamily="Calibri"><tspan y="-130.58" x="933.43">8</tspan></text>
                                    </g>
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <path transform="matrix(1,0,0,-1,0,540)" d="M 404.52 156 L 423.72 156 L 423.72 172.44 L 404.52 172.44 Z " fill="#5b9bd5" fillRule="evenodd" />
                                    <path transform="matrix(1,0,0,-1,0,540)" strokeWidth=".96" strokeLinecap="butt" strokeMiterlimit={10} strokeLinejoin="miter" fill="none" stroke="#41719c" d="M 404.52 156 L 423.72 156 L 423.72 172.44 L 404.52 172.44 Z " />
                                </g>
                                <g id="Layer-1" data-name="P">
                                    <clipPath id="cp55">
                                        <path transform="matrix(1,0,0,-1,0,540)" d="M .000014305 0 L 960 0 L 960 540 L .000014305 540 Z " fillRule="evenodd" />
                                    </clipPath>
                                    <g style={{ cursor: "pointer" }} onClick={() => openBarrierModal(7)} clipPath="url(#cp55)">
                                        <text fill="#ff0000" xmlSpace="preserve" transform="matrix(1 0 -0 1 0 540)" fontSize={18} fontFamily="Calibri"><tspan y="-158.16" x="409.66">{BARRIER_NUMBER.SEVEN}</tspan></text>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>
            </>
        )
    }
    return (
        <>
            <Image />
            <DiaFirst />
            <DiaSecond />
            <DialogBarrier />
            {/* <GetWebSocketData /> */}
        </>
    )
}
export default MainImage;