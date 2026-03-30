export function random (t: number, e: number) {
    return (t = t || 0), (e = void 0 === e ? 1 : e), t + Math.random() * (e - t);
};
export function randomInt(t: number, e: number) {
    return (t + Math.random() * (e - t)) | 0;
    }
export function randomSeed(t: number, e: number, i: number) {
    let min = t,
     max = e;
     i = i || 1;
     (i = (9301 * i + 49297) % 233280);
    var r = i / 233280;
    return min + r * (max - min);
}
export function randomChance(t: number, e: number) {
    return randomSeed(0, 1, e) > t;
}