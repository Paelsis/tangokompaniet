import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'Components/Button'

const TEXTS = {
    BUTTON:{
        SCHEDULE:{
            SV:'Tillbaka till kurschema',
            EN:'Back to course schedule',
            ES:'Volver al horario del curso',
        },    
        STORE:{   
            SV:'Tillbaka till skoaffär',
            EN:'Back to shoe store',
            ES:'Volver a la tienda de zapatos',
        },    
        HOME:{   
            SV:'Tillbaka till försasidan',
            EN:'Back to homepage',
            ES:'Volver a la portada',
        },    
    }    
}

// More components

const styles={
    enabled:{
        margin:2, 
    },
    disabled:{
        margin:2, 
    }
}

const PaymentReturnLinks = ({language}) => 
    <div>
        <Link to={'/scheduleCourse'} style={{ textDecoration: 'none' }}>
            <Button style={styles.button}>
                 {TEXTS.BUTTON.SCHEDULE[language]}
            </Button>
        </Link>&nbsp;&nbsp;
        <Link to={'/shop'} style={{ textDecoration: 'none' }}>
            <Button styles={styles}>
                 {TEXTS.BUTTON.STORE[language]}
            </Button>
        </Link>&nbsp;&nbsp;
        <Link to={'/home'} style={{ textDecoration: 'none' }}>
            <Button styles={styles}>
                 {TEXTS.BUTTON.HOME[language]}
            </Button>
        </Link>
    </div>


export default PaymentReturnLinks;