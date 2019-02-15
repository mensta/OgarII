const version = "2.0.0";

/**
 * @returns {Color}
 */
function randomColor() {
    switch (~~(Math.random() * 6)) {
        case 0: return { r: ~~(Math.random() * 0x100), g: 0x10, b: 0xFF };
        case 1: return { r: ~~(Math.random() * 0x100), g: 0xFF, b: 0x10 };
        case 2: return { r: 0x10, g: 0xFF, b: ~~(Math.random() * 0x100) };
        case 3: return { r: 0x10, g: ~~(Math.random() * 0x100), b: 0xFF };
        case 4: return { r: 0xFF, g: ~~(Math.random() * 0x100), b: 0x10 };
        case 5: return { r: 0xFF, g: 0x10, b: ~~(Math.random() * 0x100) };
    }
}
/**
 * @param {Color=} color
 * @returns {Color}
 */
function grayscaleColor(color) {
    /** @type {number} */
    let weight;
    if (color) weight = ~~(0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
    else weight = 0x7F + ~~(Math.random() * 0x80);
    return { r: weight, g: weight, b: weight };
}

/** @param {number[]} n */
function anyBadNumber(...n) {
    for (let i = 0; i < n.length; i++)
        if (isNaN(n[i]) || !isFinite(n[i]) || n[i] == null)
            return true;
    return false;
}
/** @param {number[]} n */
function throwIfBadNumber(...n) {
    for (let i = 0; i < n.length; i++)
        if (isNaN(n[i]) || !isFinite(n[i]) || n[i] == null)
            return void generateError(Error, "CONSTANTS_BAD_NUMBER", n[i], i);
}

/**
 * @param {Rect} a
 * @param {Rect} b
 */
function intersects(a, b) {
    return a.x - a.w <= b.x + b.w &&
        a.x + a.w >= b.x - b.w &&
        a.y - a.h <= b.y + b.h &&
        a.y + a.h >= b.y - b.h;
}
/**
 * @param {Rect} a
 * @param {Rect} b
 */
function fullyIntersects(a, b) {
    return a.x - a.w >= b.x + b.w &&
        a.x + a.w <= b.x - b.w &&
        a.y - a.h >= b.y + b.h &&
        a.y + a.h <= b.y - b.h;
}
/**
 * @param {Rect} a
 * @param {Rect} b
 * @returns {Quadrant}
 */
function getQuadIntersect(a, b) {
    return {
        t: a.y - a.h < b.y || a.y + a.h < b.y,
        b: a.y - a.h > b.y || a.y + a.h > b.y,
        l: a.x - a.w < b.x || a.x + a.w < b.x,
        r: a.x - a.w > b.x || a.x + a.w > b.x
    };
}
/**
 * @param {Rect} outer
 * @param {Rect} inner
 * @returns {Quadrant}
 */
function getQuadFullIntersect(outer, inner) {
    return {
        t: outer.y - outer.h < inner.y && outer.y + outer.h < inner.y,
        b: outer.y - outer.h > inner.y && outer.y + outer.h > inner.y,
        l: outer.x - outer.w < inner.x && outer.x + outer.w < inner.x,
        r: outer.x - outer.w > inner.x && outer.x + outer.w > inner.x
    };
}

module.exports = {
    version,

    generateError,

    randomColor,
    grayscaleColor,

    anyBadNumber,
    throwIfBadNumber,

    intersects,
    fullyIntersects,
    getQuadIntersect,
    getQuadFullIntersect
};
