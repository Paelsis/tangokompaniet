import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import postData from 'functions/postData'
import FormTemplate from 'Components/formTemplate';
import Button from 'Components/Button'
import config from 'Settings/config';


const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;
const CANCEL_URL = apiBaseUrl + '/cancelRegistration';


const fields = [
    {
        type:'email',
        label:'Email',
        name:'email',
        required:true,
    },
    {
        type:'text',
        label:'Product Id',
        name:'productId',
        required:true,
    },
    {
        type:'Token',
        label:'token',
        name:'token',
    },
]

//postData(CREATE_REG_URL, this.props.username, this.props.password, data, this.handleReply);

const CancelRegistration = () => {
    const [message, setMessage] = useState(undefined)
    const [color, setColor] = useState('teal')
    const [mailBody, setMailBody] = useState('No mail body') 
    const [ignore, setIgnore] = useState()
    const params = useParams();
    const token = params?params.token:undefined
    const tableName = params?params.tableName:'tbl_registration'

    const handleReply = (reply) => {
        setColor(reply.status?reply.status==='WARNING'?'darkOrange':reply.status==='ERROR'?'red':'green':'red')
        setMailBody(reply.mailBody?reply.mailBody:'No reply mailBody')
        setMessage(reply.message)
    }

    useEffect(()=>{
        //eslint-disable-next-line
        if (!confirm("Are you sure you want to cancel you registration to Tangokompaniet (y/n) ?")) {
            const values = {token, tableName}
            postData(CANCEL_URL, '', '', values, handleReply);
        } else {
           // Ignore cancellation 
           ignore = true;  
        }   
    }, [token, tableName])



    return(
        ignore?
            <div style={{width:'90vw', marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
                <h1>{"Din cancellering genomfördes inte."}</h1>
                <h3>{"Your cancellation was ignored"}</h3>
            </div>
        :token===undefined?
            <div style={{width:'90vw', marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
                <h1>{"VARNINN: Ingen token skickad (Use link: https://www.tangokompaniet.com/cancelRegistration/<token>)"}</h1>
                <h3>{"WARNINGE: No token given in url (Use link: https://www.tangokompaniet.com/cancelRegistration/<token>)"}</h3>
            </div>
        :message===undefined?
            <div style={{width:'90vw', marginLeft:'auto', marginRight:'auto', textAlign:'center', color}}>
                Deleting ...
            </div>
        :    
            <div style={{width:'90vw', marginLeft:'auto', marginRight:'auto', textAlign:'center', color}}>
                <h1>{message}</h1>
                {process.env.NODE_ENV==='development'?
                    <div>
                        <h1>Mail send to customer (sometimes 2)</h1>
                        <div dangerouslySetInnerHTML={{__html: JSON.stringify(mailBody)}} />
                    </div>    
                :null}    
            </div>
    )

}

export default CancelRegistration