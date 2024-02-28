//reciver
class Order {
    private items: Map<string, number> = new Map();
    private history: Map<string, number> = new Map();

    addItem(item: string,quantity:number): void {
        if(this.items.has(item)){
            console.log(this.items.get(item))
         const currentQuantity = this.items.get(item) || 0;
        this.items.set(item , currentQuantity+quantity);

        }else{
            this.items.set(item ,quantity);
        }
      console.log(`Added ${item} to the order`);
      this.saveToHistory(item, quantity);
    }
  
    removeItem(item: string): void {
        if (this.items.has(item)) {
            this.saveToHistory(item,  this.items.get(item) || 0);
            this.items.delete(item);
          console.log(`Removed ${item} from the order`);
        } else {
          console.log(`${item} not found in the order`);
        }
      }
  
    modifyQuantity(item: string, quantity: number): void {
        if(this.items.has(item)){
        this.saveToHistory(item, this.items.get(item) || 0);
         this.items.set(item,quantity)
        }else{
            console.log(`${item} not found`)
        }
    }
  
    submitOrder(): void {
      console.log(`Order submitted:`);
      this.items.forEach((quantity, item) => {
        console.log(`${item}: ${quantity}`);
      });
    }

    private saveToHistory(item: string, quantity: number): void {
        this.history.set(item, quantity);
      }

      undo(): void {
        this.history.forEach((quantity, item) => {
          if (this.items.has(item)) {
            this.items.set(item, quantity); // restore old quantity
          } else {
            this.items.delete(item); // del if not present before
          }
        });
        console.log("Undo last operation");
        this.history.clear(); 
      }
    
    
  }
  
//commands
interface command{
    execute():void;
    undo():void;
}

class AddItem implements command{
    private order: Order;
    private item: string;
    private quantity: number;
  
    constructor(order: Order, item: string, quantity: number) {
      this.order = order;
      this.item = item;
      this.quantity = quantity;
    }

    execute(): void {
       this.order.addItem(this.item,this.quantity)
    }
    undo(): void {
        this.order.removeItem(this.item);
      }
    
}

class removeItem implements command{
    private order:Order;
    private item:string;
    private quantity:number;
    
    constructor(order:Order,item:string,quantity:number){
      this.order = order;
      this.item = item;
      this.quantity = quantity;
    }

    execute(): void {
        this.order.removeItem(this.item);
    }

    undo(): void {
        this.order.addItem(this.item, this.quantity);
      }
    
}

class ModifyQuantityCommand implements command {
    private order: Order;
    private item: string;
    private oldQuantity: number;
    private newQuantity: number;
  
    constructor(order: Order, item: string, oldQuantity: number, newQuantity: number) {
      this.order = order;
      this.item = item;
      this.oldQuantity = oldQuantity;
      this.newQuantity = newQuantity;
    }
  
    execute(): void {
      this.order.modifyQuantity(this.item, this.newQuantity);
    }
  
    undo(): void {
      this.order.modifyQuantity(this.item, this.oldQuantity);
    }
  }

  class SubmitOrderCommand implements command {
    private order: Order;
  
    constructor(order: Order) {
      this.order = order;
    }
  
    execute(): void {
      this.order.submitOrder();
    }
  
    undo(): void {
      console.log("Cannot undo submitting order");
    }
  }

//invoker 
class Waiter{
    private commands:command[]=[];

    takeOrder(command:command):void{
       this.commands.push(command);
    }

    undoLastOrder():void{
        if (this.commands.length > 0) {
         this.commands.pop();
          }else {
            console.log("No more orders to undo");
          }   
    }

    submitOrder():void{
      this.commands.forEach(command => command.execute());
      this.commands =[] //reset
    }
}

//client

const waiter = new Waiter();
const order = new Order();

//client provide commands to invoker
const addcomand = new AddItem(order,"pasta",2);
const modifycommand = new ModifyQuantityCommand(order,"pasta",2,4)
const modifycommand2 = new ModifyQuantityCommand(order,"pizza",2,3)
const addcomand2 = new AddItem(order,"burger",2);
const removecommand = new removeItem(order,"burger",1);

waiter.takeOrder(addcomand);
waiter.takeOrder(modifycommand);
waiter.takeOrder(modifycommand2);
waiter.takeOrder(removecommand);
waiter.takeOrder(addcomand2);
waiter.takeOrder(removecommand);

waiter.undoLastOrder()
waiter.submitOrder()

/* Notes */

/*  
command as object encapsulate all details info to perform func
instead of invoke methods directly we create methods as representation to perform invoke (decoupling)

and mainly consists of four : 
target => reciever 
command => obj that invoke target methods
invoker => execute the provided commands
client => configure the needed commands and provide it to invoker

Usage : 
1-track history of operations with optional undo operation (by storing the history of state)
2- reduce coupling between sender and reciever direct
3-allow queuing or logging requests

Disadvantage: overhead wz additional objects for each action (inc no.of commands and memory usage)
and kind of add complexity to the codebase
*/