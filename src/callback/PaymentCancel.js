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
        minHeight:'100vh',
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

const TEXTS = (orderId) => ({
    CANCEL:{   
        SV:'Du har cancellerat din order med nummer ' + orderId + ' till Tangokompaniet',
        EN:'Your have cancelled your order with number ' + orderId + ' to Tangokompaniet.',
        ES:'Usted cancela su pedido con el número '+ orderId + ' a Tangokompaniet.',
    },    
    THANKS:{
        SV:'Tack för att du har besökt vår shop på Tangokompaniet. Välkommen tillbaka snart igen',
        EN:'Thanks for looking into our shop and we hope that you visit our webshop soon again.',
        ES:'Gracias por visitar nuestra tienda en Tangokompaniet. Bienvenido de nuevo pronto.',
    },    
})

const PaymentCancel = (props) => {
    const params = useParams()
    const orderId = params.orderId?params.orderId:'';
    const language = params.language===LANGUAGE_SV || params.language===LANGUAGE_ES?params.language:LANGUAGE_EN
    return(
        <div>
            <div style={styles.root}>
                <h2>{TEXTS(orderId).CANCEL[language]}</h2>
                <h3>{TEXTS().THANKS[language]}</h3>
                <footer style={styles.footer}>
                    <PaymentReturnLinks language={language} />
                </footer>
            </div>
        </div>
)
};

export default PaymentCancel;