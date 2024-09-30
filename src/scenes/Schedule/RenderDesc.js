import React, {useState} from 'react';
import EditText from 'Components/Text/EditText';
import IconButton from '@material-ui/core/IconButton'
//import {LANGUAGE_SV} from 'redux/actions/actionsLanguage'
// import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Tooltip from '@material-ui/core/Tooltip';

const TEXT = {
    TOOLTIP:{
        EN:'Back to previous page',
        SV:'Backa till föregående sida'
    }
}

const RenderDesc = ({groupId, language, textId, setTextId, backButton}) => {
        return (
            <div style={{margin:'auto', width:1000, maxWidth:'85%'}}>
                {textId?
                    <>
                    {backButton?
                        <div style={{textAlign:'left'}}>
                            <IconButton onClick={()=>setTextId(undefined)}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>                
                    :
                        null
                    }    

                    <div>
                                <EditText url={'/getTexts'} 
                                    groupId={groupId?groupId:'Variable groupId is missing in call to component RenderText'} 
                                    textId={textId} 
                                    language={language}
                                    style={{maxWidht:800}}>
                                </EditText>
                    </div>            

                    {backButton?
                            <div style={{textAlign:'left'}}>
                                    <IconButton onClick={()=>setTextId(undefined)}>
                                        <Tooltip title={TEXT.TOOLTIP[language]}>
                                            <ArrowBackIosIcon />
                                        </Tooltip>
                                    </IconButton>
                            </div>
                    :
                        null    
                    }    
                    </>
                :null}    
            </div>
        )
}

export default RenderDesc
    