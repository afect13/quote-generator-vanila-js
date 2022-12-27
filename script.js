const quoteContainer = document.getElementById("quote-container");
const quoteTxt = document.getElementById("quote");
const authorTxt = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuote() {
  showLoading();
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json";
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    if (data.quoteAuthor === "") {
      authorTxt.innerText = "Неизвестный автор";
    } else {
      authorTxt.innerText = data.quoteAuthor;
    }
    if (data.quoteText.length > 50) {
      quoteTxt.classList.add("long-quote");
    } else {
      quoteTxt.classList.remove("long-quote");
    }

    quoteTxt.innerText = data.quoteText;
    hideLoading();
  } catch (error) {
    console.log("Ошибка", error);
  }
}

// eventListeners

newQuoteBtn.addEventListener("click", getQuote);

// Load

getQuote();
