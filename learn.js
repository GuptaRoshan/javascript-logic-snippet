
// 1. Logical AND assignment (&&=)

let a = 1;
// If a is truthy, a is assigned 3 (the right-hand side of the assignment) and returned.
a &&= 3
console.log(a); // 3


// 2. Logical OR assignment (||=)   

let b = undefined;
// if b exist b is assigned or else 5 is assigned
b ||= 5;
console.log(b); // 5  


// 3. Nullish coalescing assignment (??=) and operator (??)

let c = undefined;
// Assign when the value is null or undefined.
c ??= 7
console.log(c); // 7 

//The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
const foo = null ?? 'default string';
console.log(foo);
// Expected output: "default string"

const baz = 10 ?? 42;
console.log(baz);
// Expected output: 10



// -------------------------------------------------------------------------------------------------//

// 4. Desctructuring assignment

// Array Destructuring
const [firstName, lastName] = ['John', 'Doe'];
console.log(firstName); // Output: John
console.log(lastName); // Output: Doe

// Object Destructuring
const { age, city } = { name: 'Alice', age: 25, city: 'New York' };
console.log(age); // Output: 25
console.log(city); // Output: New York


// -------------------------------------------------------------------------------------------------//

// 5. Spread Operator and Rest Operator

// Spread Operator (Arrays)
const numbers = [1, 2, 3];
const newArray = [...numbers, 4, 5];
console.log(newArray); // Output: [1, 2, 3, 4, 5]


// Spread Operator (Objects)
const person = { name: 'John', age: 30 };
const updatedPerson = { ...person, age: 31 };
console.log(updatedPerson); // Output: { name: 'John', age: 31 }


// Rest Operator
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // Output: 10


// -------------------------------------------------------------------------------------------------//

// 6. Generator Functions

function* generatorFunction() {
    yield 'Hello';
    yield 'World';
}

const generator = generatorFunction();
console.log(generator.next().value); // Output: Hello
console.log(generator.next().value); // Output: World

// -------------------------------------------------------------------------------------------------//

// 7. Optional Chaining (?.)

const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah',
    },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// Expected output: undefined

console.log(adventurer.cat?.name);
// Expected output: Dinah

// -------------------------------------------------------------------------------------------------//

// 8. Funtional piping

// Custom utility function for function piping
function pipe(...functions) {
    return function (input) {
        return functions.reduce((acc, fn) => fn(acc), input);
    };
}

// Example functions
function addTwo(x) {
    return x + 2;
}

function multiplyByThree(x) {
    return x * 3;
}

function square(x) {
    return x * x;
}

// Using function piping
const result = pipe(
    addTwo,
    multiplyByThree,
    square
)(5); // Start with 5, add 2, multiply by 3, and then square the result

console.log(result); // Output: 441 (square(multiplyByThree(addTwo(5))))

// -------------------------------------------------------------------------------------------------//

// 9. Currying in JavaScript    

// Regular function
function add(x, y) {
    return x + y;
}

// Curried version
function curriedAdd(x) {
    return function (y) {
        return x + y;
    };
}

// Usage
const addTwo = curriedAdd(2); // Fixing the first argument
console.log(addTwo(3)); // Output: 5


// Currying using arrow functions

const curriedAdd = x => y => x + y;
const addTwo = curriedAdd(2);
console.log(addTwo(3)); // Output: 5


// Examples

// 1. Event handlers

// Regular event handler
button.addEventListener('click', function (event) {
    handleClick(event, data);
});

// Curried event handler
const handleClickCurried = data => event => {
    handleClick(event, data);
};

button.addEventListener('click', handleClickCurried(data));


// 2. Api calls

// Regular API request
function fetchData(url, headers, callback) {
    // Make request
}

// Curried API request
const fetchDataCurried = url => headers => callback => {
    // Make request with predefined URL, headers, and callback
};

const fetchUserData = fetchDataCurried('/api/user');
const handleUserData = response => {
    // Handle user data
};

fetchUserData({ Authorization: 'Bearer token' })(handleUserData);


// -------------------------------------------------------------------------------------------------//

// 10. Async Iterators

const urls = [
    'https://api.github.com/users/github',
    'https://api.github.com/users/microsoft',
    'https://api.github.com/users/google'
];

async function* fetchUser(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const user = await response.json();
        yield user;
    }
}

// Consume the async generator
(async () => {
    for await (const user of fetchUser(urls)) {
        console.log(user.login);
    }
})();

/**
 *  Explanation:
 * 
 *  fetchUser(urls) returns an async iterator that fetches data for each given URL.
 *  for await...of loop iterates over this iterator. On each iteration, 
 *  it retrieves user data by doing await fetch(url) and await response.json(), and then yields this user data.
 *  the console.log(user.login) inside the loop gets executed each time a new user value is yielded. This happens after the data for a user is fetched, asynchronously, one after the other. 
 *  It will print github, microsoft, and google, the usernames of the respective URLs.
 * 
 */


// Using async iterators with a while loop
const users = fetchUser(urls);
(async () => {
    let result = await users.next();
    while (!result.done) {
        console.log(result.value.login);  //logs the login name of each user
        result = await users.next();
    }
})();

// -------------------------------------------------------------------------------------------------//

