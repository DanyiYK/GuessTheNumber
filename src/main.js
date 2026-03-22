import './style.css'

const app = document.querySelector("#id");
const path_name = document.location.pathname;

switch(true){
  case path_name==="/game":
  // Return game layout  
  break;

  default:
    // Return a 404
    break;
}