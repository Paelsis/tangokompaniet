import React from 'react';
import EditText from 'Components/Text/EditText'

const styles = {
  columns: {
    display:'flex',
    flexWrap:'wrap',
    alignItems:'flex-start',
    justifyContent:'space-evenly',
  },
  text:{
    position:'relative',
    maxWidth:600,
  }
};

const DanielNews = () => 
<div style={styles.columns}>
    <EditText url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column1'} />
    <EditText url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column2'} />
    <EditText url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column3'} />
</div>        

export default DanielNews    