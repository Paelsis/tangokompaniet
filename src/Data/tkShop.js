export const ITEM_TYPE_SHOE = 1;
export const ITEM_TYPE_TSHIRT = 2;
export const ITEM_TYPE_HOODIE = 4;
export const ITEM_TYPE_SKIRT = 8;
export const ITEM_TYPE_ALL = 15

const GENDER_MALE='M'
const GENDER_FEMALE='F'
const GENDER_BOTH='B'

export const tkItemTypes = [
    {
       productType:ITEM_TYPE_SHOE,
       showGenderCheckboxes:false,
       name:'Skor'
    },
    {
       productType:ITEM_TYPE_TSHIRT,
       showGenderCheckboxes:false,
       name:'T-shirts'
    },
    {
       productType:ITEM_TYPE_HOODIE,
       showGenderCheckboxes:true,
       name:'Hoodies'
    },
    {
       productType:ITEM_TYPE_SKIRT,
       showGenderCheckboxes:true,
       name:'Klännigar'
    },
]

export const tkExisitngSizes = [
    {
       productType:ITEM_TYPE_SHOE,
       gender:GENDER_FEMALE,
       existingSizes:['not selected', 34,35,36,37,38,39,40,41,42],
    },
    {
       productType:ITEM_TYPE_SHOE,
       gender:GENDER_FEMALE,
       existingSizes:['not selected', 34,35,36,37,38,39,40,41,42],
    },
    {
       productType:ITEM_TYPE_TSHIRT,
       gender:GENDER_FEMALE,
       existingSizes:['not selected', 'XXS','XS', 'S','M','L','XL'],
    },
    {
       productType:ITEM_TYPE_TSHIRT,
       gender:GENDER_MALE,
       existingSizes:['not selected', 'XS', 'S','M','L','XL', 'XXL', 'XXXL'],
    },
    {
       productType:ITEM_TYPE_HOODIE,
       gender:GENDER_BOTH,
       existingSizes:['not selected', 'XXS','XS', 'S','M','L','XL','XXL', 'XXXL'],
    },
    {
       productType:ITEM_TYPE_SKIRT,
       gender:GENDER_FEMALE,
       existingSizes:['XXS','XS', 'S','M','L','XL'],
    },
]

export const tkBrands = [
     {
            productType:ITEM_TYPE_SHOE,
            brandId:0,
            brandName:'Bandolera',
            country: 'Italy',
            gender: GENDER_FEMALE,
     },
     {
            productType:ITEM_TYPE_SHOE,
            brandId:1,
            brandName:'Alagomi',
            country: 'Italy',
            gender: GENDER_FEMALE,
     },
     {
            productType:ITEM_TYPE_SHOE,
            brandId:2,
            brandName:'Regina',
            country: 'Argentina',
            gender: GENDER_FEMALE,
     },
     {
            productType:ITEM_TYPE_SHOE,
            brandId:3,
            brandName:'La Vikinga',
            country: 'Italy',
            gender: GENDER_FEMALE,
     },
     {
            productType:ITEM_TYPE_SHOE,
            brandId:4,
            brandName:'DNI',
            country: 'Argentina',
            gender: GENDER_FEMALE,
    },
    {
            productType:ITEM_TYPE_SHOE,
            brandId:5,
            brandName:'Bloch Stealth',
            country: 'Tyskland',
            gender: GENDER_MALE,
    },
    {
            productType:ITEM_TYPE_SHOE,
            brandId:6,
            brandName:'Dsol',
            country: 'Argentina',
            gender: GENDER_BOTH,
    },
    {
            productType:ITEM_TYPE_SHOE,
            brandId:7,
            brandName:'Tangokompaniet',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
    /* Here begins T-shirt  */
    {
            productType:ITEM_TYPE_TSHIRT,
            brandId:8,
            brandName:'Fruit Of The Loop',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
    {
            productType:ITEM_TYPE_TSHIRT,
            brandId:9,
            brandName:'H&M',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
    {
            productType:ITEM_TYPE_TSHIRT,
            brandId:10,
            brandName:'Åhlens',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
    {
            productType:ITEM_TYPE_TSHIRT,
            brandId:11,
            brandName:'H&M',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
    {
            productType:ITEM_TYPE_TSHIRT,
            brandId:12,
            brandName:'Åhlens',
            country: 'Sweden',
            gender: GENDER_BOTH,
    },
]

export const tkPrices = [ 
    {
        priceGroup:1, 
        onSale: false,
        priceSEK: 1100,
        priceEUR: 9
    },    
    {
        priceGroup:2, 
        onSale: false,
        priceSEK: 1200,
        priceEUR: 9
    },    
    {
        priceGroup:3, 
        onSale: false,
        priceSEK: 1300,
        priceEUR: 9
    },    
    {
        priceGroup:4, 
        onSale:false,
        priceSEK: 1400,
        priceEUR: 140,
    },    
    {
        priceGroup:5, 
        onSale: false,
        priceSEK: 1500,
        priceEUR: 150,
    },    
    {
        priceGroup:6, 
        onSale: false,
        priceSEK: 1600,
        priceEUR: 160,
    },    
    {
        priceGroup:101, 
        onSale: false,
        priceSEK: 500,
        priceEUR: 50,
    },    
    {
        priceGroup:1, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
    {
        priceGroup:2, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
    {
        priceGroup:3, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
    {
        priceGroup:101, 
        onSale:true,
        priceSEK: 400,
        priceEUR: 9
    },    
    {
        priceGroup:1, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
    {
        priceGroup:2, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
    {
        priceGroup:3, 
        onSale: false,
        priceSEK: 800,
        priceEUR: 9
    },    
]




