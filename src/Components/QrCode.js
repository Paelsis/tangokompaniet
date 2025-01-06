import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import tkColors from 'Settings/tkColors'
import { PAYMENT_TK } from "../Settings/Const";


export default ({price, message, color}) => {
    const payee = PAYMENT_TK.SWISH_PAYEE
    const value = price?'C' + payee + ';' + price + ';' + message + ';':'C' + payee + ';' + message + ';'
    const lclColor  = color?color:tkColors.Purple.Light
    // alert('QR-value:' + value)
    return(
        !!price&&!!message?
        <div style={{ color:lclColor, height: "auto", padding:20, margin: "0 auto", maxWidth: 128, width: "100%" }}>
            <h3>Tangokompaniet SWISH</h3>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%"}}
                value={value}
                viewBox={`0 0 256 256`}
                fgColor={lclColor}
            />
        </div>
        :null
    )    
}