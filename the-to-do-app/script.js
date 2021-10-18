function $(a) {
  return document.querySelector(a);
}
const inputBox = $(".inputField input"),
      addBtn = $(".inputField button"),
      todoList = $(".todoList"),
      deleteAllBtn = $(".footer button");

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value;
  userEnteredValue.trim() != 0 ? addBtn.classList.add("active") : addBtn.classList.remove("active");
}

showTasks();

addBtn.addEventListener("click", ()=>{
  let userEnteredValue = inputBox.value,
      getLocalStorageData = localStorage.getItem("New Todo");
  listArray = getLocalStorageData == null ? [] : JSON.parse(getLocalStorageData);
  
  listArray.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
});

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = getLocalStorageData == null ? [] : JSON.parse(getLocalStorageData);

  const pendingTasksNumb = $(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;
  listArray.length > 0 ? deleteAllBtn.classList.add("active") : deleteAllBtn.classList.remove("active");
  
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.addEventListener("click",() => {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
});