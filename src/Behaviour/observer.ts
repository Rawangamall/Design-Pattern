interface Observer{
    update(message:string):void
};

class User implements Observer{
   protected name:string;

    constructor(name:string){
        this.name = name;
    }
    
    update(message: string): void {
   console.log(`${this.name} say ${message}`);
    }

}

class Chat {
    private observers: Observer[] = [];

    addObserver(observer:Observer):void{
   this.observers.push(observer);
    }

    removeObserver(observer:Observer):void{

   const index = this.observers.indexOf(observer);
   if(index !== -1){
    this.observers.splice(index, 1);
       }
    }

   protected notifyObservers(message:string):void{
     this.observers.forEach(observer=>observer.update(message));
    }

    sendSMS(message:string):void{
     this.notifyObservers(message);      
    }
}

const user1 = new User('rawan')
const user2 = new User('youmna')
const user3 = new User('mori')

const FamilyChat = new Chat();

FamilyChat.addObserver(user1)
FamilyChat.addObserver(user2)
FamilyChat.addObserver(user3)

FamilyChat.sendSMS("first message for all");

FamilyChat.removeObserver(user2)

FamilyChat.sendSMS("first message without youmna");
FamilyChat.sendSMS("second message without youmna");


/*   Notes   */

/* 
Idea:Defines a one-to-many dependency between objects, where when one object changes state, all its dependents are notified and updated automatically.
Usage:
1- establish a flexible communication mechanism between objects for real-time updates, event notification, or data synchronization.
2- Decopling observable and observer.

Event emiter class follow the observer design
*/