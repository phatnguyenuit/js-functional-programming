/**
 * Flatten input data with rules:
 *
 * - Array will be flattened with only one level
 * - Object will be flattened with only single level properties. Nested properties will be ignored
 * @param {any} input Input data
 */
function flatten(input) {
  if (isObjectLike(input)) return flattenObject(input);
  if (Array.isArray(input)) return flattenArray(input);

  throw new Error('Unsupported input:', input);
}

function flattenObject(obj) {
  return Object.entries(obj).reduce((prev, [key, item]) => {
    if (isObjectLike(item)) return Object.assign({}, prev, flattenObject(item));
    if (Array.isArray(item))
      return Object.assign({}, prev, {
        [key]: flattenArray(item),
      });

    return Object.assign({}, prev, {
      [key]: item,
    });
  }, {});
}

function flattenArray(arr) {
  return arr.reduce((prev, item) => {
    if (Array.isArray(item)) return prev.concat(flattenArray(item));
    if (isObjectLike(item)) return prev.concat(flattenObject(item));

    return prev.concat(item);
  }, []);
}

function isObjectLike(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

const nestedObj = {
  a: 1,
  b: true,
  c: {
    d: null,
    e: {
      f: 'hello world',
    },
  },
};
const nestedArrayInsideObj = {
  ...nestedObj,
  arr: [1, [2, [3, [4]]]],
};

const nestedArr = [1, 2, [3, [[4], [5, 6]]]];
const nestedObjInsideArr = [
  ...nestedArr,
  [7, { hello: 'world!', ok: { fine: true } }],
];

console.log(flatten(null));
console.log(flatten(nestedObj));
console.log(flatten(nestedArrayInsideObj));
console.log(flatten(nestedArr));
console.log(flatten(nestedObjInsideArr));
