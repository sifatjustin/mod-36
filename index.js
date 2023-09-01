var is_sort = false;


function make_sort_true(){
  is_sort = true;
  handleLoadVideos('1000')
}

const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick = "handleLoadVideos('${category.category_id}')" class="tab hover:bg-red-400">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });

  handleLoadVideos('1000')

  // console.log(data.data[2].category);
};

const handleLoadVideos = async (categoryID) => {
  // console.log(categoryID)
  const res = await fetch(`
  https://openapi.programming-hero.com/api/videos/category/${categoryID}
  `);
  const data = await res.json();
  

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = ""


  if(is_sort){
    data.data.sort((a, b) => {
      const viewsA = parseInt(a.others.views.replace('K', '')); 
      const viewsB = parseInt(b.others.views.replace('K', '')); 
      return viewsB - viewsA;
    });
  }
  

  data.data.forEach((videos) => {
    const div = document.createElement("div");
    div.innerHTML = `
 

    <div class="card p-4  bg-base-100 shadow-xl">
        <figure><img class="rounded-sm w-full  h-[280px]" src="${videos?.thumbnail}" alt="Shoes" /></figure>
       <div  class="flex items-center" >
<div class="flex items-center">
    <img class="rounded-full w-[40px] h-[40px]" src="${videos?.authors[0]?.profile_picture}" alt="">
</div>

        <div class="card-body">
            <h2 class="card-title">${videos?.title}</h2>
          <div class="flex items-center"> 
             <p>${videos?.authors[0]?.profile_name}</p>
            <img class="w-[20px] h-[20px] ${videos?.authors[0]?.verified == false ? "hidden" : ""}" src="./img/verified.png" alt="">
            </div>
            <p>${videos?.others?.views} Views</p>
          </div>
         
       </div>
    
      </div>
    `;
    cardContainer.appendChild(div);
  });


  if(data.data.length == 0){
    document.getElementById("empty_view").style.display = "block"
  }else{
    document.getElementById("empty_view").style.display = "none"
  }


};

handleCategory();