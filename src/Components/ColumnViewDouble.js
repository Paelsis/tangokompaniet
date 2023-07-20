import React, {useState} from "react"
import { connect } from 'react-redux'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ViewThumb from '../image/ViewThumb'

const styles = {
  root:{
    marginTop:'1.45rem',
  },
  thumbnail:(open) => ({
    height:128, 
    border:open?'2px dotted #333':'0px',
    opacity:open?0.5:1.0,
  }),
  image: (im) =>({
    marginLeft:'auto',
    marginRight:'auto',
    maxHeight:im.large?'100vh':'65vh',
    transform: im.rotate?'rotate(' + im.rotate + 'deg)':null,
    transition:'500ms all ease'
  }),
}

const offset = 10

const Function = ({list, edit, setList}) => {
  const [startIndex, setStartIndex] = useState(0);
  // const checkboxOpen = (ix) => setList([...list.slice(0, ix), {...list[ix], open:list[ix].open?undefined:true}, ...list.slice(ix + 1)])
  const toggleLarge = (ix) => setList(list.map((it, index)=> ({...it, large:ix===index?list[ix].large?undefined:true:undefined})))
  const previous = () => {setStartIndex(Math.max(startIndex-2*offset, 0))
                          setList(list.map(it => ({...it, open:undefined})))}
  const next = () => {setStartIndex(startIndex + 2*offset > list.length?startIndex:startIndex + 2*offset) 
                      setList(list.map(it => ({...it, open:undefined})))}
  const newList = list.length >0?list.find((it, index) => (index >= startIndex && index < startIndex + 2*offset && it.open))?list
    :[...list.slice(0, startIndex), {...list[startIndex], open:true}, ...list.slice(startIndex + 1)]:[]
  const className="column is-one-quarter-mobile is-one-third-tablet is-half-desktop"   
  return(
    <div style={styles.root} className="columns is-centered">
      <div className="column is-full-mobile is-full-tablet is-one-quarter-desktop is-offset-1-desktop">
        <div className="columns is-centered is-multiline is-mobile">
          {newList.map((im, ix)=>
            (ix >= startIndex && ix < startIndex + offset) ?
              <div className="column is-one-third-mobile is-half-desktop" >
                    <ViewThumb 
                      edit={edit}
                      index={ix}
                      list={newList} 
                      setList={setList}
                    />
                  </div>  
            :null  
          )}
        </div>
        {newList.length > offset?
          <div className="buttons" >
              {startIndex!==0?
                <div className="button is-light" onClick={previous}>
                  <NavigateBeforeIcon />
                </div>
              :
                null  
              } 
          </div>
        :null}
      </div>
      <div className="column">
         {newList.map((im, index)=>
           im.open?
           <div style={{display:'flex', justifyContent:'center'}}>
                <figure  onClick={()=>toggleLarge(index)}>
                  <img src={im.src?im.src:im.thumbSrc} style={styles.image(im)} alt={im.src}/>
                  <figcaption className="has-text-dark">
                    <h4>{im.fname}</h4>
                    Här kommer text - {im.mdate}
                  </figcaption>
                </figure>
            </div>    
          :null)}
      </div>
      <div className="column is-full-mobile is-full-tablet is-one-quarter-desktop is-offset-1-desktop">
        <div className="columns is-centered is-multiline is-mobile">
            {newList.map((im, ix)=>
              (ix >= startIndex + offset && ix < startIndex + 2*offset) ?
                <div className="column is-one-third-mobile is-half-desktop" >
                    <ViewThumb 
                      edit={edit}
                      index={ix}
                      list={newList} 
                      setList={setList}
                    />
                </div>  
              :null  
            )}
        </div>
        {newList.length > 2*offset?
            <div className="buttons" >
              {newList.length - startIndex > 2*offset?
                <div className="button is-light" onClick={next}>
                  <NavigateNextIcon />
                </div>
              :
                null  
              }          
            </div>
          :null}
    </div>
    </div>
)}

const mapStateToProps = state => ({
  edit:state.navbar.edit,
})

export default connect(mapStateToProps, null)(Function)


