import React from 'react';
import TextShow from 'Components/Text/TextShow'

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
    <TextShow url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column1'} />
    <TextShow url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column2'} />
    <TextShow url={'/getTexts'} style={styles.text} groupId={'DanielNews'} textId={'Column3'} />
</div>        

export default DanielNews    