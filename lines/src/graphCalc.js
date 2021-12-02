
export const Graph = () => {

  let vertices = new Map()

  const setRoutes = (matrixToUse) => {

    for (let i = 0; i < matrixToUse.length; i++) {
      for (let j = 0; j < matrixToUse[0].length; j++) {

        if (!vertices.has([i ,j])) {
          let allRoutes = []
          if (j > 0 && matrixToUse[i][j-1] !== '1' && matrixToUse[i][j] !== '1') {
            allRoutes.push([i, j-1])
          }
          if (j+1 < matrixToUse[0].length && matrixToUse[i][j+1] !== '1' && matrixToUse[i][j] !== '1') {
            allRoutes.push([i, j+1])
          }
          if (i > 0 && matrixToUse[i-1][j] !== '1' && matrixToUse[i][j] !== '1') {
            allRoutes.push([i-1, j])
          }
          if (i + 1 < matrixToUse.length && matrixToUse[i+1][j] !== '1' && matrixToUse[i][j] !== '1') {
            allRoutes.push([i+1, j])
          }

          vertices.set([i, j], allRoutes);
          console.log(vertices)
          
        }
      }
    }
  }

  const creatingPathes = (startPoint) => {

    let list = vertices; 
    let queue = [startPoint];
    let visited = { [startPoint]: 1 }; 
    // кратчайшее расстояние от стартовой вершины
    let distance = { [startPoint]: 0 }; 
    let previousPoint = { [startPoint]: null };


    function handlePoint(point) {

      let neighboursList = []

      for (let key of list.keys()) {

        if (key[0] === point[0] && key[1] === point[1]){
          neighboursList = list.get(key);
          break
        }

      }

      neighboursList.forEach(neighbour => {

        if (!visited[neighbour]) {
          visited[neighbour] = 1;
          queue.push(neighbour);
          previousPoint[neighbour] = point;
          distance[neighbour] = distance[point] + 1;
        }

      });
    }

    while(queue.length) {
      let activePoint = queue.shift();
      handlePoint(activePoint);
    }

    return { distance, previousPoint }

  }

  const findShortestPath = (matrix, startPoint, finishPoint) => {

    let result = creatingPathes(startPoint);

    if (!(finishPoint in result.previousPoint)) 
        throw new Error(`No way found from ${startPoint} to ${finishPoint}`);
        
    let path = [];
    let currentPoint = finishPoint;
    
    while(currentPoint !== startPoint) {
      console.log(currentPoint)
      if (matrix[currentPoint[0]][currentPoint[1]] !== '1') {
        path.unshift(currentPoint);
        console.log(matrix[currentPoint[0]][currentPoint[1]])
      }
      currentPoint = result.previousPoint[currentPoint];
    }
    
    path.unshift(startPoint);
    
    return path;
  }

  const DrawingMatrixWithPath = () => {

    let matrix = []
    matrix = [
      ['0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '0', '0'],
      ['0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '1', '0', '1', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '0'],
      ['0', '0', '1', '0', '0', '0', '0', '0', '1', '0', '0', '0'],
      ['0', '1', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
      ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0'],
    ]
    let heightWidth = [12, 12]
    let style = ''

    // for (let i = 0; i < heightWidth[0]; i++) {
    //   let line = []

    //   for (let j = 0; j < heightWidth[1]; j++) {
    //     Math.floor(Math.random() * 10) > 7
    //     ? line.push(`1`)
    //     : line.push(`0`)
    //   }

    //   matrix.push(line)
    // }
    // с рандомом 

    setRoutes(matrix)

    let startEndPoints = []

    for (let i = 0; i < 2; i++) {
      startEndPoints.push([Math.floor(Math.random() * heightWidth[0]), Math.floor(Math.random() * heightWidth[1])]);
    }

    // while (matrix[startEndPoints[0][0]][startEndPoints[0][1]] === '1' || matrix[startEndPoints[1][0]][startEndPoints[1][1]] === '1'){
    //   console.log('try')
    //   for (let i = 0; i < 2; i++) {
    //     startEndPoints.push([Math.floor(Math.random() * heightWidth[0]), Math.floor(Math.random() * heightWidth[1])]);
    //   }
    // }
    // генерация рандомных точек что не стоят на стенах

    let path = findShortestPath(matrix, startEndPoints[0], startEndPoints[1])

    path.map((point) => {
      return matrix[point[0]][point[1]] = '3' 
    })

    let count = -1

    return(
      <div>   
        <p>
          coordinate 1: {startEndPoints[0][0] * heightWidth[0] + startEndPoints[0][1]}
        </p>
        <p>
          coordinate 2: {startEndPoints[1][0] * heightWidth[0] + startEndPoints[1][1]}
        </p>
        <table>
          <tbody>          
            {matrix.map((line, key1) => {
              return(
                <tr key={key1}>
                  {line.map((point, key2) => {
                    if (point === '0') {
                      style = 'road'
                    }
                    else if(point === '1'){
                      style = 'block'
                    }
                    else{
                      style = 'way'
                    }
                    count++
                    return(
                      <td key={key2} className={style}>
                        {count}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )

  }

  return(
    <div>
      <DrawingMatrixWithPath />
    </div>
  )
}