import axios from 'axios'
import config from 'Settings/config'

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const successUrl = apiBaseUrl + "/successUrl"
const cancelUrl = apiBaseUrl + "/checkoutCancel"

const postPaymentRequest = (url, data, handleResult) => {
    console.log('--- function:postPaymentRequest --- url:', url);
    console.log('data:', data);
    axios.post(url, {
        data,
        urls: {
            successUrl,
            cancelUrl,
        },
    })
    .then((response) => {
        console.log('data:', response.data);
        const result = response.data.result?response.data.result:undefined;
        handleResult(result);
    })
    .catch((e) => {
        console.log('Error object:', e); // Error object
        handleResult(undefined);
    });
  }

export default postPaymentRequest