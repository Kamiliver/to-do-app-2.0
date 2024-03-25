const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");


const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
}

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);


//lets add categories and tasks with js

let categories = [
    {
      title: "Personal",
      img: "screen-1-removebg-preview.png",
    },
    {
      title: "Work",
      img: "26065-removebg-preview.png",
    },
    {
      title: "Coding",
      img: "19468020-removebg-preview (1).png",
    },
    {
      title: "Health",
      img: "6757377-removebg-preview.png",
    },
    {
      title: "Study",
      img: "DJV MAR 1030-10_preview_rev_1.png",
    },
  ];

  let tasks = [
    {
      id: 1,
      task: "Go to market",
      category: "Study",
      completed: false,
    },
    {
      id: 2,
      task: "Read a chapter of a book",
      category: "Personal",
      completed: false,
    },
    {
      id: 3,
      task: "Prepare presentation for meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      task: "Complete coding challenge",
      category: "Coding",
      completed: false,
    },
    {
      id: 5,
      task: "Take a 30-minute walk",
      category: "Health",
      completed: false,
    },
    {
      id: 10,
      task: "Write in a journal",
      category: "Personal",
      completed: false,
    },
    {
      id: 11,
      task: "Send follow-up emails",
      category: "Work",
      completed: false,
    },
    {
      id: 12,
      task: "Work on a coding side project",
      category: "Coding",
      completed: false,
    },
    {
      id: 13,
      task: "Try a new healthy recipe",
      category: "Health",
      completed: false,
    },
    // Additional tasks for each category
    {
      id: 18,
      task: "Meditate for 10 minutes",
      category: "Personal",
      completed: false,
    },
    {
      id: 19,
      task: "Prepare agenda for team meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 20,
      task: "Debug a software issue",
      category: "Coding",
      completed: false,
    },
    {
      id: 21,
      task: "Try a new recipe for lunch",
      category: "Health",
      completed: false,
    },
    // Add more tasks for each category as desired
  ];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasksContainer = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
    const categoryTasks = tasks.filter(
        (tasks) => tasks.category.toLowerCase() === selectedCategory.title.toLowerCase()
      );
      totalCategoryTasksContainer.innerHTML = `${categoryTasks.length} Tasks`;
      totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        // get all the tasks of current category
        const categoryTasks = tasks.filter(
            (tasks) => tasks.category.toLowerCase() === category.title.toLowerCase()
            );
            // create a div to render category
            const div = document.createElement("div");
            div.classList.add("category");
            div.addEventListener("click", () => {
                wrapper.classList.toggle("show-category");
                selectedCategory = category;
        categoryTitle.innerHTML = category.title;
        categoryImg.src = `images/${category.img}`;
        calculateTotal();
        // remember tasks when category change
        renderTasks();
    });
    
    div.innerHTML = `
    <div class="left">
    <img src="images/${category.img}"
    alt="${category.title}"
    />
    <div class="content">
    <h1>${category.title}</h1>
    <p>${categoryTasks.length} Tasks</p>
    </div>
    </div>
    <div class="options">
    <div class="toggle-btn">
    <i class='bx bx-dots-vertical-rounded' id="bx-dots-vertical-rounded"></i>
    </div>
    </div>
    `;
    
    categoriesContainer.appendChild(div);
});
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
        tasksContainer.innerHTML = "";
        const categoryTasks = tasks.filter(
          (task) =>
            task.category.toLowerCase() === selectedCategory.title.toLowerCase()
        );
        // if no task for selected category
        if (categoryTasks.length === 0) {
          tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
        } else {
            // if there are tasks for selected category render them
            categoryTasks.forEach((task) => {
                const div = document.createElement("div");
                div.classList.add("task-wrapper");
                const label = document.createElement("label");
                label.classList.add("task");
                label.setAttribute("for", task.id);
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = task.id;
                checkbox.checked = task.completed;

                // add completion functionality on click checkbox
                checkbox.addEventListener("change", () => {
                    const index = tasks.findIndex((t) => t.id === task.id);
                    tasks[index].completed = !tasks[index].completed;
                    // save in local
                    saveLocal();
                    renderTasks();
                });

            div.innerHTML = `<div class="delete">
            <i class='bx bxs-trash' id="bxs-trash"></i>
        </div>`;
            label.innerHTML += `<span class="checkmark">
            <i class='bx bx-check' id="bx-check"></i>
        </span>
        <p>${task.task}</p>`;

        label.prepend(checkbox);
        div.prepend(label);
        tasksContainer.appendChild(div);

        //delete functionality
        const deleteBtn = div.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            const index = tasks.findIndex((t) => t.id === task.id);

            // remove the clicked task
            tasks.splice(index, 1);
            saveLocal();
            renderTasks();
        });
    });

    renderCategories();
    calculateTotal();
    };
  };

// save and get tasks from local storage
const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));

    //if tasks found
    if (localTasks) {
        tasks = localTasks;
    }
};

// lets add functionality to add new tasks

// render all the categories in select
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const category = categorySelect.value;

  if ((task === "")) {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
      tasks.push(newTask);
      taskInput.value = "";
      saveLocal();
      toggleAddTaskForm();
      renderTasks();
  }
});

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLocaleLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
})
//these all are already stored tasks
getLocal();
calculateTotal();
renderTasks();

// const recognition = new webkitSpeechRecognition(); // Initialize SpeechRecognition object
// recognition.continuous = false; // Set continuous to false to stop recognition after a single result

// const startSpeechRecognition = () => {
//   recognition.start(); // Start speech recognition
// }

// // Event listener for when speech recognition returns a result
// recognition.onresult = (event) => {
//   const transcript = event.results[0][0].transcript.trim(); // Get the recognized text
//   taskInput.value = transcript; // Set the recognized text to the task input field
// }

// // Event listener for when speech recognition ends
// recognition.onend = () => {
//   recognition.stop(); // Stop speech recognition
// }

// // Event listener for the add task button to start speech recognition
// addTaskBtn.addEventListener("click", startSpeechRecognition);