import environment from '../Environment/Environment';
import axios from 'axios';
import { store } from 'react-notifications-component';
let axiosInterceptor = null;
export default class ServiceEngine {
  constructor(method, command, boolgitUrl, baseUrl, cancelToken, username, password, authToken) {
    this.method = method;
    this.command = command;
    this.baseUrl = baseUrl || environment.API_BASEURL;
    this.gitOperationBaseUrl = environment.GIT_OPER_BASEURL;
    this.isGitUrl = boolgitUrl;
    this.cancelToken = cancelToken;
    this.username = username;
    this.password = password;
    this.authToken = authToken
  }

  doGet = async () => {
    let url;
    let results;
    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await fetch(url).then((response) => {
      return response.json();
    });
    return results;
  };

  doGetMergeStatus = async () => {
    let url;
    let results;
    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await fetch(url).then((response) => {
      return response.text();
    });
    return results;
  };

  doDelete = async () => {
    let url;
    let results;
    url = this.baseUrl + this.command;
    results = fetch(url, {
      method: 'DELETE',
    }).then((response) => {
      return response.text();
    });
    return results;
  };

  doPost = async (data) => {
    let strData = JSON.stringify(data);
    let url;
    let results;
    url = this.baseUrl + this.command;

    results = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      body: strData,
    }).then((response) => {
      return response.json()
    });
    return results;
  };

  doAxiosGet = async () => {
    let url;
    let results;
    var auth = localStorage.getItem('auth_token');
    axiosInterceptor = axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (!!axiosInterceptor || axiosInterceptor === 0) {

        if (error && error.response && error.response.status > 200) {
          store.addNotification({
            title: "Oops!",
            message: error.response.data.message || "Something went wrong..",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        }
        axiosInterceptor = null;
      }
      return Promise.reject(error);
    });
    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await axios.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token' + ' ' + auth
        }
      }
    ).then((response) => {
      return response;
    });
    return results;
  };

  doAxiosDelete = async (data) => {
    let url;
    let results;

    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
      // url = this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    // results = await axios({
    //   method: 'DELETE',
    //   url: url,
    //   data: data,
    results = await axios.delete(
      url, {
      data: data
    }
    ).then((response) => {
      return response;
    });
    return results;
  };

  doAxiosAuthPost = async (data) => {
    let url;
    let results;

    axiosInterceptor = axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (!!axiosInterceptor || axiosInterceptor === 0) {

        if (error && error.response.status > 200) {
          store.addNotification({
            title: "Oops!",
            message: error.response.data.message || "Something went wrong..",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        }
        axiosInterceptor = null;
      }
      return Promise.reject(error);
    });

    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',

      },
      data: data,
    }).then((response) => {
      return response;
    });
    return results;
  };

  doAxiosPost = async (data) => {
    let url;
    let results;
    var auth = localStorage.getItem('auth_token');
    axiosInterceptor = axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (!!axiosInterceptor || axiosInterceptor === 0) {

        if (error && error.response.status > 200) {
          store.addNotification({
            title: "Oops!",
            message: error.response.data.message || "Something went wrong..",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        }
        axiosInterceptor = null;
      }
      return Promise.reject(error);
    });

    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }).then((response) => {
      return response;
    });
    return results;
  };

  doAxiosPut = async (data) => {
    let url;
    let results;
    var auth = localStorage.getItem('auth_token');
    axiosInterceptor = axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (!!axiosInterceptor || axiosInterceptor === 0) {

        if (error?.response?.status > 200) {
          store.addNotification({
            title: "Oops!",
            message: error?.response?.data?.message || "Something went wrong..",
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        }
        axiosInterceptor = null;
      }
      return Promise.reject(error);
    });

    if (!this.isGitUrl) {
      url = this.baseUrl + this.command;
    } else {
      url = this.gitOperationBaseUrl + this.command;
    }
    results = await axios({
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Token' + ' ' + auth
      },
      data: data,
    }).then((response) => {
      return response;
    });
    return results;
  };
}







