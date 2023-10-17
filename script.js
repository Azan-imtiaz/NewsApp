const API_KEY="1756bd1a6bce4492b2312060a7eb8f80";
// const API_KEY = process.env.API_KEY; // Access the environment variable
const url="https://newsapi.org/v2/everything?q=";





function footerLoad(){
 var footer = document.getElementById('foot');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'center';
    footer.style.alignItems = 'center'; 
   }
   setTimeout(footerLoad,5000);

   

window.addEventListener("load", ()=>
fetchNews("pakistan")
);

async function fetchNews(query){
    // const res =await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const res = await fetch(`/.netlify/functions/news?q=${query}`);

    const  data=await res.json();
    console.log(data.articles);
    bindData(data.articles);
}
function bindData(articles){
    const  newsCardTemplate=document.getElementById("template-news-card");
const cardsContainer=document.getElementById("cont");
cardsContainer.innerHTML='';
    articles.forEach( (article) => {
    
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
       filedataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

     
    });
}
 function filedataInCard(cardClone,article){
    const newsImage=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"asia/karachi"
    });
    newsSource.innerHTML=`${article.source.name}-${date}`;
     
    cardClone.firstElementChild.addEventListener("click",
    function(){
        window.open(article.url,"_blank");
    }
    );

}


let CurItem=null;

function onNavItemClick(SearchQuery){
    fetchNews(SearchQuery);
navItem=document.getElementById(SearchQuery);     
CurItem?.classList.remove('active');
CurItem=navItem;
CurItem.classList.add('active');

}

const searchText=document.getElementById("search-text");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    console.log('HELO');
  if(!query) return;  
  fetchNews(query);
})

function reload(){
    console.log("reload");
    window.location.reload();
}