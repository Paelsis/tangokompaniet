
export const isSwishInstalled = () => {
    //remember the time of start application
    let swishInstalled = false;
    let timeStart = new Date().getTime();
    let url ='swish://paymentrequest'
    //try to run application (Swish) in the frame by opening custom URL
-   SCHEMEcreateIFrame(url+"&browser="+browserName+"&back="+encodeURIComponent(location.toString())+"&useragent="+encodeURIComponent(userAgent));
   
    //remember time of returning from application
    let timeEnd = new Date().getTime();           
    
    //if from the moment of the attempt to run the application to moment when the
    //control returns back to this code passed enough much time (more then 3 sec),
    //most probably this means that the application was successfully started and
    //the user spent the time using the application
    if (timeEnd - timeStart > 3000) {
        swishInstalled = true;
    } else {
        swishInstalled = false;
    }
    return(swishInstalled);
}

// uri used by safari:
export const uriSwish = 'swish://paymentrequest?token=value&callbackurl=back_scheme';

// SWISH test described at: https://www.getswish.se/handel