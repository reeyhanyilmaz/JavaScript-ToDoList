const input = document.querySelector("#input");
const addButton = document.querySelector("#inputButton");
const todolist = document.querySelector("#list");
const deleteAllBtn = document.querySelector(".footer button");

loadedPage();

//input'a veri oluşturma
function createNewElement() {
  if (input.value != "" && input.value != " ") {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.classList.add("icon"); // span'a icon klası eklendi.
    span.innerHTML = `<i class="fa fa-trash" ></i> `;
    span.addEventListener("click", deleteElement);
    li.innerHTML = `<span>${input.value}</span> `;
    li.appendChild(span);
    list.appendChild(li);
    input.value = "";
  } else {
    alert("Listeye boş ekleme yapamazsınız!");
  }
}

//li'yi silmek için func.
function deleteElement(e) {
  if (e.target.parentElement.className === "icon") {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      e.target.parentElement.parentElement.remove();
      deleteStorage();
    }   
  } 
};

// checked func.
function missionCompleted(e) {
  e.target.parentElement.classList.toggle("checked"); // toogle: varsa sil, yoksa ekle demek
}

list.addEventListener("click", missionCompleted);


//local storage'a veri depolaması için yazılan func.
addButton.onclick = () => {
  let getLocalStorageData = localStorage.getItem("Yeni Giriş");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData); //json nesnelerini javaScript'e dönüştürür.
  }
  listArray.push(input.value);
  localStorage.setItem("Yeni Giriş", JSON.stringify(listArray));
  createNewElement();
};


// sayfa yüklenince veriler kaybolmaması için func.
function loadedPage() {
  let listArray = JSON.parse(localStorage.getItem("Yeni Giriş"));
  if (listArray != null) {
    let html;
    for (let i=0; i<listArray.length; i++) {
      html = ` <li> <span> ${listArray[i]} </span> <span class="icon" > <i class="fa fa-trash" ></i> </span> </li>`
      list.innerHTML += html;
    } 
  }
};

// li silinince local storgedan da silme func.
function deleteStorage (index){
 let getLocalStorageData = localStorage.getItem("Yeni Giriş");
 listArray = JSON.parse(getLocalStorageData);
 listArray.splice(index, 1);
 localStorage.setItem("Yeni Giriş", JSON.stringify(listArray));
};


// All delete butonu ile hepsini silme func.
deleteAllBtn.addEventListener("click", function() {
  localStorage.clear();
  list.innerHTML = "";
  tasklist = [];
});


//enter tuşu ile giriş yapma func.
input.onkeydown = function(e) {
  if (e.keyCode == 13) {
    addButton.click();
  }
};
