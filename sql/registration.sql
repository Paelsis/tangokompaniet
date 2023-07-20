SELECT 
            R.id, R.productType, R.status, R.firstName, R.lastName, R.firstNamePartner, R.lastNamePartner, R.email, R.shallPay,   
            R.havePaid, R.leader,
            C.scheduleId, C.id, D.id as productId, 
            D.nameSV, D.nameEN, D.nameES,
            S.city, C.teachers
            from 
            tbl_registration R,  
            tbl_course_def D left outer join tbl_price_group P on D.priceGroup=P.priceGroup, 
            tbl_course C left outer join tbl_site S on C.siteId = S.siteId
            where C.templateId = D.templateId
            and R.productType='course'
            and R.productId = C.id
     

SELECT 
            R.id, R.productType, R.status, R.firstName, R.lastName, R.firstNamePartner, R.lastNamePartner, R.email, R.shallPay,   
            R.havePaid, R.leader,
            C.scheduleId, C.id, D.id as productId, 
            D.nameSV, D.nameEN, D.nameES,
            'unset' as city, 'unset' as teachers
            from 
            tbl_registration R,  
            tbl_package C
            tbl_course_def D left outer join tbl_price_group P on D.priceGroup=P.priceGroup, 
            where R.productId = C.id
            where C.templateId = D.templateId
            and R.productType='marathon'

SELECT 
            R.id, R.productType, R.status, R.firstName, R.lastName, R.firstNamePartner, R.lastNamePartner, R.email, R.shallPay,   
            R.havePaid, R.leader,
            C.scheduleId, C.id, D.id as productId, 
            D.nameSV, D.nameEN, D.nameES,
            'unset' as city, 'unset' as teachers
            from 
            tbl_registration R, tbl_package C, tbl_course_def D
            where R.productId = C.id
            and C.templateId = D.templateId
            and R.productType='marathon'