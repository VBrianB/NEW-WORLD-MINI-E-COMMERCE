const q = (q)=> document.querySelector(q);
const qs = (qs)=> document.querySelectorAll(qs);
let cart = [];
let modalQt = 1;
let modalkey = 0;


SneakerJSON.map((item,index)=>{



    
    let SneakerItem = q('.models .sneaker--item').cloneNode(true);
    SneakerItem.setAttribute('data-key',index);
    SneakerItem.querySelector('.sneaker--img img').src = item.img;
    SneakerItem.querySelector('.name-sneaker').innerHTML = item.name;
    SneakerItem.querySelector('.price-sneaker').innerHTML = `R$ ${item.price.toFixed(2)}`;
    SneakerItem.querySelector('#ADD').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.sneaker--item').getAttribute('data-key');
        modalkey = key;
        let modalQt = 1;
        q('.brand').src = SneakerJSON[key].brand;
        q('.box-img').src = SneakerJSON[key].img;
        q('.box-sneaker-name').innerHTML = SneakerJSON[key].name;
        q('.text-desc').innerHTML = SneakerJSON[key].description;
        q('.txt-stars').innerHTML = SneakerJSON[key].stars.toFixed(1);
        q('.reveal').innerHTML = `(${SneakerJSON[key].reveal})`;
        qs('.size').forEach((size,sizeIndex)=>{
            SneakerJSON[key].Size[sizeIndex]
            size.innerHTML =  SneakerJSON[key].Size[sizeIndex];
            size.addEventListener('click',(e)=>{
                q('.size.selected').classList.remove('selected');
                size.classList.add('selected');
            })
            
            
            
            
        })
        q('.qt').innerHTML = modalQt;
       
        let ActualPrice = SneakerJSON[key].price 
        
        q('.price').innerHTML = `Preço Total: ${ActualPrice.toFixed(2)}`;

       
        q('.windowArea').style.display = 'flex';
        q('.windowArea').style.width = '100%'
        q('.windowArea').style.height = '100%'
        q('.windowArea').style.borderRadius = '0';
        setTimeout(()=>{
            openBodyWindows();
        },500)
       
    });
  
  
    q('.sneaker-area').append(SneakerItem);
})

q('#qtmais').addEventListener('click',()=>{
    modalQt++;
    q('.qt').innerHTML = modalQt;

     let ActualPrice = SneakerJSON[modalkey].price * modalQt;
    q('.price').innerHTML= `Preço Total: ${ActualPrice.toFixed(2)}`  ;
      

})
q('#qtmenos').addEventListener('click',()=>{
    if(modalQt >1){
    modalQt--;
    
    let ActualPrice = SneakerJSON[modalkey].price * modalQt;
    let NewPrice = SneakerJSON[modalkey].price - SneakerJSON[modalkey].price;
    q('.price').innerHTML= `Preço Total: ${ActualPrice.toFixed(2)}`;
    q('.qt').innerHTML = modalQt;
    }
    else{
        CloseModal();
    }
})

const CloseModal = () =>{
    let Body = q('.windowBody');
    let WindowArea = q('.windowArea');
    let Btn = q('.closeModal')
    Body.style.opacity = 0;
    Btn.style.opacity = 0;
    
    setTimeout(()=>{
        Body.style.display = 'none';
        
    },50);

    setTimeout(()=>{
        
        WindowArea.style.width = '2px'
        WindowArea.style.height = '4px'
        WindowArea.style.borderRadius = '50%';
        
       
        
    },10)
    setTimeout(()=>{
        WindowArea.style.display = 'none';
    },550);

}

const openBodyWindows = () =>{
    let Body = q('.windowBody');
    let WindowArea = q('.windowArea');

    if(WindowArea.style.width = '100%'){
        Body.style.opacity = 0;
        Body.style.display = 'grid';
        setTimeout(()=>{
            Body.style.opacity =1;
            q('.closeModal').style.opacity = 1;
        },100);
    }
    else{
        Body.style.display = 'none'
    }
}
