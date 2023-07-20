import React, {Component} from 'react';
import { connect } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import SizePicker from './SizePicker';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import tkColors from 'Settings/tkColors'
import {LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'
import { addItem } from 'redux/actions/actionsShop'
import config, {SHOP_IMAGE_DIR} from 'Settings/config';
import {setProductList} from 'redux/actions/actionsProducts'
import {RemoveDuplicates} from 'scenes/Shop/ProductFilterNew'
import withListFromStore from 'Components/Table/withListFromStore'
import withRouter from 'functions/withRouter'

const imageUrl=config[process.env.NODE_ENV].apiBaseUrl + SHOP_IMAGE_DIR

const styles = {
  root:{
    // display:'inline-block',  
    width:'100%',
    maxWidth:800,
    marginRight:'auto',
    marginLeft:'auto',
  },
  imageContainer:{
    position:'relative',
    width:'100%',
    marginBottom:2,
    backgroundColor:tkColors.Beige.Light,
    pointer:'cursor',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  button: {
    border:0,
    padding:0,
    color:tkColors.color,
  },
  cardMedia:{
    cursor:'pointer'
  }

};

const ProductCard = ({product, language}) => {
  const navigate = useNavigate()
  return(
    <Card>
      <CardHeader
        title=
        {
          product.counter != null && product.counter > 0?
          language===LANGUAGE_SV?'För att lägga i kundvagn välj storlek och klackhöjd'
          :language===LANGUAGE_ES?'Para agregar al carro, elija el tamaño y la altura'
          :'To put in shopping cart choose size and heel height'
          :null
        }
        subtitle=
        {
          product.counter != null && product.counter > 0?
          language===LANGUAGE_SV?'tkColors.Text.Light och klackhöjd'
          :language===LANGUAGE_ES?'Elige el tamaño y la altura del talón'
          :'Choose size and heel height'
          :null
        }
      />
      <CardTitle title={
          product.counter != null && product.counter > 0?
          product.name?product.name
          :product.productId
          :language===LANGUAGE_SV?'Vänligen kontakta Tangokompaniet för information om produkt: ' + product.productId
          :language===LANGUAGE_ES?'Por favor, póngase en contacto con Tangok Company para obtener información del producto' + product.productId
          :'Please contact Tangokompaniet for info about product:' + product.productId
        }
        subtitle={product.price > 0?'Pris: ' + product.price + ' SEK':
          language===LANGUAGE_SV?'Pris fås från TK':language===LANGUAGE_ES?'Consultar precio en TK':'Ask for price at TK'}
      />

    {product.images.map(im =>
        <CardMedia style={styles.cardMedia}>
        <div style={styles.imageContainer} onClick={()=>navigate(-1)}>
          <img src={imageUrl + im.replace('_thumb', '')} style={{position:'relative', width:'100%'}} alt={'produkt:' + product.productId} />
        </div>
        </CardMedia>
    )}

    </Card>
  )
};

class ProductShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
    };
    this.onChange = this.onChange.bind(this);
    this.getPickList = this.getPickList.bind(this);
  };


  
  onChange = (value, product) => {
    // Reduce prodct to payload for shoppingCart
    const payload={
        productType:product.productType,
        productId:product.productId, 
        price:product.price, 
        image:product.images[0],
        value,
     }
     this.props.onClick(payload);
  }

  getPickList(inventoryList)
  { 
    let pickList=[];
    inventoryList.forEach(iv => {
       if (iv.counter > 0) {
          pickList.push('Size:' + iv.size + ' Color:' + iv.color + ' Heel:' + iv.heel);  
       } 
    })
    return(pickList)
  }


  render() {
    const productId = this.props.params.productId;
    const uniqueList = RemoveDuplicates(this.props.list, 'productId');
    let product = uniqueList.find(it => it.productId === productId);
    // let productId = product?product.productId:0;
    let inv = product?product.inv?product.inv:null:null;
    let price = product?product.price > 0?product.price:0:0;
    if (product) {
      console.log('product:', product?product:null);
      console.log('productId:', productId);
      console.log('sizes:', inv?inv:[]);
      console.log('price:', price);
    }
    return (
      <div style={styles.root}>
        {product?
          <div>
              {this.state.value===''?
                <span style={{float:'left', paddingRight:20}}>
                  {inv?inv.length > 0?
                    <SizePicker  
                      value={this.state.value}
                      inv={inv} 
                      language={this.props.language}
                      onChange={(event, key, value)=>this.onChange(value, product)}
                    />
                  :
                    null
                  :
                    null  
                  }
                </span>
                :null
              }
            <div style={{clear:'both'}}>
            </div>  
            <div>  
            <ProductCard product={product} language={this.props.language} history={this.props.history} />  
            </div>
          </div>
        :<h4 style={{color:tkColors.Purple.Light}}>WARNING: Item with productId={productId} could not be found</h4>}  
      </div>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    username:'',
    password:'',
    language:state.language,
    list: state.products.list,
    filterKeys: state.filterKeys,
    url:'/getProducts',  
  }
}    


// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      onClick: (payload, value) => {
        return(dispatch(addItem(payload)))
      },
      setList: (list) => { dispatch(setProductList(list)) },
  }        
}



export default connect( 
  mapStateToProps,
  mapDispatchToProps,
) (withListFromStore(withRouter(ProductShow, true)));    

