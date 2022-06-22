const q = (q) => document.querySelector(q);
const qs = (qs) => document.querySelectorAll(qs);
let cart = [];
let modalQt = 1;
let modalkey = 0;


SneakerJSON.map((item, index) => {

    let SneakerItem = q('.models .sneaker--item').cloneNode(true);
    SneakerItem.setAttribute('data-key', index);
    SneakerItem.querySelector('.sneaker--img img').src = item.img;
    SneakerItem.querySelector('.name-sneaker').innerHTML = item.name;
    SneakerItem.querySelector('.price-sneaker').innerHTML = `R$ ${item.price.toFixed(2)}`;
    SneakerItem.querySelector('#ADD').addEventListener('click', (e) => {
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
        qs('.size').forEach((size, sizeIndex) => {
            SneakerJSON[key].Size[sizeIndex]
            size.innerHTML = SneakerJSON[key].Size[sizeIndex];
            size.addEventListener('click', (e) => {
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
        setTimeout(() => {
            openBodyWindows();
        }, 500)

    });


    q('.sneaker-area').append(SneakerItem);
})

q('#qtmais').addEventListener('click', () => {
    modalQt++;
    q('.qt').innerHTML = modalQt;

    let ActualPrice = SneakerJSON[modalkey].price * modalQt;
    q('.price').innerHTML = `Preço Total: ${ActualPrice.toFixed(2)}`;


})
q('#qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;

        let ActualPrice = SneakerJSON[modalkey].price * modalQt;
        let NewPrice = SneakerJSON[modalkey].price - SneakerJSON[modalkey].price;
        q('.price').innerHTML = `Preço Total: ${ActualPrice.toFixed(2)}`;
        q('.qt').innerHTML = modalQt;
    }
    else {
        CloseModal();
    }
})

const CloseModal = () => {
    let Body = q('#windowBody');
    let WindowArea = q('.windowArea');
    let Btn = q('.closeModal')
    Body.style.opacity = 0;
    Btn.style.opacity = 0;

    setTimeout(() => {
        Body.classList.remove('active') 

    }, 50);

    setTimeout(() => {

        WindowArea.style.width = '2px'
        WindowArea.style.height = '4px'
        WindowArea.style.borderRadius = '50%';



    }, 10)
    setTimeout(() => {
        WindowArea.style.display = 'none';
    }, 550);

}

const openBodyWindows = () => {
    let Body = q('#windowBody');
    let WindowArea = q('.windowArea');
    if (WindowArea.style.width = '100%') {
        Body.style.opacity = 1;
        Body.classList.add('active') 
        setTimeout(() => {
            Body.style.opacity = 1;
            q('.closeModal').style.opacity = 1;
        }, 100);
    }
    else {
        CloseModal();
    }
}




q('.finish').addEventListener('click',()=>{
    let size = parseInt( q('.size.selected').getAttribute('data-key'));
    let indentfier = SneakerJSON[modalkey].id+'@'+size;
    let key = cart.findIndex((item)=> item.indentfier == indentfier );
    if(key > -1){
        cart[key].Qt += modalQt
    }
    else{
        cart.push({
            indentfier,
            id:SneakerJSON[modalkey].id,
            size,
            Qt:modalQt
        })
    }
    CloseModal();
    updateCart();
   
   
})


const OpenCart = () =>{
     if(cart.length > 0 ){
    q('#Cart').style.display = 'block'
    setTimeout(() => {
        q('#Cart').style.right = '0';
    }, 100)

}

}
const closeCart = () =>{

    q('#Cart').style.right = '-550px';
    setTimeout(() => {
        q('#Cart').style.display = 'none'
    }, 600)

}



const updateCart = () =>{
    
    q('#cartQt').innerHTML = cart.length;
    if(cart.length> 0){ 
        q('.items-area').innerHTML ="";
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let SneakerItem = SneakerJSON.find((item) => item.id == cart[i].id);
            console.log(SneakerItem);
            subtotal += SneakerItem.price * cart[i].Qt;
            let cartItem = q('.cart--item').cloneNode(true);

            let SneakerSize;
            switch(cart[i].size){
                case 0:
                    SneakerSize= '40';
                    break;
                case 1:
                    SneakerSize= '41';
                    break;
                case 2:
                    SneakerSize= '42';
                    break;
            }


            let SneakerName =  `${SneakerItem.name}(${SneakerSize})`;


           

            cartItem.querySelector('.cart--item img').src = SneakerItem.img;
            cartItem.querySelector('.cart--name').innerHTML = SneakerName;
            cartItem.querySelector('.cart-item-qt').innerHTML = cart[i].Qt;
            cartItem.querySelector('.qtmenos').addEventListener('click',()=>{
                if(cart[i].Qt > 1){
                    cart[i].Qt--;
                }

                else{
                    cart.splice(i,1);
                }
                updateCart();
            })
            cartItem.querySelector('.qtmais').addEventListener('click',()=>{
                cart[i].Qt++;
                updateCart();
            })
            q('.items-area').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto
        
        q('#Subtotal').innerHTML= `R$ ${subtotal.toFixed(2)}`;
        q('#Desconto').innerHTML= `R$ ${desconto.toFixed(2)}`;
        q('#Total').innerHTML= `R$ ${total.toFixed(2)}`;

        

    }
    else{
        closeCart();
    }
}






const OpenDrop = () => {
    q('.container-dropDown').classList.toggle('active');
}

const OpenAside = () => {

    q('aside').classList.add('active')

    q('aside').style.left = '0px';

}
const CloseAside = () => {
    q('aside').style.left = '-550px';

    setTimeout(() => {
        q('aside').classList.remove('active')
    }, 600)

}