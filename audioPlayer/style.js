const track1 = './music/Leonard Cohen - Happens To The Heart.mp3';
const track2 = './music/Eyes Closed.mp3';
const track3 = './music/Jethro Tull - Moths.mp3';
const track4 = './music/The Jimi Hendrix Experience - Little Wing.mp3';
const track5 = './music/Andy M. Stewart -Tak It Man Tak It.mp3';

const name1 = 'Happens To The Heart';
const name2 = 'Eyes Closed';
const name3 = 'Moths';
const name4 = 'Little Wing';
const name5 = 'Tak It Man Tak It';

const author1 = 'Leonard Cohen';
const author2 = 'Ed Sheeren';
const author3 = 'Jethro Tull';
const author4 = 'Jimi Hendrix';
const author5 = 'Andy M. Stewart';

const album1 = 'Thanks For the Dance';
const album2 = 'Eyes Closed';
const album3 = '3';
const album4 = 'The Jimi Hendrix Experience';
const album5 = '5';

const cover1 = './asserts/cohen.jpg';
const cover2 = './asserts/Ed-Sheeran-Eyes-Closed-scaled.jpg';
const cover3 = './asserts/jethro.jpg';
const cover4 = './asserts/jimmi.jpg';
const cover5 = './asserts/AndyM.Stewart.jpg';

const coverName1 = 'cohen';
const coverName2 = 'sheeran';
const coverName3 =  'jethro';
const coverName4 ='jimi';
const coverName5 ='andy';

const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const duration = document.querySelector('.duration');
const curr = document.querySelector('.curr');
const tot = document.querySelector('.tot');
const track = document.querySelector('.name');
const auth = document.querySelector('.author');
const album = document.querySelector('.album');
const player = document.querySelector('.audio-player');
//const cover = document.querySelector('.cover');
const audio = new Audio();

let isPlay = false;
let playList=[track1,track2, track3, track4,track5];
let playListName=[name1,name2, name3, name4,name5];
let playListAuth=[author1,author2, author3, author4, author5];
let playListAlbum=[album1,album2, album3, album4,album5];
let playListCover=[cover1,cover2, cover3, cover4,cover5];
let coverName = [coverName1, coverName2, coverName3, coverName4, coverName5];
let trackNum=0;
let time = audio.duration;
let name = audio.title;
let progressBar = document.querySelector('progress');


function play_pauseAudio() {
    playAudio(trackNum);
    isPlay?(audio.pause(),isPlay = false):(audio.play(), isPlay=true);
    playPauseToggle(isPlay);
}

let playPauseToggle = (isPlay)=>{
    isPlay?playBtn.classList.add("pause"):playBtn.classList.remove("pause");
}

function playAudio(i){
    time?console.log(time):console.log('--');
    audio.src = playList[i];
    audio.play();
    auth.textContent = playListAuth[i];
    album.textContent = playListAlbum[i];
    track.textContent = playListName[i];
        setBg(i);
}

function setBg(i) {  
    const img = new Image();
    img.src = playListCover[i];
        img.onload = () => {     
       
            let currentCover = playListCover[i];
            console.log( `url: (${currentCover})`);
            
            player.style.setProperty("background-image", `url('${currentCover}')`);
        }; 
  }
function playNext ()
{
    isPlay=true;
    trackNum++;
    if (trackNum===playList.length){trackNum=0};
    playAudio(trackNum);
    playPauseToggle(isPlay);
}

function playPrev ()
    {
        isPlay=true;
        trackNum--;
        if (trackNum<0){trackNum=playList.length-1}
        playAudio(trackNum);
        playPauseToggle(isPlay);
    }

/*function initProgressBar() {
    var length = audio.duration
    var current_time = audio.currentTime;
        // calculate total length of value
    document.querySelector("end-time") = length;
        // calculate current value time
    var currentTime = current_time;
    document.querySelector("start-time") = currentTime;
    var progressbar = document.querySelector('duration');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);

        function seek(event) {
      var percent = event.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
};*/

function progressHandler() {
    console.log(time, audio.currentTime);
    const percentLoaded = Math.round(audio.currentTime*100/time);
    console.log(percentLoaded);
    progressBar.value = percentLoaded/100;
    
    curr.textContent = `${Math.floor(audio.currentTime/60)}.${Math.floor(audio.currentTime%60)}`;
    
    let totalMin = (Math.floor(time/60));
    let totalSec = Math.floor(time % 60);
    tot.textContent = `${totalMin}.${totalSec}`;
   }
  

function seek (){document.querySelector('duration')=audio.currentTime;}
playBtn.addEventListener('click', play_pauseAudio);
nextBtn.addEventListener('click',playNext);
prevBtn.addEventListener('click',playPrev);
audio.addEventListener('loadedmetadata', function() {time = audio.duration;});
audio.addEventListener('ended', playNext);
audio.addEventListener('seeking', seek);
audio.addEventListener('timeupdate', progressHandler);
progressBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`
  })
