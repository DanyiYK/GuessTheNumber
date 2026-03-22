import { GameLayout } from './layouts/GameLayout';
import { NotFoundLayout } from './layouts/NotFoundLayout';
import './style.css'

const app = document.querySelector("#app");
const path_name = document.location.pathname;

switch(true){
  case path_name==="/":
    document.location.pathname = "/game";
    
    break;
  case path_name==="/game":
    app.append(GameLayout()); 

    break;

  default:
    app.append(NotFoundLayout());

    break;
}