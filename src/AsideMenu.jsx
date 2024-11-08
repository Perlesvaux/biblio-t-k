import {useState, useEffect} from 'react'
import './AsideMenu.css'

export default function AsideMenu({ icon, visible, swap, content, position }){

  const [visibility, setVisibility] = useState({button:false, aside: false})
  //const [fashion, setFashion] = useState({});
  //
  //useEffect(() => {
  //  if (visible){
  //    setFashion( { ...fashion , button: {"left":"-50%" }, aside:{"left":"0" } } )
  //  } else {
  //    setFashion( { ...fashion , button: {"left":"0" }, aside:{"left":"-50%" } } )
  //  }
  //}, [visible])
  //

  const button = "display-table-of-contents " 
    + ( position==="right"
    ? "bottom-right " + ( visibility.button ? "show-right" : "hide-right"   )
    : "bottom-left "  + ( visibility.button ? "show-left"  : "hide-left"   ) )
  //const button = (position==="right")
  //  ? "display-table-of-contents bottom-right" 
  //  : "display-table-of-contents bottom-left"

  const aside = "sidenav " 
    + ( position==="right"
    ? "top-right " + ( visibility.aside ? "show-right" : "hide-right" )
    : "top-left " + (  visibility.aside ? "show-left"  : "hide-left"   ) )


  //if (visible){
  //  button 
  //
  //}

  //if ( visible ){
  //  button += "hide-left"
  //} else {
  //  button 
  //}

  //const fashion = ( visible )
     //right
    //? { button: {"left":"100%" }, aside:{"left":"0" } }
    //: { button: {"left":"0" }, aside:{"left":"100%" } }
    // left
    //? { button: {"left":"-50%" }, aside:{"left":"0" } }
    //: { button: {"left":"0" }, aside:{"left":"-50%" } }


  return (<>
    {console.log("AsideMenu")}
    <button 
      className={ button }
      onClick={ ()=>{setVisibility({...visibility, button:!visibility.button, aside: !visibility.aside })} }
    >
      <img src={icon} alt="menu icon" />
    </button>

    <aside
      className={ aside }
      dangerouslySetInnerHTML={{__html:content}}
    /> 
  </>)



}
