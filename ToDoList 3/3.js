const input = document.querySelector("#input");
const addButton = document.querySelector("#inputButton");
const todolist = document.querySelector("list");

//input'a veri oluşturma
function createNewElement() {
  if (input.value != "" && input.value != " ") {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.classList.add("icon"); // span'a icon klası eklendi.
    span.innerHTML = `<i class="fa fa-trash" ></i> `;
    span.addEventListener("click", deleteElement);
    li.innerHTML = `<span>${input.value} </span> `;
    li.appendChild(span);
    list.appendChild(li);
    input.value = "";
  }
}

//li'yi silmek için func.
function deleteElement(e) {
  if (e.target.className === "icon") {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      e.target.parentElement.remove();
    }
  }
}
