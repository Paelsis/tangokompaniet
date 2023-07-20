import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {LOGGED_IN_FLAG} from 'redux/actions/actionsUser'

const firebaseEnabled = process.env.REACT_APP_FIREBASE_API_KEY !== undefined

const menuItemsA = [
    {
      link:"/contact", 
      environment:['development', 'test', 'production'],
      title:{
        ['SV']:'Kontakt',
        ['ES']:'Contacto', 
        ['EN']:'Contact',
      },
      production:true
    },  
    {
      link:"/help",
      environment:['development', 'test', 'production'],
      title:{
        ['SV']:'Hjälp',
        ['ES']:'Ayudar', 
        ['EN']:'Help'
      },
    },  
    {
      link:"/about",
      environment:['development', 'test', 'production'],
      title:{
        ['SV']:'Om denna hemsida',
        ['ES']:'Ayudar', 
        ['EN']:'About'
      },
    },  
    /*
    {
      link:"/image/images",
      environment:['development', 'test'],
      title:{
        ['SV']:'Bilder',
        ['ES']:'Fotos', 
        ['EN']:'Images'
      },
    } 
    */ 
  ]  
  
  const menuItemsB = (loggedInFlag) => {
    return([
      {link:'/signout', 
      environment:['development', 'test', 'production'],
      disabled:!loggedInFlag, 
      title:{
        ['SV']:'Logout',
        ['ES']:'Logout', 
        ['EN']:'Logout'
      },
      helpText:{
        ['SV']:'Endast för Tangokompaniets personal',
        ['ES']:'Solo para el personal de Tangokompaniet',
        ['EN']:'Only for staff at Tangokompaniet',
      },
      },
      {link:"/firebaseSignin", 
      disabled:loggedInFlag || !firebaseEnabled, 
      environment:['development', 'test', 'production'],
        title:{
          ['SV']:'Logga på Admin',
          ['ES']:'Signin', 
          ['EN']:'Signin'  
        },
        helpText:{
          ['SV']:'Logga på admin via Goggle',
          ['ES']:'Signon via Google',
          ['EN']:'Signon via Google',
        },
      },
      {link:"/admin", 
      disabled:!loggedInFlag && firebaseEnabled, 
        environment:['development', 'test', 'production'],
        title:{
          ['SV']:'Admin',
          ['ES']:'Administración', 
          ['EN']:'Admin'
        },
        helpText:{
          ['SV']:'Endast för Tangokompaniets personal',
          ['ES']:'Solo para el personal de Tangokompaniet',
          ['EN']:'Only for staff at Tangokompaniet',
        },
      },
    ])
}    
  
  

const ITEM_HEIGHT = 48;

const RightMenu = (props) => {
  const {language, loggedInFlag} = props  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color='secondary'
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor:'white',
            opacity:0.9,
            maxHeight: ITEM_HEIGHT * 7.5,
            width: '20ch',
          },
        }}
        >
        {menuItemsA.map((it, idx) => (
           <Link key={'A'+idx} to={it.link} style={{ textDecoration: 'none', display: 'block' }}>
             <MenuItem key={'A'+idx} onClick={handleClose}>{it.title[language]}</MenuItem>
          </Link>  
        ))}

        {menuItemsB(loggedInFlag).map((it, idx) => (
            it.disabled?null
            :it.environment.includes(process.env.REACT_APP_ENVIRONMENT)? 
              it.link?      
                <Link key={'B'+idx} to={it.link} style={{ textDecoration: 'none', display: 'block' }}>
                    <MenuItem key={'B'+idx} onClick={handleClose}>{it.title[language]}</MenuItem>
                </Link>
              :it.func?
                <MenuItem key={idx} onClick={()=>it.func()}>{it.title[language]}</MenuItem>
              :null  

            : 
                null
    
        ))}
      </Menu>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      language: state.language,
      background: state.style.background,
      loggedInFlag:state.user[LOGGED_IN_FLAG],
    }
  }
  
  export default connect(mapStateToProps)(RightMenu)
  
