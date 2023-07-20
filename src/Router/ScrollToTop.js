import React, {Component} from 'react';
import { useNavigate } from 'react-router'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
    }
  
    render() {
      return this.props.children
    }
}

export default ScrollToTop