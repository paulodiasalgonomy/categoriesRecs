 // Variables
let dxpElement = "dxp_recs";
let dxpTitle = "Titulo";
let dxpPlacementHome = "home_page.dxp_categories_recs";
let dxpPlacementCategories = "category_page.dxp_categories_recs";
let apiKey = "e20fd45b1e19a8c6";
let apiClientKey = "2a52873853496275";
let sessionId = "";
let userId = "";


function profileCheck(){
    var profile  = localStorage.getItem('userId') || 'newUser';
    console.log(profile);
    switch(profile) {
        case "userHome":
            document.getElementById("userHome").selected = true;
        break;
        case "userBeauty":
            document.getElementById("userBeauty").selected = true;
        break;
        case "userMen":
            document.getElementById("userMen").selected = true;
        break;
        case "userWomen":
            document.getElementById("userWomen").selected = true;
        break;
        case "userEletronics":
            document.getElementById("userEletronics").selected = true;
        break;
        case "userShoes":
            document.getElementById("userShoes").selected = true;
        break;
        case "userKids":
            document.getElementById("userKids").selected = true;
        break;
        case "userGeek":
            document.getElementById("userGeek").selected = true;
        break;
        default:
            document.getElementById("newUser").selected = true;
    }
    }
        function refreshProfile(){
            var profileSelected = document.getElementById("profiles").value || '';
            switch(profileSelected) {
                case "userHome":
                    localStorage.setItem('userId', "userHome");
                    localStorage.setItem('sessionId', "sessionHome");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userBeauty":
                    localStorage.setItem('userId', "userBeauty");
                    localStorage.setItem('sessionId', "sessionBeauty");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userMen":
                    localStorage.setItem('userId', "userMen");
                    localStorage.setItem('sessionId', "sessionMen");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userWomen":
                    localStorage.setItem('userId', "userWomen");
                    localStorage.setItem('sessionId', "sessionWomen");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userEletronics":
                    localStorage.setItem('userId', "userEletronics");
                    localStorage.setItem('sessionId', "sessionEletronics");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userShoes":
                    localStorage.setItem('userId', "userShoes");
                    localStorage.setItem('sessionId', "sessionShoes");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "userKids":
                    localStorage.setItem('userId', "userKids");
                    localStorage.setItem('sessionId', "sessionKids");
                    localStorage.setItem('rr_rcs','');
                    break;
                    break;
                case "userGeek":
                    localStorage.setItem('userId', "userGeek");
                    localStorage.setItem('sessionId', "sessionGeek");
                    localStorage.setItem('rr_rcs','');
                    break;
                case "newUser":
                    let rand = (Math.random() + 1).toString(36).substring(7);
                    localStorage.setItem('userId', "user-"+rand);
                    localStorage.setItem('sessionId', "session-"+rand);
                    localStorage.setItem('rr_rcs','');
                    break;
                default:
                    console.log("Erro");
            }
            location.reload()
        }


// Personalize
function categoryClick(category_id,category_url){
    console.log(category_id,category_url);
    injectCarousel(category_id);


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
    let userId =  localStorage.getItem('userId') || 'newUser';
    let sessionId = localStorage.getItem('sessionId') || 'newSession';
    let dxpPlacement = "home_page.dxp_categories_01|home_page.dxp_categories_02|home_page.dxp_categories_03|home_page.dxp_categories_04|home_page.dxp_categories_05";
    var url = "https://recs.algorecs.com/rrserver/api/personalize?apiKey="+apiKey+"&apiClientKey="+ apiClientKey +"&placements=" + dxpPlacement+"&userId=" + userId + "&sessionId="+ sessionId ;
/*     if (typeof window.R3_COMMON != "undefined") {
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
    } */
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
    let userId =  localStorage.getItem('userId') || 'newUser';
    let sessionId = localStorage.getItem('sessionId') || 'newSession';
    var request = new XMLHttpRequest();
    const rcsValue = document.cookie.split("; ").find(row => row.startsWith(`rr_rcs=`));
    console.log(categoryId);
    if(categoryId == 0){
        var url = "https://recs.algorecs.com/rrserver/api/rrPlatform/recsForPlacements?apiKey="+apiKey+"" + "&apiClientKey="+ apiClientKey +"" + "&placements=" + dxpPlacementHome + "&userId="+userId+"&sessionId="+sessionId+"&rcs="+rcsValue;
    }else{
        var url = "https://recs.algorecs.com/rrserver/api/rrPlatform/recsForPlacements?apiKey="+apiKey+"" + "&apiClientKey="+ apiClientKey +"" + "&placements=" + dxpPlacementCategories + "&userId="+userId+"&sessionId="+sessionId+"&rcs="+rcsValue;
    }
    if(categoryId != "0"){
        url += "&categoryId=" + categoryId; 
    }
/*     if (typeof window.R3_COMMON != "undefined") {
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
    } */
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
                const prevIcon = '<img src="./img/prev.png" alt="" />';
                const nextIcon = '<img src="./img/next.png" alt="" />';
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
    console.log(categoryId);
    fetchProducts(categoryId);
    setCarousel()
}


// Initialize Experience
if (document.readyState !== 'loading') {
    startCreatives();
    var categoryIdCode = '0';
    console.log(categoryIdCode);
    injectCarousel(categoryIdCode);
    if (injectCarousel && typeof injectCarousel == 'function') {
        setCarousel()
    }
} else {
    var categoryIdCode = '0';
    document.addEventListener('DOMContentLoaded', injectCarousel(categoryIdCode));
    document.addEventListener('DOMContentLoaded', startCreatives);
}