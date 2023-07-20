import React from 'react';
import {Link} from 'react-router-dom'
import Button from 'Components/Button'


// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    borderRadius: 16,
    border: 0,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  disabled: {
    background: 'red',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

const OrderButton = (props) => {
  console.log('--- Order Button ---')
  console.log('props:', props)
  return (
    <Link to='/order'> 
      <Button {...props} >
          {props.label?props.label:'... No label ...'}
      </Button>
    </Link>
  );
}


export default OrderButton;


