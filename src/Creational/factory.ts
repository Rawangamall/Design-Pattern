interface Vehcile{
    SeatsNumber():Number
    TestDrive():void
}

class Car implements Vehcile{
    SeatsNumber(): Number {
        return 5
    }
    TestDrive(): void {
       console.log("TestDrive car")
    }   
}

class Bus implements Vehcile{
    SeatsNumber(): Number {
        return 15
    }
    TestDrive(): void {
       console.log("TestDrive bus")
    }   
}

class Truck implements Vehcile{
    SeatsNumber(): Number {
        return 3
    }
    TestDrive(): void {
       console.log("TestDrive truck")
    }   
}

//factory
class VehicleFactory {

    createVechile(type:string):Vehcile{
    switch (type.toLowerCase()) {
        case "car":
            return new Car();
        case "truck":
            return new Truck();
        case "bus":
            return new Bus();
    default:
        throw new Error(`Invalid vehicle type: ${type}`);
      }
    }
}

const vehicleFactory = new VehicleFactory();
const car = vehicleFactory.createVechile("car");
console.log(car.SeatsNumber());
car.TestDrive()

const bus = vehicleFactory.createVechile("bus");
console.log(bus.SeatsNumber());
bus.TestDrive()

/*  Notes  */

/* 
by providing interface or abstract class to define the common methods then create concrete classes
factory fun takes arguments and based on it, it determine the type and deterimine the suitable concrete class and make instance of it
*/