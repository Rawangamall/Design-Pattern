"use strict";
class Pizza {
    constructor() { }
    ;
    getCost() {
        this.price = 60;
        return this.price;
    }
}
class StuffedPizza {
    constructor(pizza) {
        this.pizza = pizza;
    }
    cost() {
        const price = this.pizza.getCost() + 50;
        return price;
    }
    getDescribtion() {
        return "Stuffed Pizza";
    }
}
const pizza = new Pizza();
const Stuffedone = new StuffedPizza(pizza);
const text = Stuffedone.getDescribtion();
console.log(text);
/*   Notes   */
/*
Idea:It add functionality to the code without change its original structure.
It allows attaching additional responsibilities onto existing objects at runtime.

Uses:
Add behavior to object
Implement access control:can be used to enforce access control mechanisms on objects

*/
