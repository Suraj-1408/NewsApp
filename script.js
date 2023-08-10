const API_KEY="261ad33e10be45fbad47c824415381e3";
const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=>fetchNews("India"));

function reload(){
   window.location.reload();
}

async function fetchNews (query){
   const response = await fetch(`${url}${query}&apikey=${API_KEY}`); //Making a use of String Template
   
   //converting Response Data into JSON formate 
   const data=await response.json();

      bindData(data.articles);

}


function bindData(articles){
   const cardsContainer=document.getElementById("cards-container");
   const newsCardTemplate=document.getElementById("template-news-card");

   /*cardContainer is first made empty using below statement and then 
   with the help of API call new set of datas are loaded*/
   cardsContainer.innerHTML="";   //For avoiding calling API Twice

   articles.forEach((article) => {
      if(!article.urlToImage) return;

      const cardClone =newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone,article);
      cardsContainer.appendChild(cardClone);
   });

}


function fillDataInCard(cardClone,article){
   const newsImg=cardClone.querySelector('#news-img');
   const newsTitle=cardClone.querySelector('#news-title');
   const newsSource=cardClone.querySelector('#news-source');
   const newsDesc=cardClone.querySelector('#news-desc');



   newsImg.src=article.urlToImage;
   newsTitle.innerHTML=article.title;
   newsDesc.innerHTML=article.description;


   const date=new Date(article.publishedAt).toLocaleString("en-US",{
      timeZone:"Asia/Jakarta"
   });

   newsSource.innerHTML=`${article.source.name}.${date}`;

   cardClone.firstElementChild.addEventListener('click',()=>{
      window.open(article.url,"_blank");
   })
}


let curSelectedNav=null;
function onNavItemClick(id){
   fetchNews(id);

   const navItem=document.getElementById(id);

   curSelectedNav?.classList.remove('active');
   curSelectedNav=navItem;
   curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');


searchButton.addEventListener('click',()=>{
   const query=searchText.value;

   if(!query) return;
   fetchNews(query);
   curSelectedNav?.classList.remove("active");
   curSelectedNav=null;

});