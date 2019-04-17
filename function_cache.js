function cache(func) {
    const cache = [];

    console.log(cache);

    function checkAndCache(...args) {
        let argsArray = [...args];
    
        function funcDataToCache() {
            const dataToCache = {};
            dataToCache.arguments = argsArray;
            dataToCache.result = func(...args);
            cache.push(dataToCache);
            return dataToCache.result;
        }

        if (!cache.length) {
            return funcDataToCache(...args);
        }

        for (let obj = 0; obj < cache.length; obj++) {
            for (let i = 0; i < argsArray.length; i++) {
                if (cache[obj].arguments[i] === argsArray[i]) {
                    continue;
                }

                return funcDataToCache(...args);
            }

            return `A function with such parameters has already been called. Result: ${cache[obj].result}`;
        }
    }

    return checkAndCache;
}

const complexFunction = function(arg1, arg2) { return arg1 + arg2; };
let cachedFunction = cache(complexFunction);

console.log(cachedFunction('foo', 'bar'));
console.log(cachedFunction('foo', 'bar'));
console.log(cachedFunction('foo', 'baz'));
console.log(cachedFunction('fon', 'baz'));