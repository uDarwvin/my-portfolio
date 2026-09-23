let list = document.querySelector('.list');
let addBtn = document.querySelector('.add-button');
let input = document.querySelector('input');
let update = document.querySelector('.status');
let removeAllTasks = document.querySelector('.remove-all');
let listIsEmpty = document.querySelector('.list-is-empty')

addBtn.addEventListener('click', ()=>{
    ifNotEmpty()
})

input.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        ifNotEmpty()
        }
    }
)

removeAllTasks.addEventListener('click', ()=>{
    list.innerHTML = '';
    updateTask()
})


function createTask(){
    // create task
    let task =document.createElement('li');
    task.classList.add('task-style');
    list.appendChild(task);
    // create check button
    let check = document.createElement('i');
    check.classList.add('fa-solid');
    check.classList.add('fa-check');
    task.appendChild(check)
    // check tasck
    check.addEventListener('click', ()=> {
        check.classList.toggle('check');
        task.classList.toggle('done');
        updateTask()
    })
    // writing task
    task.appendChild(document.createTextNode(input.value))
    input.value = "";
    // create remove button
    let removeBtn = document.createElement('i');
    removeBtn.classList.add('fa-solid');
    removeBtn.classList.add('fa-xmark');
    task.appendChild(removeBtn);
    // remove task
    removeBtn.addEventListener('click', ()=> {
        task.remove()
        updateTask()
    })
    // update tasks
    updateTask();
}

function ifNotEmpty(){
    if(input.value != ""){
        createTask()
    }
    else
        alert('لطفا یک کار بنویسید.')
}

function updateTask(){
    let tasks = list.querySelectorAll('li');
    let notPressed =  0;
    tasks.forEach( (li) => {
        let checkNotPressed = li.firstElementChild;
        if(!checkNotPressed.classList.contains('check')){
            notPressed++;
        }
    });
    if(notPressed != 0)
    update.innerHTML = `شما ${notPressed} کار برای انجام دادن دارید`;
    else
    update.innerHTML = 'هنوز کاری ثبت نشده';
     // is list empty?
     if(tasks.length != 0)
        listIsEmpty.classList.add('d-none')
    else
        listIsEmpty.classList.remove('d-none')
}

