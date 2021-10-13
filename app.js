//  all required elements
const body = document.querySelector('body')
const button = document.querySelector('.toggle')
const header = document.querySelector('.toggle')
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearbtn = document.querySelector(".container-footer button");

//changing mode (dark / light)


const callbackfunc = (event) => {
    body.classList.toggle('dark')
    
    
}
button.addEventListener('click', callbackfunc);

showTasks(); //calling showTask function



// onkeyup event to add active class
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}


addBtn.onclick = ()=>{ //when user click on + icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("chores"); //getting localstorage values
  if(getLocalStorageData == null){ //if localstorage is empty
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //converting json string into a js object
  }
  listArray.push(userEnteredValue); //pushing  new value in array
  localStorage.setItem("chores", JSON.stringify(listArray)); //converting  js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added (removing active class)
}

//function to show chores
function showTasks(){
  let getLocalStorageData = localStorage.getItem("chores");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    clearbtn.classList.add("active"); //active the delete button
  }else{
    clearbtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-times"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete particular task function (by clicking  X icon)
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("chores");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("chores", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks at once using clear button (*function*)
clearbtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("chores", JSON.stringify(listArray)); //sets the item in localstorage
  showTasks(); //call the showTasks function
}