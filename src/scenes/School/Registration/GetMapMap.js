import React from 'react';
import MapMapHeader from './MapMapHeader'
import groupBy from 'functions/groupBy';
import compareByMultiple from 'functions/compareByMultiple';

const sortList = (list, sortField) => { 
    return sortField?list.length>0?list[0][sortField]?list.sort((a,b) => a[sortField].localeCompare(b[sortField]))
        :list:list:list
}   

// Recursive groupBy (GetMapMap is called recursively)
const GetMapMap = (props) => {
    const ViewComponent = props.viewComponent
    const idx=props.index?props.index:0;
    const lastIdx = props.groupByDefArr.length-1
    const groupByDef=props.groupByDefArr[idx]?props.groupByDefArr[idx]:undefined
    const groupByField=groupByDef?groupByDef.groupByField:undefined;
    const headerFields=groupByDef?groupByDef.headerFields:undefined;
    const headerSortBy=groupByDef?groupByDef.headerSortBy:undefined;
    const headerProps=groupByDef?groupByDef.headerProps:null;
    console.log('groupByDef:', groupByDef)
    console.log('groupByField:', groupByField)
    console.log('headerFields:', headerFields)
    let filterList = props.list
    const fieldMap = groupByField?groupBy(filterList, it => it[groupByField]?it[groupByField].replace(/\s+/g, ''):it):null;
    let singleOpen=[...fieldMap.keys() ].find(key=>props.open[idx][key]);
    const handleOpen = (idx, key) => {
        props.sortStateListByKey(headerSortBy)
        props.handleOpen(idx, key)    
    }
    // If one menu is open, the other options at the same level shall be hidden
    return(
        <div>   
            <div>
                {Array.from(fieldMap.keys()).map(key =>  
                <div key={key}>
                    {!singleOpen||props.open[idx][key]?
                        <MapMapHeader 
                            list={fieldMap.get(key)}
                            headerFields={headerFields}
                            language={props.language} 
                            open={props.open[idx][key]} 
                            handleOpen={()=>handleOpen(idx, key)} 
                            headerProps={headerProps} 
                        />
                    :
                        null
                    }                 
                    {props.open[idx][key]?idx < lastIdx?
                        <GetMapMap {...props} list={fieldMap.get(key)} index={idx+1}/>
                    :props.viewComponent?
                        <ViewComponent {...props} list={fieldMap.get(key)} />
                    :
                        <h1>No viewComponent in props for MapMap function</h1>                           
                    :null}    
                </div>    
                )}
            </div>
        </div>
    )
}

export default GetMapMap
