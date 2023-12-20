// Function to create clean filtered object as per class from given data.This behaves similar to lodash groupby, where keys are the common property we grouped by eg.(Alcohol) and value is an array of objects.
export const groupByClassHelper = (data) => {
    const groupBy = "Alcohol";
    const finalObj = Object.groupBy(data, (i) => i[groupBy]);
    return finalObj
}

//Filtered object is the main datasource containing array in values of this. so looping over, and taking each data containing array one-by-one and supplying to children calc. Function 
export const OuterMapper = (param, calculationFunction, property) => {

    // Creating copy of arr to keep code modular, functinal & not mutate original throughout.
    let resultObj = { ...param };
    // eslint-disable-next-line
    Object.keys(param).map(i => {
        resultObj[i] = calculationFunction(param[i], property)
    })
    return resultObj
}

// Taking dynamic property to easily switch ("flavanoid or gamma") or others and fixing to values to 3 decimal only.
export function mean(arr, property) {
    let sum = arr.reduce((acc, b) => acc + Number(b[property]), 0);
    let res = (sum / arr.length).toFixed(3);
    return res;
}

export function median(arr, property) {
    let newArr = [];
    arr.map(i => newArr.push(i[property]))
    newArr.sort((a, b) => a - b)
    let numsLen = newArr.length;
    // If no. of items are odd then, -> rounding of to find correct index then taking average of two middle numbers, else middle number only
    let result = numsLen % 2 === 0 ? (newArr[Math.floor(numsLen / 2) - 1] + newArr[Math.floor(numsLen / 2)]) / 2 : newArr[Math.floor(numsLen / 2)];
    return result
}

export function mode(arr, property) {
    let red = arr.reduce((acc, i) => [...acc, i[property]], [])
    const frequencyTable = {};
    red.forEach(elem => frequencyTable[elem] = frequencyTable[elem] + 1 || 1);

    let modes = [];
    let maxFrequency = 0;
    for (const key in frequencyTable) {
        if (frequencyTable[key] > maxFrequency) {
            modes = [Number(key)];
            maxFrequency = frequencyTable[key];
        }
        else if (frequencyTable[key] === maxFrequency) {
            modes.push(Number(key));
        }
    }
    // If every element occur just once, then clearing modes array
    if (modes.length === Object.keys(frequencyTable).length) modes = 0;
    // An array is created containg data for modes as per frequency but, maybe not needed in task so so only returing first element
    return modes.length > 1 ? modes[0] : modes;
}

export function gamma(arr) {
    let newArr = arr;
    // Looping over all elements and assigning a gamma property to a copy array through a helper function doing its calculations.
    for (let i = 0; i < newArr.length; i++) {
        newArr[i]["Gamma"] = createGammaProperty(newArr[i].Ash, newArr[i].Hue, newArr[i].Magnesium)
    }
    return newArr
}

function createGammaProperty(Ash, Hue, Magnesium) {
    // toFixed returns string so wrapping in a Number for consistency of data.
    return Number(((Ash * Hue) / Magnesium).toFixed(3))
}