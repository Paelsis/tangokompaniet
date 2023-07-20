import React from 'react'

const styles={
    enabled: {
        color: 'white',
        background: 'linear-gradient(45deg, #81185B 30%, #FF8E53 90%)',
        //background: 'linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)',
        borderRadius: 16,
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textAlign: 'center'
    },
    disabled: {
        color: 'white',
        background: 'linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)',
        opacity:0.5, /* Note OPACITY 0.5 for disabled */
        borderRadius: 16,
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textAlign: 'center',
    },
    link:{
        textDecoration:'none'
    }
}

const PaymentButton = ({label, url, style}) => (
    <a target={"_blank"} href={url?url:'/home'} style={styles.link}>
        <button className="button" 
            style={style?style
                :url!==null?styles.enabled
                :styles.disabled} 
            disabled={url===null?true:false} >
                {label}
        </button>    
    </a>
)   

export default PaymentButton;