 // Variables
let dxpElement = "dxp_recs";
let dxpTitle = "Titulo";
let dxpPlacementHome = "home_page.dxp_categories_recs";
let dxpPlacementCategories = "category_page.dxp_categories_recs";
let categoryIdCode = '0';
let apiClientKey = "2a52873853496275";

// Personalize
function categoryClick(category_id,category_url){
    injectCarousel(category_id);
    console.log(category_id);
    console.log(category_url);

    var lista = document.getElementsByClassName("categoryActive");
    for(var i = lista.length - 1; i >= 0; i--)
    {
        lista[i].classList.remove('categoryActive');
    }
        document.getElementById(category_id).classList.add("categoryActive");
    }

function buildCreatives(creativesJson) {
    let dxpCategoriesHTML = '';
    for (var i = 0, len = creativesJson.length; i < len; i++) {
        dxpCategoriesHTML += `<dd class="nav-item" id="${creativesJson[i].creatives[0].CATEGORY_ID}" onClick='javascript:categoryClick("${creativesJson[i].creatives[0].CATEGORY_ID}","${creativesJson[i].creatives[0].CATEGORY_URL}");'>
                ${creativesJson[i].creatives[0].TEXT}
            </dd>`;
    }
    let dxpTargetElement = document.querySelector("#dxp_categories") || 'nao achei o elemento';
    dxpTargetElement.innerHTML = dxpTargetElement.innerHTML + dxpCategoriesHTML;

}
function fetchCreatives() {
    var request = new XMLHttpRequest();
    const rcsValue = document.cookie.split("; ").find(row => row.startsWith(`rr_rcs=`));
    let dxpPlacement = "home_page.dxp_categories_01|home_page.dxp_categories_02|home_page.dxp_categories_03|home_page.dxp_categories_04|home_page.dxp_categories_05";
    var url = "https://recs.algorecs.com/rrserver/api/personalize?apiKey=e20fd45b1e19a8c6&apiClientKey="+ apiClientKey +"&placements=" + dxpPlacement ;
    if (typeof window.R3_COMMON != "undefined") {
        if (typeof window.R3_COMMON.categoryId != "undefined") {
            //url += "&categoryId=" + R3_COMMON.categoryId
        }
        if (typeof window.R3_COMMON.productId != "undefined") {
            url += "&productId=" + R3_COMMON.productId
        }
        if (typeof window.R3_COMMON.sessionId != "undefined") {
            url += "&sessionId=" + R3_COMMON.sessionId;
        } else {
            url += "&sessionId=" + R3_COMMON.sessionId;
        }
        if (rcsValue) {
            url += "&rcs=" + rcsValue.split("=")[1];
        }
    } else {
        url += "&sessionId=test"
    }
    request.open("GET", url);
    request.send(null);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var json = JSON.parse(request.responseText);
                buildCreatives(json.placements);
            }
        }
    }
}
function insertElement() {
    let dxpInterval = setInterval(function () {
        let carousel = document.getElementById('dxp-carrossel-marcas');
        if (carousel && typeof carousel == 'object') {
            clearInterval(dxpInterval);
            let dxpTargetElement = document.querySelector("#product-listing-page > div > section") || null;
            if (typeof dxpTargetElement !== 'undefined' && dxpTargetElement !== null) {
                let experienceWrapper = document.getElementById('dxp-carrossel');
                dxpTargetElement.parentNode.prepend(experienceWrapper, dxpTargetElement);
                experienceWrapper.style.display = 'inline-flex';
            }
        }
    }, 10);
}
function startCreatives() {
    fetchCreatives();
    insertElement();
}

// Recs For Placements
function fetchProducts(categoryId) {
    console.log(categoryId);
    var request = new XMLHttpRequest();
    const rcsValue = document.cookie.split("; ").find(row => row.startsWith(`rr_rcs=`));
    if(categoryId == 0){
        var url = "https://recs.algorecs.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6" + "&apiClientKey="+ apiClientKey +"" + "&placements=" + dxpPlacementHome;
    }else{
        var url = "https://recs.algorecs.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6" + "&apiClientKey="+ apiClientKey +"" + "&placements=" + dxpPlacementCategories;
    }
    if(categoryId != "0"){
        url += "&categoryId=" + categoryId; 
    }
    if (typeof window.R3_COMMON != "undefined") {
        if (typeof window.R3_COMMON.categoryId != "undefined") {
            url += "&categoryId=" + R3_COMMON.categoryId
        }
        if (typeof window.R3_COMMON.productId != "undefined") {
            url += "&productId=" + R3_COMMON.productId
        }
        if (typeof window.R3_COMMON.sessionId != "undefined") {
            url += "&sessionId=" + R3_COMMON.sessionId;
        } else {
            url += "&sessionId=" + R3_COMMON.sessionId;
        }
        if (rcsValue) {
            url += "&rcs=" + rcsValue.split("=")[1];
        }
    } else {
        url += "&sessionId=test"
    }
    request.open("GET", url);
    request.send(null);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var json = JSON.parse(request.responseText);
                buildProducts(json.placements[0].recommendedProducts);
            }
        }
    }

}
// Products Carousel Layout Build
function buildProducts(products) {
    var dxpWindowWidth = window.innerWidth;
    (dxpWindowWidth < 600) ? dxpWindowWidth = "?imwidth=150" : dxpWindowWidth = "?imwidth=340";
    
    var html = `<div id="dxp-carrossel" class="owl-carousel owl-theme">`;
    for (var i = 0, len = products.length; i < len; i++) { 
        // Price layout
        if (products[i].salePriceCents == products[i].priceCents) {
            finalPrice = '<p class="dxp-precoCheio">R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
        } else {
            var fromPrice = '<p class="dxp-precoDe">De R$ ' + (parseInt(products[i].priceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
            var toPrice = '<p class="dxp-precoPor">Por R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
            finalPrice = fromPrice + toPrice;
        }
        // Layout HTML estructure
        html += `<a class="item click-trigger click" href="` + products[i].clickURL + `" title="Ir para ` + products[i].name + `">
                    <div class="dxp-bg-img click-trigger"><img src="`+ products[i].imageURL + dxpWindowWidth + `" data-src="` + products[i].imageURL + dxpWindowWidth + `" alt="` + products[i].name + `" class="item-img owl-lazy"/></div>
                    <div class="item-title click-trigger"><p class="dxp-p-title">`+ products[i].name + `</p></div> 
                    <div class="item-price click-trigger">`+ finalPrice + `</div>
                </a>`;
    }
    html += "</div>";
    if(typeof document.getElementById(dxpElement) !== 'undefined'){
        let el = document.getElementById(dxpElement) || "";
        if(el != ''){
            el.innerHTML = html;
        }
    }
}

function setCarousel(){
    let dxpInterval = setInterval(function () {
            clearInterval(dxpInterval);
                const prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';
                const nextIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>';
                var owl = $("#dxp-carrossel");
                owl.owlCarousel({
                    loop: true,
                    items: 4,
                    lazyLoad: true,
                    nav: true,
                    margin: 5,
                    padding: 0,
                    navText: [
                        prevIcon,
                        nextIcon
                    ],
                    dots: true,
                    autoplay: true,
                    transitionStyle: "slide",
                    responsive: {
                        0: {
                            items: 1,
                            nav: true,
                            dots: true,
                            autoplay: true
                        },
                        330: {
                            items: 2,
                            nav: true,
                            dots: true,
                            autoplay: true
                        },
                        600: {
                            items: 3,
                            nav: true,
                            dots: true,
                            autoplay: true
                        },
                        900: {
                            items: 4,
                            nav: true,
                            dots: true,
                            autoplay: true
                        }
                    }
                });
    }, 900);
}

function injectCarousel(categoryId) {
    fetchProducts(categoryId);
    setCarousel()
}


// Initialize Experience
if (document.readyState !== 'loading') {
    startCreatives();
    injectCarousel(categoryIdCode);
    if (injectCarousel && typeof injectCarousel == 'function') {
        setCarousel()
    }
} else {
    document.addEventListener('DOMContentLoaded', injectCarousel);
    document.addEventListener('DOMContentLoaded', startCreatives);
}