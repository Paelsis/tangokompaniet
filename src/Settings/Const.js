export const PRIV_NONE=0
export const PRIV_MEMBER=1
export const PRIV_TEACHER=2
export const PRIV_SALESMAN=4
export const PRIV_SUPERUSER=8
export const PRIV_ALL=15
// PRIV_NONE, PRIV_MEMBER, PRIV_SALESMAN, PRIV_TEACHER, PRIV_SUPERUSER, PRIV_ALL

// Filter values
export const COURSE_UNSET='COURSE_UNSET'
export const COURSE_ACCEPT='COURSE_ACCEPT'
export const COURSE_LEADER_SURPLUS='COURSE_LEADER_SURPLUS'
export const COURSE_FOLLOWER_SURPLUS='COURSE_FOLLOWER_SURPLUS'
export const COURSE_REJECT='COURSE_REJECT'
export const COURSE_FULL='COURSE_FULL'
export const COURSE_CLOSED='COURSE_CLOSED'

export const FILTER_TYPE_BRAND='FILTER_TYPE_BRAND'
export const FILTER_TYPE_GENDER='FILTER_TYPE_GENDER'
export const FILTER_TYPE_COLOR='FILTER_TYPE_COLOR'
export const FILTER_TYPE_SIZE='FILTER_TYPE_SIZE'
export const FILTER_TYPE_TOE='FILTER_TYPE_TOE'
export const FILTER_TYPE_HEEL='FILTER_TYPE_HEEL'



export const CLOSED = {
    LEADER:'LEADER',    
    FOLLOWER:'FOLLOWER',    
    BOTH:'BOTH',
    BLANK:''
}    

export const SWISH_PREFIX='123'

export const PAYMENT_TK={
    ORG_NUMMER:process.env.REACT_APP_ORG_NUMMER,
    SWISH:process.env.REACT_APP_SWISH,
    SWISH_PAYEE:process.env.REACT_APP_SWISH_PAYEE,
    BG:process.env.REACT_APP_BG,
    IBAN:process.env.REACT_APP_IBAN,
    BIC:process.env.REACT_APP_BIC
}    

export const PAYMENT_METHOD = {
    BG:'BG', 
    SWISH:'SWISH', 
    BAMBORA:'BAMBORA',
    OTHER:'OTHER',

}
export const ROLE = {LEADER:'LEADER', FOLLOWER:'FOLLOWER', BOTH:'BOTH'}


export const AVA_STATUS = {
    AV:'AV', // Avaiable space
    CC:'CC', // Completely closed
    OF:'OF', // Open for followers only
    OL:'OL', // Open for leaders only
    OB:'OB', // Open for both only
    OF:'CF', // Closed for foloowers only
    OL:'CL', // Closed for leaders only
    OB:'CB', // Closed for both only
}

export const AVA_TEXT_NEW = {
    CC:{
        SV:'Kursen är fullbokad',
        EN:'Course if full, check with TK if there are cancellations',
        ES:'Course if full, check with TK if there are cancellations',
    },    
    OF:{
        SV:'Endast platser kvar för följare',
        EN:'Only space left for for followers',
        ES:'Only space left for for followers',
    },
    OL:{
        SV:'Endast platser kvar för förare',
        EN:'Only space left for for leaders',
        ES:'Only space left for for leaders',
    },
    OB:{
        SV:'Endast platser kvar för de som kan båda roller',
        EN:'Only space left for for those who dance both roles',
        ES:'Only space left for for those who dance both roles',
    },
    CF:{
        SV:'Fullbokad för följare',
        EN:'No space keft for followers',
        ES:'No space left for followers',
    },
    CL:{
        SV:'Fullbokad för förare',
        EN:'No space left for leaders',
        ES:'No space left for leaders',
    },
    CB:{
        SV:'Fullbokad för dem som dansar båda roller',
        EN:'No space left for dancers that dances both roles',
        ES:'No space left for dancers that dances both roles',
    },
    IF:{
        SV:'För tillfället för stort överskott på följare',
        EN:'Currently to large surplus on followers.',
        ES:'Currently to large surplus on followers.',
    },
    IL:{
        SV:'För tillfället för stort överskott på förare',
        EN:'Currently to large surplus on leaders.',
        ES:'Currently to large surplus on leaders.',
    },
    AV:{
        SV:'Plats tillgängligt för samtliga dansroller',
        EN:'Space available for all roles.',
        ES:'Currently to large surplus on leaders.',
    },
}    

export const BOOKING_STATUS = {
    CONFIRMED:'OK',
    WAITLISTED_FOR_LEADER:'WL',
    WAITLISTED_FOR_FOLLOWER:'WF',
    WAITLIST_FOR_SPACE:'WS',
}

export const CALENDAR_TYPE = {
    SOCIAL:'SOCIAL',
    CLASSES:'CLASSES',
    ALL:'ALL',
}

export const DANCE_SITE = {
    ONLINE:'ONLINE',
    SITE:'SITE',
}



export const BRAND_TANGOLERA=1
export const BRAND_DNI=2

export const CLOSED_TOE=1
export const OPEN_TOE=2

export const CLOSED_HEEL=1
export const OPEN_HEEL=2

export const CASE_PAY_NOW='CASE_PAY_NOW'
export const CASE_WAITLIST='CASE_WAITLIST'
export const CASE_SHOPPINGCART='CASE_SHOPPINGCART'

export const PAYMENT_METHOD_PAYPAL='PAYMENT_METHOD_PAYPAL'
export const PAYMENT_METHOD_SWISH='PAYMENT_METHOD_SWISH'

export const BRAND = [
    {
        id:1,
        label:'Tangolera (=Bandolero)',
        name:'TangoleraBandolero',
    },
    {
        id:2,
        label:'DNI',
        name:'DNI'
    },
    {
        id:3,
        label:'Concorde',
        name:'Concorde'
    },
    {
        id:4,
        label:'Bloch (=Stealth)',
        name:'Bloch'
    },
    {
        id:5,
        label:'Other (=multiple other brands)',
        name:'Other'
    },
]



// Shop itemType
export const ITEM_TYPE = {
    'shoe':1,
    'hoodie':2,
    'tshirt':4,
    'skirt':8,
    'all':15,
}

export const SWISH = {
    PAYMENT:'https://cpc.getswish.net/swish-cpcapi/api/v1/paymentrequests',
    REFUND:'https://cpc.getswish.net/swish-cpcapi/api/v1/refunds'
}


export const PRODUCT_TYPE = {
    SHOE:'shoe',
    TSHIRT:'tshirt',
    COURSE:'course',
    WORKSHOP:'workshop',
    PACKAGE:'package',
    SOCIAL:'social',
    MARATHON:'marathon',
    FESTIVAL:'festival',
    SMALLEVENT:'smallEvent',
}




export const DISCOUNT_TYPE = {
    EARLY_BIRD:'EB',
    CAMPAIN_CODE:'CA',
    PACKAGE_FESTIVAL:'PF',
    PACKAGE_COURSE:'PC',
}

export const COURSE_TYPE = {
    GK:{type:'GR', SV:'Grundkurser', EN:'Basic courses', ES:'Cursos básicos', sequence:1},
    FK:{type:'FK', SV:'Fortsättningskurser', EN:'Continuation courses', ES:'Cursos de continuación', sequence:2},
    HK:{type:'HK', SV:'Helgkurser', EN:'Weekend courses', ES:'Cursos de fin de semana', sequence:9},
    TE:{type:'TE', SV:'Temakurser', EN:'Speciality courses', ES:'Cursos especiales', sequence:8},
    XX:{type:'XX', SV:'Okänd kurstyp', EN:'Unknown course type', ES:'Tipo des curso desconocideo', sequence:10},
}

export const payPalImage=require('images/PayPal.png');
export const swishImage=require('images/Swish.png');

export const EVENT_TYPE={
    SPRING:'SPRING',
    AUTUMN:'AUTUMN',
    MARATHON:'MARATHON',
    EASTER:'EASTER',
    FESTIVALITO:'FESTIVALITO',
    SUMMER:'SUMMER',
    SMALLEVENT:'SMALL_EVENT',
    /* SOCIAL:'SOCIAL', */
}

export const SELECTION_MENU_TYPE={
    COURSE:'COURSE',
    FESTIVAL:'FESTIVAL',
}

export const SOCIAL_ID={
    UTE:'UTE',
    INNE:'INNE'
}



export const TBL_TEACHER_NOTE='tbl_teacher_note'

export const DOMAIN_NAME=process.env.REACT_APP_DOMAIN_NAME