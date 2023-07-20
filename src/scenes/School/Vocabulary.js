import React from 'react';
import tkColors from 'Settings/tkColors'
import TextShow from 'Components/Text/TextShow'

const styles = {
  root:{
    position:'relative',
    display:'flex',
    flexWrap:'wrap',
    alignItems:'flex-start',
    justifyContent:'space-evenly',
    paddingTop:20,
    fontSize:14,
    color:'#F0F8FF',
    marginBottom:50,
  },
  table:{
    padding:'2%',
    //float:'left',
    width:'46%',
    minWidth:640,
    //alignItems:'top',
    marginBottom:50,
  },
  thead:{
    //fontStyle:'italic',
    color:'red'
  },
  h1: {
    width:'100%',
    textAlign:'center',
    color:tkColors.black,
    textAlign:'center', 
  },
}


const TableA = () => 
<table class='table-grey'>
  <thead style={styles.thead}>
      <tr>
          <th colSpan={4}>Tango dancing figures (and related terms)</th>
      </tr>
      <tr>
          <th colSpan={3}>Translation</th>
          <th>Short Definitions</th>
      </tr>
  </thead>  

  <tbody>

    <tr>
        <th>Spanish</th>
        <th>English</th>
        <th>Swedish</th>
        <th/>
    </tr>

    <tr>
      <td>abrazo</td>
      <td>embrace, dance hold</td>
      <td>kram, fatting</td>
      <td/>
    </tr>

    <tr>
      <td>amague</td>
      <td>fake</td>
      <td>skensteg</td>
      <td>not completed step, just showing the intention</td>
    </tr>

    <tr>
      <td>arrastre</td>
      <td>arrastrar = to drag</td>
      <td>släpa</td>
      <td/>
    </tr>

    <tr>
      <td>barrida</td>
      <td>a sweep</td>
      <td>svepa</td>
      <td>as in sweep with a broom :-)</td>
    </tr>

    <tr>
      <td>base</td>
      <td>basic pattern</td>
      <td>grundsteg</td>
      <td>There are several basic patterns, all called "base".</td>
    </tr>

    <tr>
      <td colSpan={3}>boleo</td>
      <td>lower leg moves and makes a little kick in the air in some changes of direction</td>
    </tr>

    <tr>
      <td>cadena</td>
      <td>chain</td>
      <td>kedja</td>
      <td>repeating certain steps</td>
    </tr>

    <tr>
      <td>caminada</td>
      <td>caminar = walk</td>
      <td>promenad,gång</td>
      <td/>
    </tr>

    <tr>
      <td>calesita</td>
      <td>merry go round</td>
      <td>karusell</td>
      <td>merry go round, happens at the quebrada, if the man goes in a circle, see molinete</td>
    </tr>

    <tr>
      <td>corrida</td>
      <td>correr = to run</td>
      <td>löpning</td>
      <td>run, implies a short sequence of forward steps, rather than a basic</td>
    </tr>

    <tr>
      <td>corte</td>
      <td>cut</td>
      <td>avskuren</td>
      <td/>
    </tr>
  
    <tr>
      <td>cruzada</td>
      <td>cruzar=to cross</td>
      <td>korsning</td>
      <td/>
    </tr>

    <tr>
      <td>cunita</td>
      <td>cradle</td>
      <td>vaggan</td>
      <td/>
    </tr>

    <tr>
      <td>enrosque</td>
      <td>corkscrew, twist</td>
      <td>korkskruv,vridning</td>
      <td/>
    </tr>

    <tr>
      <td>entrada</td>
      <td>entrance</td>
      <td>entren</td>
      <td/>
    </tr>

    <tr>
      <td>firulete</td>
      <td>embellishment, ornament</td>
      <td>utsmyckning</td>
      <td/>
    </tr>

    <tr>
      <td>freno</td>
      <td>brake</td>
      <td>broms</td>
      <td/>
    </tr>

    <tr>
      <td>gancho</td>
      <td>a hook</td>
      <td>krok</td>
      <td/>
    </tr>

    <tr>
      <td>giro</td>
      <td>a turn</td>
      <td>sväng</td>
      <td/>
    </tr>
    
    <tr>
      <td>lapiz/planeo</td>
      <td>pencil</td>
      <td>pennan</td>
      <td/>
    </tr>
    
    <tr>
      <td>llevar</td>
      <td>to lead, to carry</td>
      <td>föra</td>
      <td/>
    </tr>
    
    <tr>
      <td colSpan={3}>illevada</td>
      <td>a carry, happens when the leader uses the upper thigh to "carry" the follower's leg top the next step, needs illustration to understand!</td>
    </tr>
    
    <tr>
      <td colSpan={3}>marcar</td>
      <td />
    </tr>
    
    <tr>
      <td>media vuelta</td>
      <td>half turn</td>
      <td>halv snurr</td>
      <td/>
    </tr>

    <tr>
      <td  rowspan="2" colSpan="3">Milonga</td>
      <td>dance, mother of tango</td>
    </tr>
      <tr>
        <td>dancing hall, where tango is danced</td>
      </tr>
  
    <tr>
      <td>molinete</td>
      <td>molino = mill, as in windmill molinete = grapevine</td>
      <td>mölla, väderkvarn</td>
      <td>a dance move, in A. Tango this is typically in a circle around the leader</td>
    </tr>
  
    <tr>
      <td>mordida(=sanguche&gt;</td>
      <td>morder = to bite,sandwich</td>
      <td>bita, sandwich</td>
      <td>The foot of one partner is "trapped" between the two feet of the other partner.If the legs of this other partner are crossed, then it is a reverse mordida.</td>
    </tr>
  
    <tr>
      <td>ocho</td>
      <td>eight</td>
      <td>åtta</td>
      <td>painting an 8 on the floor with (normally the woman's) feet either moving the feet either backwards or forwards, note the possibility of making an eight forward backward and an eight backward forward since the direction in the room is not the same as the direction of the feet!</td>
    </tr>
  
    <tr>
      <td>ocho cortado</td>
      <td>cut eight</td>
      <td>avskuren åtta</td>
      <td>happens when for example an ocho-like movement is stopped and sent back upon itself. Typical in club style where many such brakes are used to avoid collisions!</td>
    </tr>
  
    <tr>
      <td>parada</td>
      <td>a stop</td>
      <td>stopp</td>
      <td>many different</td>
    </tr>
  
    <tr>
      <td>quebrada</td>
      <td>break</td>
      <td>lutning</td>
      <td>a position where the woman stands on one foot, the other one hanging relaxed behind the standing foot, often seen with the woman hanging with all her weight against the man</td>
    </tr>
  
    <tr>
      <td>reverse mordida</td>
      <td>reverse sandwich</td>
      <td>omvänd sandwich</td>
      <td>making a sandwich crossing your feet</td>
    </tr>

    <tr>
      <td>rulo</td>
      <td>curl</td>
      <td>cirkelrörelse med foten</td>
      <td/>    
    </tr>

    <tr>
      <td>sacada</td>
      <td>a displacement of the feet</td>
      <td>bortflyttning av fot</td>
      <td/>
    </tr>

    <tr>
      <td>salida</td>
      <td>exit, basic walking pattern</td>
      <td>utgång,ett grundsteg</td>
      <td>first steps of dancing tango, derived from:<br /> "Salimos a bailar" = Shall we (go out to the dance floor and) dance?</td>
    </tr>

    <tr>
      <td>sentada</td>
      <td>sentar = to sit</td>
      <td>sitta</td>
      <td>the woman more or less sit (on her partner's knee)</td>
    </tr>

    <tr>
      <td>volcada</td>
      <td>to tilt</td>
      <td>välta, tilta</td>
      <td>using an increase of inclementation to get the womans weight front and one of her legs front often in a circle</td>
    </tr>
  </tbody>
</table>

const TableB = () =>  
<table className='table-grey'>
  <thead style={styles.thead}>
    <tr>
      <th colSpan="4">General Tango Terms</th>  
    </tr>  
    <tr>
      <th>Term</th>  
      <th colSpan="3">Explanation</th>  
    </tr>  
  </thead>
  <tbody>

    <tr>
      <td rowSpan="4" colSpan="3">Canyengue</td>
      <td>Arrabalero, of low social status.</td>
    </tr>

      <tr>
        <td>A way of interpreting or dancing tango</td>
      </tr>

      <tr>
        <td>A reunion (party) where the people from the arrabal (the slums) dance.</td>
      </tr>
      
      <tr>
        <td>The sound obtained from the double bass when the strings are hit rhytmically with the hand and the bow.</td>
      </tr>

    <tr>
      <td rowSpan="3" colSpan="3">Candombe</td>
      <td>A type of dance danced by (originally) the descendants of black slaves in the Rio de la Plata region.</td>
    </tr>

      <tr>
        <td>A type of african-origin music with a marked rhythm played on a "tamboril" (kind of drum).</td>
      </tr>

      <tr>
        <td>The place where the blacks congregated to dance.</td>
      </tr>

    <tr>
      <td rowSpan="5" colSpan="3">Tango</td>
      <td>Popular music from the Rio de la Plata region dating back to the middle of the XIX century. It was defined by a 2 x 4 beat until the decade of the '20s in the XX century, and a 4 x 8 beat thereafter. The 2 x 4 beat came back with for example D'Arienzo.</td>
    </tr>

      <tr>
        <td>A type of african-origin music with a marked rhythm played on a "tamboril" (kind of drum). dance where an embraced couple perform a series of (sometimes intricate) patterns primarily with their legs, to the rhythm of tango m</td>
      </tr>

      <tr>
        <td>Direct descendant of the Candombe, Habanera, Milonga, and (by some tango scholars) the Tango Andaluz.</td>
      </tr>

      <tr>
        <td>The place where the blacks congregated to dance to the rhythm of drums.</td>
      </tr>

      <tr>
        <td>(Note: entire books and lives have been dedicated to the search for the ultimate definition or origin of the word "tango", i.e., this is only a minimal subset of the available definitions.)</td>
      </tr>
    
    <tr>
      <td rowSpan="4" colSpan="3">Milonguero</td>
      <td>A man who likes to attend the milongas. A person whose life revolves around dancing tango and the philosophy of tango.</td>
    </tr>
      <tr>
        <td>Often used as a name for a tangostyle with a close embrace and with the contact focused on the chests.</td>
      </tr>
      <tr>
        <td>Payador pueblero (traveling folk-music singer.)</td>
      </tr>
      <tr>
        <td>A title given <em>by other tango dancers</em> to a man who has mastered the tango dance and embodies the essence of the tango.</td>
      </tr>
    
    <tr>
      <td rowSpan="4" colSpan="3">Milonguera</td>
      <td>Female dancer (for hire) of the early dance halls, cabarets, and nightclubs.</td>
    </tr>
      <tr>
        <td>A woman who likes to attend the milongas.</td>
      </tr>
      <tr>
        <td>A woman whose life revolves around dancing tango and the philosophy of tango.</td>
      </tr>
      <tr>
        <td>A title given <em>by other tango dancers</em> to a woman who has mastered the tango dance and embodies the essence of the tango.</td>
      </tr>  

    <tr>
      <td colSpan="3">Milonguita</td>
      <td>A woman of loose morals, often times a prostitute.</td>
    </tr> 

    <tr>
      <td colSpan="3">Tango Liso</td>
      <td>A way of dancing tango characterized by its lack of fancy figures or patterns. Only the most "basic" tango steps and figures are utilized, e.g., caminadas, ochos, molinetes, etc. Ganchos, sacadas, boleos and other fancy moves (such as leaps, sentadas, and all acrobatics in general) are not done.</td>
    </tr>
    
    <tr>
      <td colSpan="3">Tango de Salon</td>
      <td>Also here we have different meanings. Tango Salon is the tango dance in the saloons... But that has changed during the lifetime of Tango and therefore Tango Salon and Milonguero was the same 1930. A way of dancing tango characterized by slow measured moves. For others Tango Salon includes all of the "basic" tango steps and figures plus some sacadas, giros, and low boleos. The emphasis is on precision. The dancing couple remains at a "proper" distance from each other, i.e., their bodies are *not* in a close embrace. This is what happened to the tango when the French and the English got a hold of it in the early part of the century (pre-World War I)
        the terms 'Tango de Salon' and 'Tango Milonguero' seem to be interpreted differently by different dancers and teacher, so one should be aware that other people might think of something different when they talk about 'Tango de Salon'</td>
    </tr>

    <tr>
      <td colSpan="3">Tango Danza</td>
      <td >Tango dance (in Spanish).</td>
    </tr>
    <tr>

      <td colSpan="3">Tango for Export</td>
      <td>A way of dancing tango much derided by the milongueros of Buenos Aires. It's a tango without soul. This is a tango that plays well in the cabarets of Paris, New York, Berlin, or Tokyo because most of what made it a Porte~no dance (one that spoke directly to the soul of the Argentino) has been stripped away, leaving only the fancy moves and pseudo passion for the enjoyment of an exotic- loving public.</td>
    </tr>

    <tr>
      <td colSpan="3">Tango Fantasia</td>
      <td>This a hybrid tango, but there are also different explications of what it is. Is it a new thing with coreography or a tango with improvisation as it was in the beginning (Candombe).</td>
    </tr>

    <tr>
      <td colSpan="3">Tango Orillero</td>
      <td>Orillero means "of the outskirts". Thus, this was a style of dancing tango that was "outside" of the prevalent way of dancing. Nowadays, is more defined by its quick moves, kicks, and acrobatics. See "Juan Bruno" for more details.... ;-)</td>
    </tr>

    <tr>
      <td colspan="4">I found a lot of the definitions at Garrit Fleischmanns pages, where there's translations to german and english , see links !<br /> You are all invited to add further definitions to this list.</td>
    </tr>
  </tbody>
</table>

const _OldBody = () =>
<TextShow url={'/getTexts'} groupId={'Vocabulary'} textId={'Text'}>
  <tables />
</TextShow>  

const Body = () =>
<>
  <div style={{...styles.table, clear:'both'}}>
    <TableA />
  </div>
  <div style={styles.table}>
    <TableB />
  </div>
</>


// More components
const Vocabulary = (props) => 
    <div style={styles.root}>
      <h1 style={styles.h1}>Daniels tangovocabulary</h1>
      <Body />
    </div>

export default Vocabulary;
