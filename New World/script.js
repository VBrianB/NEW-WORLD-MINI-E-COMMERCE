const q = (q)=> document.querySelector(q);
const qs = (qs)=> document.querySelectorAll(qs);



SneakerJSON.map((item,index)=>{
    
    let SneakerItem = q('.models .sneaker--item').cloneNode(true);
    SneakerItem.querySelector('.sneaker--img img').src = item.img;
    SneakerItem.querySelector('.name-sneaker').innerHTML = item.name;
    SneakerItem.querySelector('.price-sneaker').innerHTML = item.price;

   


   
    q('.sneaker-area').append(SneakerItem);
})