import React, {Component} from 'react';
import { connect } from 'react-redux'
import Menu from './Menu'
import TextShow from 'Components/Text/TextShow';
import {BannerWithHeader} from 'Settings/tkBanner'
import {setGlobalStyle} from 'redux/actions/actionsStyle'
import tkColors, {defaultGradientBackground} from 'Settings/tkColors'

const styles = {
  root: {
    position:'relative',
    maxWidth:1000, 
    marginRight:'auto',
    marginLeft:'auto',
    fontSize:15,
    fontWeight:500,
  },
  banner:{
    position:'relative',
  },
  container:{
    display:'flex', 
    // width:'100%', 
    flexFlow:'row wrap',
    justifyContent:'space-between'
  },
  menu:{
    fontSize:10,
    position:'relative',
    width:'23%',
    maxWidth:200, 
    zIndex:1,
    marginRight:'1%',
    marginLeft:'1%',
  },
  text: {
    width:'72%',
    //display:'inline', 
    marginLeft:'2%',
    marginRight:'1%',
  },
  component: {
    minWidth:500,
    margin:'auto',
  }
}

// More components
class _Event extends Component {
  constructor() {
      super();
      this.state = { openIndex:0 };
      this.handleClick = this.handleClick.bind(this);
    }

   // Immediately after a component is mounted, fetch inventory
  componentDidMount () {
    this.props.setColors(this.props.style.color, this.props.style.background)
  }

  componentWillUnmount() {
    this.props.setColors(tkColors.Purple.Light, defaultGradientBackground)
  }

  handleClick = (e, openIndex) => {
    e.preventDefault();
    console.log('handleClick:', openIndex)
    this.setState({openIndex}) 
  }  


  render() {
    const menuList = this.props.menuList
    const obj = menuList[this.state.openIndex]
    const groupId = this.props.groupId?this.props.groupId:this.props.eventType
    const menuStyle = this.props.style?{...this.props.style, color:tkColors.background}:{}
    const event = this.props.list.find(it => it.eventType === this.props.eventType && it.dateRange === this.props.dateRange)
    const bannerTitle = event?event['name' + this.props.language]:this.props.eventType
    // const groupId=eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase()   PGE PGE PGE PGE
    //console.log('eventType', eventType, ' textId', obj.textId, ' openIndex', this.state.openIndex, ' registrationKey:', registrationKey);
    return(
      <div style={styles.root}>
          <div style={styles.banner}>
            <BannerWithHeader text={bannerTitle} banner={this.props.banner} photographer={this.props.photographer?this.props.photographer:undefined} />
          </div>  
          <div style={styles.container}>
            <div style={styles.menu}>
              {menuList?<Menu menuList={menuList} openIndex={this.state.openIndex} handleClick={this.handleClick} style={menuStyle} />:'No menuList'}
            </div>
            <div style={styles.text}>
             <TextShow url={'/getTexts'} groupId={groupId} textId={obj.label?obj.label:'None'} style={{color:this.props.style.color}} />
            </div>
            {obj.registrationComponent?
              <div style={styles.component}>
                {obj.registrationComponent} 
              </div>
            :
              null
            }
          </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    language: state.language,
    list: state.eventSchedule.list,
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
      setColors: (color, background) =>  {dispatch(setGlobalStyle({color, background}))},
  })        
}

export default connect(mapStateToProps, mapDispatchToProps)(_Event)








