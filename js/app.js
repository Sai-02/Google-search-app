const apiKey = `AIzaSyB7cwx0hAbw1KtZEMRTitDbdv1biUALGcI`;
const searchId = `c08585697f416761f`;

// Variables intialisation
const homePage = document.getElementById("home-page");
const searchPage = document.getElementById("search-page");
const homePageInput = document.getElementById("input");
const homePageSearchBarBtn = document.querySelector(".search-bar-btn");
const searchPageInput = document.getElementById("searchPage-input");
const searchResponseContainer = document.querySelector(
  ".search-reponse-container"
);

// Searching for response

const isValidText = (text) => {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return !format.test(text);
};
const fetchData = async (searchText) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchId}&q=${searchText}`
    );

    let jsonData = await response.json();
    console.log(jsonData);
    return await jsonData;
  } catch (e) {
    console.log(e.text);
    return "error";
  }
};
const populateError = () => {
  console.log("error occured");
};
const populateResponse = (response) => {
  let html = ``;
  const { items, searchInformation } = response;
  html += `
  <p class="time-result">About ${searchInformation.formattedTotalResults} results (${searchInformation.formattedSearchTime}) seconds</p>
  `;
  items.forEach((item) => {
    html += `
    <article class="response-article">
            <p>
              <a href=${item.link}>${item.displayLink}</a>
              <span class="response-article-icon-container">
                <i class="fas fa-caret-down"></i>
              </span>
            </p>
            <h2 class="response-title">
              <a href=${item.link}>${item.title}</a>
            </h2>
            <p class="response-para">
             ${item.snippet}
            </p>
          </article>
    `;
  });
  searchResponseContainer.innerHTML = html;
  searchPage.style.display = "grid";
};
const searchForResponse = async (searchText) => {
  if (isValidText(searchText)) {
    homePage.style.display = "none";
    searchPage.style.display = "none";
    let response = await fetchData(searchText);

    if (typeof response === "string") {
      populateError();
    } else {
      populateResponse(response);
      searchPageInput.value = searchText;
    }
  } else {
    alert("Entered text is not valid\nRemove Special Characters");
  }
};

const isEmptyText = (text) => text === "";

// Listening Events
homePageSearchBarBtn.addEventListener("click", () => {
  if (!isEmptyText(homePageInput.value)) {
    searchForResponse(homePageInput.value);
  }
});
homePageInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (!isEmptyText()) {
      searchForResponse(homePageInput.value);
    }
  }
});
searchPageInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (!isEmptyText()) {
      searchForResponse(searchPageInput.value);
    }
  }
});
