import React, {Component, useState} from 'react';
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { withBreakpoints } from 'react-breakpoints'
import HomeMenu from './HomeMenu';
import Drawer from 'material-ui/Drawer';
//import MenuItem from 'material-ui/MenuItem';
import {MenuItem} from '@material-ui/core'
import NestedMenuItem from "material-ui-nested-menu-item"
import Divider from 'material-ui/Divider'
import tkColors from 'Settings/tkColors'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage' 

const styles = {
    home: isHome => ({
        position:'relative',  
        top:50,  
        paddingLeft:isHome?0:'10%', 
        paddingRight:isHome?0:'10%',
        width:isHome?'100%':'80%',
    }),
    containerStyle: (top) => ({
        top,   
        //background:'#590029',    //'linear-gradient(135deg, #590029 20%, #D1188B 80%)',
        backgroundColor: tkColors.black,
        opacity:0.85,
        overflowY: 'auto',
    }), 
    menuItem: {
        textAlign: 'left',
        inverse: false,
        color: 'white',   // Text color of the menu items
        opacity:0.85,
    },
    submenuItem: {
        textAlign: 'left',
        inverse: false,
        background:tkColors.Text.Light,
        color: tkColors.black,   // Text color of the menu items
        opacity:0.85,
    },
    divider: {
        backgroundColor: 'white',
        // color:'white',
        opacity:0.8,
    }  
}
/*
<Menu
open={!!menuPosition}
onClose={()=>setMenuPosition(null)}
anchorReference={"anchorPosition"}
anchorPosition={menuPosition}
>
        </Menu>

*/

const TEXTS = {
    CLASSES:{
        SV:'Danskurser',
        EN:'Dance courses',
        ES:'Clases de baile',
    },
    REGISTRATION:{
        SV:'Kursanmälan',
        EN:'Registration to courses',
        ES:'Inscripcoón cursos de baile',
    },
    FESTIVALITO:{
        SV:'Festivalito',
        EN:'Festivalito',
        ES:'Festivalito',
    },
    FESTIVALS_AND_MARATHON:{
        SV:'Festivaler och Maraton',
        EN:'Festivals and Marathon',
        ES:'Festivals e Maratón',
    },
    MARATHON:{
        SV:'Maraton',
        EN:'Matrathon',
        ES:'Maratón',
    },
    EASTER:{
        SV:'Påskvestival',
        EN:'Easter festival',
        ES:'Festival de Pasqua',
    },
    SUMMER:{
        SV:'Sommar',
        EN:'Summer',
        ES:'Verano',
    },
    WEEKEND:{
        SV:'Helgkurs',
        EN:'Weekend course',
        ES:'Curso de fin de semana',
    },
    SOCIAL:{
        SV:'Social dans',
        EN:'Social dancing',
        ES:'Baile social',
    },
    PRIVATE:{
        SV:'Privatlektioner',
        EN:'Private lessons',
        ES:'Clases de privado',
    },
    COMPANIES:{
        SV:'Företagsarrangemang', 
        EN:'Arrangments for companies',
        ES:'Arreglos corpoprativos',
    },
    SHOW:{
        SV:'Show/Uppvisning', 
        EN:'Dance performance',
        ES:'Espectaculo de danza', 
    },
    TEACHERS:{
        SV:'Lärare',
        EN:'Teachers',
        ES:'Mestro',
    },
    DANIEL:{
        SV:'Nyheter från Daniel',
        EN:'News from Daniel', 
        ES:'Noticias de Daniel',
    },
    COVID:{
        SV:'COVID-19',
        EN:'COVID-19',
        ES:'COVID-19',
    },    
    VOCABULARY:{
        SV:'Vocabulär',
        ES:'Vocabulary', 
        EN:'Vocabulario',
    },
    CLOSE:{
        SV:'Stäng meny',
        EN:'Close menu',
        ES:'Cerrar menú', 
    },
}

const DrawerMenu = ({redirectLink, language, list}) => {
    const [menuPosition, setMenuPosition] = useState(null)
    
    const handleItemClick = (link) => {
        setMenuPosition(null);
        redirectLink(link)
    }
    return(
        <>
            <MenuItem 
            style={styles.menuItem} 
            onClick={()=>handleItemClick("/course")}
            >
                {TEXTS.CLASSES[language]}
            </MenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/scheduleCourse")}
            >
                {TEXTS.REGISTRATION[language]}
            </MenuItem>

            <NestedMenuItem
                style={styles.menuItem} 
                label={TEXTS.FESTIVALS_AND_MARATHON[language]}
                parentMenuOpen={!!menuPosition}
                onClick={e=>setMenuPosition({top:e.pageY, left:e.pageX})}
            >
                {list.filter(sc=>sc.menu2).map((it, index) => 
                    <MenuItem key={index}
                        onClick={()=>handleItemClick(it.link /*+ '/' + it.dateRange*/)}>
                        {it['name' + language]}
                    </MenuItem>
                )}
            </NestedMenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick('/social')}
            >
                {TEXTS.SOCIAL[language]}
            </MenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/privatelessons")}
            >
                {TEXTS.PRIVATE[language]}
            </MenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/companies")}
            >
                {TEXTS.COMPANIES[language]}
            </MenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/show")}
            >
                {TEXTS.SHOW[language]}
            </MenuItem>
            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/contactlist")}
            >
                {TEXTS.TEACHERS[language]}
            </MenuItem>

            <MenuItem 
                style={styles.menuItem} 
                onClick={()=>handleItemClick("/vocabulary")}
            >
                {TEXTS.VOCABULARY[language]}
            </MenuItem>

            <Divider style={styles.divider} />

            <MenuItem 
                style={styles.menuItem} 
                onMouseOver={()=>handleItemClick(undefined)}
            >
                {TEXTS.CLOSE[language]}
            </MenuItem>
        </>    

    )
}

/*
    <MenuItem 
        style={styles.menuItem} 
        onClick={()=>handleItemClick("/danielnews")}
    >
        {TEXTS.DANIEL[language]}
    </MenuItem>

    <MenuItem 
    style={styles.menuItem} 
    onClick={()=>handleItemClick("/covid19")}
    >
    {TEXTS.COVID[language]}
    </MenuItem>
*/

const HomeMenuWithDrawer = props => {
    const [open, setOpen] = useState(false)
    const {language, style, breakpoints, currentBreakpoint} = props
    const force = breakpoints[currentBreakpoint] >= breakpoints.mobileLandscape;
    const location = useLocation()
    const isHome = location.pathname === '/home' || location.pathname === '/'
    const gtMobile = breakpoints[currentBreakpoint] > breakpoints.mobile;
    const background=style.background;
    const height = isHome?90:18
    const menuPosition = gtMobile?50:0
    const navigate = useNavigate()

    const redirectLink = link => {
        if (link!==undefined) {
            setOpen(false)
            navigate(link);
        } else {
            setOpen(!open)
        }   
    }

    return(
        force || isHome?
            <div style={styles.home(isHome)}> 
                <HomeMenu 
                    height={height} 
                    language={language} 
                    background={background}
                    handleClick = {(link)=>redirectLink(link)} 
                    handleMouseOver={open=>setOpen(open)}
                />
                <Drawer containerStyle={styles.containerStyle(menuPosition)} open={open} >
                    <DrawerMenu redirectLink={redirectLink} list={props.list} language={props.language}/>
                </Drawer>
            </div>
        :
            null    
    )    

}

const mapStateToProps = state => {
    return {
      language: state.language,
      list: state.eventSchedule.list,
      style: state.style,
    }
}

/*
                <MenuItem 
                    onClick={()=>handleItemClick("/easter")}>
                    {TEXTS.EASTER[language]}
                </MenuItem>
                <MenuItem 
                    onClick={()=>handleItemClick("/summer")}>
                    {TEXTS.SUMMER[language]}
                </MenuItem>
                <MenuItem 
                    onClick={()=>handleItemClick("/festivalito")}>
                    {TEXTS.FESTIVALITO[language]}
                </MenuItem>
                <MenuItem 
                    onClick={()=>handleItemClick("/malmotangomaraton")}>                           
                    {TEXTS.MARATHON[language]}
                </MenuItem>
                <MenuItem 
                    onClick={()=>handleItemClick("/weekend")}>                           
                    {TEXTS.WEEKEND[language]}
                </MenuItem>
*/

export default withBreakpoints(connect(mapStateToProps)(HomeMenuWithDrawer))

