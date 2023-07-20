import React from 'react';
import GetTableView, {VIEW_1, VIEW_2} from 'Settings/UtilsMap';
import MapMapHeader from './MapMapHeader'
import groupBy from 'functions/groupBy';

// Recursive groupBy (GetMapMap is called recursively)
const GetMapMapViewAll = (props) => {

    const idx=props.index?props.index:0;
    const groupByDef=props.groupByDefArr[idx]?props.groupByDefArr[idx]:null
    const groupByField=groupByDef?groupByDef.groupByField:undefined;
    const headerFields=groupByDef?groupByDef.headerFields:undefined;
    const headerSortBy=groupByDef?groupByDef.headerSortBy:undefined;
    const headerProps=groupByDef?groupByDef.headerProps:undefined;
    console.log('groupByDef:', groupByDef)
    console.log('groupByField:', groupByField)
    console.log('headerFields:', headerFields)
    console.log('headerProps:', headerProps)
    const filterList = props.productType?props.list.filter(it => it.productType===props.productType):props.list;
    const fieldMap = groupByField?groupBy(filterList.sort((a,b) => a[groupByField] - b[groupByField]), it => it[groupByField].replace(/\s+/g, '')):null;
    // If one menu is open, all other options at the same level shall be hidden
    let oneOpen=[...fieldMap.keys() ].find(key=>props.open[idx][key]);
    return(
        <div>   
            <div>
                {Array.from(fieldMap.keys()).map(key =>  
                    <div key={key}>
                        <MapMapHeader 
                            list={fieldMap.get(key)} 
                            headerFiellds={headerFields}
                            language={props.language} 
                            open={props.open[idx][key]} 
                            handleOpen={()=>props.handleOpen(idx, key)} 
                            headerProps={headerProps} 
                        />
                        <div>
                            {idx < props.groupByDefArr.length-1?
                                <GetMapMapViewAll {...props} list={fieldMap.get(key)} index={idx+1}/>
                            :   
                                props.viewComponent({...props, list:fieldMap.get(key).sort((a,b)=>compareByMultiple(a,b, listSortBy))})
                            }
                        </div>
                    </div>    
                )}
            </div>
        </div>
    )
}

export default GetMapMapViewAll
