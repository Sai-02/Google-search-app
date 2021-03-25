const apiKey = `AIzaSyB7cwx0hAbw1KtZEMRTitDbdv1biUALGcI`;
const searchId = `c08585697f416761f`;

// Variables intialisation
const homePageInput = document.getElementById("input");
const homePageSearchBarBtn = document.querySelector(".search-bar-btn");
const searchPageInput = document.getElementById("searchPage-input");

// Searching for response

const searchForResponse = () => {
  console.log("searching response");
};

// Listening Events
homePageSearchBarBtn.addEventListener("click", searchForResponse);
homePageInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    searchForResponse();
  }
});
searchPageInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    searchForResponse();
  }
});
