export function fadePercent(valueBefore, valueAfter, SatBefore, SatAfter){
    return (1 - valueAfter / valueBefore) * (1 - SatAfter / SatBefore) * 100;
}