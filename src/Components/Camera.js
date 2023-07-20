import React, { useState } from 'react';
import AddPhotoMultiple from 'Components/AddPhotoMultiple';
import PhotoList from 'Components/PhotoList';

// Camera


export default (props) => {
        const [list, setList] = useState([])
        const rootdir = props.rootdir?props.rootdir:''
        const subdir = props.subdir?props.subdir:''
        return(
                <div style = {{marginLeft:'auto', marginRight:'auto', marginTop:50}} className='columns'>
                        <div className='is-2 column is-narrow'>
                                <AddPhotoMultiple rootdir={rootdir} subdir={subdir} list={list} setList={setList} />
                        </div>
                        <div className='column'>
                                <PhotoList rootdir={rootdir} subdir={subdir} list={list} setList={setList} />
                        </div>
                </div>
        )
}
      