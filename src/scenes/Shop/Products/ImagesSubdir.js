import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import Images from './Images'

export default class ImagesSubdir extends Component {
    static propTypes = {
        subdir: PropTypes.string,
    };
    
    constructor() {
        super();
        this.state = {subdir:'', showImages:false};
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }    

    handleChange = (e) => {
        this.setState({subdir:e.target.value, showImages:false})
    }      
    
    onSubmit = (e) =>  {
        this.setState({showImages:true})
        e.preventDefault()
    }

    render = () => {
        console.log('subdir:', this.state.subdir);
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='string' name='subdir' onChange={e=>this.handleChange(e)} placeholder={'Enter a valid sub-directory'} />
                    &nbsp;<input type={'submit'} style={{background:'orange'}} value='Click to show sub-directory' />
                </form>
                {this.state.showImages?
                    <Images subdir={this.state.subdir} />
                :
                    <h4>Fill in sub-directory and click on button ...</h4>    
                }    
            </div>
        )
    }
}
    
    


