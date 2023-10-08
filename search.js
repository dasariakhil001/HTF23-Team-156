const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e)=>{
    let userData = e.target.value; 
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `${userData}.html`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `${selectData}.html`;
        if (webLink) {
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        } else {
            console.error(`No mapping found for suggestion: ${selectData}`);
        }
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        listData = `<li class="no-suggestion">Sorry, Suggestion Not Found</li>`;
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
