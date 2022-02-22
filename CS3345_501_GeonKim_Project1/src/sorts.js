//This first 53 lines are for creating Arrays

//function to create random array
export function createRandomArray(input){
    /*define length and input of the array
    this function will create*/
    return Array.from( {length:input},()=>Math.floor(Math.random()*input));
}
//function to create inorder array
export function inOrderArray(randomArray){
    //this will copy and create a new random array 
    let copyArray = randomArray.slice();
    //in ordersort
    let copyArray2 = copyArray.sort((a, b) => a - b); 
    console.log(copyArray2)
    return copyArray2
}
//function to create reverse order array
export function reverseOrderArray(randomArray){
    //this will copy and create a new random array
    let copyArray = randomArray.slice();
    //it will sort in order
    let copyArray2 = copyArray.sort((a, b) => a - b); 
    //it will reverse the order
    return copyArray2.reverse();
}
//function to create almost order array
export function almostOrderArray(randomArray){
    //this will copy and create a new random array
    let copyArray = randomArray.slice();
    //this will copy and sort in order
    let copyArray2 = copyArray.sort((a, b) => a - b);
    //this function will mix by 20%
    const mixFunction = (tempArray)=>{
        //define almost array that will save the almost order
        const almostArray = [];
        //tempArray.forEach, it will push the value into the array
        tempArray.forEach ((component) =>{
            // percentage to determine random or not 
            const percentage = Math.random();
            // if it is less than or equal to 20%, it will put random value into the index
            if(percentage <= 0.2){
                almostArray.push(Math.floor(Math.random()*tempArray.length));
            }
            // if it is more than 20% it will just use the current value
            else {
                almostArray.push(component);
            }
        } )
        //return the mix the array
        return almostArray;
    }
    //put in order array in the mix function and call
    return mixFunction(copyArray2)
}
//--------------------------------------------------------------------------------------------------------
//this part will sort the arrays
//Insertion sort
export function insertionSort (array){
    //start time
    let timeStart = Date.now();
    // Define movement count and comparson Count and set them equal to 0
    let movementCount = 0, comparsonCount = 0 ;
    //this function will sort the arrays in insertion sort way and count the comparson and movement
    for (let i = 0; i < array.length; i++) {
        const x = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > x) {
            comparsonCount++;
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = x;
        comparsonCount++;
        movementCount++;
    }
    // end time
    let timeEnd = (Date.now()-timeStart)/1000;
    // return the values
    return {comparsonCount,movementCount,timeEnd,array}; 
}

//this function will swap the positions in the array
const swapPosition = (array,front,back)=>{
    // this will copy the front part of the array
    let tempValue = array[front];
    // this will swap the front and back
    array[front] = array[back];
    // back array will be front array
    array[back] = tempValue;
}

// This function will do selection Sort
 export function selectrionSort (array) {
    //start time
    let timeStart = Date.now();
    //define movement and comparson count in this function
    let movementCount = 0, comparsonCount = 0;
    // copy the array
    // selection function
    for (let i = 0 ; i < array.length ; i++){
        //set minimum index equal to i
        let minIndex = i ;
        for (let j = i+1 ; j < array.length ; j++){
            //if current element is less than the minimum replace that with j
            if( array[j] < array[minIndex]){
                minIndex = j;
            }
            comparsonCount++;
        }
        //swap the position
        if (i !== minIndex){
            swapPosition(array,minIndex,i);
            movementCount++;
        }
    }
    // end time
    let timeEnd = (Date.now()-timeStart)/1000;
    // return the values
    console.log({array})
    return {comparsonCount,movementCount,timeEnd,array}; 
}


//quicksort function
export function quickSort(array){
    //define movement and comparson count in this function
    let movementCount = 0, comparsonCount = 0;
    //start time
    let timeStart = Date.now();
    // partition the array
    function partitionArray(array, high, low) {
        // define pivot
        let pivot = Math.floor((high + low) / 2);
        //  when high is greater or equal to low
        while (high <= low) {
            comparsonCount++;
            // while pivot is greater than high
            while (array[high] < array[pivot]) {
                //comparson count++
                comparsonCount++;
                //high value ++
                high++;
            }
            //while pivot is less than low
            while (array[low] > array[pivot]) {
                //comparsoncount++
                comparsonCount++;
                //low--
                low--;
            }
            // if high <= low
            if (high <= low) {
                //swap position
                swapPosition(array, high, low);
                movementCount++;
                //high ++
                high++;
                //low --
                low--;
            }
        }
        return high;
    }
    // Quick sort function
    function quickSort(array, high, low) {
        //define how if high doesnt exists
        high = high || 0;
        //defnie low if low doesnt exists
        low = low || array.length - 1;
        // defnie pivot
        let pivot = partitionArray(array, high, low); 
        // comparson count++
        comparsonCount++
        //if high is greater than pivot-1 quicksort from there
        if (high < pivot - 1) {
            quickSort(array, high, pivot - 1);
        }
        //if low is greater than pivot quick sort from there
        if (low > pivot) {
            quickSort(array, pivot, low);
        }
        //return array
        return array;
    }
    // run qucik sort
    quickSort(array);
    //end time
    let timeEnd =  (Date.now() - timeStart) / 1000;
    //return values
    return {comparsonCount,movementCount,timeEnd,array}; 
 }

 //heap sort 
 export function heapSort(array){
    //start time
    let timeStart = Date.now();
    //define counts
    let comparsonCount = 0, movementCount = 0;
    //define array length
    let arrayLength = array.length;
    //tree root
    function heapRoot(array, index) {
        //define child index
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        //set max at index
        let max = index;
        //comparson count ++
        comparsonCount++;
        // if left component is greater than max and smaller than parent
        if (leftChildIndex < arrayLength && array[leftChildIndex] > array[max]) {
            max = leftChildIndex;
        }
        //if right component is greater max and smaller than parent
        if (rightChildIndex < arrayLength && array[rightChildIndex] > array[max]) {
            max = rightChildIndex;
        }
        // if max is not i, use swapPosition function and do heap root
        if (max !== index) {
            swapPosition(array, index, max);
            movementCount++;
            heapRoot(array, max);
        }
    }
    //sort function
    const heapSort = (array)=> {
        // set array length
        arrayLength = array.length;
        //split in half and heap root
        for (let i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
            heapRoot(array, i);
        }
        // from end to strart, switch the position
        for (let i = array.length - 1; i > 0; i--) {
            swapPosition(array, 0, i);
            movementCount++;
            arrayLength--;
            heapRoot(array, 0);
        }
    }
    //run heap sort
    heapSort(array);
    //define end time
    const timeEnd = (Date.now() - timeStart) / 1000;
    //return values
    return {comparsonCount,movementCount,timeEnd,array}; 
}

//merge sort
export function mergeSort(array){
    //define counts
    let comparsonCount = 0, movementCount = 0;
    //set start time
    let timeStart = Date.now();
    // merge function
    const mergeLeftRight = (left, right) => {
        //create new array
        const array = [];
        // while left and right exist
        while (left.length !== 0 &&right.length !== 0) {
            //comparson count ++
            comparsonCount++;
            // if first left is smaller than first right
            if (left[0] < right[0]) {
                //m count ++
                movementCount++;
                // shift left
                array.push(left.shift());
            } 
            //shift right
            else {
                //m count ++
                movementCount++;
                array.push(right.shift());
            }
        }
        //return values
        return array.concat(left.slice()).concat(right.slice());
    }
    //merge Top down
    const mergeTopDown = (array) => {
        //c count ++
        comparsonCount++;
        //if array sorting is finished
        if (array.length < 2) {
            return array;
        }
        //definie middle, left, and right
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        return mergeLeftRight(mergeTopDown(left), mergeTopDown(right));
    }
    //run merge top down
    mergeTopDown(array);
    //time end
    const timeEnd = (Date.now() - timeStart) / 1000;
    //return values
    return {comparsonCount,movementCount,timeEnd,array}; 
}

//radixSort function
export function radixSort(array){
    //start time
    const timeStart = Date.now();
    //define variables
    let comparsonCount = 0, movementCount = 0;
    //create double array
    let counter= [[]];
    const radixSortLSD = (array) => {
        //define varialbes
        let max = 0, dev =1, modulo = 10; 
        // find max
        for (let i = 0; i < array.length; i++) {
            //c count ++
            comparsonCount++
            if (array[i] > max) {
                //m count ++
                movementCount++;
                max = array[i];
            }
        }
        // get legnth of max digit
        let maxDigitLength = (max + '').length;
        //increment dev and mod by 10
        for (let i = 0; i < maxDigitLength; i++, dev *= 10, modulo *= 10) {
            for (let j = 0; j < array.length; j++) {
                //c count ++
                comparsonCount++;
                // // get significant digit
                let storage = Math.floor((array[j] % modulo) / dev);
                if (counter[storage] === undefined) {
                    counter[storage] = [];
                }
                counter[storage].push(array[j]);
            }
            //postion = 0
            let pos = 0;
            // iterate thorugh counters
            for (let j = 0; j < counter.length; j++) {
                //c count ++
                comparsonCount++;
                //define value as undefined
                let value = undefined;
                //if it doesnt exist shift and m count ++
                if (counter[j] !== undefined) {
                    while ((value = counter[j].shift()) !== undefined) {
                        movementCount++;
                        array[pos++] = value;
                    }
                }
            }
        }
    }
    //run radix function
    radixSortLSD(array);
    //end time
    const timeEnd = (Date.now() - timeStart) / 1000;
    //return values
    return {comparsonCount,movementCount,timeEnd,array}
}

