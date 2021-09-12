function createArray(height,width,hStart,wStart,direction,clockwise) {

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
        // leftOrRight(1) - left 
        // upOrDown(1) - up



    
        let loop = 1;
        let changedArray = [newArray[hStart][wStart]];
        let biggerSide = (width > height) ? width : height

        for (loop; loop < biggerSide; loop++) {
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

        console.log(changedArray)
    }else{
        console.log('Something went wrong...')
    }
}

