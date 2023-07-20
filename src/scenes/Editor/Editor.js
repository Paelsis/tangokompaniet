import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

const styles = {
    root: {color: 'purple',
        margin: '0 auto',
        height:'40vh',
        width:'80vw',
        backgroundColor: 'lightpink',
        border:'1px solid purple',
    }
}


export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
  }
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }


  render() {
    return (
        <div style={styles.root} >
        <button className="button" onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor editorState={this.state.editorState} 
        handleKeyCommand={this._handleKeyCommand}
        onChange={this.onChange} />
        </div>
    );
  }
}

