class Random{

    private static instance : Random
    value: any;

   static getInstance():Random{

    if(!Random.instance){
      Random.instance = new Random();
    }
      return Random.instance;
    }

    setValue(value: any): void {
        this.value = value;
      }

}

const random1 = Random.getInstance();
const random2 = Random.getInstance();

random1.setValue("test")
console.log(random1 === random2);

/* 
المركب اللى ليها ريسين تغرق 
  
Idea: ensure that the class has only one instance no more and provide global access 
Usage: manage shared resource
Example: db connection , eeven module.cache of same current package act as singleton as after its first import 
it will return the same instance without re-exectuion

*/