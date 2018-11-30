

var taskCount = 0;
var toDo = false;
var done = false;

/**** BUG: CANNOT ADD NUMBERS ****/
/**** BUG: SOMETIMES COUNTS UP INSTEAD OF DOWN ******/

(function init(){

    document.addEventListener("keypress", function(event){
        var x = document.getElementById("newTask").value;

        if(x.length !== 0 && event.code === "Enter"){
            addItem();
        }
    });
})();

function upCount() {
    ++taskCount;
    document.getElementById("taskCount").innerHTML = taskCount;
}

function downCount() {
    --taskCount;
    document.getElementById("taskCount").innerHTML = taskCount;
}

function select(selectedNav)
{
    var item = document.querySelector('.NavOption .active');
    item.classList.remove('active');
    selectedNav.classList.add('active');
}

function addItem(){
    var newTask = document.getElementById("newTask").value;

    if (newTask !== "") {
        var ul = document.getElementById("tasks");
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        // checkbox.setAttribute("value", newTask);
        // checkbox.setAttribute("class", "checkbox");
        checkbox.setAttribute("id", newTask);
        checkbox.setAttribute("onclick", "onToggle(" + newTask +")");

        var lbl = document.createElement('label');
        lbl.setAttribute('for', newTask);
        lbl.appendChild(document.createTextNode(newTask));

        li.appendChild(checkbox);
        li.appendChild(lbl);
        ul.appendChild(li);

        document.getElementById("newTask").value = "";
        upCount();
        if (done) {
            li.style.display = "none";
        }
    }

    document.getElementById("newTask").focus();
}

function clearTasks() {
    var ul = document.getElementById("tasks");
    var items = ul.getElementsByTagName("li");

    for (var i = 0; i < items.length; ++i) {
        if (items[i].firstChild.checked) {
            ul.removeChild(items[i]);
            --i;
        }
    }
}

function onToggle(item) {
    // check if checkbox is checked
    if (item.checked) {
        // if checked
        downCount();
        if (toDo) {
            item.parentElement.style.display = "none";
        }
    } else {
        // if unchecked
        upCount();
        if (done) {
            item.parentElement.style.display = "none";
        }
    }
}

function allT() {
    toDo = false;
    done = false;

    var ul = document.getElementById("tasks");
    var items = ul.getElementsByTagName("li");

    for (var i = 0; i < items.length; ++i) {
            items[i].style.display = "list-item";
    }
}

function toDoT() {
    toDo = true;
    done = false;

    var ul = document.getElementById("tasks");
    var items = ul.getElementsByTagName("li");

    for (var i = 0; i < items.length; ++i) {
        if (items[i].firstChild.checked) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "list-item";
        }
    }
}

function doneT() {
    done = true;
    toDo = false;

    var ul = document.getElementById("tasks");
    var items = ul.getElementsByTagName("li");

    for (var i = 0; i < items.length; ++i) {
        if (!items[i].firstChild.checked) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "list-item";
        }
    }
}
