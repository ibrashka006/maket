const list=document.querySelector('.list')
const root=document.querySelector('.root')
const block4=document.querySelector('.block-4-in')

const urlstuff='https://fakestoreapi.com/products'


async function getProducts() {
    const res=await fetch(urlstuff)
    const data=await res.json()
    console.log(data);
    renderCategory(data)
    renderProducts(data.slice(0 ,5))
}
getProducts()
function renderCategory(arr) {
    const newcategory=[]
    const result=arr.filter(el=>{
        if (!newcategory.includes(el.category)) {
            newcategory.push(el.category)
        }
    })
    for (const obj of newcategory) {
     list.innerHTML+=`
     <li onclick="getProductsByCategory(event)">${obj}</li>
     `

    }


}
function renderProducts(arr) {
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <div class="card" style="width: 18rem;">
           <img src="${obj.image}" class="card-img-top" alt="Card image cap">
         <div class="card-body">
         <h5 class="card-title">${obj.title}</h5>
           <p class="card-text">${obj.category}</p>
           <a href="#" class="btn btn-primary">${obj.price} $</a>
        </div>
      </div>
        `
    }
}
async function getProductsByCategory(nameCategory) {
    const c = nameCategory.target.innerText;
    const res = await fetch(urlstuff);
    const data = await res.json();
    const filterData = data.filter(el => el.category === c);
    console.log(filterData);
    renderProducts(filterData.slice(0,5))

    const priceFilterFunction = el => el.price < 100;
    renderBlock4(data, priceFilterFunction);
}

function renderBlock4(arr, filterFunction) {
    block4.innerHTML = '';
    const filteredData = arr.filter(filterFunction);

    for (const obj of filteredData) {
        block4.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${obj.image}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${obj.title}</h5>
                    <p class="card-text">${obj.category}</p>
                    <a href="#" class="btn btn-primary">${obj.price} $</a>
                </div>
            </div>
        `;
    }
}
getProductsByCategory({ target: { innerText: '' } });