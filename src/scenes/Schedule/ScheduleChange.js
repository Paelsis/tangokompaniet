import React, {useState} from 'react'
import { connect } from 'react-redux'
import postPayload from 'functions/postPayload'
import config from 'Settings/config'
import withRecords from 'Components/Table/withRecords'
import CircularProgress from 'Components/CircularProgress'
import {USERNAME, PASSWORD} from 'redux/actions/actionsUser'

const url=config[process.env.NODE_ENV].apiBaseUrl + '/admin/scheduleChange'

const styles = {
    root:{
        maxWidth:1200,
        margin:'auto'
    }
}


const ScheduleChange = (props) => {
    const {username, password, fetchListAgain} = props
    const [productId, setProductId] = useState(undefined);
    const [schedule, setSchedule] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const payload = {productId, schedule}
    const handleReply = data => {
        setSubmitted(false)
        fetchListAgain()
        setProductId(undefined)
    }
    const onSubmit = e =>{
        const text = productId + ' ' + schedule.startDate + ' ' + schedule.startDate + ' ' + schedule.teacher1 + ' ' + schedule.teacher2
        console.log(text);
        e.preventDefault(); 
        setSubmitted(true)
        setProductId(undefined)
        setSchedule({})
        postPayload(url, username, password, payload, handleReply)
    } 
    const onChange = e => {
        setSchedule (props.list.find(it=>it.productId === e.target.value))
        setProductId(e.target.value)
    }

    return(
        <div style={styles.root}>
        <div>
            <h2>Pick the course you want to modify:</h2>
            <select name={'productId'} value={productId} onChange={onChange}> 
                <option value='' selected disabled>Choose here</option>
                {props.list.map((it, index) =>
                    <option key={index} value={it.productId} disabled={false}>{it.schedule}</option>
                )}  
            </select>
        </div>
        {submitted?<CircularProgress />            
        :productId?            
            <form onSubmit={onSubmit}>
            <h2>Please modify the selected schedule below</h2>
                <label>
                    Start date
                    <input 
                        type='date'
                        name={'startDate'} 
                        value={schedule.startDate}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                &nbsp;
                <label>
                    Time
                    <input 
                        type='time'
                        name={'startTime'} 
                        value={schedule.startTime}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                &nbsp;
                <label>
                    Location                  
                    <input 
                        type='string'
                        style={{width:20}}
                        name={'siteId'} 
                        maxLength={2}
                        value={schedule.siteId}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                &nbsp;
                <label>
                    Teacher 1
                    <input 
                        type='string'
                        style={{width:20}}
                        name={'teacher1'} 
                        maxLength={2}
                        value={schedule.teacher1}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                &nbsp;
                <label>
                    Teacher 2
                    <input 
                        type='string'
                        style={{width:20}}
                        name={'teacher2'} 
                        maxLength={2}
                        value={schedule.teacher2}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                <label>
                    Course Id
                    <input 
                        type='string'
                        style={{width:50}}
                        name={'courseId'} 
                        maxLength={10}
                        value={schedule.courseId}
                        onChange={e=>setSchedule({...schedule, [e.target.name]:e.target.value})}
                    />
                </label>
                <input style={{color:'white', backgroundColor:'green'}} type='submit' />
            </form>
            :null}    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        language: state.language,
        url:'/admin/tktableWithoutId?tableName=v_course',
    }
}    

export default connect(mapStateToProps)(withRecords(ScheduleChange));    



