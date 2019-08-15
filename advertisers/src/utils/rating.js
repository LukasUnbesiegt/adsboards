
export const getTotal = (arr, number) => {

    let total = 0;

    arr.forEach((item) => {

        if (item === number) {
            total++
        } else {
            // do nothing
        }
    })


    return total;


}


export const getAverage = (totalArr) => {

    const base = totalArr[0] + totalArr[1] + totalArr[2] + totalArr[3] + totalArr[4];
    const total = (5 * totalArr[4]) + (4 * totalArr[3]) + (3 * totalArr[2]) + (2 * totalArr[1]) + (1 * totalArr[0])

    const average = Math.floor(total / base);

    return average;

}