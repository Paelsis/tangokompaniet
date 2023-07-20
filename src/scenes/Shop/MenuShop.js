import React from 'react';
import RaisedButton from '@material-ui/Button';
import {tkItemTypes} from 'Data/tkShop'
import {tkColors} from 'Settings/tkColors'
import ShoppingCartButton from './tkColors.Text.Light'

const styles = {
  root:{  
    postion:'relative',
    margin:'auto',
    marginBottom:500,
    padding:1,  
  },
  list: {
    padding:0,  
  },
  listItem: {
    padding:5,  
    display:'inline',
  }, 
  button: {
    backgroundColor:tkColors.color,
    border:0,
    padding:0,
  },
  badge: {
    top: 20, 
    left: 40, 
    backgroundColor: tkColors.color,
    zIndex:999,
  }
};

const onClick = (name) => {
    alert('type:' + name)
} 

const MenuShop = () => (
  <div style={styles.root}>
    <ul style={styles.list}>
      {tkItemTypes.map((type) =>(  
        <li style={styles.listItem}>
          <RaisedButton 
              label={type.name} 
              primary={true} 
              overlayStyle={styles.button} 
              onClick={()=>alert('Hello')}
            /> 
        </li>
      ))}
      <li style={styles.listItem}>
        <ShoppingCartButton />  
      </li>
    </ul>   
  </div>
);

export default MenuShop;