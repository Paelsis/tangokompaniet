import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {tkColors} from 'Settings/tkColors'
import groupBy from 'functions/groupBy'
import {addFilterKey} from 'redux/actions/actionsFilterKeys.js'
import {LANGUAGE_SV, LANGUAGE_EN, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

export const RemoveDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(it => it[prop]).indexOf(obj[prop]) === pos;
    }
  );
}

export const FilterList = (list, filterKeys) => {
  let newList = list.map((it, index) => {return({...it, index})});
  Object.entries(filterKeys).map((obj) => 
    newList = newList.filter(product => product[obj[0]]===obj[1])
  )
  return newList;
}

const styles={
  root:{
    // display: 'flex',
    justifyContent: 'center',
    //    alignItems: 'center',
  },
  disabled:{
    backgroundColor:tkColors.background,
    color:tkColors.Purple.Light
  },    
  enabled:{
    backgroundColor:tkColors.Purple.Light,
    color:tkColors.background,
  },    
}

const mapStateToProps = (state, ownProps) => {
  return {
    filterKeys: state.filterKeys,
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addFilterKey: (e) => { dispatch(addFilterKey(e.target.name, e.target.value)) }
  }
}

const Filter = ({label, name, list, filterKeys, addFilterKey, language}) => {
  let groupedMap = groupBy(list?list:[], it => it[name]?it[name]:'undefined');
  let keys =[ ...groupedMap.keys() ].sort((a, b)=>a.name - b.name);
  let value=filterKeys[name]?filterKeys[name]:'undefined';
  return(
      <select style={value==='undefined'?styles.disabled:styles.enabled} name={name} value={value} onChange={(e)=>addFilterKey(e)}> 
        <option style={styles.disabled} value={'undefined'} disabled={true}>{label}</option>)}
        <option style={styles.disabled} value={'undefined'} >{language===LANGUAGE_SV?'Inget filter':language===LANGUAGE_ES?'Sin filtro':'No filter'}</option>)}
        {keys.map((it, index) => <option style={styles.enabled} value={it}>{it}</option>)}
      </select>        
  )
}

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
}

const ProductFilterNew = connect(
  mapStateToProps,
  mapDispatchToProps
) (Filter)

export default ProductFilterNew
