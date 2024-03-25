interface AtmStates{
    insertCard():void,
    removeCard():void,
    EnterPin(pin:number):boolean,
    transformMoney(amount:number):number
}


//intial state of the atm (no card)
class IdleState implements AtmStates{
    private atmMachine: Atm;

    constructor(atmMachine: Atm) {
        this.atmMachine = atmMachine;
    }

    insertCard(): void {
      this.atmMachine.changeState(new InsertState(this.atmMachine))
    }
    removeCard(): void {
        throw new Error("No card to be removed");
    }
    EnterPin(pin: number): boolean {
        throw new Error("No card to enter pin ");
    }
    transformMoney(amount: number): number {
        throw new Error("No card to transform");
    }

}

class InsertState implements AtmStates{
  private atmMachine: Atm

  constructor(atm:Atm){
    this.atmMachine = atm
  }
    insertCard(): void {
        console.log("inserted")
    }
    removeCard(): void {
       this.atmMachine.changeState(new RemoveState(this.atmMachine))
    }
    EnterPin(pin: number): boolean {
       this.atmMachine.changeState(new PinState(this.atmMachine));
       return true
    }
    transformMoney(amount: number): number {
        throw new Error("enter your pin first");
    }

}

class PinState implements AtmStates{
    private atm:Atm;
    constructor(atm:Atm){
        this.atm = atm
    }

    insertCard(): void {
        throw new Error("already inserted");
    }
    removeCard(): void {
        this.atm.changeState(new RemoveState(this.atm))
    }
    EnterPin(pin: number): boolean {
        console.log("u entered the pin:",pin)
        return true;
    }
    transformMoney(amount: number): number {
        this.atm.changeState(new TransformState(this.atm))
        return amount
    }

}

class RemoveState implements AtmStates{
    private atm:Atm
    constructor(atm:Atm){
       this.atm = atm
    }
    insertCard(): void {
        throw new Error("Still in ");
    }
    removeCard(): void {
      this.atm.changeState(new IdleState(this.atm));
    }
    EnterPin(pin: number): boolean {
        throw new Error("can't enter it while removing");
    }
    transformMoney(amount: number): number {
        throw new Error("can't for sure");
    }

}

class TransformState implements AtmStates{
    private atm:Atm
    constructor(atmMachine:Atm){
        this.atm = atmMachine
    }
    insertCard(): void {
        throw new Error("already in");
    }
    removeCard(): void {
        this.atm.changeState(new IdleState(this.atm));
    }
    EnterPin(pin: number): boolean {
        throw new Error("already entered");
    }
    transformMoney(amount: number): number {
        console.log(`Transaction in progress for $${amount}.`);
        console.log("Transaction completed successfully.");
        this.atm.changeState(new PinState(this.atm));
        return amount
    }

}

class Atm{
    private state: AtmStates
    constructor(){
       this.state = new IdleState(this)
    }
   
    changeState(Newstate:AtmStates){
       this.state = Newstate
    }
    
    insertCard(){
        this.state.insertCard();
    }

    pin(pin:number){
        this.state.EnterPin(pin);
    }

    transformMoney(amount:number){
        this.state.transformMoney(amount);
    }
    removeCard(){
        this.state.removeCard();
    }
}

const atm1 = new Atm()

atm1.insertCard()
atm1.pin(12)
atm1.transformMoney(500)
atm1.removeCard()


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
