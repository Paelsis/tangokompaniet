import React from 'react';
import GetTableView, {header, VIEW_1} from 'Settings/UtilsMap';
import groupBy from 'functions/groupBy';

const GetMap = ({language, list, groupByDef, viewFields, open, handleOpen, handleChange, handleChangeValue, edit, toggleEdit}) => {
    console.log('GetMap: groupByDef:', groupByDef);
    //console.log('GetMap: open', open);
    let fieldMap = groupBy(list.sort((a,b) => a.productId - b.productId), it => it[groupByDef.groupByField]);
   
    return(
        <div>   
            {Array.from(fieldMap.keys()).map(key =>  
                <div key={key}>
                    {header(fieldMap.get(key)[0], 
                        groupByDef.headerFields, 
                        language, 
                        fieldMap.get(key).length, 
                        fieldMap.get(key).filter(it => it.leader?it.leader == 1:false).length, 
                        fieldMap.get(key).filter(it => it.leader?it.leader == 0:false).length,
                        open[key], 
                        ()=>handleOpen(key), 
                        groupByDef.headerProps)}                 
                    {open[key]?<GetTableView
                        view={VIEW_1}
                        list={fieldMap.get(key)} 
                        viewFields = {viewFields}
                        handleChange = {handleChange} 
                        handleChangeValue = {handleChangeValue} 
                        edit={edit} 
                        toggleEdit={toggleEdit}
                        language={language} />
                     :
                        null
                    }
                </div>    
            )}
        </div>
    )
}

export default GetMap
