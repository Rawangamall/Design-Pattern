"use strict";
class CarBase {
    constructor(brand) {
        this.brand = brand;
    }
}
class CarBuilder {
    constructor(brand) {
        this.car = new CarBase(brand);
    }
    setModel(model) {
        this.car.model = model;
        return this;
    }
    setColor(color) {
        this.car.color = color;
        return this;
    }
    setNumberOfSeats(seats) {
        this.car.numberOfSeats = seats;
        return this;
    }
    build() {
        return this;
    }
}
const Firstcar = new CarBuilder("Kia").build();
const Secondcar = new CarBuilder("BMW").setColor("Marron").build();
const Thirdcar = new CarBuilder("BMW").setColor("Marron").setModel("2022").setNumberOfSeats(4).build();
console.log(Firstcar);
console.log(Secondcar);
console.log(Thirdcar);
