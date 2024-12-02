/**
 * Advent day 01.2 planning:
 *
 * Fetch list data from site using session cookie
 * Split data into 2 separate arrays
 * Map first list to find value occurances in second list
 * Sum all ocurrances to find similarity score
 */

// Constants
const dataUrl = "https://adventofcode.com/2024/day/1/input";
const sessionCookie =
    "session=53616c7465645f5f01cbafebf6c4cbf9701eddeb1b9c85324b3d93383686494fc7fbd4451e53d030e41619b3610f9656ab4cf91a7c07d0a2cbc34d926f6f3714";

// Fetch advent data
const fetchListData = async () => {
    const listData = await fetch(dataUrl, {
        headers: { Cookie: sessionCookie },
    });

    return (await listData.text()).trim().split(/\s+/);
};

// Split array in 2 even parts
const splitArray = (arr) => {
    const oddArr = [];
    const evenArr = [];

    arr.forEach((val, idx) => {
        if (idx % 2 === 0) evenArr.push(val);
        else oddArr.push(val);
    });

    return { oddArr, evenArr };
};

// Main execution function
(async function () {
    const list = await fetchListData();
    const { oddArr, evenArr } = splitArray(list);

    const test = oddArr.map((val) => evenArr.filter((x) => x === val).length);

    console.log(JSON.stringify(test, null, 2));
})();
