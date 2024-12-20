/**
 * Advent day 01 planning:
 *
 * Fetch list data from site using session cookie
 * ¿? Propmt user for session cookie making code reusable
 * Split data into 2 arrays
 * Sort both arrays in ascending order
 * Calculate distance between array elements
 * Calculate sum of total distance
 */

// Constants
const dataUrl: string = "https://adventofcode.com/2024/day/1/input";
const sessionCookie: string =
    "session=53616c7465645f5f01cbafebf6c4cbf9701eddeb1b9c85324b3d93383686494fc7fbd4451e53d030e41619b3610f9656ab4cf91a7c07d0a2cbc34d926f6f3714";

// Fetch advent data
const fetchListData = async (): Promise<number[]> => {
    const listData = await fetch(dataUrl, {
        headers: { Cookie: sessionCookie },
    });

    return (await listData.text())
        .trim()
        .split(/\s+/)
        .map((val) => parseInt(val));
};

// Split array in 2 even parts
const splitArray = (arr: number[]) => {
    const oddArr: number[] = [];
    const evenArr: number[] = [];

    arr.forEach((val, idx) => {
        if (idx % 2 === 0) evenArr.push(val);
        else oddArr.push(val);
    });

    return { oddArr, evenArr };
};

// Sort numerical array in incremental order
const sortArrayIncremental = (arr: number[]): number[] =>
    arr.sort((a, b) => a - b);

// Get distance between numerical pairs in arrays
const getDistance = (arr1: number[], arr2: number[]): number[] => {
    return arr1.map((val, idx) => Math.abs(val - arr2[idx]));
};

// Main execution function
(async function () {
    const list = await fetchListData();
    const { oddArr, evenArr } = splitArray(list);

    const sortedOddArr = sortArrayIncremental(oddArr);
    const sortedEvenArr = sortArrayIncremental(evenArr);

    const distances = getDistance(sortedOddArr, sortedEvenArr);
    const finalDistance = distances.reduce((acc, val) => acc + val, 0);

    console.log(finalDistance);
})();

/**
 * My Final Score: 2264607
 */
