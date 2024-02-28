"use strict";
//reciver
class Order {
    constructor() {
        this.items = new Map();
        this.history = new Map();
    }
    addItem(item, quantity) {
        if (this.items.has(item)) {
            console.log(this.items.get(item));
            const currentQuantity = this.items.get(item) || 0;
            this.items.set(item, currentQuantity + quantity);
        }
        else {
            this.items.set(item, quantity);
        }
        console.log(`Added ${item} to the order`);
        this.saveToHistory(item, quantity);
    }
    removeItem(item) {
        if (this.items.has(item)) {
            this.saveToHistory(item, this.items.get(item) || 0);
            this.items.delete(item);
            console.log(`Removed ${item} from the order`);
        }
        else {
            console.log(`${item} not found in the order`);
        }
    }
    modifyQuantity(item, quantity) {
        if (this.items.has(item)) {
            this.saveToHistory(item, this.items.get(item) || 0);
            this.items.set(item, quantity);
        }
        else {
            console.log(`${item} not found`);
        }
    }
    submitOrder() {
        console.log(`Order submitted:`);
        this.items.forEach((quantity, item) => {
            console.log(`${item}: ${quantity}`);
        });
    }
    saveToHistory(item, quantity) {
        this.history.set(item, quantity);
    }
    undo() {
        this.history.forEach((quantity, item) => {
            if (this.items.has(item)) {
                this.items.set(item, quantity); // restore old quantity
            }
            else {
                this.items.delete(item); // del if not present before
            }
        });
        console.log("Undo last operation");
        this.history.clear();
    }
}
class AddItem {
    constructor(order, item, quantity) {
        this.order = order;
        this.item = item;
        this.quantity = quantity;
    }
    execute() {
        this.order.addItem(this.item, this.quantity);
    }
    undo() {
        this.order.removeItem(this.item);
    }
}
class removeItem {
    constructor(order, item, quantity) {
        this.order = order;
        this.item = item;
        this.quantity = quantity;
    }
    execute() {
        this.order.removeItem(this.item);
    }
    undo() {
        this.order.addItem(this.item, this.quantity);
    }
}
class ModifyQuantityCommand {
    constructor(order, item, oldQuantity, newQuantity) {
        this.order = order;
        this.item = item;
        this.oldQuantity = oldQuantity;
        this.newQuantity = newQuantity;
    }
    execute() {
        this.order.modifyQuantity(this.item, this.newQuantity);
    }
    undo() {
        this.order.modifyQuantity(this.item, this.oldQuantity);
    }
}
class SubmitOrderCommand {
    constructor(order) {
        this.order = order;
    }
    execute() {
        this.order.submitOrder();
    }
    undo() {
        console.log("Cannot undo submitting order");
    }
}
//invoker 
class Waiter {
    constructor() {
        this.commands = [];
    }
    takeOrder(command) {
        this.commands.push(command);
    }
    undoLastOrder() {
        if (this.commands.length > 0) {
            this.commands.pop();
        }
        else {
            console.log("No more orders to undo");
        }
    }
    submitOrder() {
        this.commands.forEach(command => command.execute());
        this.commands = []; //reset
    }
}
//client
const waiter = new Waiter();
const order = new Order();
//client provide commands to invoker
const addcomand = new AddItem(order, "pasta", 2);
const modifycommand = new ModifyQuantityCommand(order, "pasta", 2, 4);
const modifycommand2 = new ModifyQuantityCommand(order, "pizza", 2, 3);
const addcomand2 = new AddItem(order, "burger", 2);
const removecommand = new removeItem(order, "burger", 1);
waiter.takeOrder(addcomand);
waiter.takeOrder(modifycommand);
waiter.takeOrder(modifycommand2);
waiter.takeOrder(removecommand);
waiter.takeOrder(addcomand2);
waiter.takeOrder(removecommand);
waiter.undoLastOrder();
waiter.submitOrder();
