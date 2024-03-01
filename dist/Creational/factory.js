"use strict";
class Car {
    SeatsNumber() {
        return 5;
    }
    TestDrive() {
        console.log("TestDrive car");
    }
}
class Bus {
    SeatsNumber() {
        return 15;
    }
    TestDrive() {
        console.log("TestDrive bus");
    }
}
class Truck {
    SeatsNumber() {
        return 3;
    }
    TestDrive() {
        console.log("TestDrive truck");
    }
}
//factory
class VehicleFactory {
    createVechile(type) {
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
car.TestDrive();
const bus = vehicleFactory.createVechile("bus");
console.log(bus.SeatsNumber());
bus.TestDrive();
/*  Notes  */
/*
by providing interface or abstract class to define the common methods then create concrete classes
factory fun takes arguments and based on it, it determine the type and deterimine the suitable concrete class and make instance of it
*/ 
