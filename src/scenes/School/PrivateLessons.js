import React from 'react';
import EditText from 'Components/Text/EditText'
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
      <EditText url={'/getTexts'} style={styles.text} groupId={'PrivateLessons'} textId={'General'} />
      <EditText url={'/getTexts'} style={styles.text} groupId={'PrivateLessons'} textId={'Prices'} />
    </div>
    <EditText url={'/getTexts'} style={styles.heading} groupId={'PrivateLessons'} textId={'Teachers'} />
    <ContactList privateLessons={true} />
  </div>        

export default PrivateLessons    