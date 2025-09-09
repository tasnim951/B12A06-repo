## 1. What is the difference between var, let, and const?
var can be redeclared and is function-scoped, let can be updated but not redeclared and is block-scoped, const can’t be changed and is also block-scoped.

## 2. What is the difference between map(), forEach(), and filter()?
forEach just loops and does stuff but doesn’t return anything, map loops and returns a new array with changed values, filter loops and gives a new array with only items that pass a condition.

## 3. What are arrow functions in ES6?
Arrow functions are a short way to write functions like (a, b) => a + b and they dont have their own this.

## 4. How does destructuring assignment work in ES6?
Destructuring lets take values from arrays or objects easily, like [a, b] = [1, 2] or {name, age} = person.

## 5. Explain template literals in ES6. How are they different from string concatenation?
Template literals use backticks ` ` so we can put variables inside ${} like Hello ${name} instead of "Hello " + name, makes it shorter and easier.