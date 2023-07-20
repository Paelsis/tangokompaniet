import React, {Component} from 'react'
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'
import PhotoList from './PhotoList'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


const butColor ='#888' 

const styles={
  button:{color:butColor, width:45, height:45, padding:0, border:0},
  preview: {
    padding:1, 
    border:2, 
    borderStyle: 'dotted',
    borderColor:'red'
  }
}

class AddPhotoMultiple extends Component {
    constructor(props) {
      super(props);
      this.state = {
        buttonColor:butColor,
        selectedFiles:[],
        newFileNames: [],
        imagePreviewUrls: [],
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      console.log('files', this.state.selectedFiles)

      if (this.state.selectedFiles.length > 0) {
        const formData = new FormData()
        formData.append('rootdir', this.props.rootdir?this.props.rootdir:'')
        if (this.props.subdir) {
          formData.append('subdir', this.props.subdir?this.props.subdir:'')
        }
        for(let i=0; i < this.state.selectedFiles.length; i++) {
          let selectedFile = this.state.selectedFiles[i]
          let newFileName = this.state.newFileNames[i]
          formData.append('newfile_arr[]', selectedFile, newFileName)
        } 
        console.log('formData', formData)
        this.setState({buttonColor:'yellow'})
        axios.post(apiBaseUrl + '/postImages', formData,
            {
                onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total)}
            }
        ).then(response => {
            /*alert(JSON.stringify(response.data)) */
            if (this.props.addImage) {
              this.state.newFileNames.forEach(it => {
                this.props.addImage(it)
              }) 
            }
            this.setState({selectedFiles:[], imagePreviewUrls:[], newFileNames:[], buttonColor:butColor})
            if (response.data.status ==='OK') {
              this.props.setList(response.data.result)
            } else {
              alert('Posting image failed:' + JSON.stringify(response.data))
            }
        }).catch(error => {
            alert('ERROR: Failed to post image:' + JSON.stringify(error));
            statusMessage(STATUS_ERROR, 'ERROR: Failed to upload image/s: ' + JSON.stringify(error))
            this.setState({selectedFiles:[], imagePreviewUrls:[], newFileNames:[], buttonColor:'red'})
        });
      }
    }

    handleChange(e) {
      e.preventDefault();
      const selectedFiles = e.target.files;
      for(let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            selectedFiles: [...this.state.selectedFiles, selectedFiles[i]],
            imagePreviewUrls: [...this.state.imagePreviewUrls, reader.result],
            newFileNames:[...this.state.newFileNames, selectedFiles[i].name],
          });
        }
        reader.readAsDataURL(selectedFiles[i])
      }  
    }

    handleFileNameChange (e, ix) {
      // 1. Make a shallow copy of the items
      this.setState({
        newFileNames: [...this.state.newFileNames.slice(0,ix), e.target.value, ...this.state.newFileNames.slice(ix+1)]
      })
    }



    renderForm() {    
      return(
        <form className='columns is-centeded' onSubmit={e=>this.handleSubmit(e)}>
            <button 
              className='column is-narrow' 
              type="submit" 
              style={{background:'transparent', border:'none'}} 
            >
              <SaveIcon display='none' style={{...styles.button, color:this.state.buttonColor}} />
            </button>
            <button  
              className='column is-narrow'
              style={{background:'transparent', border:'none'}}
              onClick={()=>this.setState({selectedFiles: [], imagePreviewUrls:[], newFileNames:[], buttonColor:butColor})}
            >
              <CancelIcon style={{...styles.button, color:this.state.buttonColor}} />                              
            </button>
        </form>
      )
  }
  render() {
    let {imagePreviewUrls, selectedFiles} = this.state;
    return (
      
        imagePreviewUrls.length > 0?
            <>
              <div className='columns is-centered is-flex-direction-column is-flex-wrap-wrap'>
                {imagePreviewUrls.map((it, ix)=>
                  <div className='column is-one-quarter is-narrow'>            
                    <img src={it} style={{padding:0, border:'2px dotted yellow'}}/>
                    <input 
                      type='text' 
                      style={{marginTop:0, paddingTop:0, height:20, fontSize:'x-small'}}
                      value={this.state.newFileNames[ix]} 
                      onChange={(e)=>this.handleFileNameChange(e, ix)}
                    />
                  </div>
                )} 
              </div>
              {this.renderForm()}
            </>
          :
          <div>
            <input 
              type="file" 
              name="newfile"
              accept="image/*, application/pdf" 
              onChange={this.handleChange} 
              style={{display:'none'}}
              ref={fileInput => this.fileInput = fileInput} 
              multiple
            />
            <div>
            <Tooltip title={'Add one or multiple photos from library (max 8 images per upload)'}>
              <AddAPhotoIcon style={{...this.props.style?this.props.style:styles.button, color:this.state.buttonColor}} onClick={()=>this.fileInput.click()} />
            </Tooltip>  
            </div>
          </div>
    )
  }
}


  
export default AddPhotoMultiple
  