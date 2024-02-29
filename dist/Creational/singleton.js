"use strict";
class Random {
    static getInstance() {
        if (!Random.instance) {
            Random.instance = new Random();
        }
        return Random.instance;
    }
    setValue(value) {
        this.value = value;
    }
}
const random1 = Random.getInstance();
const random2 = Random.getInstance();
random1.setValue("test");
console.log(random1 === random2);
/*
المركب اللى ليها ريسين تغرق
  
*/ 
