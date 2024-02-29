interface Vehcile{
    SeatsNumber():Number
    TestDrive():void
}

class Cars implements Vehcile{
    constructor(public seats: number) {}

    SeatsNumber(): number {
      return this.seats;
    }
    TestDrive(): void {
       console.log("TestDrive car")
    }   
}

class Buses implements Vehcile{
    constructor(public seats: number) {}

    SeatsNumber(): number {
      return this.seats;
    }
    TestDrive(): void {
       console.log("TestDrive bus")
    }   
}

class Trucks implements Vehcile{
    constructor(public seats: number) {}

    SeatsNumber(): number {
      return this.seats;
    }
    TestDrive(): void {
       console.log("TestDrive truck")
    }   
}

//for abstract factory
interface AbstarctVehicleFactory {
    createCar(): Cars;
    createBus(): Buses;
    createTruck(): Trucks;
  }

  class FamilyVehicleFactory implements AbstarctVehicleFactory{
      createCar(): Cars {
       return new Family(5);
      }
      createBus(): Buses {
         return new Buses(15);
      }
      createTruck(): Trucks {
        throw new Error("FamilyVehicleFactory cannot create trucks.");
    }
    
  }
  
  class BusniessVehicleFactory implements AbstarctVehicleFactory{
    createCar(): Cars {
        throw new Error("BusniessVehicleFactory cannot create cars.");
    }
    createBus(): Buses {
      return new Busniess(30)
    }
    createTruck(): Trucks {
        throw new Error("BusniessVehicleFactory not create trucks yet.");
    }
  
}

class Family extends Cars{}
class Busniess extends Buses{ }

const familyCarFactory = new FamilyVehicleFactory();
const familyCar = familyCarFactory.createCar();
console.log(`Family car seats: ${familyCar.SeatsNumber()}`);
familyCar.TestDrive();

/*  Notes  */
/*
Extend from factory pattern , provide interface for creating multiple types obj of the same family 
*/