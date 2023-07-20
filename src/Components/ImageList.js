import React, {Component} from 'react'
import config from 'Settings/config' 
import postPayload from 'functions/postPayload' 
import axios from 'axios'
import statusMessage, {STATUS_OK, STATUS_WARNING, STATUS_ERROR} from 'functions/statusMessage'
import TextEdit from './Text/TextEdit'
import TextShow from 'Components/Text/TextShow'

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const styles={
  button1:{
    background: 'transparent',
    border: '0.1px',
    borderStyle: 'solid',
    borderColor: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    padding: 16,
    borderRadius:4,
  },
  button:{
    color:'white',
    background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    height:40,
    border: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: 2,
    borderRadius:4,

  },
  deleteButton:{
    color:'white',
    background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    border: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: 1,
    borderRadius:4,
    opacity:0.6,
  },
  containerThumbnails:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin:'auto',
    width:'95%',
    backgroundColor:'transparent'
  },
  containerThumbnailsColumn:{
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    justifyContent: 'center',
    margin:'auto',
    width:'95%',
    backgroundColor:'transparent'
  },
  containerExpanded:{
    width:'80%',
    margin:'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  wrap:{
    position:'relative',  
  },
  close:{
    position:'absolute',
    right:8,
    bottom:-10,  
    zIndex:10,
  },
  imageText:{
    color:'white',
    position:'absolute',
    left:12,
    top:12,  
    zIndex:10,
    opacity:0.8,
  },
  image:{
    position:'relative',  
    padding:10,
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
  },
  image_deleted:{
    position:'relative',  
    padding:10,
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    opacity:0.2,
  },
  image_expanded:{
    position:'relative',  
    padding:0,
    border:10,
    borderStyle:'solid',
    borderColor:'lightGreen',
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    opacity:0.5,
  },
}

class ImageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        deleted:[], 
        expanded:[],
      };
      this.handleDeleteImage = this.handleDeleteImage.bind(this);
      this.handleClickImage = this.handleClickImage.bind(this);
      this.deleteFiles = this.deleteFiles.bind(this);
      this.handleReply = this.handleReply.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    handleDeleteImage = (index) => {
        let found=false
        let deleted = []
        this.state.deleted.forEach(ix => {
            if (ix === index) {
                found=true
            } else {    
                deleted = [...deleted, ix];
            }
        })
        if (!found) {
            deleted=[...this.state.deleted, index]
        }        
        console.log('deleted:', deleted);
        this.setState({deleted});
    }

    handleClickImage(index) {
      let found=false
      let expanded = []
      this.state.expanded.forEach(ix => {
          if (ix === index) {
              found=true
          } else {    
              expanded = [...expanded, ix];
          }
      })
      if (!found) {
        expanded=[...this.state.expanded, index]
      }        
      this.setState({expanded})
    }

    handleReply(data) {
      this.props.fetchListAgain();
      console.log('ERROR: status:', data?data.status:'No data returned')
    }

    deleteFiles() {
        const {list, subdir} = this.props
        const files = this.state.deleted.map(it => list[it])
        const payload = {
          files, 
          subdir, 
        }
        axios.post(apiBaseUrl + '/removeFiles', payload,
        {
          onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total)}
        }
        ).then(response => {
          console.log('Status code:', response.status);
          console.log('Status data:', response.data);
          statusMessage(STATUS_OK, 'OK: images deleted in dir ' + this.props.subdir)
          this.setState({selectedFile: undefined, imagePreviewUrl:undefined, newFileName:undefined, deleted:[]})
          this.props.fetchListAgain();
        }).catch(error => {
          statusMessage(STATUS_ERROR, 'ERROR: Failed to delete images')
          console.log('ERROR: Failed to upload:', error);
        });
    }

    getFilenameAndExtension(pathfilename) {
      var filenameextension = pathfilename.replace(/^.*[\\\/]/, '');
      var filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'));
      var ext = filenameextension.split('.').pop();
      return [filename, ext];
    }

    renderSingleImage(src, index, height, deleteButton) {
      const isDeleted = (index) => this.state.deleted.includes(index)   
      const isExpanded = (index) => this.state.expanded.includes(index)   
      let style = isDeleted(index)?styles.image_deleted:styles.image
      style = (isExpanded(index) && height < 200)?styles.image_expanded:style
      const name = this.getFilenameAndExtension(src)[0]
      return(
        <div style={styles.wrap}>
          {deleteButton?
            <div>
              <span style = {styles.close}>    
                <button className="button" 
                    style={styles.deleteButton}
                    key={index} onClick={()=>this.handleDeleteImage(index)}
                >
                    Delete
                </button>
              </span>
              <span style = {styles.imageText}>    
                {name}
              </span>
            </div>
          :null}  
          <img style={style} 
              height={height}
              src = {src} 
              alt={src}
              onClick={()=>this.handleClickImage(index)}
          /> 
        </div>
      )
    }

    renderImages() {
      const {list, subdir, edit} = this.props;
      const subdirUrl = subdir?apiBaseUrl + (subdir.charAt(0)==='/'?'':'/') + subdir:'./'
      const images = list?subdirUrl?list.map(it => subdirUrl + '/' + it):[]:[]
      const deleteButton = edit;
      return(
        list?subdirUrl?
          <div>
            {this.state.deleted.length > 0?
              <button className="button" style={styles.button} onClick={this.deleteFiles}>Remove deleted files from disk</button>
            :null}
            <div style = {styles.containerThumbnails} >
                {images.map((it, index) => this.renderSingleImage(it, index, 140, deleteButton))}
            </div>
            {this.state.expanded.length > 0?
              this.state.expanded.map((ix) => 
                <div style={styles.containerExpanded}>
                  {this.renderSingleImage(images[ix], ix, 800, false)}
                </div>
              )
            : 
              null
            }  
          </div>
        :  
          <h2>No sub-directory found</h2>    
        :  
          <h2>No list in calling parameters</h2>    
      )
    }                

    render() {
      return(this.renderImages())
    }
}

export default ImageList;    
    
    