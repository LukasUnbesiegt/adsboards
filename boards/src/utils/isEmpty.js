
export const isEmpty = (value) => {

    return value === null ||
        value === undefined ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)


}

export const getTotalIncomes = (arr) => {


    let refinedArr = arr.map((item) => {
        return item.amount;
    })

    const finalVal = refinedArr.reduce((accumulator, currentValue) => {


        return accumulator + currentValue
    })

    return finalVal;


}