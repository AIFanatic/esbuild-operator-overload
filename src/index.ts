import { Point } from './PointOverload';

function describe(name: string, func: Function) {
    const colors = {"red": "\x1b[31m", "green": "\x1b[32m", "yellow": "\x1b[33m"};

    let passed = false;
    try {
        func();
        console.log(`${colors["yellow"]}[${name}] ${colors["green"]} Passed`);

    } catch (error) {
        console.error(error);
        passed = false;
        console.log(`${colors["yellow"]}[${name}] ${colors["red"]} Failed`);
        throw Error("Test failed")
    }
}

function assert(condition: boolean) {
    if (!condition) throw Error("Ups, condition is false");
}

describe("Point + Point", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    const p3 = p1 + p2;
    console.log(p3)

    assert(p3.x === 4 && p3.y === 6);
});

describe("Point * Point", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    const p3 = p1 * p2;

    assert(p3.x === 3 && p3.y === 8);
});

describe("Point ** Point", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    const p3 = p1 ** p2;

    assert(p3.x === 1 && p3.y === 16);
});

describe("Point > Point", () => {
    const p1 = Point(1,5);
    const p2 = Point(3,4);
    const cmp = p1 > p2;

    assert(cmp[0] === false && cmp[1] === true);
});

describe("Point >= Point", () => {
    const p1 = Point(1,4);
    const p2 = Point(3,4);
    const cmp = p1 >= p2;

    assert(cmp[0] === false && cmp[1] === true);
});

describe("Point < Point", () => {
    const p1 = Point(1,5);
    const p2 = Point(3,4);
    const cmp = p1 < p2;

    assert(cmp[0] === true && cmp[1] === false);
});

describe("Point <= Point", () => {
    const p1 = Point(1,4);
    const p2 = Point(3,4);
    const cmp = p1 <= p2;

    assert(cmp[0] === true && cmp[1] === true);
});

describe("Point == Point", () => {
    const p1 = Point(1,4);
    const p2 = Point(3,4);
    const cmp = p1 == p2;

    assert(cmp[0] === false && cmp[1] === true);
});

describe("Point + 10", () => {
    const p1 = Point(1,2);
    const p2 = p1 + 10;

    assert(p2.x === 11 && p2.y === 12);
});

describe("Point * 10", () => {
    const p1 = Point(1,2);
    const p2 = p1 * 10;

    assert(p2.x === 10 && p2.y === 20);
});

describe("10 + Point", () => {
    const p1 = Point(1,2);
    const p2 = 10 + p1;

    assert(p2.x === 11 && p2.y === 12);
});

describe("10 * Point", () => {
    const p1 = Point(1,2);
    const p2 = 10 * p1;

    assert(p2.x === 10 && p2.y === 20);
});

describe("10 + 5 * Point", () => {
    const p1 = Point(1,2);
    const p2 = 10 + 5 * p1;

    assert(p2.x === 15 && p2.y === 20);
});

describe("func(Point + 10)", () => {
    function dummyFunction(p: Point) {
        return p;
    }
    const p1 = Point(1,2);
    const p2 = dummyFunction(p1 + 10);

    assert(p2.x === 11 && p2.y === 12);
});

describe("`${Point + Point}`", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    const p3 = `${p1 + p2}`

    assert(p3 === `Point(x: 4, y: 6)`);
});

describe("(Point + Point).sum()", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    const p3 = (p1 + p2).sum();

    assert(p3 === 10);
});

describe("Benchmark Operator overload", () => {
    const p1 = Point(1,2);
    const p2 = Point(3,4);
    
    let ret = 0;
    console.time("bench");
    for (let i = 0; i < 1000000; i++) {
        ret += (p1 + p2).sum();
    }
    console.log("ret", ret)
    console.timeEnd("bench");
});

describe("Benchmark Number", () => {
    const p1 = 1;
    const p2 = 2;
    
    let ret = 0;
    console.time("bench");
    for (let i = 0; i < 1000000; i++) {
        ret += p1 + p2
    }
    console.log("ret", ret)
    console.timeEnd("bench");
});