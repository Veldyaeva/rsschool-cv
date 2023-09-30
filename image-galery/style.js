const I = document.querySelector('input');
//const searchRequest = I.value;
//const url = `https://api.unsplash.com/search/photos?query='${searchRequest}'&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
const random_img = 'https://api.unsplash.com/photos/random?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
const imgSrc = document.querySelector('.imgs'); 
//const img = document.querySelectorAll('.img');
const galleryContainer = document.querySelector('.imgs');
let searchRequest = 'dog';

async function getData(searchRequest) {
    let url = `https://api.unsplash.com/search/photos?query='${searchRequest}'&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
    console.log(searchRequest, url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0].urls.small);
    
    data.results.forEach(element => {
        //console.log(element.urls.small);
        let imgUrl = element.urls.small;
        showData(imgUrl);
    });
}
async function showData(url)
{
    const imgCont = document.createElement('div');
    const img = document.createElement('img');

    imgCont.classList.add('img_container');
    img.classList.add('gallery-img');
    img.src = url;
    img.alt = `image`;
    galleryContainer.append(imgCont);
    imgCont.append(img);
    //galleryContainer.append(img);
}
  getData(searchRequest);
I.addEventListener('keydown', function(e) {if (e.keyCode ===13)
{getData(I.value)}
});