import React from 'react';
import { withBreakpoints } from 'react-breakpoints'
import {Link} from 'react-router-dom'
import {tkColors} from 'Settings/tkColors';
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import {FilterList, RemoveDuplicates} from 'scenes/Shop/ProductFilterNew'

const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + SHOP_IMAGE_DIR

const styles={
  root:{
   display:'block', 
  },
  imageOverlay:{
    position:'absolute',
    width:'100%', 
    height:'100%', 
  },
  containerTitle:{
    position: 'absolute', /* Position the background text */
    top: 0, /* At the bottom. Use top:0 to append it to the top */
    background: '#7b0323', /* Black background with 0.5 opacity */
    width: '100%', /* Full width */
    color:tkColors.background,
    padding:0,
    paddingTop: 15, /* Some padding */
    marginLeft:2,
    marginRight:2,
  },
  title:{
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight:300,
    fontStyle:'italic', 
   
  }
}

const _width = (breakpoints, currentBreakpoint) =>
  breakpoints[currentBreakpoint] <= breakpoints.mobile?'50%'
  :breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?'33%'
  :breakpoints[currentBreakpoint] <= breakpoints.tablet?'33%'
  :breakpoints[currentBreakpoint] <= breakpoints.tabletLandscape?'20%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktop?'20%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktopLarge?'12.5%'
  :breakpoints[currentBreakpoint] <= breakpoints.desktopWide?'10%'
  :'12.5%'
const _height = (breakpoints, currentBreakpoint) =>
  breakpoints[currentBreakpoint] <= breakpoints.mobile?160
  :breakpoints[currentBreakpoint] <= breakpoints.mobileLandscape?220
  :breakpoints[currentBreakpoint] <= breakpoints.tablet?220
  :breakpoints[currentBreakpoint] <= breakpoints.tabletLandscape?180
  :breakpoints[currentBreakpoint] <= breakpoints.desktop?220
  :breakpoints[currentBreakpoint] <= breakpoints.desktopLarge?140
  :breakpoints[currentBreakpoint] <= breakpoints.desktopWide?120:
  220

const Product = ({width, height, product}) => {
  const backgroundColor=tkColors.background
  const localStyles =  { 
      container:{
        display:'block',
        position:'relative',
        float:'left', 
        width,
        height,
        backgroundColor:backgroundColor,
      },
    }

    return(
      <div style={localStyles.container}>
        <img style={{width:'80%', margin:'10%'}} src={imageUrl + product.images[0]} alt={'loading image ...'} />
        <div style={styles.containerTitle}>  
          <div style={styles.title} >{product.productId}</div>
        </div>  
      </div>
    )    
}

// Render Product list with filter for the current productType
const ProductList = ({breakpoints, currentBreakpoint, list, filterKeys}) => {
  console.log('ProductList: length:', list.length)
  console.log('imageUrl:', imageUrl)
  const uniqueList = RemoveDuplicates(list, 'productId');
  const filterList = FilterList(uniqueList, filterKeys);
  const width = _width(breakpoints, currentBreakpoint)
  const height = _height(breakpoints, currentBreakpoint)
  console.log('filtetList:', filterList)
  return ( 
    <div style={styles.root}>
        {filterList.sort((a,b) => (a.productId.localeCompare(b.productId))).map(it =>
            <Link to={'/productshow/' + it.productId} >
              <Product 
                width={width} 
                height={height} 
                product={it} 
              />
            </Link>
        )}
        <div style={{clear:'both'}}/>
    </div>
  );
}  

// filter((it)=>itemTypeText(it.productType)==productType).map((it) =>( 
/*
            <GridTile

              key={it.id}
              title={it.productName}
              titleStyle={styles.title}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
            </GridTile>

  <Link to={'/productshow/'+it.productId} >
    <h1>{it.image}</h1>
  </GridTile> 
*/
export default withBreakpoints(ProductList);    
