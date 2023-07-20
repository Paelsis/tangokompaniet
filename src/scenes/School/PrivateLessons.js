import React from 'react';
import TextShow from 'Components/Text/TextShow'
import ContactList from 'scenes/Contact/ContactList'

const styles = {
  root:{
    padding:'5%',
  },
  container:{
    position:'relative',
    display:'flex',
    flexWrap:'wrap',
    alignItems:'flex-start',
    justifyContent:'space-evenly',
  },
  text:{
    flex:1,
    minWidth:200,
    padding:'2%',
  },
  heading:{
    textAlign:'center',
  }
};

const PrivateLessons = () => 
  <div style={styles.root}>
    <div style={styles.container}>
      <TextShow url={'/getTexts'} style={styles.text} groupId={'PrivateLessons'} textId={'General'} />
      <TextShow url={'/getTexts'} style={styles.text} groupId={'PrivateLessons'} textId={'Prices'} />
    </div>
    <TextShow url={'/getTexts'} style={styles.heading} groupId={'PrivateLessons'} textId={'Teachers'} />
    <ContactList privateLessons={true} />
  </div>        

export default PrivateLessons    