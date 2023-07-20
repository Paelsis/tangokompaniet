export const debitable = (li) => {
    let debitable = true;
    
    if (li.deleted) {
        debitable = false;
    }    

    if (li.productType==='course') {
        if (li.leader && (li.leaderSurplus >= li.genderBalance)) {
            debitable = false; 
        } else if (!li.leader && li.followerSurplus >= li.genderBalance) {
            debitable = false; 
        } else if (li.courseFull) {
            debitable = false;
        }   
    }
    return(debitable);
}

const discountMultiple = (list) => {
    let discount=0;
    let minPrice=999999;
    let minPricePartner=999999;
    let numberOfCourses=0;
    let numberOfCoursesPartner=0;

    list.forEach(li => {
        if ((li.productType==='course') && debitable(li)) { 
             let price=li.price?li.price:li.priceGroupPrice?li.priceGroupPrice:0;
             minPrice=Math.min(minPrice, price);
             numberOfCourses++;

             if (li.payForPartner) {
                 minPricePartner=Math.min(minPricePartner, price);
                 numberOfCoursesPartner++;
             }
        }
    })

    if (numberOfCourses > 1) {
        discount+=0.1 * Number(numberOfCourses) * Number(minPrice) + 0.00001; 
    }   
    if (numberOfCoursesPartner > 1) {
        discount+=0.1 * Number(numberOfCoursesPartner) * Number(minPricePartner) + 0.00001; 
    }   
    return(discount.toFixed(0));
}

const discountBasicCourse1and2 = (list) => {
    let course1 = false;
    let course2 = false;
    let course1Partner = false;
    let course2Partner = false;
    let discount=0;
    list.forEach(li => {
        if (li.productType==='course' && debitable(li)) {
            if ((li.courseType='GR') && (li.templateId.includes('GK1'))) {
                course1 = true;
                if (li.payForPartner) {
                    course1Partner = true;  
                }    
            } else if ((li.courseType='GR') && (li.templateId.includes('GK2'))) {
                course2 = true;
                if (li.payForPartner) {
                    course2Partner = true;  
                }    
            } 
        }    
        if (course1 && course2) {
            discount += 200;
        }    
        if (course1Partner && course2Partner) {
            discount += 200;
        }
    })    
    return discount;
}

export const discount = (list) => {
    return(Math.max(discountBasicCourse1and2(list), discountMultiple(list)))
}
 
const summationPrice = (list) => {
    let sumPrice=0;
    list.forEach(li => {
        if (debitable(li)) {
            let price = (li.price?li.price:li.priceGroupPrice?li.priceGroupPrice:0) * (li.payForPartner?2:1);
            sumPrice += Number(price)
        }    
    })
    return sumPrice;
}

export const amountMinusDiscount = (list) => {
    return(summationPrice(list) - discount(list));
}

export default summationPrice;