interface Character{
    clone():Character;
}

class Simpson implements Character{
    name: string;
    age?: number;
    job?: string;

    constructor(name:string){
        this.name = name;
    }

    clone(): Simpson {
        const clone = new Simpson(this.name);
        clone.age = this.age;
        clone.job = this.job;
        return clone;
    }
    
}

const SimpsonMember = new Simpson("Homer");

 const Homer =SimpsonMember.clone();
 Homer.age = 55;
 Homer.job = 'Cheif';

 const AdultHomer =SimpsonMember.clone();
 AdultHomer.age = 40;
 AdultHomer.job = 'Waiter';

 const BabyHomer =SimpsonMember.clone();
 BabyHomer.age = 10;

 console.log("Homer Character:", Homer);
 console.log("Homer Character in adult age:", AdultHomer);
 console.log("Homer Character in childhood:", BabyHomer);


 /* Notes */

 /*

Definition: It provides a mechanism to create new objects by cloning existing objects.
this allows copying the object's structure, properties, and behavior without requiring complex manual re-creation.

Drawbacks:
Increased memory usage: Creating multiple clones of large objects can consume significant memory resources.
Complexity for complex hierarchies: Managing deep inheritance structures and ensuring proper copying of nested objects can be challenging.
 */