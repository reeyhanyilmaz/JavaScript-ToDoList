const inputEnteredData = document.querySelector("#input");
const addButton = document.querySelector("#inputButton");
const todolist = document.querySelector("list")


//inputtan verileri çekme
function inputData() {
  
      // let li = document.createElement("li");
      // ul.appendChild(li);
      // let span = document.createElement("span");
      // li.appendChild(span);
      // let closeSpan = document.createElement("span")
      // li.appendChild(closeSpan);
      let newLiTag = "";
      userData = [input.value];
      userData.forEach( (element) => {
        newLiTag += `<li> ${element} <span class ="icon" ><i class="fa fa-trash"></i></li>` ;
      });
      list.innerHTML = newLiTag; //ul'e (id:list) li tag ekler
      input.value =""; //giriş yapıldıktan sonra input'u boşaltmak için
}

function lclStorage () {
  let userData = inputEnteredData.value;
  let getLocalStorageData = localStorage.getItem("Yeni Giriş"); // veriyi getirmek için kullandık
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray =JSON.parse(getLocalStorageData); //json string'i bir js nesnesine dönüştürme
  }
    listArray.push(userData);
    localStorage.setItem("Yeni Giriş", JSON.stringify(listArray)); // JavaScript nesnesini JSON olarak çevirir  
}

function additionButton () {
  let inputEnteredData = input.value;
  if (inputEnteredData != "" && inputEnteredData != " ") {
    inputData();
    lclStorage (inputEnteredData.value);
  } else {
    return;
  }
}


