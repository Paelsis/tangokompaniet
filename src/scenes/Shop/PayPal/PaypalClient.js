import React, {Component} from 'react';
import PaypalButton from './PaypalButton';


const CLIENT = {
    sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    production: process.env.REACT_APP_PAYPAL_CLIENT_ID,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class PaypalClient extends Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    console.log(CLIENT.sandbox);

    return (


      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'SEK'}
          total={1000}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaypalClient;