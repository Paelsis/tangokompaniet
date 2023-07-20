import React from 'react';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';

const TEXTS={
  NOT_LOADED:{
    SV:'Sidan kunde ej laddas !',
    ES:'Page could not be loaded',
    EN:'Page could not be loaded',
  }
}

class _CircularProgressTerminate extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 100 : completed + 1 });
  };

  render() {
    const { text } = this.props;
    return (
      <div>
        {this.state.completed === 100?<h2 style={{textAlign:'center'}}>{text?text:TEXTS.NOT_LOADED['SV']}</h2>
        :
          <CircularProgress stylre={{color:this.props.globalStyle.color}} />
      }  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globalStyle:state.style
  }
}

export default connect(mapStateToProps)(_CircularProgressTerminate)

