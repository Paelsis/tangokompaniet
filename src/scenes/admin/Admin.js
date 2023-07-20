import React, {Component, useContext, useState,  useEffect} from 'react';
import {connect } from 'react-redux'
import {Navigate} from "react-router-dom"
import LoginSimple from 'login/LoginSimple';
import {regList, scheduleList, orderList, tableList, cameraList} from './AdminConfig'
import SimpleMenu from './SimpleMenu'
import TableShow from 'Components/Table/TableShow'
import TableEdit from 'Components/Table/TableEdit'
import ProductsShow from 'scenes/Shop/Products/ProductsShow'
import ProductsEdit from 'scenes/Shop/Products/ProductsEdit'
import concatinateImagesToProducts from 'scenes/Shop/Products/concatinateImagesToProducts'
import tkColors from 'Settings/tkColors'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'
import UndoIcon from '@material-ui/icons/Undo'
import CloseIcon from '@material-ui/icons/Close';
import {LANGUAGE_SV} from 'redux/actions/actionsLanguage'
import {setUser, LOGGED_IN_FLAG, USERNAME, PASSWORD} from 'redux/actions/actionsUser'
import {AuthContext} from "login/FirebaseAuth"



const TEXTS = {
    'EDIT_LABEL_OFF': {
        'SV':'Editera',
        'ES':'Editar',
        'EN':'Edit' 
    },    
    'EDIT_LABEL_ON': {
        'SV':'Lämna editering',
        'ES':'Dejar editar',
        'EN':'Leave edit mode' 
    },    
}



const styles={
    container:{
        display:'block',
        overflow:'hidden',
    },
    menuContainer:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    menuItem:{
        flex:1,
        fontSize:'large',
    },
    headerItem:{
        flex:2,
        fontSize:'large',
    },
    table:{
        display:'block',
        position:'relative',
        overflow:'auto'
    },
}




// More components
const Admin = props => {
    const [table, setTable] = useState(undefined) 
    const [view, setView] = useState(undefined) 
    const [edit, setEdit] = useState(false) 
    const menuList1 = regList.map(it => it['title' + props.language])
    const menuList2 = scheduleList.map(it => it['title' + props.language])
    const menuList3 = orderList.map(it => it['title' + props.language])
    const menuList4 = tableList.map(it => it['title' + props.language])
    const menuList5 = cameraList.map(it => it['title' + props.language])
    const color = props.globalStyle.color
    const {user} = useContext(AuthContext)

    useEffect(()=>
    {
              props.setUser(USERNAME, localStorage.getItem(USERNAME))
              props.setUser(PASSWORD, localStorage.getItem(PASSWORD))
              props.setUser(LOGGED_IN_FLAG, localStorage.getItem(USERNAME)!==null?true:false)      
    }, [])    

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const editTable = () =>
    <>  
        &nbsp;&nbsp;
        <span style={{color, fontSize:18}}>{table['title' + props.language]}</span>
        <Tooltip title={'Leave edit mode'}> 
            <IconButton onClick={toggleEdit}>
                <CloseIcon style={{color}}/>
            </IconButton>
        </Tooltip>    
        <TableEdit 
            table={table.name}
            username={props.username}
            password={props.password} 
            language={props.language}
            sortBy={table?table['sortBy']?table['sortBy']:undefined:undefined}
            button={table?table['button']?table['button']:undefined:undefined}
            note={table?table['note']?table['note']:undefined:undefined}
            handleSave={()=>setEdit(false)}
            url={table?table['url']?table['url']:'/admin/tktable?tableName=' + table.name:'/admin/tktable?tableName=' + table.name}
        />          
    </>

    const showTable = () =>
    <>
        &nbsp;&nbsp;
        <span style={{color, fontSize:18}}>{table['title' + props.language]}</span>
        <Tooltip title={'Enter edit mode'}> 
            <IconButton onClick={toggleEdit}>
                <EditIcon style={{color}}/>
            </IconButton>
        </Tooltip>    
        <TableShow 
            table={table.name}
            username={props.username} 
            password={props.password} 
            language={props.language}
            sortBy={table?table['sortBy']?table['sortBy']:undefined:undefined}
            button={table?table['button']?table['button']:undefined:undefined}
            url={table?table['url']?table['url']:'/admin/tktable?tableName=' + table.name:'/admin/tktable?tableName=' + table.name}
        />        
    </>

    
    const productsView = () => 
        edit?
            <ProductsEdit 
                username={props.username} 
                password={props.password} 
                url1={'/admin/tktable?tableName=tbl_products'} 
                url2={'/shopImages?dirname=images/shop/'}   
                table={table.name}
                concatinateLists={concatinateImagesToProducts}
            />
        :
            <ProductsShow 
                username={props.username} 
                password={props.password} 
                url1={'/admin/tktable?tableName=tbl_products'} 
                url2={'/shopImages?dirname=images/shop/'} 
                concatinateLists={concatinateImagesToProducts}
            />
    
    const tableEditOrShow = () =>  edit?editTable():showTable()

    const renderViewOrTable = () => {
        return(
            view?
                view.component
            :table?
                table.name==='tbl_products'?productsView():tableEditOrShow()
            :null               
        )
    }
    return (
            process.env.REACT_APP_FIREBASE_API_KEY !== undefined && user === null?<Navigate to="/firebaseSignin"/>
            :process.env.REACT_APP_FIREBASE_API_KEY === undefined && !props.loggedInFlag && user === null?<LoginSimple />
            :
                <div style={styles.container}>
                    <div style={styles.menuContainer}>
                        <div style={styles.menuItem}>
                            <SimpleMenu
                                language={props.language}
                                title={props.language===LANGUAGE_SV?'Anmälningar':'Registrations'}
                                menuList = {regList} 
                                handleClick={index => {setView(regList[index]); setTable(undefined)}} 
                            /> 
                            <SimpleMenu
                                language={props.language}
                                title={props.language===LANGUAGE_SV?'Schemaläggning':'Schedule'}
                                menuList = {scheduleList} 
                                handleClick={index => {setView(scheduleList[index]); setTable(undefined)}}
                            /> 
                            <SimpleMenu
                                language={props.language}
                                title={props.language===LANGUAGE_SV?'Shoppen':'Shop'}
                                menuList = {orderList} 
                                handleClick={index => {setView(orderList[index]); setTable(undefined)}}
                            /> 
                            <SimpleMenu
                                language={props.language}
                                title={props.language===LANGUAGE_SV?'Tabeller':'Tables'}
                                menuList = {tableList} 
                                handleClick={index => {setEdit(false); setTable(tableList[index]); setView(undefined); }}
                            /> 
                            <SimpleMenu
                                language={props.language}
                                title={props.language===LANGUAGE_SV?'Bilder':'Images'}
                                menuList = {cameraList} 
                                handleClick={index => {setView(cameraList[index]); setTable(undefined)}}
                            /> 
                        </div>
                    </div>


                    <div style={styles.table}>
                        {renderViewOrTable()}
                    </div>
                </div>

    )    
}   
  // More components


const mapStateToProps = (state) => {
    const username = state.user.username
    const password = state.user.password
    const loggedInFlag = state.user[LOGGED_IN_FLAG]
    return {
        username,
        password,
        loggedInFlag,
        language: state.language,
        globalStyle: state.style
    }
}    

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (key, value) => {dispatch(setUser(key, value))},
    }        
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);    
