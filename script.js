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
  const apiURL = "https://favqs.com/api/qotd";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.quote.author === "") {
      authorTxt.innerText = "Unknown author";
    } else {
      authorTxt.innerText = data.quote.author;
    }
    if (data.quote.body.length > 50) {
      quoteTxt.classList.add("long-quote");
    } else {
      quoteTxt.classList.remove("long-quote");
    }
    console.log(data.quote.body);
    quoteTxt.innerText = data.quote.body;
    hideLoading();
  } catch (error) {
    console.log("Error", error);
  }
}

// eventListeners

newQuoteBtn.addEventListener("click", getQuote);

// Load

getQuote();
