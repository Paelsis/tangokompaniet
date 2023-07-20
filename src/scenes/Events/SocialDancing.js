import React from 'react';
import TextShow from 'Components/Text/TextShow'

const styles={
        root:{
                width:'90%',
                maxWidth:1000,
                margin:'auto'                
        },
}

export default () =>  
<div style={styles.root}>
    <TextShow style={styles.root} url={'/getTexts'} groupId={'Weekly'} textId={'Text'}/> 
</div>
      