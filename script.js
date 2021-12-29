const input = document.querySelector("#input")
const addition = document.querySelector("#ekle")
const list = document.querySelector("#list")
const toastSuccess = document.querySelector("#liveToast")
const toastUnsuccess = document.querySelector("#liveToastErr")

loadedPage ();

addition.addEventListener("click", newElement) // tıklayınca ne olmasını istedigimiz
list.addEventListener("click", deleteElement)
list.addEventListener("click", missionCompleted)


function crtElement(){
    const li = document.createElement("li"); 
    const span = document.createElement("span"); //span olusturduk
    span.classList.add("close"); //span'a close class'ı eklendi
    span.innerHTML = "X";
    li.innerHTML = ` <span> ${input.value} </span>`
    li.appendChild(span); 
    list.appendChild(li)
     
}

function newElement() {
    if (input.value != "" && input.value != " "){
        crtElement();
        loclStorage(input.value); //tanımlanan yeni elementleri local str.' at.              
        showToast(true);
        input.value = "";
    } else {
        showToast(false)
    }
}

function showToast(e) {
    if (e) {
    toastSuccess.classList.replace("hide", "show"); //hide'ı show olarak degiştirdik
    setTimeout ( () => {
    toastSuccess.classList.replace("show" , "hide"); 
    },1000); //1000 ms sonra kaybolacak
    }else {
        toastUnsuccess.classList.replace("hide", "show"); 
        setTimeout ( () => {
        toastUnsuccess.classList.replace("show" , "hide"); 
        },1000); 
    }
}

function  deleteElement (e) {
    if (e.target.className === "close") { //tıklanan tag close ise uygula
        if (confirm ("Silmek istediğine emin misin?")){ //emin misin diye sor onay gelirse asagıdaki komutları uygula
            e.target.parentElement.remove();
            let prm = e.target.parentElement.firstChild.nextElementSibling.textContent.trim(); // target ile tıklanan yerin parent'a git (li) ilk child'ının içinde (span) text'inde sağında solunda boşluk sil (trim ile). Sonuç olarak girilen verile ulaşıp dltStrage ile fonk. istediğimiz uygula, yani sil
            dltStorage(prm);
        }
    }
}

function missionCompleted(e){  
    e.target.parentElement.classList.toggle("checked"); //toogle varsa sil yoksa ekle (array'e uygulanır) 
}

function loclStorage(prm) { //localstr'a veri depolaması için yazdık function'ı
    let str = JSON.parse(localStorage.getItem("todo"));
    let toDos;
    if (str == null) {
        toDos =[];
    } else {
        toDos = getStorage();
    }
    toDos.push(prm);
    localStorage.setItem("todo", JSON.stringify(toDos))
}


function getStorage () { // bir çok yerde yazmamak için yazdık fonk.'u
    let toDo = JSON.parse(localStorage.getItem("todo"))
    return toDo;
}

function loadedPage () { // sayfa yenilenince verileri almak için bu fonk. yazdık
    let toDo = getStorage();
    if (toDo != null) { //locak st. todo key ile veri tutulmuşsa onu al ve kullan
        let html;
        for (let i=0; i<toDo.length; i++){
            html = `<li>
            <span>
            ${toDo[i]}
            </span>
            <span class="close">X</span>
            </li>`
            list.innerHTML +=html;
        }
    }
}

function dltStorage (prm) {
         let toDo = getStorage();
         toDo.forEach((element, id) => {
             if (element === prm) {
                 toDo.splice(id, 1);
             }
         })
    localStorage.setItem("todo", JSON.stringify(toDo));
}