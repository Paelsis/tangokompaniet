

const config_LOCAL = {
    'development':{
        baseUrl:'http://localhost:3000',
        apiBaseUrl:'http://tk.local:8080',
        bamboraUrl:'//api.v1.checkout.bambora.com/sessions',
    }, 
    'production': {
        baseUrl:'https://nyasidan.tangokompaniet.com',
        apiBaseUrl:'https://nyasidan.tangokompaniet.com/app/slim/public',
        bamboraUrl:'//api.v1.checkout.bambora.com/sessions',
    }        
}

const config = {
    'development':{
        baseUrl:'http://localhost:3000',
        apiBaseUrl:'http://tk.local:8080',
        bamboraUrl:'//api.v1.checkout.bambora.com/sessions',
    }, 
    'production': {
        baseUrl:process.env.REACT_APP_BASE_URL,
        apiBaseUrl:process.env.REACT_APP_API_BASE_URL,
        bamboraUrl:process.env.REACT_APP_BAMBORA_URL,
    }        
}

//Daniels Tangokompaniet calendar
export const CALENDAR={
    SOCIAL:{
        calendarId:'tangokompaniet@gmail.com',
        apiKey:'AIzaSyB0EBiE8xd5ItS59IahMyficWWAanHhMzU' ,
    },
    CLASSES:{
        calendarId:'bqe9eg652nsbnbsbf14vceevmc@group.calendar.google.com',
        apiKey:'AIzaSyB0EBiE8xd5ItS59IahMyficWWAanHhMzU' ,
    },
    TEACHER:{
        calendarId:'tangokompaniet@gmail.com',
        apiKey:'AIzaSyB0EBiE8xd5ItS59IahMyficWWAanHhMzU' ,
    }
}

export const SHOP_IMAGE_DIR='/images/shop/'
export const TEACHER_IMAGE_DIR='/images/teacher/'

export default config
