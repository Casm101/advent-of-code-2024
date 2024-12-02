/**
 * Advent day 02.1 planning:
 *
 * Retrieve reports from adevntofcode site.
 * Split data into reports and reports into levels.
 * Calulate safety level of each report.
 * Return ammount of safe reports
 */

// Constants
const dataUrl = "https://adventofcode.com/2024/day/2/input";
const sessionCookie =
    "53616c7465645f5f10a331a868506f0183dc6f92cdc78791a69d82cfc1c9de553a2f3367a0e559455414eb400afb4218f15df580373f72c5b23ca7fcde41696b";

// Retrieve reports data
const retrieveReports = async () => {
    const response = await fetch(dataUrl, {
        headers: { Cookie: `session=${sessionCookie}` },
    });

    return await response.text();
};

// Parse reports with numeric levels
const parseReports = (data) => {
    const reports = data.split("\n");
    const reportsWithLevels = reports.map((report) => report.split(" "));
    return reportsWithLevels.map((report) =>
        report.map((level) => parseInt(level))
    );
};

// Calulate safety
const calulateSafetylevels = (reports) => {
    const reportSafetyResults = reports.map((report) => {
        const isAcceptableStep = report.every((level, idx, array) => {
            if (idx === 0) return true;
            const step = Math.abs(level - array[idx - 1]);
            return (
                (level >= array[idx - 1] || level <= array[idx - 1]) &&
                step <= 3
            );
        });

        const isIncreasing = reports.every(
            (level, idx, array) => idx === 0 || level >= array[idx - 1]
        );
        const isDecreasing = reports.every(
            (level, idx, array) => idx === 0 || level <= array[idx - 1]
        );

        return (isIncreasing || isDecreasing) && isAcceptableStep;
    });

    return reportSafetyResults;
};

(async function () {
    const reportsData = await retrieveReports();
    const parsedReports = parseReports(reportsData);

    const safetyReports = calulateSafetylevels(parsedReports);
    console.log(safetyReports);
})();
