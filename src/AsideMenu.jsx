import {useState, useEffect} from 'react'
import './AsideMenu.css'

export default function AsideMenu({ icon, visible, swap, content, position }){

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
    ? "bottom-right " + ( visible ? "hide-right" : "show-right" )
    : "bottom-left "  + ( visible ? "hide-left" : "show-left" ) )
  //const button = (position==="right")
  //  ? "display-table-of-contents bottom-right" 
  //  : "display-table-of-contents bottom-left"

  const aside = "sidenav " 
    + ( position==="right"
    ? "top-right " + ( visible ? "show-right" : "hide-right" )
    : "top-left " + ( visible ? "show-left" : "hide-left" ) )


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
    <button 
      className={ button }
      onClick={ swap }
    >
      <img src={icon} alt="menu icon" />
    </button>

    <aside
      className={ aside }
      dangerouslySetInnerHTML={{__html:content}}
    /> 
  </>)



}
