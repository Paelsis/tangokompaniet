import React, {useState, useEffect} from 'react'
import {serverFetchDataResult} from 'functions/serverFetch'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Rotate90DegIcon from '@material-ui/icons/RotateRight'
import postData from 'functions/postData'
import Photo from 'camera/Photo'
import Button from 'Components/Button'


const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const imageDir = apiBaseUrl + '/images'
const BUTTON_COLOR={DEFAULT:'#888', OK:'green', PROCESSING:'lightGreen', WARNING:'orange', ERROR:'red'}

export default props => {
        const {rootdir, subdir, list, setList} = props;
        const [buttonColor, setButtonColor] = useState(BUTTON_COLOR.DEFAULT)
        const url='/listImagesData?rootdir=' + (rootdir?'/'+rootdir:'') + (subdir?'/'+subdir:'') + (subdir?('&subdir=' + subdir):'')

        const styles = {
                button:{color:buttonColor, width:45, height:45, padding:0, border:0},
        }

        const handleResult = result => setList(result)

        useEffect(()=>{
                serverFetchDataResult(url, '', '', handleResult)
        },[rootdir, subdir])

        const handleDelete = index => {
                const newList = list.map((it,idx)=>{
                        if (idx === index) {
                                return({...it, delete:it.delete?false:true})
                        } else {
                                return it
                        }
                })        
                setList(newList)
        }

        const handleRotate = index => {
                const newList = list.map((it, idx)=>{
                        if (idx === index) {
                                return({...it, rotate:(it.rotate && it.rotate !== 360)?it.rotate+90:90})
                        } else {
                                return it
                        }
                })        
                setList(newList)
        }

        const handleReply = reply =>{
                if (reply.status==='OK') {
                        setButtonColor(BUTTON_COLOR.OK)
                        const timer = setTimeout(() => {
                                setButtonColor(BUTTON_COLOR.DEFAULT)
                        }, 3000);
                        /* alert('Successful delete/rotate rotated: ' + reply.rotated + ' deleted: ' + reply.deleted + ' result:' + JSON.stringify(reply.result)) */
                        setList(reply.result)
                } else {
                        setButtonColor(BUTTON_COLOR.ERROR)
                        const timer = setTimeout(() => {
                                setButtonColor(BUTTON_COLOR.DEFAULT)
                                alert('Delete/Rotate failed')                        
                        }, 5000);
                }
        }


        const handleSubmit = () => {
                setButtonColor(BUTTON_COLOR.PROCESSING)
                const url = apiBaseUrl + '/removeOrRotateImages'
                postData(url, "", "", {rootdir, files:list}, handleReply)
        }
        const sub = (subdir?subdir:'')
        const path = imageDir + (rootdir?'/'+rootdir:'') + (sub?'/'+sub:'') 
        return (
                <div>
                        <div>
                                <SaveIcon style={styles.button} onClick={handleSubmit} />
                        </div>
                        <div className="columns is-centered is-flex-wrap-wrap">
                                {list.map((li, idx) =>
                                        <div className='column is-3' style={{textAlign:'center'}}>
                                                <Photo dirname={path} fname={li.fname} fname_thumb={li.fname_thumb} style={{transform:li.rotate?"rotate(" + li.rotate + "deg)":undefined}} />
                                                {li.delete?
                                                        <DeleteForeverIcon style={{margin:'auto', color:'orange', fontSize:18}} onClick={()=>handleDelete(idx)} />     
                                                :        
                                                        <DeleteIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleDelete(idx)} />     
                                                }        
                                                {li.rotate?
                                                        <Rotate90DegIcon style={{margin:'auto', color:'orange', fontSize:18}} onClick={()=>handleRotate(idx)} />     
                                                :     
                                                        <Rotate90DegIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleRotate(idx)} />     
                                                }  
                                        </div>        
                                )}
                        </div>
                </div>

        )
}


