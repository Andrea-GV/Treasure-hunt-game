import { useEffect, useState } from "react";
import initImage from '../assets/x.png';
import clickedImage from '../assets/skull.png';
import treasureImage from '../assets/chest.png';
import './Board.css';

export default function Board({onAttempt, onReset, gameStarted, setGameStarted}) {

    // 2º paso. Una vez recogida la info del prompt, empiezo a pintar mi tablero que se basa en filas y columnas. Reseteo el Estado a 0 con el [] vacío
    const [boardRow, setBoardRows] = useState([]);
    const [boardCol, setBoardCols] = useState([]);
    // Añado e inicio el contador de intentos a 0
    const [attempts, setAttempts] = useState(0);
    // 6º Creo el el Estado para el contenido de cada celda, y lo reseteo también
    const [cellContent, setCellContent] = useState({});

    // 10º Creo el Estado del tesoro para aplicarlo en una posición aleatoria
    const [treasurePosition, setTreasurePosition] = useState(null);

    // 14º Creo la variable de estado para comprobar si se ha terminado el juego, esto incidirá en el Reset y en enseñar la imagen del tesoro al finalizar el juego
    const [gameOver, setGameOver] = useState(false); 

    // 3er paso es convertir los valores de las filas y columnas con el parseInt. Necesita 2 parámetros (Primero el del promp, y luego 10 para saber que trata de número decimal). Con todo esto, lo convertimos a número ENTERO
    useEffect(() => {
        // 13º AQUÍ VIENE LA CONDICIÓN PARA EL RESETEO DEL JUEGO
        if (!gameStarted) {
            // 1ºA paso es crear la función que pida el prompt para saber el número de filas y columnas
            const rows = prompt('Type a number to draw the rows ➡️');
            const cols = prompt('Type a number to draw the cols ⬇️');

            // Para manejar el error de cancelar en el prompt le añado:
            const numRows = parseInt(rows, 10);
            const numCols = parseInt(cols, 10);

            // 3ºB Verifico si los números introducidos en el prompt son válidos
            if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
                alert('❗Please, enter a valid number for rows and cols');
                return
            }

            // 4º Crear las filas del tablero recorriendo el array que genera, ignorando el primer parámetro (el valor) y quedándome sólo con el index (posición) que es lo que me interesa
            const rowsArr = Array.from({ length: numRows }, (any, index) => index);

            // Repito patrón para las columnas
            const colsArr = Array.from({ length: numCols }, (any, index) => index);

            // 5º Guardo lo recogido en el array de filas y en el de columnas en el estado
            setBoardRows(rowsArr);
            setBoardCols(colsArr);

            // 7º Inicializo el contenido de las celdas en vacío. Luego itero con forEach cada fila y cada columna, y les asigno a cada celda (objeto initialContent) con la cadena que forme {row} - {col} (lo que sería fila 2 columna 2 convirtiéndolo en una cadena: 2-3) la imagen inicial a mostrar (initImage). 
            const initialContent = {};
            rowsArr.forEach(row => {
                colsArr.forEach(col => {
                    initialContent[`${row}-${col}`] = initImage;
                })
            })
            setCellContent(initialContent); // Aquí se actualiza el Estado CellContent con initialContent que tiene las imágenes asignadas a las celdas

            // 11ª Genero la posición aleatoria para fila y para columna que aplicará al tesoro y luego actualizo el estado de setTreasurePosition
            const treasureRow = Math.floor(Math.random() * numRows);
            const treasureCol = Math.floor(Math.random() * numCols);
            setTreasurePosition({ row: treasureRow, col: treasureCol });

            // Actualizo el estado del juego
            setGameStarted(true);
        }
    }, [gameStarted, setGameStarted]);

    // 9ºA Creo la constante handleClick para manejar lo que quiero que haga al hacer click sobre la imagen de la casilla, y pueda cambiar de imagen. Creando la constante de currentImage utiliza las cordenadas de row-col y le digo que acceda a cellContent y me diga la imagen actual.
    // en la const nextImage le pido q compare la imagen actual con la inicial, y si coincide, le pido que cambie a la clickedImage
    const handleClick = (row, col) => {
        const currentImage = cellContent[`${row}-${col}`];
        // const nextImage = currentImage == initImage ? clickedImage : initImage <---- ESTO ME DIO ERROR Y LO CORREGÍ -->   
        let nextImage;
        // 9ºB  Verifico si la celda seleccionada es la del tesoro
        if (row === treasurePosition.row && col === treasurePosition.col) {
            nextImage = treasureImage;
            setCellContent(prevContent => ({
                ...prevContent,
                [`${row}-${col}`]: nextImage
            }));
            alert(`¡Congrats! ¡You've found the treasure!💰`);
            // En su lugar, actualiza el estado a de juegoFinalizado a true
            setGameOver(true);
        } else {
            // Si no lo es, que cambie de initImage a clickedImage
            nextImage = currentImage === initImage ? clickedImage : initImage;
            
            // 9ºC  Finalmente se actualiza el setCellContent con la nueva imagen sobre la q clické. Uso el '...' (spread operator) para copiar el contenido actual del estado y le asigna la nueva imagen.
            setCellContent(prevContent => ({
                ...prevContent,
                [`${row}-${col}`]: nextImage
            }));
            // onAttempt();
            setAttempts(attempts + 1);
            onAttempt();
        }
    };
    
    return (
        <div id="board">
            <table> {/* Hay un formato en HTML que crea tablas */}
                <tbody> {/* En el elemento de table, el tbody contienen las filas y columnas */}
                    {boardRow.map((row) => (
                        /* Mapeo de cada fila, y columna*/ 
                        /*  TR es un elemento q define/representa, en este caso, una fila. Con esto creo la fila y le asigno un atributo 'key'*/
                        <tr key={row}>
                            {boardCol.map((col) => (
                                /* boardCol va dentro de boardRow porque se anidan y crean la estructura, no pueden ir como elementos independientes */

                                /* 8º Renderizo las imágenes en las celdas creando la función handleClick q necesita el parámetro de la posición en la q esté en fila y columna */
                                <td id="td" key={col} onClick={() => handleClick(row, col)}>
                                    {/* <img src={cellContent[`${row}-${col}`]}></img> */}
                                    {/*  !!!  12º Actualizo la nueva renderización incluyendo la imagen del tesoro en la posición aleatoria creada antes    */}
                                    <img src={cellContent[`${row}-${col}`]}></img>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
