import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
const cremeDePeche='#F5D6C6'
const color = grey[900] 
const background = '#f4f1f2' // '#f2e6e9' // #FAFAFA'
export const defaultGradientBackground = 'linear-gradient(45deg, #81185B 0%,  #610a41 100%)'

export const tkColors = {
    color,
    background, 
    border:color,
    icon:'#81185B',
    black:'#2b2523',


    Home:{
        color:grey[700],
        background,
    },
    AppBar:{
        color:'white',
        background:"#81185B",
    },
    Button:{
        color:background,
        backgroundColor:"#81185B"
    },
    Text:{
        Dark:color,
        Light:background,
    },
    Beige:{
        Light:'#f4f1eb',
        Dark:'#e3dac9',
    },    
    Purple:{ // Default
        Light: "#81185B", // rgba(128,24,91, 1.0)
        Dark: "#610A41", // rgba(89,00,57, 1.0)
    },
    Olive:{ 
        Light: '#445626',
        Dark: '#222B13',
    },
    Easter:{ // Easter (orange)
        Light: "#D08E1F",
        Dark: "#C17E2F",
    },
    Festivalito:{ // Festivalito (red)  
        Light: "#871A21",
        Dark: "#711A1C",
    },
    Marathon:{ // Winter Marathon (turquoise)
        Light: "#05737A",
        Dark: "#026368",
    },
    Summer:{ // Summer (green)
        Light: "#8a973b",
        Dark: "#768438",
    },
    Weekend:{ // Summer (green)
        Light: "blue",
        Dark: "darkBlue",
    },
    Default:{ // Summer (green)
        Light: "darkPurple",
        Dark: "purple",
    },
}

export function linearGradient(c1, c2) {
    return('linear-gradient(45deg, ' + c1 + ' 0%, ' + c2 + ' 100%)')
}

export const boxShadowValue = (color) => {
    return('0 13px 27px -5px ' + color);
}

export default tkColors;