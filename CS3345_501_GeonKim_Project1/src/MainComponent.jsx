//.jsx only used reactor, render function
import React, {useState} from 'react';
import { OrderTypeSelector } from './OrderTypeSelector';
//import
import { SortingAlgoSelector } from './SortingAlgoSelector';
import {createRandomArray, inOrderArray, reverseOrderArray, almostOrderArray, insertionSort, 
    selectrionSort, quickSort, heapSort, mergeSort, radixSort} from './sorts.js'
//props =component to put it
export function MainComponent(props){
    //define states
    const [currentSort,setCurrentSort]=useState("");
    const [currentData,setCurrentData]=useState("");
    const [currentSize, setCurrentSize]=useState(0)
    //results of sorts
    const [result, setResult] = useState("")
    //best winner
    const [winners, setWinners] = useState({})
    //choice one and choice two
    const [player1, setPlayer1] = useState(undefined)
    const [player2, setPlayer2] = useState(undefined)
    //Order types
    const orderTypes= ['Random', 'InOrder', 'Almost', 'Reverse',];
    // read parameters to get new order type
    const handleDataChange = (newOrderType) => {
        setCurrentData(newOrderType);
        //reset player 1 and 2
        setPlayer1(undefined);
        setPlayer2(undefined);
    } 
    //when sorts are clicked
    const handleRun = () => {
        let sortFunction;
        let arrayToSort;
        switch (currentSort) {
            case "Insertion":
                sortFunction = insertionSort;
                break;
            case "Selection":
                sortFunction = selectrionSort;
                break;
            case "Quick":
                sortFunction = quickSort;
                break;
            case "Merge":
                sortFunction = mergeSort;
                break;
            case "Heap":
                sortFunction = heapSort;
                break;
            case "Radix":
                sortFunction = radixSort;
                break;
            default:
                setResult("Error");
                return;
        }
        //when arrays are clicked
        let randomArray = createRandomArray(currentSize)
        switch (currentData) {
            case "InOrder":
                arrayToSort = inOrderArray(randomArray);
                break;
            case "Reverse":
                arrayToSort = reverseOrderArray(randomArray);
                break;
            case "Almost":
                arrayToSort = almostOrderArray(randomArray);
                break;
            case "Random":
                arrayToSort = randomArray
                break;
            default:
                setResult("Error")
                return;
        }
        //just in case, to check the arrays are sorted correctly, dosent display anything
        console.log(sortFunction, arrayToSort)
        //result
        const result = sortFunction(arrayToSort)
        //set the results to display on the screen && ` <- special string to contain js
        setResult(`${currentSort} sort used on ${currentData} array. Time taken: ${result.timeEnd}. Movements: ${result.movementCount}. Comparisons: ${result.comparsonCount}.`)
        //if best algotithm exists and new algorithm is better, replace it with the better one
        if (winners[currentData]) {
            // make string and copy winners(JSONstringify(winners)) && JSTON.parse() will copy the object
            const winnerCopy = JSON.parse(JSON.stringify(winners))
            //if the currentBestData is smaller, replace it with new data
            if (winnerCopy[currentData].time >= result.timeEnd) {
                winnerCopy[currentData] = {sortType : currentSort, time : result.timeEnd}
            }
            //set the states
            setWinners(winnerCopy)
        } 
        //if the current best doesn't exist set it to the best
        else {
            const winnerCopy = JSON.parse(JSON.stringify(winners))
            winnerCopy[currentData] = {sortType : currentSort, time : result.timeEnd}
            setWinners(winnerCopy)
        }
        //This is for new round. player 1 and 2 exist, remove player2 
        if (player1 && player2) {
            setPlayer1({name : currentSort, time : result.timeEnd})
            setPlayer2(undefined)
        }
        //no data exists set player1
        else if (player1 === undefined) {
            setPlayer1({name : currentSort, time : result.timeEnd})
        }
        //if player 1 exist but player2 doesnt exist, set player2
        else {
            if (player1.name !== currentSort) {
                setPlayer2({name : currentSort, time : result.timeEnd})
            }
        }
    }
    
    return <div style={{display : "flex"}}>
        {/*display sorting algorithms */}
        <div style={{margin: "auto", marginLeft:"5%"}}>
            <SortingAlgoSelector cur={currentSort} setter={setCurrentSort}/>
        </div>
        {/*display orders */}
        <div style={{margin: "auto", marginLeft:"5%"}}>
            <OrderTypeSelector cur={currentData} setter={handleDataChange}/>
        </div>
        {/*algo is selected and order is selected the outside && will run the below codes when the condition is correct*/}
        {(currentSort !== "" && currentData !== "") && 
            <div style={{display:'flex', flexDirection:'column', margin: "auto", marginLeft:"5%"}}>
                {/*let user type the array size */}
                <p>Input array size</p>
                <input type="text" value={currentSize} onChange={(e) => {setCurrentSize(e.target.value)}} />
                <button onClick={handleRun}>Run</button>
            </div>
        }
        {/*display */}
        <div>
            {result !== "" && <p>{result}</p>}
            {/*if player1 is not undefiend, do not print out <p/> */}
            {player1 !== undefined && <p>Player 1 is {player1.name} with a time of {player1.time}</p>}
            {player2 !== undefined && <p>Player 2 is {player2.name} with a time of {player2.time}</p>}
            {(player1 !== undefined && player2 !== undefined) && (player1.time < player2.time ? <p>Player 1 wins</p> :
            <p>Player 2 wins</p>)}
        </div>
        <div>
            {/*display the best results for each order type */}  
        {   
            orderTypes.map((name) => {    
                return <div>
                    <p>Best of {name}: </p>
                    {winners[name] && <p>
                        {winners[name].sortType} with the time of {winners[name].time} seconds
                        </p>}
                </div>
                }
            )
        }
    </div>

    </div>
}


