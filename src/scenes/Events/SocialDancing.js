import React from 'react';
import EditText from 'Components/Text/EditText'

const styles={
        root:{
                width:'90%',
                maxWidth:1000,
                margin:'auto'                
        },
}

export default () =>  
<div style={styles.root}>
    <EditText style={styles.root} url={'/getTexts'} groupId={'Weekly'} textId={'Text'}/> 
</div>
      