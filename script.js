'use strict'
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')



// Get Quotes From Api
let apiQuotes = [];

//show Loading 
function loading(){
  loader.hidden = false;
  quoteContainer.hidden =true;
}
//hide Loading 
function complete (){
  loader.hidden = true;
  quoteContainer.hidden = false
}

// Show new Quote
function newQuote(){
  loading();
  // pick a random quote from API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
// check if author field is blank replace with quote unknown
if(!quote.author){
  authorText.textContent = 'Unknown';
} else{
  authorText.textContent = quote.author;
}

// Check quote length 
if (quote.text.length > 50) {
  quoteText.classList.add('long-quote');
} else {
  quoteText.classList.remove('long-quotes');
}

 quoteText.textContent = quote.text;

 //hide loader
 complete();
}

async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes' ;
  try{
const response = await fetch(apiUrl);
apiQuotes = await response.json();
newQuote();
  }catch (error){
    // Catch Error Here
  }
  complete();
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank') 
}
// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on Load
getQuotes();
