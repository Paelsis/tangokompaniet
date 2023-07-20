const concatinateImagesToProducts = (products, images) => {
    let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
    let setNull = obj => setAll(obj, null);
    
    let newProducts = []
    let cnt=1
    let newUniqueImages = images.filter(im => products.find(pr => im == pr.image)===undefined?true:false);
    if (newUniqueImages) {
        newUniqueImages.forEach(it => {
            let newProduct={ 
                        id:'A' + cnt, 
                        productType:'shoe',
                        productId:it.split('.')[0], 
                        productName:'Unknown product name',
                        gender:'F',   
                        image:it, 
                        brandId:'BA',
                        priceGroup:'10',   
                        price:null,   
                        sizeCount:'36/1, 37/1, 38/1, 39/1',
                        whenSoldOut:'Stop selling',
                        comment:'',
                }        
            newProducts.push(newProduct);
            cnt++;
        })  
    }
    newProducts.sort((p1, p2) => p2 - p1);
    let existingAndNewProducts=[...newProducts, ...products]
    return existingAndNewProducts;
}

export default concatinateImagesToProducts;
