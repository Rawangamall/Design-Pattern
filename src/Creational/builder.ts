class CarBase {
    brand: string;
    model?: string;
    color?: string;
    numberOfSeats?: number;
    constructor(brand:string) {
        this.brand = brand
    }
  }

class CarBuilder {
private car : CarBase

    constructor(brand:string){
        this.car = new CarBase(brand);
    }

    setModel(model:string):CarBuilder{
        this.car.model = model;
        return this;
    }

    setColor(color:string):CarBuilder{
        this.car.color = color;
        return this;
    }
    setNumberOfSeats(seats:number):CarBuilder{
        this.car.numberOfSeats = seats;
        return this;
    }

   build(): CarBuilder {
    return this
 }

}

const Firstcar = new CarBuilder("Kia").build()
const Secondcar = new CarBuilder("BMW").setColor("Marron").build()
const Thirdcar = new CarBuilder("BMW").setColor("Marron").setModel("2022").setNumberOfSeats(4).build()

console.log(Firstcar)
console.log(Secondcar)
console.log(Thirdcar)

/* Notes */

/*
Definition: Builder allows constructing complex objects step-by-step. 
It separates the construction process from the object itself

Uses:
Configuration: Building complex configuration objects with optional or conditional settings through a series of builder methods.
Complex object creation with validation: validation of individual properties during the building process.

Drawbacks:
Overhead for simple objects: For straightforward object creation with few properties, the builder might introduce unnecessary complexity.
*/






