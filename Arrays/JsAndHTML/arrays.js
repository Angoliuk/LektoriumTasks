function createArray() {

    let height = document.getElementById('height').value
    let width = document.getElementById('width').value
    let hStart = document.getElementById('hStart').value
    let wStart = document.getElementById('wStart').value
    let direction = document.getElementById('direction').value
    let clockwise = (document.getElementById('clockwise').value === "false") ? false : true
    console.log(clockwise)

    if (height > hStart & width > wStart & height > 0 & width > 0 & hStart > 0 & wStart > 0) {

        let num = 0
        let newArray = new Array(width);
        for (let y = 0; y < height; y++) {
            newArray[y] = new Array(height)
            for (let x = 0; x < width; x++) {
            num++
            newArray[y][x] = num
            }
        }


    
        for (let y = 0; y < height; y++) {
            let div = document.createElement('div')
            div.className = 'row'
            for (let x = 0; x < width; x++) {
                let p = document.createElement('p')
                p.className = 'element'
                p.innerText = newArray[y][x];
                div.appendChild(p)
            }
            document.getElementById('main').appendChild(div)
        
        }



        let currentElem = [hStart, wStart]

        function leftOrRight(numOfMoves,dir) {
            for (let i = 0; i < numOfMoves+2*loop; i++) {
                if (currentElem[0] > -1 & currentElem[1]-dir > -1 & height > currentElem[0] & width > currentElem[1]-dir) {
                    changedArray.push(newArray[currentElem[0]][currentElem[1]-dir])
                }
                currentElem[1] -= dir    
            }
        }

        function upOrDown(numOfMoves,dir) {
            for (let i = 0; i < numOfMoves+2*loop; i++) {
                if (currentElem[0]-dir > -1 & currentElem[1] > -1 & height > currentElem[0]-dir & width > currentElem[1]) {
                    changedArray.push(newArray[currentElem[0]-dir][currentElem[1]])
                }
                currentElem[0] -= dir 
                
            }
        }
    // leftOrRight(x, 1) - left 
    // upOrDown(x, 1) - up
    // leftOrRight(x, -1) - right 
    // upOrDown(x, -1) - down



 
        let loop = 1;
        let changedArray = [newArray[hStart][wStart]];
        let biggerSide = (width > height) ? width : height

        for (loop; loop < biggerSide; loop++) {
            console.log(loop)
            switch (direction) {
                case 'left':
                    leftOrRight(-1,1);
                    (clockwise) ? upOrDown(-1,1) : upOrDown(-1,-1);
                    leftOrRight(0,-1);
                    (clockwise) ? upOrDown(0,-1) : upOrDown(0,1);
                    break;

                case 'right':
                    leftOrRight(-1,-1);
                    (clockwise) ? upOrDown(-1,-1) : upOrDown(-1,1);
                    leftOrRight(0,1);
                    (clockwise) ? upOrDown(0,1) : upOrDown(0,-1);
                    break;

                case 'up':
                    upOrDown(-1,1);
                    (clockwise) ? leftOrRight(-1,-1) : leftOrRight(-1,1);
                    upOrDown(0,-1);
                    (clockwise) ? leftOrRight(0,1) : leftOrRight(0,-1);
                    break;

                case 'down':
                    upOrDown(-1,-1);
                    (clockwise) ? leftOrRight(-1,1) : leftOrRight(-1,-1);
                    upOrDown(0,1);
                    (clockwise) ? leftOrRight(0,-1) : leftOrRight(0,1);
                    break;

                default:
                    break;
                }
        }

        document.getElementById("changed-array").innerText = changedArray
    }else{
        alert('Something went wrong...')
    }

}

