(function(context){
const ENTER_KEY = 13;
const ESC_KEY = 27

let appStorage = []
const inDiv = $("#innerStatic")
let id = 0
let _update = true
let _index = true
let index ="hold"
let listUpdate = $("#list-items")
let nodes = "hold"
let itemsLeft=0
let e,a


//create constructor todo object
function Todo(todo){
  this.todo= todo,
  this.completed = false
}

//add todos
function addTodos(e,a,todo){
  if(appStorage.length===0){
    _update = false
    _index = false
     }
  if(e) {

    if(e.which===ENTER_KEY && $(this).val().trim()){
       e.preventDefault()
       let todo = $(this).val()
       appStorage.push(new Todo(todo))
       updateTodos(index,_index,_update)
       id++
       $(this).val("")
       inDiv.css("display","flex")
       displayTodos(todo)
       updateCount()
        }
  }else if(a){
      displayTodos(todo)
      updateCount()
    } else {
      displayCompleted(todo)
      updateCount()

        }
          }

function deleteTodos(){
  _update = false
  //Get the parent of the clicked element, then find the children of the parent element.select the
  //<li> element of interest to get the innerHTML

   let el = $(this).parents("div[class = form-inner]")
   .children().children()[1].innerText || $(this).parents("div[class = form-inner]")
   .children().children()[0].innerText
   appStorage.forEach(function(item){
   if(item.todo === el){
      index = appStorage.indexOf(item)
     }
   })
   appStorage.splice(index,1)
   let parents = $(this).parents()[1]
   parents.remove()
   appStorage.length === 0 ? inDiv.css("display","none") : null
   updateTodos(index,_index,_update)
   updateCount()

   }

// Updates the todoList based on which element is clicked.The _index and _update
//variables give a direction to which element was clicked.
   function updateTodos(index,_index,_update){
     let todos = localStorage.getItem("todos")
     if(_index){
     let updater=JSON.parse(todos)
     updater.splice(index,1)
     localStorage.setItem("todos",JSON.stringify(updater))
      }
     else if(_update){
     let _update=JSON.parse(todos)
     _update = appStorage
     localStorage.setItem("todos",JSON.stringify(_update))
     }else{
     localStorage.setItem("todos",JSON.stringify(appStorage))
     }
   }

   function toggle(){
     _index = false
       let clickedEl = $(this).parent().children()[1].innerText
       let clickedP =$(this).parent().children()
       nodes = clickedP[1]["children"][0].firstChild
      appStorage.forEach((item,index)=>{
       if(item.todo === clickedEl)
       appStorage[index]["completed"] = !appStorage[index].completed
     })
       updateTodos(index,_index,_update)
       toggleToComplete(nodes)
       updateCount()

    }


    function toggleToComplete(nodes){
     if(nodes.classList.length === 0){
       $(nodes).addClass("change")
     }else{
       $(nodes).removeClass("change")
     }
    }


    function toggleCompleted(){
      const result = appStorage.filter((item, i) => {
        return item.completed ===true
      })
       $(listUpdate).empty()
      listUpdate.append(inDiv)
      result.forEach((item, i) => {
        let todo = item.todo
        const a = false
        const e=false
        addTodos(e,a,todo)
        id++
      });
       updateCount()
    }

    function toggleActive(){
      const result=appStorage.filter((item, i)=>{
        return item.completed ===false
      })
      $(listUpdate).empty()
     listUpdate.append(inDiv)
     result.forEach((item, i) => {
       let todo = item.todo
       const a = true
       const e=false
       addTodos(e,a,todo)
       id++
    })
  }
  function toggleAll(){
    $(listUpdate).empty()
   listUpdate.append(inDiv)
    appStorage.forEach((item, i) => {
      let todo = item.todo
      if(item.completed===true){
        displayCompleted(todo)
        id++
      }else{
        displayTodos(todo)
        id++
      }
    });
  }

 function count(){
    counter = appStorage.length
    completed = 0
    appStorage.forEach((item, i) => {
     if(item.completed===true){
       completed++
     }
     itemsLeft = appStorage.length - completed
   });

  return itemsLeft
  };

  function updateCount(){
    count()
    let child = $("#list-items").children()[0]
    let grandChild = $(child).children()[0]
    let great = $(grandChild).children()[0]
    itemsLeft > 1 ? great.innerHTML = itemsLeft +" items left" : great.innerHTML = itemsLeft +" item left"
  }



 // Render todos
   function displayTodos(todo){
     let listUpdate = $("#list-items")
     let update = `<div class="form-inner">
     <label for="a0${id}" class="nicelabel"><input type="checkbox" id="a0${id}"></label>
     <label for="00${id}" class="midlabel"><li id="00${id}" class="appendedList" ><p>${todo}</p></li></label>
     <label for="${id}" class="lastlabel"><input type="checkbox" id ="${id}" class ="destroy">X</label>
     </div>`
     listUpdate.append(update)

   }

   function displayCompleted(todo){
     let listUpdate = $("#list-items")
     let update = `<div class="form-inner">
     <label for="000${id}" class="midlabel"><li id="000${id}" class="appendedList" ><p>${todo}</p></li></label>
     <label for="${id}" class="lastlabel"><input type="checkbox" id ="${id}" class ="destroy">X</label>
     </div>`
     listUpdate.append(update)
   }



//Event Listeners for input Elements.
  $("#main-input").on("keypress", addTodos)
  $("#list-items").on("click", ".destroy", deleteTodos)
  $("#list-items").on("change",".nicelabel", toggle)
  $("#list-items").on("change","#out3", toggleCompleted)
  $("#list-items").on("change","#out2", toggleActive)
  $("#list-items").on("change","#out1", toggleAll)

//window.addEventListener("DOMContentLoaded",function(){
  //debugger;
//  let init=localStorage.getItem("todos")
//  e=true
//  let app = JSON.parse(init)
//  app.forEach((item) => {
//    let todo = item.todo
  //  addTodos(e,a, todo)
//  });


window.onload = function(){
  appStorage = JSON.parse(localStorage.getItem('todos')); //get data from storage
  if (appStorage !== null) { //if data exist (todos are in storage)
    appStorage.forEach(function(todo){
      _index = false
      _update = false
      updateTodos(index,_index,_update)
      id++
      inDiv.css("display","flex")
      if(todo.completed===true){
          displayCompleted(todo.todo)
         }else{
      displayTodos(todo.todo)
    }
      updateCount()
    })
  } else { //if nothing exist in storage, keep todos array empty
    appStorage = [];
  }
}




}(this))
