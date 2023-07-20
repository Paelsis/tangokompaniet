import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {tkColors} from 'Settings/tkColors'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const styles = {
  root:{
        padding:0,
        backgroundColor:'transparent',
        color: tkColors.color,
        borderRadius:8
  },
  menuStyle:{
        // backgroundColor:'transparent',
        color: tkColors.backgroundColor,
        borderRadius:8
  },
  listStyle:{
    color:'white',
  },
  iconStyle: { 
          //backgroundColor:'yellow',
  },
  labelStyle: { 
      backgroundColor:tkColors.Purple.Light,
      color: tkColors.background, // Color of label text
  },
}

const Value = (language, size, heel) =>
  (
    language===LANGUAGE_SV?'Storlek:' + size + ' Klackhöjd:' + heel
    :language===LANGUAGE_ES?'Tamano' + size + ' Altura del tacón' + heel
    :'Size:' + size + ' Heel height:' + heel
  )

const SizePicker = ({value, inv, onChange, language}) => {
    return (
      <div>
          {inv?  
            <DropDownMenu 
              value={value} 
              onChange={onChange}
              menuStyle={styles.menu} 
              labelStyle={styles.labelStyle} 
              iconStyle={styles.iconStyle} 
              listStyle={styles.list}
              backgroundColor={tkColors.Purple.Light}
              maxHeight={300} 
              primaryText={'Pick size'}
            >
              <MenuItem 
                value={value} 
                key={0} 
                primaryText={
                  language===LANGUAGE_SV?'Välj storlek och klackhöjd här' 
                  :language===LANGUAGE_ES?'Elige el tamaño y la altura aquí' 
                  :'Pick size and heel height here'
                }
                disabled={true} 
              />
              {
                  inv.map((it, index) => (
                    <MenuItem key={index+1} value={Value(language,it.size,it.heel)} primaryText={'Size:' + it.size + ' Heel height: ' + it.heel + ' cm'} />
                  ))
              }
            </DropDownMenu>
        :
          null}
      </div>
    );
}

export default SizePicker