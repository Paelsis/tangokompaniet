export const isSwishInstalledOnThisUnit = () => {
    //remember the time of start application
    let timestart = new Date().getTime();
    //try to run application (Swish) in the frame by opening custom URL-SCHEME
    createIFrame(url+"&browser="+browserName+"&back="+encodeURIComponent(location.toString())+"&useragent="+encodeURIComponent(userAgent));
    //remember time of returning from application
    let timeend = new Date().getTime();
    //if from the moment of the attempt to run the application to moment when the
    //control returns back to this code passed enough much time (more then 3 sec),
    //most probably this means that the application was successfully started and
    //the user spent the time using the application
    if (timeend - timestart > 3000) {
        isSwishInstalled = true;
    } else {
        isSwishInstalled = false;
    }
}

export const swishLink = "swish://paymentrequest?token=value&callbackurl=back_scheme"

export const paymentRequest= "https://mss.cpc.getswish.net/swish-cpcapi/api/v1/paymentrequests/"

export const refundRequest="https://mss.cpc.getswish.net/swish-cpcapi/api/v1/refunds/"