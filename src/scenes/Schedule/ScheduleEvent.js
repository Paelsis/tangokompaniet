import React, {Component} from 'react';
import { connect } from 'react-redux'
import tkColors, {boxShadowValue} from 'Settings/tkColors';
import groupBy from 'functions/groupBy';
import RenderEventRegHeader from './RenderEventRegHeader'
import RenderEventRegLine from './RenderEventRegLine'
import config from 'Settings/config';
import {AVA_STATUS} from 'Settings/Const';
import postData from 'functions/postData'
import fetchList from 'functions/fetchList'
import FormTemplate from 'Components/formTemplate'
import {LANGUAGE_EN} from 'redux/actions/actionsLanguage'
import withRouter from 'functions/withRouter'
import QrCode from 'Components/QrCode'

const EVENT_PRODUCT_TYPE={
     // Workshops
    MILONGA:'MILONGA', 
    BASIC_WORKSHOP:'BASIC_WORKSHOP',
    REGULAR_WORKSHOP:'REGULAR_WORKSHOP',

    // Packages
    DANCE_PACKAGE:'DANCE_PACKAGE',  
    BASIC_PACKAGE:'BASIC_PACKAGE',
    REGULAR_PACKAGE:'REGULAR_PACKAGE',
}


const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const FORM_FIELDS_URL = apiBaseUrl + "/formFields"
const SCHEDULE_EVENT_URL = apiBaseUrl + "/scheduleEvent"
const SCHEDULE_WORKSHOP_URL = apiBaseUrl + '/scheduleWorkshop?language=EN'
const PACKAGE_URL = apiBaseUrl + '/packageDef?language=EN'
const CREATE_REG_URL = apiBaseUrl + '/createRegistrationFestival'

const imageUrlFunc = replyImage => replyImage.toLowerCase().indexOf('https')!==-1?replyImage
    :apiBaseUrl + '/' + replyImage.replace(/^\/|\/$/g, '')
/*
const imageExistsFunc = (imageUrl) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status != 404;
}
*/
const STEPS = {
    INITIAL:0,
    FAILED:1, 
    SUCCESS:2
}

const STATUS={
    CLOSED: 'CLOSED', 
    MISSING:'MISSING',
    NOT_OPEN_YET:'NOT_OPEN_YET',
    FINISHED:'FINISHED',
}

const TEXTS = {
    PACKAGES:{
        SV:'Paket',
        EN:'Packages',
        ES:'Packages'
    },
    CANCEL: {
        SV:'Du kan cancellera denna dansanmälan i länken som du fått i ditt svarsmail', 
        EN:'You can cancel this registration with the link you have recieved in your reply mail',
        ES:'Puede cancelar este registro con el enlace que ha recibido en su correo de respuest',
    },
}


let styles = {
    clear:{
        clear:'both',
        fontWeight:600,
    },
    schema:color => ({
        display:'inline-block',
        //clear:'both',
        marginTop:10,
        marginBottom:10,
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:30,
        fontWeight:600,
        color,
        //border:'3px solid ' + color, 
        boxShadow:'0 13px 27px -5px ' + color,
    }),
    workshops:color => ({
        clear:'both',
        marginTop:10,
        marginBottom:10,
        borderTop:'2px solid ' + color,
    }),
    packages: {
        width:'100%',
        display:'inline-block', 
    },
    forms: color => ({
        borderTop:'2px solid ' + color,
    }),
    table: {
        flex:1,
        marginTop:20,
    },
    thead: {
        fontSize:'small', 
    },
    tbody: {
     //   border:2, 
     //   cellpadding:20,
    },
    trhead: {
        height:10,
        verticalAlign:'top',
        fontSize: 14,
        //borderBottom:'1px solid',
        //borderColor:'green',
        //backgroundColor:'tkColors.background',
        // backgroundColor:'transparent',
    },
    tr: {
        height:20,
        verticalAlign:'top',
        fontSize: 14,
        //borderBottom:'1px solid',
        //borderColor:'green',
        //backgroundColor:'tkColors.background',
        // backgroundColor:'transparent',
    },
    tdTitle: {
        verticalAlign:'top',
        fontSize:14,
        fontWeight: 'bold',
    },
    th: {
        verticalAlign:'bottom',
        fontSize:12,
        fontWeight: 'lighter',
    },
    td: {
        verticalAlign:'top',
        minWidth:28,
    },
    border: color => ({
        borderColor:color,
        boxShadow:boxShadowValue(color)
    }),
    radio: color =>({
        width:20,
        border:'5px solid ' + color,
        color:color,
    }),
    name: color =>({
        padding:5,
        fontSize:14,
        textAlign:'left',
        border:'1px dotted ' + color,
        borderCollapse:'collapse',
    }),
    legal: color =>({
        fontSize:'small', 
        color,
    }),
    success:(color)=>({
        clear:'both', 
        width:'100%', 
        textAlign:'center', 
        color:color?color:'red', 
    }),
    failed:{
        color:'red',
        clear:'both', 
        width:'100%', 
        textAlign:'center', 
        fontSize:24
    },

};

class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            name:undefined, 
            eventType:undefined,
            toggleText:false, textId:'', 
            color:'brown',
            message:undefined,
            multiplePartners:false,
            packageId:undefined, 
            orderId:0,
            packageName:undefined, 
            person:undefined,
            step:STEPS.INITIAL,
            status:STATUS.MISSING,
            avaStatus:'AV',
            avaStatusText:undefined,
            dateRange:undefined,
            openRegDate:undefined,
            openRegTime:undefined,
            startDate:undefined, 
            startTime:undefined, 
            year:undefined, 
            emailResponsible:undefined,
            imageUrl:undefined,
            replyImage:undefined,
            workshopPartners:{},
            packageList:[], 
            workshopList:[], 
            productList:[],
            formFields:[],
            amount:0,
            pressed:false,
        };
        this.toggleProduct = this.toggleProduct.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.calcAmaount = this.calcAmount.bind(this)
        this.handleRegistration = this.handleRegistration.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.calcAmount = this.calcAmount.bind(this)
        this.renderSchedules = this.renderSchedules.bind(this)
        this.renderPackages = this.renderPackages.bind(this)
        this.renderWorkshopsByDay = this.renderWorkshopsByDay.bind(this)
        this.renderWorkshopsBySchedule = this.renderWorkshopsBySchedule.bind(this)
        this.renderProductList = this.renderProductList.bind(this)
        this.workshopPartnerStr = this.workshopPartnerStr.bind(this)
        this.handleWorkshopPartner = this.handleWorkshopPartner.bind(this)
    }

    componentDidMount () {
        const eventTypeParams=this.props.match?this.props.params?this.props.params.eventType:undefined:undefined
        const eventTypeProps = this.props.eventType?this.props.eventType:undefined
        const eventType = eventTypeProps?eventTypeProps:eventTypeParams?eventTypeParams:undefined
        console.log('eventType:', eventType)  
        this.setState({eventType, color:this.props.globalStyle.color?this.props.globalStyle.color:'brown'});         

        fetchList('', '', SCHEDULE_EVENT_URL + '?eventType=' + eventType, 
            result =>
            {
                const schedule = Array.isArray(result)?result[0]:result
                console.log(SCHEDULE_EVENT_URL, ' schedule:', schedule)
                if (schedule) {
                    this.setState({
                        name:schedule.name,
                        status:schedule.status, 
                        avaStatus:schedule.avaStatus,
                        avaStatusText:schedule.avaStatusText[this.props.language]?schedule.avaStatusText[this.props.language] + ' (' + schedule.avaStatus + ')':'No text',
                        mailStatus:'',
                        mailSubject:'', 
                        mailBody:'',
                        dateRange:schedule.dateRange, 
                        openRegDate:schedule.openRegDate, 
                        openRegTime:schedule.openRegTime, 
                        startDate:schedule.startDate, 
                        startTime:schedule.startTime, 
                        year:schedule.year, 
                        emailResponsible:schedule.emailResponsible,
                        replyImage:schedule.replyImage,
                        imageUrl:schedule.replyImage?imageUrlFunc(schedule.replyImage):'No reply image',
                    }) 
                }
            }
        )    

        fetchList('', '', FORM_FIELDS_URL + '?formName=' + eventType, 
            result =>
            {
                if (result) {
                    //alert(JSON.stringify(result))
                    this.setState({
                        formFields:result
                    }) 
                }
                console.log(SCHEDULE_EVENT_URL, ' result:', result)
            }
        )    


        fetchList('','', PACKAGE_URL, 
            list=>{ 
                const packageList = list.filter(it => eventType?eventType===it.eventType:true)                   
                if (packageList?packageList.length > 0:false) {
                    if (packageList?packageList.length > 0:false) {
                        this.setState({packageList})
                    }    
                }
            }        
        )
        fetchList('','', SCHEDULE_WORKSHOP_URL, 
            list=>{
                const workshopList = list.filter(it => eventType?eventType===it.eventType:true).filter(it=>EVENT_PRODUCT_TYPE[it.productType]?true:false)
                if (workshopList?workshopList.length > 0:false) {
                    this.setState({
                        workshopList: workshopList.map(it=>({...it, scheduleKey:it.eventType+'_'+it.year})),
                    })
                }     
            }
        )
    }

    calcAmount(productList, currency) {
        const index = 'price' + currency
        const wsBasic = this.state.workshopList.find(ws=>ws.productType===EVENT_PRODUCT_TYPE.BASIC_WORKSHOP)
        const wsRegular = this.state.workshopList.find(ws=>ws.productType===EVENT_PRODUCT_TYPE.REGULAR_WORKSHOP)
        const priceBasic = wsBasic?(Number(wsBasic[index])/Number(wsBasic.wsCount)):249
        const priceRegular = wsRegular?(Number(wsRegular[index])/Number(wsRegular.wsCount)):249
        const foundMaxPrice = this.state.packageList.find(pr=>pr.allWorkshops)
        const maxPrice = foundMaxPrice?Number(foundMaxPrice[index]):10000
        const foundAllWorkshops = productList.find(pr=>pr.allWorkshops)?true:false
        const milongasIncluded = productList.find(it => (it.productType === EVENT_PRODUCT_TYPE.BASIC_PACKAGE) || (it.productType === EVENT_PRODUCT_TYPE.REGULAR_PACKAGE))?true:false 
        const dancePackageExists = productList.find(it => it.productType === EVENT_PRODUCT_TYPE.DANCE_PACKAGE)?true:false 
        let cntWsBasic = 0
        let cntWsRegular = 0
        let cntWsPackageBasic = 0
        let cntWsPackageRegular = 0
        let amount = 0 

        if (foundAllWorkshops) {
            /* All workshops and milongas (luxury package) */
            return maxPrice;
        } else if (!milongasIncluded) {
            /* No package, just summation (price not larger than maxPrice) */
            productList.forEach(pr=> {  
                if (!(dancePackageExists && pr.productType === EVENT_PRODUCT_TYPE.MILONGA)) {
                    amount += pr?Number(pr[index]?pr[index]:-1000000):-200000
                }    
            })        
            return Math.min(amount, maxPrice)
        } else {
            /* Packages and workshops */
            productList.forEach(pr=> {  
                if (pr.courseType !== EVENT_PRODUCT_TYPE.MILONGA) {
                    // Workshop and package counters
                    switch (pr.productType) {
                        case EVENT_PRODUCT_TYPE.BASIC_PACKAGE:
                            cntWsPackageBasic += Number(pr.wsCount)
                            break
                        case EVENT_PRODUCT_TYPE.REGULAR_PACKAGE:
                            cntWsPackageRegular += Number(pr.wsCount)
                            break
                        case EVENT_PRODUCT_TYPE.BASIC_WORKSHOP:
                            cntWsBasic += pr.wsCount
                            break
                        case EVENT_PRODUCT_TYPE.REGULAR_WORKSHOP:
                            cntWsRegular += pr.wsCount
                            break
                    }
                    // Sum price of all packages 
                    switch (pr.productType) {
                        case EVENT_PRODUCT_TYPE.REGULAR_PACKAGE:
                        case EVENT_PRODUCT_TYPE.BASIC_PACKAGE:
                            amount += pr?pr[index]?Number(pr[index]):-1000000:-2000000
                            break
                        case EVENT_PRODUCT_TYPE.DANCE_PACKAGE:
                            amount += milongasIncluded?0:(pr?pr[index]?Number(pr[index]):-1000000:-2000000)    
                            break    
                    }    
                } 
            })    
            // Add the overflow workshops exceeding package limit
            if (cntWsRegular > cntWsPackageRegular) {  
                amount += (cntWsRegular - cntWsPackageRegular) * priceRegular
            } else if (cntWsBasic > cntWsPackageBasic) {
                amount += Math.max((cntWsBasic - cntWsPackageBasic - Math.max(cntWsPackageRegular - cntWsRegular, 0)), 0) * priceBasic
            }       

            amount = Math.min(amount, maxPrice) 
            return amount
        }
    }

    toggleProduct(e, product) {
        let productList = []
        let workshopPartners = []
        const productId = e.target.name
        // alert('checked=' + e.target.checked + 'name: ' + e.target.name)
        if (e.target.checked===true) {
            /* Add entry if it does not exists */
            productList = [...this.state.productList, {...product, productId}]
            workshopPartners = this.state.workshopPartners
        } else {
            /* Remove entry if it exists */
            productList = this.state.productList.filter(it => it.productId !== e.target.name)
            productList = productList?productList:[]
            workshopPartners = this.state.workshopPartners
            delete(workshopPartners[e.target.name])
        }   
        const amount = this.calcAmount(productList, 'SEK')
        this.setState({productList, workshopPartners, amount})
    };

    handleWorkshopPartner(workshopId, e) {
        const value = this.state.workshopPartners[workshopId]?{...this.state.workshopPartners[workshopId], [e.target.name]:e.target.value}:{[e.target.name]:e.target.value}
        const workshopPartners = {...this.state.workshopPartners, [workshopId]:value}
        this.setState({workshopPartners})
    }

    workshopPartnerStr() {
        let strWorkshopPartners = ""
        Object.entries(this.state.workshopPartners).map(wsp => {
            strWorkshopPartners += '(' + wsp[0] + ':';
            Object.entries(wsp[1]).map(pa => {
               strWorkshopPartners += " " + pa[1]
            })
            strWorkshopPartners += ') ' + wsp[0];
        })    
        return strWorkshopPartners
    }

    renderProductList() {return(
        <div style={{width:'50vw'}}>
            {this.state.productList.map(pr => <p><small>{JSON.stringify(pr, null, 4)}</small></p>)}
        </div>
    )}
    renderPackages() {
        return(
        this.state.packageList.length > 0?   
            <>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <th style={styles.th}>Select</th>
                        <th style={styles.th}>Package</th>
                    </thead>
                    <tbody styles={styles.tbody}>
                        {this.state.packageList.map(pkg => 
                            <tr style={styles.name(this.state.color)}>
                            <td> 
                                <input type="checkbox" name={pkg.packageId} onChange={e=>this.toggleProduct(e, pkg)}/>
                            </td>    
                            <td >
                                {pkg.name} 
                            </td>
                        </tr>
                    )}    
                    </tbody>
                </table>           
            </>
        :
            null    
        )
    }
    
    renderWorkshopsByDay(workshops) {
        return(
            <table style={{...styles.table}}>
                <RenderEventRegHeader startDate={workshops[0].startDate} dayOfWeek={workshops[0].dayOfWeek} language = {this.props.language} />
                <tbody style={styles.tbody}>
                    {workshops.filter(it=>it.active != 0).map(ws => 
                        <RenderEventRegLine 
                            event={ws} 
                            checked={this.state.productList.find(pr => ws.workshopId === pr.productId)}
                            language = {this.props.language} 
                            toggleProduct={e=>this.toggleProduct(e, ws)}
                            multiplePartners={this.state.multiplePartners}
                            disabled={((ws.avaStatus === AVA_STATUS.COMPLETELY_CLOSED) || (ws.avaStatus === AVA_STATUS.CLOSED_BY_REQUEST))?true:undefined}
                            handleWorkshopPartner={e=>this.handleWorkshopPartner(ws.workshopId, e)}
                        />
                    )}  
                </tbody>
            </table>
        )
    } 


    // Render all workshops for one scheduleKey
    renderWorkshopsBySchedule(list) {
        let dayMap = groupBy(list, it => it.daysUntilStart)
        let days = Array.from(dayMap.keys()).sort((a,b)=> a.startTime - b.startTime)
        return (
        <div style={styles.workshops()}>    
                {days.map(day => (
                    this.renderWorkshopsByDay(dayMap.get(day))
                ))}
        </div>
        )
    }

    filterList() {
        const list = this.state.workshopList
        const eventType = this.props.eventType?this.props.eventType
            :this.props.match.eventType?this.props.match.eventType
            :undefined     
        const dateRange = this.props.dateRange?this.props.dateRange
            :this.props.match.dateRange?this.props.match.dateRange
            :undefined     
        if (eventType !== undefined) {
            console.log('filterList before:', list, 'eventType:', eventType)           
            list = this.state.workshopList.filter(it => it.eventType === eventType && dateRange?it.dateRange===dateRange:true)
        }    
        console.log('filterList after:', list, eventType)           
        return list    
    }  

    handleReply (data) {
        //alert(JSON.stringify(data) + 'data.status=' + data.status + ' orderId=' + data.orderId)
        this.setState({step:data.status==='OK'?STEPS.SUCCESS:STEPS.FAILED, 
            orderId:data.orderId,
            mailStatus:data.mailStatus?data.mailStatus:'',
            mailSubject:data.mailSubject?data.mailSubject:'',
            mailBody:data.mailBody?data.mailBody:'',   
            message:data.message?data.message:'No error message in reply'
        })
    }    

    calcMinWsCount() {
        let sum = 0
        this.state.productList.filter(pr => pr.productType === EVENT_PRODUCT_TYPE.PACKAGE).forEach(pr => {
            sum += pr?Number(pr.wsCount):0
        })    
        return sum
    }
    calcSumWsCount() {
        return this.state.productList.filter(pr => pr.productType === EVENT_PRODUCT_TYPE.WORKSHOP).length        
    }
   
    calcMinWsMinutes() {
        let sum = 0
        this.state.productList.filter(pr => pr.productType === EVENT_PRODUCT_TYPE.PACKAGE).forEach(pr => {
            sum += Number(pr.minutes)
        })    
        return sum
    }

    calcSumWsMinutes() {
        let sum = 0
        this.state.productList.filter(pr => pr.productType === EVENT_PRODUCT_TYPE.WORKSHOP).forEach(pr => {
            sum += Number(pr.minutes)
        })    
        return sum
    }

    handleRegistration(regExtended) {
        const minWsCount = this.calcMinWsCount()
        const sumWsCount = this.calcSumWsCount()
        const minWsMinutes = this.calcMinWsMinutes()
        const sumWsMinutes = this.calcSumWsMinutes()
        /*
        if (process.env.NODE_ENV === 'development') {
             alert('minWsCount=' + minWsCount + ' sumWsCount=' + sumWsCount + ' minWsMinutes=' + minWsMinutes + ' sumWsCount=' + sumWsMinutes)
        } 
        */    
        if (sumWsCount < minWsCount) {
            alert("WARNING. Please select " +  minWsCount + " workshops for your chosen package/s. Currently you have selected only " + sumWsCount + " workshop/s." )
            return false;
        }
        if (sumWsMinutes < minWsMinutes) {
            alert("WARNING. Please select a total of " +  minWsMinutes + " minutes of workshops for your chosen package/s. Currently you have selected only " + sumWsMinutes + " minutes of workshop/s." )
            return false;
        }

        postData(CREATE_REG_URL, '', '', regExtended, this.handleReply);
    }

    multiplePartnersCheck() {
        let ret = true

        if (this.state.multiplePartners) {
            const workshopList = this.state.workshopList.filter(it => this.state.productList.includes(it.workshopId))
            workshopList.forEach(wp => {
                const workshopId = wp.workshopId
                const workshopPartners = this.state.workshopPartners[workshopId]
                if (workshopPartners === undefined) {
                    alert('Please fill in partner info missing for workshop ' + workshopId)
                    ret = false
                } else if (workshopPartners.firstNamePartner === undefined) {
                    alert('Plaese fill in partners first name for workshop' + workshopId)
                    ret = false
                } else if (workshopPartners.lastNamePartner === undefined) {
                    alert('Plaese fill in partners last name for workshop' + workshopId)
                    ret = false
                } else if (workshopPartners.emailPartner === undefined) {
                    alert('Plaese fill in partners email for workshop' + workshopId)
                    ret = false
                }
            })
        }    
        return ret
    }

    notSamePartnerCheck(reg) {
        if (reg.emailPartner !== undefined && reg.email !== undefined) {
            if (reg.email.toLowerCase().trim() === reg.emailPartner.toLowerCase().trim()) {
                alert('Warning: You cannot use same email for partner as for yourself')
                return false
            } 
        } 
        return true
    }   

    extendedProductList(reg) {
        return this.state.productList.map(pr => {
            const productType = pr.productType?pr.productType:undefined
            const product = productType?productType.indexOf('WORKSHOP') >= 0?pr.workshopId:pr.name:pr.name
            const workshopPartners = this.state.workshopPartners[pr.productId]
            const firstNamePartner=workshopPartners?workshopPartners.firstNamePartner:undefined
            const lastNamePartner=workshopPartners?workshopPartners.lastNamePartner:undefined
            const emailPartner=workshopPartners?workshopPartners.emailPartner:undefined
            return (
                {
                    eventType:this.props.eventType, 
                    dateRange:this.state.dateRange,
                    product, 
                    productType, 
                    firstName:reg.firstName,
                    lastName:reg.lastName,
                    email:reg.email,    
                    phone:reg.phone,
                    role:reg.role,
                    firstNamePartner, 
                    lastNamePartner, 
                    emailPartner,
                }    
            )
        })        
    }

    regExtended(reg) {
        return ({
            ...reg, 
            eventType:this.props.eventType, 
            year:this.state.year?this.state.year:'9999', 
            dateRange:this.state.dateRange?this.state.dateRange:'NoDateRange', 
            emailResponsible:this.state.emailResponsible?this.state.emailResponsible:'No email respoinsible', 
            imageUrl:this.state.imageUrl,
            amount:this.state.amount,
            extendedProductList:this.extendedProductList(reg)
        })
    }    


    handleSubmit(e, reg) {
        e.preventDefault() 
        
        let failed = false

        if (!this.multiplePartnersCheck()) {
            return 
        }
        if (!this.notSamePartnerCheck(reg)) {
            return 
        }
        
        const regExtended = this.regExtended(reg)

        this.handleRegistration(regExtended)
    }

    /* <FormTemplate fields={formFields} handleSubmit={this.handleSubmit}/> */
    renderSchedules () {
        const schemaMap = groupBy(this.state.workshopList, it => it.eventType + it.year)
        const scheduleKeys = [...schemaMap.keys() ];
        const color = this.state.color
        const replyImage = this.state.replyImage
        const imageUrl = this.state.imageUrl
        const calcWsCount = () => {
            let sum = 0
            this.state.productList.forEach(pr=> {sum += (pr.productType===EVENT_PRODUCT_TYPE.BASIC_WORKSHOP || pr.productType === EVENT_PRODUCT_TYPE.REGULAR_WORKSHOP)?pr.wsCount:0})  
            return sum
        } 
        const wsCount = calcWsCount()

        // let formFields=this.props.formFields.filter(it=>this.state.multiplePartners?it.name.includes('Partner')?false:true:true) 
        return(
            <div style={{color}}>
                {this.state.status===undefined?
                    <h2>There is no schedule defined for eventType = {this.state.eventType}</h2>
                :this.state.status===STATUS.NOT_OPEN_YET?
                    <h2>The registration opens {this.state.openRegDate} at {this.state.openRegTime}</h2>
                :this.state.status===STATUS.FINISHED?
                    <h2>{this.state.name} has finished</h2>
                :this.state.status===STATUS.CLOSED?
                    <h2>{this.state.name} is closed for registrations</h2>
                :this.state.step===STEPS.INITIAL?
                    <div>
                        {this.state.packageList.length > 0 || scheduleKeys.length > 0?
                            <div style={styles.schema(color)}>
                                <h3>{'Total price:' + this.state.amount + ' SEK'}</h3>  
                                <h3>{'Number of workshops:' + wsCount}</h3>
                                {this.state.packageList.length > 0? 

                                    <div style={styles.packages}>
                                        <h3 style={{width:'100%', textAlign:'center'}}>Packages</h3>
                                        {this.renderPackages()}
                                    </div>
                                :
                                    null
                                }    
                                {scheduleKeys.length > 0?
                                    <div style={styles.workshops(color)}>

                                        <h3 style={{width:'100%', textAlign:'center'}}>Workshops and milongas</h3>
                                        <label>
                                        I have different dance partners for the different workshops   
                                        <input type="checkbox" checked={this.state.multiplePartners} onChange={e => this.setState({multiplePartners:e.target.checked?true:false})} />
                                        </label>
                                        {scheduleKeys.map(scheduleKey =>this.renderWorkshopsBySchedule(schemaMap.get(scheduleKey)))}
                                    </div>
                                :
                                    null
                                }
                                {this.state.packageList.length > 0 || scheduleKeys.length > 0?     
                                    <div style={styles.forms(this.state.color)}>
                                        <h3 style={{width:'100%', textAlign:'center'}}>Personal information</h3>
                                        {this.state.avaStatusText?<h2>{this.state.avaStatusText}</h2>:<h3>Open</h3>}
                                        <FormTemplate schedule={{avaStatus:this.state.avaStatus}} fields={this.state.formFields} handleSubmit={this.handleSubmit}/>
                                    </div>
                                :
                                    null    
                                }

                                {process.env.NODE_ENV==='production'?null:   
                                    <>
                                          <button onClick={()=> this.setState({pressed:!this.state.pressed})}>Show productList</button>
                                          {this.state.pressed?this.renderProductList():null}
                                   </>
                                }    
                            </div>
                        :
                            null
                        }
                    </div>
                :this.state.step===STEPS.SUCCESS?
                    <>
                        <div style={styles.success(this.state.color)}>
                            {replyImage?<img src={imageUrl} width='50%' alt={'Image not found:' + imageUrl} />:null}
                            <h2 >Your registration with order number {this.state.orderId} to {this.state.eventType} at Tangokompaniet was successful</h2>
                            <h4>The total amount to pay is {this.state.amount} SEK</h4>
                            <h4 >Please check your mailbox (or spam mailbox) for confirmation of your registration.</h4>
                            <div style={{...styles.text, fontWeight:300, fontSize:14}}>{TEXTS.CANCEL[this.props.language]}</div>
                            {this.state.orderId?this.state.amount?<QrCode price={this.state.amount} message={this.state.eventType + '-' + this.state.dateRange.substring(0,7) + '-' + this.state.orderId} color={color} />:null:null}
                        </div>
                        {this.state.mailStatus === 'ERROR'?
                            <div style={{color:'red', border:'5px solid red'}}>
                                {this.state.mailSubject?<h4>Mail subject: {this.state.mailSubject}</h4>:null}
                                {this.state.mailBody?<><h4>Mail body:</h4><div style={{color:'red'}} dangerouslySetInnerHTML={{__html: this.state.mailBody}} /></>:null}
                            </div>    
                        :null}    
                    </>    
                :this.state.step===STEPS.FAILED?
                    <div style={{clear:'both', display:'inline-block', width:'70%', textAlign:'center', color:'red', fontSize:28}}>
                        <h2 >WARNING: Your registration failed.</h2> 
                        <h4 style={{fontSize:'small'}}>The failed order has number {this.state.orderId}</h4>
                        <h4 style={{fontSize:'small'}}>Message in reply from server: {this.state.message?this.state.message:'No message'}</h4>
                        {this.state.mailStatus === 'ERROR'?
                            <div style={{color:'red', border:'1px solid red'}}>
                                {this.state.mailSubject?<h4>Mail subject: {this.state.mailSubject}</h4>:null}
                                {this.state.mailBody?<><h4>Mail body:</h4><div style={{color:'red'}} dangerouslySetInnerHTML={{__html: this.state.mailBody}} /></>:null}
                            </div>    
                        :null}    
                    </div>
                :    
                    <div style={{clear:'both', display:'inline-block', width:'70%', textAlign:'center', color:'red', fontSize:28}}>
                        <h2 >WARNING: No valid render step for order number {this.state.orderId}</h2>
                    </div>
                }    
            </div>
        )
    }            

    // Render 

    render() {   
        return(this.renderSchedules());  
    }
}

const mapStateToProps = (state) => {
    return {
        language: LANGUAGE_EN, // state.language,
        globalStyle: state.style,
    }
}    

export default connect( 
    mapStateToProps
) (withRouter(Schedule));    
