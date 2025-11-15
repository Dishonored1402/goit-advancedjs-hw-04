import{a as y,S as b}from"./assets/vendor-BprjmLGJ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const E="53252560-1c4ffe9c456d309b0775dfd67",P="https://pixabay.com/api/";y.defaults.baseURL=P;async function M(r,t=1,o=15){const s={key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o};return(await y.get("",{params:s})).data}const l=document.querySelector(".gallery");let c=null;function I(){l&&(l.innerHTML="")}function $(r){if(!l||!r.length)return;const t=r.map(({webformatURL:o,largeImageURL:s,tags:e,likes:n,views:i,comments:q,downloads:v})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${e}"
            loading="lazy"
          />
        </a>
        <div class="gallery-info">
          <p><span>Likes</span>${n}</p>
          <p><span>Views</span>${i}</p>
          <p><span>Comments</span>${q}</p>
          <p><span>Downloads</span>${v}</p>
        </div>
      </li>`).join("");l.insertAdjacentHTML("beforeend",t),c?c.refresh():c=new b(".gallery a",{captionsData:"alt",captionDelay:250})}const A=document.querySelector(".search-form"),H=document.querySelector(".search-input"),p=document.querySelector(".load-more"),g=document.querySelector(".loader"),L=document.querySelector(".end-message"),O=15;let d="",a=1,u=0,f=!1;A.addEventListener("submit",_);p.addEventListener("click",x);async function _(r){r.preventDefault();const t=H.value.trim();if(!t){window.alert("Please enter a search term.");return}d=t,a=1,u=0,I(),m(),S(),await w()}async function x(){f||await w()}async function w(){if(d){f=!0,B(),S();try{const r=await M(d,a,O),{hits:t,totalHits:o}=r;if(a===1&&(u=o||0),!t.length){a===1&&window.alert("Sorry, there are no images matching your search query. Please try again."),h(),m();return}$(t),document.querySelectorAll(".gallery-item").length>=u?(m(),R()):D(),a>1&&C(),a+=1}catch(r){console.error(r),window.alert("Something went wrong. Please try again later.")}finally{h(),f=!1}}}function B(){g.classList.remove("is-hidden")}function h(){g.classList.add("is-hidden")}function D(){p.classList.remove("is-hidden")}function m(){p.classList.add("is-hidden")}function R(){L.classList.remove("is-hidden")}function S(){L.classList.add("is-hidden")}function C(){const r=document.querySelector(".gallery-item");if(!r)return;const t=r.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
