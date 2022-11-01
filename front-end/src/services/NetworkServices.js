import axios from "axios";

const TIMEOUT = 20000;

const getHeaders = () => {
    return {};
}

export const performGetRequest = async (url, headers) => {
    return new Promise((resolve, reject) => {

        axios
            .get(url, {
                headers: headers ? headers : {},
                timeout: TIMEOUT,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });
};

export const performPutRequest = async (url, body = {}, headers) => {
    return new Promise((resolve, reject) => {


        axios
            .put(url, body, {
                headers: headers ? headers : {},
                timeout: TIMEOUT,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });


    });
};

export const performPostRequest = async (url, body = {}, headers) => {
    return new Promise((resolve, reject) => {

        axios
            .post(url, body, {
                headers: headers ? headers : {},
                timeout: TIMEOUT,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });
};


export const performDeleteRequest = async (url, headers) => {
    return new Promise((resolve, reject) => {

        axios
            .delete(url, {
                headers: headers ? headers : {},
                timeout: TIMEOUT,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });
};


