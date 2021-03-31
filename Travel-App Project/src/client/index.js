import {handleSubmit} from "./js/app.js";
import './styles/style.scss'
import './styles/responsive.scss'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault() // for prevent page refershing
        handleSubmit();
    });
});
