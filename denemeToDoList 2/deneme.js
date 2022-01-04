const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = () => {
  let userData = inputBox.value; // kullanıcıdan veriyi alıyoruz
  if (userData.trim() != 0) {
    addBtn.classList.add("active"); // giriş yapılıyorsa active uygulanır koyu icon renk olur
  } else {
    addBtn.classList.remove("active"); // giriş yapılmıyorsa class remove edilir
  }
}

showTasks();


//+ butona tıklayıp giriş yapıldıgında
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorageData = localStorage.getItem("Yeni giriş");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData); //json string'i bir js nesnesine dönüştürme
  }
  listArray.push(userData);
  localStorage.setItem("Yeni giriş", JSON.stringify(listArray)); //  js nesnesine bir json string'e dönüştürme
  showTasks(); //showTask func.
  addBtn.classList.remove("active");
}


//ul'e liste ekleme func.
function showTasks() {
  let getLocalStorageData = localStorage.getItem("Yeni Giriş");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData); //json string'i bir js nesnesine dönüştürme
  }

  const pendingNumb = document.querySelector(".pendingNumber");
  pendingNumb.textContent = listArray.length;
    if (listArray.length > 0) {
       deleteAllBtn.classList.add("active");
    }else {
        deleteAllBtn.classList.remove("active");
    }

  let newLiTag = "";
  listArray.forEach( (element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fa fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; // ul'e li tag ekler
  inputBox.value = ""; // giriş yapıldıktan sonra girişin silinmesi için 
}

//delete funciton
function deleteTask (index) {
    let getLocalStorageData = localStorage.getItem("Yeni Giriş");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); // bu li'yi sil 

    //li'yi kaldırınca localstorage'da da güncelle
    localStorage.setItem("Yeni Giriş", JSON.stringify(listArray));
    showTasks();
}

// tüm listeyi silme func.
deleteAllBtn.onclick = () => {
    listArray = []; // array'i boşalmak için
    localStorage.setItem("Yeni Giriş", JSON.stringify(listArray));
    showTasks();
}