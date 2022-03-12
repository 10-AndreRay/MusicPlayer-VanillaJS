//Variables
let currentMusic = document.querySelector("audio");
let durationMusic = document.querySelector(".end");
let bannerMusic = document.querySelector(".banner");
let nameMusic = document.querySelector(".name");
let nameArtist = document.querySelector(".artist");
let indexMusic = 0;
let bar = document.querySelector("progress");



//objects
let musics = [
    {
        title: "Bite me",
        linkbanner: "images/nathan-costa-_J0OUTtIlT8-unsplash" + ".jpg",
        artist: "NEFFEX",
        linkmusic: "musics/Bite Me - NEFFEX" + ".mp3"
    },

    {
        title: "That1s What It Takes",
        linkbanner: "images/heshan-perera-7zHWVhTx7co-unsplash" + ".jpg",
        artist: "NEFFEX",
        linkmusic: "musics/That's What It Takes - NEFFEX" + ".mp3"
    },

    {
        title: "Til I Hear'em Say",
        linkbanner: "images/osman-yunus-bekcan-R6Z9o3lGDmI-unsplash" + ".jpg",
        artist: "NEFFEX",
        linkmusic: "musics/Til I Hear'em Say - NEFFEX" + ".mp3"
    },

    {
        title: "Violet Vape",
        linkbanner: "images/joseph-ngabo-kWnLO5B-X2s-unsplash" + ".jpg",
        artist: "Cheel",
        linkmusic: "musics/Violet Vape - Cheel" + ".mp3"
    }
];
renderMusic(indexMusic);


//Events
document.querySelector(".button-play").addEventListener("click", playMusic);

document.querySelector(".button-pause").addEventListener("click", pauseMusic);

document.querySelector(".previous").addEventListener("click", previousMusic);

document.querySelector(".next").addEventListener("click", nextMusic);

currentMusic.addEventListener("timeupdate", refreshBar);




//Functions
function playMusic(){
    currentMusic.play();
    document.querySelector(".button-pause").style.display = "block";
    document.querySelector(".button-play").style.display = "none";
}

function pauseMusic(){
    currentMusic.pause();
    document.querySelector(".button-pause").style.display = "none";
    document.querySelector(".button-play").style.display = "block";
}

function refreshBar(){
    if(currentMusic.currentTime == currentMusic.duration){
        nextMusic();
    }
    let progress = Math.floor((currentMusic.currentTime / currentMusic.duration) * 100);
    let elapsedTime = document.querySelector(".start");
    bar.style.width = `${progress}%`;
    elapsedTime.textContent = secondsForMinutes(Math.floor(currentMusic.currentTime));
}

function previousMusic(){
    indexMusic--
    if(indexMusic < 0){
        indexMusic = musics.length - 1;
        renderMusic(indexMusic);
    }
    renderMusic(indexMusic);
}

function nextMusic(){
    indexMusic++;
    if(indexMusic > (musics.length - 1)){
        indexMusic = 0;
        renderMusic(indexMusic);
    }
    renderMusic(indexMusic);
}

function duration(){
    durationMusic.textContent = secondsForMinutes(Math.floor(currentMusic.duration))
}


function secondsForMinutes(secondTime){
    let minutes = Math.floor(secondTime / 60);
    let seconds = secondTime % 60;
    if(seconds < 10){
        seconds = `0${seconds}`;
    };

    return `${minutes}:${seconds}`;
}

function renderMusic(index){
    currentMusic.setAttribute("src", musics[index].linkmusic);
    currentMusic.addEventListener("loadeddata", () =>{
        bar.style.width = "0";
        nameMusic.textContent = musics[index].title;
        nameArtist.textContent = musics[index].artist;
        bannerMusic.src = musics[index].linkbanner;
        duration();
        pauseMusic();
    });
};
