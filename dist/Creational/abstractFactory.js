"use strict";
class Cars {
    constructor(seats) {
        this.seats = seats;
    }
    SeatsNumber() {
        return this.seats;
    }
    TestDrive() {
        console.log("TestDrive car");
    }
}
class Buses {
    constructor(seats) {
        this.seats = seats;
    }
    SeatsNumber() {
        return this.seats;
    }
    TestDrive() {
        console.log("TestDrive bus");
    }
}
class Trucks {
    constructor(seats) {
        this.seats = seats;
    }
    SeatsNumber() {
        return this.seats;
    }
    TestDrive() {
        console.log("TestDrive truck");
    }
}
class FamilyVehicleFactory {
    createCar() {
        return new Family(5);
    }
    createBus() {
        return new Buses(15);
    }
    createTruck() {
        throw new Error("FamilyVehicleFactory cannot create trucks.");
    }
}
class BusniessVehicleFactory {
    createCar() {
        throw new Error("BusniessVehicleFactory cannot create cars.");
    }
    createBus() {
        return new Busniess(30);
    }
    createTruck() {
        throw new Error("BusniessVehicleFactory not create trucks yet.");
    }
}
class Family extends Cars {
}
class Busniess extends Buses {
}
const familyCarFactory = new FamilyVehicleFactory();
const familyCar = familyCarFactory.createCar();
console.log(`Family car seats: ${familyCar.SeatsNumber()}`);
familyCar.TestDrive();
/*  Notes  */
/*
Extend from factory pattern , provide interface for creating multiple types obj of the same family
*/ 
