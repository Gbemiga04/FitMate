import { login_data } from "../data/login-data.js";

function saveLoginDataToLocalStorage() {
    localStorage.setItem('loginData', JSON.stringify(login_data));
  }
    
export function addLocation(){
        if (document.querySelector('.pac-target-input').value != ""){
        login_data.location = { lat: 42.7168, lng: -74.0060 }
        console.log(login_data.location)
        saveLoginDataToLocalStorage();
        window.location.pathname = "index.html" 
        }
    }

function createAccount(){
    login_data.firstname = document.querySelector('.firstname').value;
    login_data.lastname = document.querySelector('.lastname').value;
    login_data.username = document.querySelector('.username').value;
    login_data.password = document.querySelector('.password').value;
    console.log(login_data)
    document.querySelector('.username').innerHTML = login_data.firstname
    document.querySelector('.tag').innerHTML = login_data.username
}
function addSport(){

}
export var lists = []
const buttons = document.querySelectorAll('.sports-class');
let toggle = false;
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the text content of the clicked button
        const buttonText = this.textContent;
        login_data.sports.push((buttonText));
        lists.push((buttonText))
        console.log(login_data);});


    })
export const login_datas = login_data;
// export const login_data =
//     {
//         id: "",
//         image: "",
//         firstname: "",
//         lastname:"",
//         username:"",
//         password:"",
//         distance: "",
//         description: "",
//         sports: ["Basketball", "Tennis"],
//         location: { lat: 42.7128, lng: -74.0060 }
//     }



