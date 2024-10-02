
import { users } from "../data/users.js";
import { login_data } from "../data/login-data.js";
// import { login_datas } from "./functions.js";

// function saveLoginDataToLocalStorage() {
//   localStorage.setItem('loginData', JSON.stringify(login_data));
// }

function loadLoginDataFromLocalStorage() {
  const savedData = localStorage.getItem('loginData');
      return JSON.parse(savedData);
      
}
const login_datas = loadLoginDataFromLocalStorage();
console.log(login_datas)
console.log(loadLoginDataFromLocalStorage())
function calculateDistanceBetween(element){
    const origin = login_data.location;
    const destination = element.location;
    

const service = new google.maps.DistanceMatrixService();

const request = {
  origins: [origin],
  destinations: [destination],
  travelMode: google.maps.TravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.IMPERIAL,
}
return new Promise((resolve, reject) => {
  service.getDistanceMatrix(request, function (response, status) {
    if (status === "OK") {
      const result = response.rows[0].elements[0];
      if (result.status === "OK") {
        const distanceText = result.distance.text; // Get the human-readable distance
        element.distance = distanceText; // Store the distance in the element object
        resolve(element); // Resolve the promise once distance is available
      } else {
        reject(`Error: Distance not found for ${element.name}`);
      }
    } else {
      reject(`Error: DistanceMatrixService failed with status ${status}`);
    }
  });
});
}
// let login_datas = loadLoginDataFromLocalStorage();
// console.log(login_datas); // Check the loaded data


async function generateUserProfiles() {
let usersHTML = '';
for (const element of users) {
  let sportsHTML = '';
    element.sports.forEach((sport) =>{
    sportsHTML += `<div class="sports-item">${sport}</div>`});
    try {
      await calculateDistanceBetween(element);
    } catch (error) {
      console.error(error);
      element.distance = 'N/A'; // Default in case of an error
    }
    for(let i =0; i<login_datas.sports.length; i++){
      if(element.sports.includes(login_datas.sports[i])){
        usersHTML += `
        <div class="profile-placeholder">
              <div class="profile-pic-container">
                <img
                  class="profile-pic"
                  src="${element.image}"
                  alt="serena-williams"
                />
              </div>
              <div class="info-container">
                <div class="name-and-distance-info">
                  <div class="user-name">${element.name}</div>
                  <div class="user-distance">${element.distance}</div>
                </div>
                <div class="description">${element.description}</div>
                <div class="sports-list">
                  ${sportsHTML}
                </div>
              </div>
            </div>`
        break;
      }
    }
}
console.log(login_datas)
document.querySelector('.profile-section').innerHTML = usersHTML;}
generateUserProfiles();


const discoverSection = document.querySelector('.discover-section');
const bar = document.querySelector('.bar');

discoverSection.addEventListener('mouseenter', () => {
    bar.style.width = '0px';
});

discoverSection.addEventListener('mouseleave', () => {
    bar.style.width = '100px'; // Original width
});