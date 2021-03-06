// TODO: There's no reason to wrap the ans.
function wrapPrimitives(testcases) {
    // Wrap all args and answers in arrays if they're not already
    return testcases.map(argOrAns => {
        if (argOrAns instanceof Array) return argOrAns
        else return [argOrAns]
    })
}

function arrayify(toTest, args) {
    const result = toTest(...args)
    if (result instanceof Array) return result
    else return [result]
}

/** Test each case in testcases.

    Warning: if your function really accepts an array, that array must be
    double wrapped
*/
export function testAll(toTest, testcases) {
    testcases = testcases.map(wrapPrimitives)
    for (const [args, ans] of testcases) {
        test(`${toTest.name}(${args}) == ${JSON.stringify(ans)}`, () =>
            expect(arrayify(toTest, args)).toEqual(expect.arrayContaining(ans)))
    }
}

/** Test each case in testcases against an arbitrary expectAttr and eval'd Arg

    For eval:
        - `ans` is an array containing the result of the function
        - `args` is an array of input arguments to the function
        - `toTest` is the function you gave as input
*/
export function testAllCustom(toTest, testcases, expectAttr, expectArg) {
    testcases = testcases.map(wrapPrimitives)
    for (const [args, ans] of testcases) {
        test(`${toTest.name}(${args}) == ${JSON.stringify(ans)}`, () =>
            expect(arrayify(toTest, args))[expectAttr](eval(expectArg)))
    }
}

/** Call function with each testcase and check it doesn't throw */
export function testAllNoError(toTest, testcases) {
    for (const args of wrapPrimitives(testcases)) {
        test(`try: ${toTest.name}(${args})`, () =>
            expect(() => toTest(...args)).not.toThrow())
    }
}

export function testAllObject(toTest, testcases) {
    testAllCustom(toTest, testcases, "toMatchObject", "ans")
}
