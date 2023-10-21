import React, {useState, useEffect} from 'react';
import {serverFetchDataResult} from '../functions/serverFetch';
import Photo from './Photo'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


export default props => {   
    const rootdir = props.rootdir?props.rootdir:'shop'
    const [list, setList] = useState([])
    useEffect(() => {
      const url = apiBaseUrl + '/listImages?rootdir=shop'
      serverFetchDataResult(url, '', '', list=> {/*alert(JSON.stringify(list));*/ setList(list)});
    }, [rootdir])
    const dirname = apiBaseUrl + '/images/' + rootdir.trim('/')
    return(
    <div style={{display:'flex', flexWrap:'wrap'}}>
        
          {list?
              list.map(name=>
                <div className='column is-one-third'>
                  <Photo dirname={dirname} name={name} />
                </div>
              )
            :
              <div className='column is-12'>
                List Undefined  
              </div>  
          }  

    </div>
  )
}    

