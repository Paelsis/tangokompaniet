import React from 'react';
import {BRAND} from 'Settings/Const';

const editProductIdLine = (pr, handleChange) => (
    <tr key={pr.productId}>       
        <td>product ID:{pr.productId}</td>
        <td colSpan={2}>productType:        
            <select name={'productType'} value={pr.productType} onChange={event=>handleChange(event)}> 
                        <option value={''}>Undefined</option>
                        <option value={'shoe'}>Shoe</option>
                        <option value={'t-shirt'}>T-shirt</option>
                        <option value={'skirt'}>Skirt</option>
                        <option value={'hoodie'}>Hoodie</option>
            </select>            
        </td>   
        <td>priceGroup:        
            <input 
                style={{width:40}} 
                type="number" 
                name={'priceGroup'} 
                value={pr.priceGroup} 
                min={0}
                max={10000}
                onChange={event=>handleChange(event)} />
        </td>
        <td>Comment:        
                <input 
                        style={{width:120}} 
                        type="string" 
                        name={'comment'} 
                        placeholder={'optional'}
                        value={pr.comment}
                        onChange={event=>handleChange(event)} />
        </td>
    </tr>
)

const showProductIdLine = (pr) => (
    <tr key={pr.id}>       
        <td>product ID:{pr.productId}</td>
        <td>Comment:{pr.comment}</td>
        <td>priceGroup:{pr.priceGroup}</td>
        <td colSpan={2} >productType:{pr.productType}</td>
    </tr>
)

const editProductLine = (pr, handleChange) => (
    <tr>         
        <td>Gender:        
            <select name={'gender'} value={pr.gender} onChange={event=>handleChange(event)}> 
                        <option value={undefined}>Undefined</option>
                        <option value={'Female'}>Female</option>
                        <option value={'Male'}>Male</option>
                        <option value={'Hen'}>Hen</option>
            </select>            
        </td>
        <td>Color:        
            <input 
                    style={{width:60}} 
                    type="string" 
                    name={'color'} 
                    placeholder={'optional'}
                    value={pr.color===undefined?'Undefined':pr.color}
                    onChange={event=>handleChange(event)} />
                    
        </td>     
        <td>Toe:        
            <select name={'openToe'} value={pr.openToe} onChange={event=>handleChange(event)}> 
                        <option value={undefined}>Undefined</option>
                        <option value={'Open'}>Open</option>
                        <option value={'Closed'}>Closed</option>
            </select>            
        </td>
        <td>Heel:        
            <select name={'openHeel'} value={pr.openHeel} onChange={event=>handleChange(event)}> 
                        <option value={undefined}>Undefined</option>
                        <option value={'Open'}>Open</option>
                        <option value={'Closed'}>Close</option>
            </select>        
        </td>
        <td>Brand:        
            <select name={'brandId'} value={pr.brandId} onChange={event=>handleChange(event)}> 
                <option value={undefined}>Undefined</option>
                {BRAND.map(it => <option key={it.id} value={it.name}>{it.label}</option>)}
            </select>        
        </td>   
    </tr>   
)

const showProductLine = (pr) => (
    <tr>         
        <td>Gender:{pr.gender}</td>
        <td>Color:{pr.color}</td>     
        <td>Toe:{pr.openToe}</td>             
        <td>Heel:{pr.openHeel}</td>             
        <td>Brand:{pr.brandId}</td>            
    </tr>
)

const InventoryProduct = ({product, handleChange, edit}) => {
    return(
        <table>
            <tbody>
                {edit?editProductIdLine(product, handleChange):showProductIdLine(product)}
                {edit?editProductLine(product, handleChange):showProductLine(product)}                    
            </tbody>
        </table>
    )    
}

export default InventoryProduct;