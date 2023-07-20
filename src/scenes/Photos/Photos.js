import React, {useState, useEffect} from 'react';
import {connect } from 'react-redux'
import withRecords from 'Components/Table/withRecords'
import {setLanguage} from 'redux/actions/actionsLanguage'; 
import TextShow from 'Components/Text/TextShow'
import config from 'Settings/config';
import fetchList from 'functions/fetchList';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;


// const _Photos = ({list, url, match:{params:{subdir}}}) => {   


const _Photos = (props) => {   
    const [list, setList] = useState([])
    const [expand, setExpand] = useState(false)
    const {match:{params:{rootdir = 'tk', subdir = 'images'}={}}={}} = props
    useEffect(() => {
      const url = apiBaseUrl + "/listImagesData?rootdir=" + rootdir + '&subdir=' + subdir
      fetchList(props.username, props.password, url, (list)=> setList(list));
    }, [subdir])
    console.log('list:', list)
    const dirname = apiBaseUrl + '/user/' + rootdir.trim('/') + '/' + subdir.trim('/')
    return(
    <div style={{maxWidth:800, margin:'auto'}}>
      {list.map(li=>
        <div style={{margin:'auto'}} onClick={()=>setExpand(!expand)}>      
          <h1>url = {dirname + '/' + li.fname}</h1>
          {expand?
            <img src={dirname + '/' + li.fname} alt={li.fname} style={{height:'80vh'}}/>
          :
            <img src={dirname + '/' + li.thumbFname} alt={li.fname} style={{height:'20vh'}}/>
          }
        </div>
      )}  
    </div>
  )
}    

const mapStateToProps = state => {
  return {
    username:'',
    password:'',
    language:state.language,
  }
}


export default connect( 
  mapStateToProps
) (_Photos)
