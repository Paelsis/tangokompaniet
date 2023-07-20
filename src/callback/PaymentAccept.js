import React from 'react';
import { useParams } from 'react-router-dom';
import tkColors from 'Settings/tkColors'
import Background from 'images/other/VästraHamnen.jpeg';
import PaymentReturnLinks from './PaymentReturnLinks';
import {LANGUAGE_SV, LANGUAGE_ES, LANGUAGE_EN} from 'redux/actions/actionsLanguage'


const styles = {
    root:{flex: 1,
        marginRight:'auto',
        marginLeft:'auto',
        resizeMode: 'contain',
        height:'100vh',
        maxWidth:800,
        backgroundImage: `url(${Background})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        opacity:0.8,
        textAlign:'center',
        color:tkColors.Purple.Light,
    }, 
    footer:{
        position:'absolute',
        align:'center',
        width:'100%', 
        maxWidth:800,
        bottom:0,
        height:100   /* Height of the footer */
    }
}

const TEXTS = {
    PAYMENT:{   
        SV:'Tangokompaniet har mottagit din betalning på beloppet: ',
        EN:'Tangokompaniet has recieved your payment of: ',
        ES:'La compañía de tango ha recibido su pago por el monto: ',
    },    
    ORDER:{   
        SV:'Vänligen kontrollera din e-mail för bekräftelse av din order id ',
        EN:'Please check your mailbox for a confirmation of your purchase with order id ',
        ES:'Por favor revise su correo electrónico para la confirmación de su ID de pedido ',
    },    
    THANKS:{
        SV:'Tack för att du handlat hos Tangokompaniet',
        EN:'Thank you for shopping at Tangokompaniet',
        ES:'Gracias por comprar en la Tangokompaniet.',
    },    
}


const PaymentAccept = (props) => {
    const params = useParams();
    const orderid = params.orderId?params.orderId:''
    const amount = params.amount?params.amount:'' // params.amount is expressed in minimum units (ören)
    const currency = params.currency?params.currency:'SEK'
    const language = params.language===LANGUAGE_SV || params.language===LANGUAGE_ES?params.language:LANGUAGE_EN
    return (
        <div style={styles.root}>
            <p>{TEXTS.PAYMENT[language] + amount + ' ' + currency}</p> 
            <p>{TEXTS.ORDER[language] + ' ' + orderid}</p>
            <p/><p/>
            <h4>{TEXTS.THANKS[language]}</h4>
            <p/><p/>
            <footer style={styles.footer}>
                <PaymentReturnLinks language={language} />
            </footer>
        </div>
    )
};

export default PaymentAccept;