// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment
const todoList = (function () {
    let todos = [];

    function addTask() {
        let newTask = document.getElementById("newTask");
        if (newTask.value === "") {
            console.log("Error");
        }
        todos.push(newTask.value);
        createLiTodos(newTask.value);
        newTask.value = "";
        return true;
    }

    function fillTodos(todosArray) {
        todos = todosArray;
        for (let index = 0; index < todos.length; index++) {
            createLiTodos(todos[index]);
        }
        return true;
    }

    function createLiTodos(element) {
        let ul = document.getElementById("taskList");
        let li = document.createElement("li");
        ul.appendChild(li);
        let node = `<p>${element}</p> <div><button style='margin-right: 1vw;' type='button' onclick='completeTask(this, "${element}")'>&#10004</button><button type='button'  onclick='deleteTask("${element}")'>&#10005</button></div>`;
        li.innerHTML = node;
        return true;
    }

    function completeTodos(text) {
        let ulChild = document.getElementById("taskList").childNodes;
        let targetLi = null;
        for (let index = 0; index < ulChild.length; index++) {
            if (text === ulChild[index].firstChild.innerText) {
                targetLi = ulChild[index];
                break;
            }
        }
        targetLi.firstChild.style.textDecoration = "line-through";
    }

    function deleteTodos(text) {
        let ulChild = document.getElementById("taskList").childNodes;
        let targetLi = null;
        for (let index = 0; index < ulChild.length; index++) {
            if (text === ulChild[index].firstChild.innerText) {
                targetLi = ulChild[index];
                break;
            }
        }
        targetLi.remove();
        todos = todos.filter((todo) => todo !== text);
        console.log(todos);
    }

    return {
        todos: function () {
            return todos;
        },
        addTask: addTask,
        fillTodos: fillTodos,
        createLiTodos: createLiTodos,
        completeTodos: completeTodos,
        deleteTodos: deleteTodos,
    };
})();

document.getElementById("addTaskBtn").addEventListener("click", (event) => {
    todoList.addTask();
});

window.addEventListener("load", async (event) => {
    const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
    const todos = await response.json();
    todoList.fillTodos(todos);
});

function completeTask(element, text) {
    todoList.completeTodos(text);
    element.style.display = "none";
}
function deleteTask(text) {
    todoList.deleteTodos(text);
}
