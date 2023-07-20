import React from 'react';
import { Navigate } from 'react-router'
import {connect } from 'react-redux'
import config from 'Settings/config' 
import tkColors from 'Settings/tkColors'
import postPaymentCheckout from './postPaymentCheckout'
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const postUrl = apiBaseUrl + "/paymentCheckout"
const getUrl = apiBaseUrl + "/getPaymentCheckout"

const styles={
    button:{
      width:300,
      padding:8,
      marginLeft:'auto',
      marginRight:'auto',
      borderRadius:16,
      backgroundColor:tkColors.Purple.Light,
      color:tkColors.Text.Light,
      textAlign:'center',
    },
    buttonNavigate:{
      width:300,
      padding:8,
      marginLeft:'auto',
      marginRight:'auto',
      borderRadius:16,
      backgroundColor:tkColors.Olive.Light,
      color:tkColors.Text.Light,
      textAlign:'center',
      textDecoration:'none',
    }
}

export default class BamboraCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      redirect:false,
      redirectUrl:null,
    };
  }

  componentDidMount = () => {
      this.setState({ showButton: true, resultUrl:null})
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ showButton: true, resultUrl:null});
  }

  createOrder = () => {
    let order = {
          id: this.props.orderId?this.props.orderId:'1',
          amount: this.props.amount?this.props.amount:999,
          currency: this.props.currency?this.props.currency:'SEK',
    }
    return(order)    
  }
  
  simulateOrder = () => {
    let order = {
          id: Math.floor(Math.random() * 101),
          amount: Math.floor(Math.random() * 1501),
          currency: this.props.currency?this.props.currency:'SEK',
    }
    return(order)    
  }
  
  handleResult = (result) => {
    console.log('BamboraCheckout: result:', result); 
    console.log('BamboraCheckout: result.meta.status:', result.meta.result); 
    console.log('BamboraCheckout: result.token:', result.token); 
    console.log('BamboraCheckout: result.url:', result.url); 
    this.props.handleResult(result.token);
    this.setState({redirectUrl:result.url})
  }

  bamboraRequest = () => {
    postPaymentCheckout(postUrl, this.props.username, this.props.password, this.simulateOrder(), this.handleResult);
    this.setState({showButton:false});
  }

  render() {
      return (
        <div>
              {this.state.redirectUrl?
                  <div type="button" style={styles.buttonNavigate}>
                    <a target={"_blank"} href={this.state.redirectUrl} style={{textDecoration:'none'}}>
                      {this.props.language===LANGUAGE_SV?'Gå vidare till Bambora betaltjänst'
                      :this.props.language===LANGUAGE_ES?'Il ar pago con el servicio de pago Bambora'
                      :'Payment checkout with Bambora payment service'}
                    </a> 
                  </div>
              :  
                <div style={styles.button} onClick={this.bamboraRequest}>
                    {this.props.language===LANGUAGE_SV?'Betala'
                    :this.props.language===LANGUAGE_ES?'Pagar'
                    :'Pay'}
                </div>
              }    
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
      username: state.user.username,
      password: state.user.password,
      language: state.language,
  }
}    

BamboraCheckout = connect( 
  mapStateToProps,
) (BamboraCheckout);    


