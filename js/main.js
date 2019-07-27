const displaySearch = document.getElementById("search-result");
const searchItem = document.getElementById("search-item");
const welcome = document.getElementById("welcome");
const playlist = document.getElementsByClassName("playlist")[0];
const frame = document.getElementsByClassName("frame")[0];

let next = "";
let apiKey1 = "AIzaSyCCbjvisblT7qzfyC5chBXxFVmaKxBTHPI"
let apiKey2 = "AIzaSyD-b-Gcc2ksuHtlN-xbUt2i3lVHeeie05k"
let apiKey3 = "AIzaSyBQCwHKBJur6Pv7FSfJRxaD6yDAuPK4uA8"

// Set Api key and load
function init() {
    gapi.client.setApiKey(apiKey3);
    gapi.client.load('youtube', 'v3', function () {
        console.log("API key is set!");
    });
}

// Search item and add it to div
function addSearchItems() {
    console.log(searchItem.value);
    let request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: "video",
        q: searchItem.value,
        order: "viewCount",
        maxResults: 5,
        pageToken: next,
    });
    request.execute(function (response) {
        console.log(response);
        next = response.nextPageToken;
        for (let i in response.items) {
            console.log(response.items[i].snippet.title);
            displaySearch.innerHTML +=
                `<div class="grid-system" data-thumb="${response.items[i].snippet.thumbnails.medium.url}">
                <div class="cursor" data-key="${response.items[i].id.videoId}">
                    <img src="${response.items[i].snippet.thumbnails.medium.url}">
                </div>
                <div data-videoid="${response.items[i].id.videoId}">
                    <p> <strong>${response.items[i].snippet.title}</strong>
                    <span class="description">  
                    <br> Channel: ${response.items[i].snippet.channelTitle} 
                    <br> Description: <br> ${response.items[i].snippet.description} 
                    </span>
                    </p>
                    <br> <button class="btn"> Add to playlist </button>
                </div>
            </div>`
        }
    });
}
// For actual frame thumbnail 
//<iframe src="https://www.youtube.com/embed/${response.items[i].id.videoId}" poster = "${response.items[i].snippet.thumbnails}"></iframe> 

// Add items on page bottom scrolled
window.addEventListener("scroll", function () {
    if ((window.innerHeight + window.scrollY) == document.body.offsetHeight) {
        addSearchItems();
    }
});

function searchA() {
    welcome.className = "hidden";
    playlist.className = "playlist show";
    next = "";
    addSearchItems();
    displaySearch.innerHTML = "";
    frame.innerHTML = "";
}

displaySearch.addEventListener("click", function (e) {
    // console.log(e);
    if (e.path[1].dataset.key) {
        frame.innerHTML = `<iframe id="iframe-main" src="https://www.youtube.com/embed/${e.path[1].dataset.key}"></iframe> <hr> <hr>`;
        window.scrollTo(0, 0);
    }
    if(e.path[0].localName == "button"){
        // console.log("button clicked!");
        playlist.innerHTML += 
        `<div class="pad-1" data-key="${e.path[1].dataset.videoid}">
            <img src="${e.path[2].dataset.thumb}">
        </div>`
        window.scrollTo(0, 0);    
    }
});

playlist.addEventListener("click",function(e){
    // console.log(e);
    if (e.path[1].dataset.key) {
        frame.innerHTML = `<iframe id="iframe-main" src="https://www.youtube.com/embed/${e.path[1].dataset.key}"></iframe> <hr> <hr>`;
        window.scrollTo(0, 0);
    }
});

