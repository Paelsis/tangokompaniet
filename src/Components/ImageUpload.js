import React, {Component} from 'react'
import axios from 'axios'
import withRecords from 'Components/Table/withRecords'
import config from 'Settings/config' 
import ImageList from './ImageList'
import StatusLine from 'Components/StatusLine'
import statusMessage, {statusMessageStatic, STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'
import axiosGet from 'functions/axiosGet'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
const addAPhoto = <AddAPhoto color={'green'} style={{width:35, height:35, padding:0, border:0}}/>;


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;

const styles={
  buttonContainer:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent: 'center',
  },
  button:{
    color:'white',
    height:40,
    background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    border: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: 2,
    borderRadius:4,
  },
  buttonPressed:{
    color:'white',
    background: 'linear-gradient(-45deg, #6B443C 0%, #D5492B 100%',
    height:46,
    border: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: 2,
    borderRadius:4,
  },
  preview: {
    padding:1, 
    border:2, 
    borderStyle: 'dotted',
    borderColor:'red'
  }
}

class _Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedFile: undefined,
        imagePreviewUrl: undefined,
        newFileName: undefined,
        subdir:undefined,
        edit:true,
        pressed:false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeFileName = this.handleChangeFileName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
      this.createThumbnails = this.createThumbnails.bind(this);
    }

    componentDidMount() {
      this.setState({subdir:this.getSubdir(this.props)})
    }

    componentWillReceiveProps(nextProps) {
      if (this.getSubdir(this.props) !== this.getSubdir(nextProps)) {
        this.setState({subdir:this.getSubdir(nextProps)})
        this.props.fetchListAgain();
      }
    }

    getSubdir(props) {
      const subdir=props.match?props.match.params?props.match.params.subdir
      :props.subdir?props.subdir:undefined
      :props.subdir?props.subdir:undefined 
      return(subdir?(subdir.charAt(0)==='/'?'':'/') + subdir:'')
    }

    handleSubmit(event) {
      event.preventDefault();

      if (this.state.selectedFile) {
        const formData = new FormData()
        console.log('XXXXXX subdir:', this.state.subdir)
        formData.append('subdir', this.state.subdir)
        formData.append('newfile', this.state.selectedFile, this.state.newFileName)
        console.log('formData', formData)
        axios.post(apiBaseUrl + '/postImage', formData, {
            onUploadProgress: progressEvent => console.log(progressEvent.loaded / progressEvent.total)
        }).then(response => {
            console.log('response:', response);
            statusMessage(STATUS_OK, 'OK: ' + this.state.newFileName + ' saved in ' + this.state.subdir)
            this.setState({selectedFile: undefined, imagePreviewUrl:undefined, newFileName:undefined})
            this.props.fetchListAgain();
        }).catch(error => {
            statusMessage(STATUS_ERROR, 'ERROR: Failed to store image ' + this.state.newFileName + ' in dir ' + this.state.subdir)
            console.log('ERROR: Failed to upload:', error);
        });
      }
    }

    handleChange(e) {
      e.preventDefault();
  
      const selectedFile = e.target.files[0];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          selectedFile,
          imagePreviewUrl: reader.result,
          newFileName:selectedFile.name,
        });
      }
      reader.readAsDataURL(selectedFile)
    }  

    handleChangeFileName(e) {
      e.preventDefault();
      const newFileName = e.target.value
      this.setState({newFileName})
    }  

    _form1() {    
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="file" 
                    name="newfile"
                    accept="image/*" 
                    onChange={this.handleChange} 
                />
                <button className="button" type="submit">Upload Image</button>
            </form>
        )
    }

    toggleEdit() {
      this.setState({edit:!this.state.edit})
    }

    createThumbnails(subdir) {
      const url = apiBaseUrl + '/createThumbnails?subdir=' + subdir
      console.log('createThumbnails, url:', url)
      this.setState({pressed:true});
      axiosGet(url, data => {
        if (data === null) {
          statusMessage(STATUS_ERROR, 'ERROR: Failed to create thumbnails')
          this.setState({pressed:false});
        } else if (data.result.length === 0) {
          statusMessage(STATUS_OK, 'OK: No thumbnails created')
          this.setState({pressed:false});
        } else {
          statusMessage(STATUS_OK, 'OK:' + data.result.length + ' thumbnails created')
          this.setState({pressed:false});
        }
      })
    }

    _view2() {    
      const {imagePreviewUrl} = this.state;
      return(
        <form onSubmit={e=>this.handleSubmit(e)}>
            <input 
                key={'newfile'}
                type="file" 
                name="newfile"
                accept="image/*" 
                onChange={this.handleChange} 
                style={{display:'none'}}
                ref={fileInput => this.fileInput = fileInput} 
            />
            <button className="button" key={"newfile"} style={styles.button} onClick={()=>this.fileInput.click()}>{addAPhoto}</button>
            {this.state.selectedFile?
                imagePreviewUrl?
                  <div>
                    <img src={imagePreviewUrl} height={100} style={styles.preview}/>
                    <p />
                    <input 
                      key={'newFileName'} 
                      type="text" 
                      name="newFileName" 
                      value={this.state.newFileName}
                      placeholder={this.state.newFileName}
                      onChange={this.handleChangeFileName}
                    />
                    <button className="button" key={'Save'} style={styles.button} type="submit">Save image</button>
                  </div>
            :
              null:null}
        </form>
      )
    }

    thumbnailButton() {return( 
      <button className="button" 
        key={"createThumbnailButton"} 
        style={this.state.pressed?styles.buttonPressed:styles.button} 
        onClick={()=>this.createThumbnails(this.state.subdir)}
      >
        Create Thumbnails
      </button>
    )}
  
    addPhotoButton() {return( 
      <span>
      <input 
        key={'newfile'}
        type="file" 
        name="newfile"
        accept="image/*" 
        onChange={this.handleChange} 
        style={{display:'none'}}
        ref={fileInput => this.fileInput = fileInput} 
      />
      <button className="button" key={"newfile"} style={styles.button} onClick={()=>this.fileInput.click()}>{addAPhoto}</button>
      </span>
    )}

    toggleEditButton() {return( 
      <button className="button" key={"newfile"} style={styles.button} onClick={this.toggleEdit}>{this.state.edit?'Close Edit':'Edit'}</button>
    )}

    onClick(e) {
      alert('Image clicked')
      console.log('Image clicked', e)
    }

    _form2() {    
      const {imagePreviewUrl, edit} = this.state;
      return(
        <form onSubmit={e=>this.handleSubmit(e)}>
            <div style={styles.buttonContainer}>
            {edit?this.addPhotoButton():null}
            {edit?this.thumbnailButton():null}
            {this.toggleEditButton()}
            </div>
            {(edit && this.state.selectedFile)?
                imagePreviewUrl?
                  <div>
                    <img onClick={this.onClick} src={imagePreviewUrl} height={100} style={styles.preview}/>
                    <p />
                    <input 
                      key={'newFileName'} 
                      type="text" 
                      name="newFileName" 
                      value={this.state.newFileName}
                      placeholder={this.state.newFileName}
                      onChange={this.handleChangeFileName}
                    />
                    <button className="button" key={'Save'} style={styles.button} type="submit">
                      Save image
                    </button>
                  </div>
            :
              null:null}
        </form>
      )
  }



    render() {
      return (
        <div>
          {this._form2()}
          {this.state.subdir?
            <ImageList 
              {...this.props} 
              list={this.props.list} 
              subdir={this.state.subdir}
              edit={this.state.edit} 
            />
          :
            <h2>No valid sub-directory</h2>
          }  
        </div>
      )
    }
  }

  const _UploadWithRecords = withRecords(_Upload)
  export default props  => <_UploadWithRecords {...props} url='/listImages' />
  
  
