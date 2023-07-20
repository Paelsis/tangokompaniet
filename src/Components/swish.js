import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'


const swishRequestupdateRecord = (event, url, username, password, name, data) => {
    
    const data = {"payeePaymentReference": "0123456789", 
        "callbackUrl": "https://example.com/api/swishcb/paymentrequests", 
        "payerAlias": "4671234768", 
        "payeeAlias": "1231181189", 
        "amount": "100", 
        "currency": "SEK", 
        "message": "Kingston USB Flash Drive 8 GB" 
    }' -H "Content-Type: application/json" POST https://mss.cpc.getswish.net/swish-cpcapi/api/v1/paymentrequests --cert "Swish Merchant Test Certificate 1231181189.p12:swish" --cert-type p12 --cacert "Swish TLS Root CA.pem
    console.log('Function updateRecord')
    axios.put(url, {
        auth: {
            username: username,
            password: password,
        },
        table: {
            name: name, // The name of the table
            data: data, // The data object that contains the columns of the table as a map
        }, 
    })
    .then(function (response) {
        console.log('url:', url, 'username:', username, 'password:', password);
        console.log('Status code:', response.status);
        console.log('Status text:', response.statusText);
        console.log('Status data status:', response.data.status);
        console.log('Status data statusMessage1:', response.data.statusMessage);
    })
    .catch(function (error) {
        console.log('ERROR: Failed to fetch from URL:' + url, error);
        console.log(error.response); // Network Error
        console.log(error.status); // undefined
        console.log(error.code); // undefined

    });
    
    // event.preventDefault();
  }

  export default updateRecord;