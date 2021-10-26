let allElems = []

function deleteElem(event) {
    
    let elemBlock = event.path[1]
    elemBlock.style.display = 'none'
    console.log(elemBlock.id)
    allElems.splice(elemBlock.id, 1)
    localStorage.setItem('points', JSON.stringify(allElems))

}


function editItem(event) {

    let elemBlock = event.path[1]
    let editedElem = allElems.find((point) => point.id === Number(elemBlock.id))
    editedElem.finishedEditing = !editedElem.finishedEditing

    if (editedElem.finishedEditing === true) {
        editedElem.title = elemBlock.querySelector('.inputForElem').value
        allElems.forEach(point => {
            if (point.id === Number(elemBlock.id)) {
                point = editedElem
            }
        });
    }
    
    localStorage.setItem('points', JSON.stringify(allElems))
    elemBlock.querySelector('.inputForElem').disabled = editedElem.finishedEditing

}


function moving(event) {

    if (event.target.className === 'elem') {
        
        let shiftX = event.clientX - event.target.getBoundingClientRect().left
        let shiftY = event.clientY - event.target.getBoundingClientRect().top

        move(event)

        function move(event) {

            event.target.style.left = event.pageX - shiftX + 'px'
            event.target.style.top = event.pageY - shiftY + 'px'

        }

        function onMove(event) {
            move(event)
        }

        document.addEventListener('mousemove', onMove)
 
        event.target.onmouseup = function() {

            allElems.find(point => point.id == event.target.id).position = {
                top: event.target.style.top,
                left: event.target.style.left,
            }

            localStorage.setItem('points', JSON.stringify(allElems))

            document.removeEventListener('mousemove', onMove);
            event.target.onmouseup = null;
        };

    }
}


function createPointHTML(pointParams) {
    
    let newElem = document.createElement('div')
    newElem.id = pointParams.id
    newElem.onmousedown = moving
    newElem.ondragstart = function() {
        return false
    }

    let inputForElem = document.createElement('input')
    inputForElem.className = "inputForElem"
    inputForElem.value = pointParams.title
    inputForElem.disabled = pointParams.finishedEditing

    let deleteButtonForElem = document.createElement('button')
    deleteButtonForElem.onclick = deleteElem
    deleteButtonForElem.className = "deleteButtonForElem"
    deleteButtonForElem.innerText = 'X'

    let saveButtonForElem = document.createElement('button')
    saveButtonForElem.onclick = editItem
    saveButtonForElem.className = "saveButtonForElem"
    saveButtonForElem.innerText = 'V'

    inputForElem.placeholder = 'New place'
    newElem.appendChild(inputForElem)
    newElem.appendChild(deleteButtonForElem)
    newElem.appendChild(saveButtonForElem)

    newElem.className = 'elem'
    console.log(pointParams.position.left)
    newElem.style.left = pointParams.position.left
    newElem.style.top = pointParams.position.top

    document.getElementById('blockFroDrag').append(newElem)

}

function createElem(event) {

    newElemObj = {
        id: (allElems && allElems.length > 0) ? allElems[allElems.length-1].id+1 : 0 ,
        title: "",
        finishedEditing: false,
        position: {
            top: event.pageY + 'px', 
            left: event.pageX + 'px',
        }
    }

    createPointHTML(newElemObj)

    allElems.push(newElemObj)

    localStorage.setItem('points', JSON.stringify(allElems))

}

function loadingLocalStorage() {

    let data = JSON.parse(localStorage.getItem('points'))
    console.log(data)
    if (data && data.length > 0) {
        allElems = data
        data.forEach(point => {
            createPointHTML(point)
        }); 
    }
    
}


