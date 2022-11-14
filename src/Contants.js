const url = "http://www.rw-datanet.com:6200/"

export const SubUrl = {
    authToken: `${url}api-token-auth/`,
    addUser: `${url}api/users/`,
    viewUser: `${url}api/users/`,
    getYardList: `${url}api/transact/?trans_flag=0`,
    getRegistrationList: `${url}api/transact/?registration=true`,
    getWaitingList: `${url}api/transact/`,
    changeStatusOfRegistrationList: `${url}api/Transactions/`,
    updateWaitingList: `${url}api/Transactions/`
}

export const BARRIER = {
    BARRIER3OPEN: "OUT1 ON",
    BARRIER3CLOSE: "OUT1 OFF",
    BARRIER4OPEN: "OUT2 ON",
    BARRIER4CLOSE: "OUT2 OFF",
    BARRIER5OPEN: "OUT3 ON",
    BARRIER5CLOSE: "OUT3 OFF",
    BARRIER6OPEN: "OUT4 ON",
    BARRIER6CLOSE: "OUT4 OFF",
    BARRIER7OPEN: "OUT5 ON",
    BARRIER7CLOSE: "OUT5 OFF",
    BARRIER8OPEN: "OUT6 ON",
    BARRIER8CLOSE: "OUT6 OFF"
};

export const BARRIER_NUMBER = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    
}

export const SOCKET1 = "ws://80.152.148.142:5902";
export const SOCKET2 = "wss://demos.kaazing.com/echo";