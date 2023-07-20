import React, {useState, useEffect} from 'react'
import fetchResult from 'functions/fetchResult'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Rotate90DegIcon from '@material-ui/icons/RotateRight'
import postData from 'functions/postData'
import Button from 'Components/Button'


const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const imageDir = apiBaseUrl + '/images'

export default props => {
        const {rootdir, subdir, list, setList} = props;
        const url=apiBaseUrl + '/listImagesData?rootdir=' + (rootdir?'/'+rootdir:'') + (subdir?'/'+subdir:'') + (subdir?('&subdir=' + subdir):'')

        const handleResult = result => setList(result)

        useEffect(()=>{
                fetchResult('', '', url, handleResult)
        },[rootdir, subdir])

        const handleDelete = index => {
                const newList = list.map((it,idx)=>{
                        if (idx === index) {
                                return({...it, delete:true})
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
                        alert('Successful delete/rotate rotated: ' + reply.rotated + ' deleted: ' + reply.deleted + ' result:' + JSON.stringify(reply.result))
                        setList(reply.result)
                } else {
                        alert('Delete/Rotate failed')                        
                }
        }


        const handleSubmit = () => {
                const url = apiBaseUrl + '/removeOrRotateImages'
                postData(url, "", "", {rootdir, files:list}, handleReply)
        }
        const sub = (subdir?subdir + '/':'')
        const path = imageDir + (rootdir?'/'+rootdir:'') + (sub?'/'+sub:'/') 
        return (
                <div className='column is-8'>
                        <div className="columns is-centered is-flex-wrap-wrap">
                                {list.map((li, idx) =>
                                        <div className='column is-narrow is-2'>
                                                <img src={path + li.fname} style={{transform:li.rotate?"rotate(" + li.rotate + "deg)":undefined}} />
                                                <p/>
                                                <small>{path + li.fname}</small>   
                                                {li.delete?
                                                        <DeleteForeverIcon style={{color:'orange', fontSize:18}} onClick={()=>handleDelete(idx)} />     
                                                :        
                                                        <DeleteIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleDelete(idx)} />     
                                                }        
                                                {li.rotate?
                                                        <Rotate90DegIcon style={{color:'orange', fontSize:18}} onClick={()=>handleRotate(idx)} />     
                                                :     
                                                        <Rotate90DegIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleRotate(idx)} />     
                                                }          
                                        </div>        
                                )}
                        </div>
                        <div className="column is-1">
                                <Button variant="contained" onClick={handleSubmit}>Submit</Button>                         
                        </div>
                </div>

        )
}


