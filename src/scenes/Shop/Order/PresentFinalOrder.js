import React from 'react'
import {COURSE_ACCEPT, COURSE_LEADER_SURPLUS, COURSE_FOLLOWER_SURPLUS, COURSE_FULL} from 'Settings/Const';
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const styles={
    warning: { 
        border:'1px solid', 
        padding:5,  
        margin:5,
        borderRadius:16, 
        color:'red', 
        backgroundColor:'lightYellow'
    }, 
    enabled: {
        color: 'white',
        background: 'linear-gradient(45deg, #BE6B8B 30%, #FF8E53 90%)',
        borderRadius: 16,
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textAlign: 'center'
    },
    disabled: {
        color: 'white',
        background: 'red',
        opacity:0.3,
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
}

const PresentFinalOrder = ({result}) =>
(
    <div>
        <h3>
        Thank you for your order !<p />
        Your order id/number is: {result.orderId}<p /> 
        Your order contains the following {result.numberOfClothes + result.numberOfAccRegistrations} items:
        </h3>
        <h4>Your are registered or waitlisted on the following {result.products.length} courses:</h4>
        {result.products.filter(it => it.productType=="course").map(it => 
            <div>
                {it.status == COURSE_LEADER_SURPLUS?
                <p>&bull; You are listed for partner-search for follower on course {it.name}&nbsp;{it.city} {it.startDate}</p>
                :it.status == COURSE_FOLLOWER_SURPLUS?  
                <p>
                &bull; You are listed for partner search for leader on {it.name}&nbsp;{it.city} {it.startDate}<p />
                </p>
                :it.status == COURSE_FULL?
                <p>  
                    &bull; Course {it.name}&nbsp;{it.city} {it.startDate} is full. You are put on a waitlist<p />
                </p>  
                :it.status == COURSE_ACCEPT?
                <p>  
                    &bull; You are accepted and registered on course {it.name}&nbsp;{it.city} {it.startDate} {it.price} SEK<p />
                </p>  
                :
                <p>&bull;{it.name}&nbsp;{it.city} {it.startDate}</p>
                }
            </div>
        )}
        {result.numberOfClothes > 0?
        <h4>{result.numberOfClothes} shoes (or other clothes)</h4>
        :null}
        {result.amount > 0?
        <h3>You will pay:{result.amount} SEK</h3>
        :null}  
        {result.discount > 0?
        <h3>The discount:{result.discount} SEK has been deducted from the total price</h3> 
        :null}
        {result.numberOfDupRegistrations > 0?
            <div style={styles.warning}>
                WARNING: You have made {result.numberOfDupRegistrations} double registrations 
                <p/>
                to courses already registered on your name and email.<p/>
                All double registrations are ignored by the server.<p/>
            </div>
        :null}
    </div>
)   
        
