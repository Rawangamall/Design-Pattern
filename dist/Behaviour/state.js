"use strict";
//intial state of the atm (no card)
class IdleState {
    constructor(atmMachine) {
        this.atmMachine = atmMachine;
    }
    insertCard() {
        this.atmMachine.changeState(new InsertState(this.atmMachine));
    }
    removeCard() {
        throw new Error("No card to be removed");
    }
    EnterPin(pin) {
        throw new Error("No card to enter pin ");
    }
    transformMoney(amount) {
        throw new Error("No card to transform");
    }
}
class InsertState {
    constructor(atm) {
        this.atmMachine = atm;
    }
    insertCard() {
        console.log("inserted");
    }
    removeCard() {
        this.atmMachine.changeState(new RemoveState(this.atmMachine));
    }
    EnterPin(pin) {
        this.atmMachine.changeState(new PinState(this.atmMachine));
        return true;
    }
    transformMoney(amount) {
        throw new Error("enter your pin first");
    }
}
class PinState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        throw new Error("already inserted");
    }
    removeCard() {
        this.atm.changeState(new RemoveState(this.atm));
    }
    EnterPin(pin) {
        console.log("u entered the pin:", pin);
        return true;
    }
    transformMoney(amount) {
        this.atm.changeState(new TransformState(this.atm));
        return amount;
    }
}
class RemoveState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        throw new Error("Still in ");
    }
    removeCard() {
        this.atm.changeState(new IdleState(this.atm));
    }
    EnterPin(pin) {
        throw new Error("can't enter it while removing");
    }
    transformMoney(amount) {
        throw new Error("can't for sure");
    }
}
class TransformState {
    constructor(atmMachine) {
        this.atm = atmMachine;
    }
    insertCard() {
        throw new Error("already in");
    }
    removeCard() {
        this.atm.changeState(new IdleState(this.atm));
    }
    EnterPin(pin) {
        throw new Error("already entered");
    }
    transformMoney(amount) {
        console.log(`Transaction in progress for $${amount}.`);
        console.log("Transaction completed successfully.");
        this.atm.changeState(new PinState(this.atm));
        return amount;
    }
}
class Atm {
    constructor() {
        this.state = new IdleState(this);
    }
    changeState(Newstate) {
        this.state = Newstate;
    }
    insertCard() {
        this.state.insertCard();
    }
    pin(pin) {
        this.state.EnterPin(pin);
    }
    transformMoney(amount) {
        this.state.transformMoney(amount);
    }
    removeCard() {
        this.state.removeCard();
    }
}
const atm1 = new Atm();
atm1.insertCard();
atm1.pin(12);
atm1.transformMoney(500);
atm1.removeCard();
/*   Notes   */
/*
Idea: state design pattern allow an object to alter its behavior when its internal state changes

components:
context : the class that contains the state. It delegates state-specific behavior to different state objects
state: interface or abstract class that define the methods each state shoul have
concrete state: concrete class that represent one state and define its behavior according to that

Usage:
Flexible Behavior: allows an object to change its behavior dynamically based on its internal state.
Clean Code Organization: It helps in keeping the codebase clean and organized by separating state-specific behavior into individual classes.
Easy to Add New States: it easier to add new states without modifying existing code.

Drawbacks:
Complexity:can lead to a large number of classes, which might make the code complex and harder to maintain.
Increased Coupling: The context class becomes dependent on the concrete state classes
 */
