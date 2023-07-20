import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {connect } from 'react-redux'
import tkColors from 'Settings/tkColors'
import {AVA_STATUS} from 'Settings/Const'
import QrCode from 'Components/QrCode'

//import withRouter from 'functions/withRouter'


const TEXTS = {
    CLOSE:{
        SV:'Stäng',
        ES:'Cerrer',
        EN:'Close',
    },
    LOCATION:{
      SV:'Plats',
      ES:'Locacion',
      EN:'Location',
    },
    REG:{
      SV:'Anmälan',
      ES:'Registrar',
      EN:'Register',
    },
    FULL:{
      SV:'Fullbokad',
      ES:'Fully booked',
      EN:'Fully booked',
    },
    MAX_DANCERS:{
      SV:'Max antal dansare',
      ES:'Max allowed dancers',
      EN:'Max allowed dancers',
    },
    REMAINING:{
      LEADER:{
        SV:'Återstående antal lediga platser för förare',
        ES:'Available space for leaders',
        EN:'Available space for leaders',
      }, 
      FOLLOWER:{
        SV:'Återstående antal lediga platser för följare',
        ES:'Available space for followers',
        EN:'Available space for followers',
      }
    },     
    AVA_STATUS:{
      AV:{  // Available  
        SV:'Platser kvar för både förare och följare.',
        EN:'Space available for both leaders and followers',
        ES:'Space available for both leaders and followers',
      }, 
      CC:{ // Completely closed 
        SV:'Dansen är fullbokad. Kontakta Tangkompaniet för eventuella återbud.',
        EN:'No space available. Contact Tangokompaniet and check for cancellations',
        ES:'No space available. Contact Tangokompaniet and check for cancellations',
      }, 
      CL:{ // Closed leaders
        SV:'Fullbokat för förare, bara platser kvar till följare',
        EN:'Fully booked for leaders, only space availabile for followers',
        ES:'Fully booked for leaders, only space availabile for followers',
      }, 
      OL:{ // Overflow leaders
        SV:'Överskott på förare (+3), vänta och se om fler följare bokar sig',
        EN:'Overflow of leaders (3), wait and see if more followers books',
        ES:'Overflow of leaders (3), wait and see if more followers books',
      }, 
      CF:{ // Closed followers
        SV:'Fullbokat för följare, bara platser kvar till förare',
        EN:'Fully booked for followers, only space availabile for leaders',
        ES:'Fully booked for followers, only space availabile for leaders',
      },
      OF:{ // Overflow followers
        SV:'Överskott på följare (+3), vänta och se om fler förare bokar sig',
        EN:'Overflow of followers (3), wait and see if more förare bookar sig',
        ES:'Overflow of followers (3), wait and see if more förare bookar sig',
      },
    },     
    NO_LIMITATIONS:{
      SV:'Ingen begränsning på antalet dansare',
      EN:'No limitations on number of dancers',
      ES:'No limitations on number of dancers',
  }
}  

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = props =>  {
  const {open, setOpen, event, language, addRegistration} = props  
  const navigate = useNavigate()
  const useRegistrationButton = event.useRegistrationButton
  const swishAmount = event.swishAmount?event.swishAmount:undefined
  const bookable = (event.avaPar?event.avaPar > 0:false) || (event.avaInd?event.avaInd > 0:false) || (event.avaPar===undefined && event.avaInd === undefined)
  const title=event.timeRangeWithDay

  const handleClose = () => {
    setOpen(false);
  }
  const handleRegistration = event => { 
    const path = '/registration/' +  event.productType +  '/' + event.productId + '/' + event.avaStatus
    navigate(path);
  }    
  
  const renderBody = () =>  {
    const location = event.location
    const desc = event.description?event.description:'' //.split('MAX_PAR')[0]
    const color = event.avaStatus === AVA_STATUS.AV?'green':event.avaStatus === AVA_STATUS.CC?'red':'deepOrange'
    const dev = process.env.NODE_ENV==='development'
    return(
      <div>
      <h3>{location}</h3>
        {useRegistrationButton?
          (event.avaPar || event.avaInd)?
                <div style={{color}}>
                    <p>
                        {TEXTS.AVA_STATUS[event.avaStatus][language]}
                    </p>  
                    {event.avaStatus !== AVA_STATUS.CC?
                      <p> 
                          {dev?<h4>regCount={event.regCount}</h4>:null}
                          {dev?<h4>avaStatus={event.avaStatus}</h4>:null}

                          {TEXTS.MAX_DANCERS[language]} = {event.maxInd?event.maxInd:event.maxPar?event.maxPar*2:'No value'}
                          <br/>
                          {TEXTS.REMAINING.LEADER[language]} =  {event.avaLeader}
                          <br />
                          {TEXTS.REMAINING.FOLLOWER[language]} = {event.avaFollower}
                      </p>
                    :null}
                </div>  
          :
                <div style={{color:'green'}}>
                    {TEXTS.NO_LIMITATIONS[language]}
                </div>      
          :null
        }
        <div style={{color:tkColors.black, maxHeight:'calc(100vw - 210px)', overflowX:'hidden', overflowY:'auto'}} dangerouslySetInnerHTML={{__html: desc}} />
        {swishAmount?
          <div style={{textAlign:'center'}}>
            <h4>Betala inträde i förskott</h4>
            <QrCode price={swishAmount} message={'Milonga'} />
          </div>
        :null}  
      </div>
    )
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        color="primary"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              {renderBody()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
             {TEXTS.CLOSE[language]}
          </Button>
          {useRegistrationButton?
                bookable?
                    <Button variant="outlined" color="primary" onClick={()=>handleRegistration(event)}>
                      {TEXTS.REG[language]} 
                    </Button>
                :    
                    <Button variant="outlined" color="primary" disabled >
                      {TEXTS.FULL[language]}
                    </Button>
                    
          :null}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
    }    
}    

export default connect(mapStateToProps)(AlertDialogSlide)  