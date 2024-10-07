class Car {
  #brand;
  #model;
  speed = 0;

  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "opened" : "closed";
    return `${this.#brand} ${this.#model}, 
    Speed: ${this.speed} km/h, 
     ${trunkStatus}`;
  }

  go() {
    if (this.speed >= 0 && this.speed <= 200) {
      return (this.speed += 5);
    }
  }
  brake() {
    if (this.speed > 0 && this.speed <= 200) return (this.speed -= 5);
  }

  openTrunk() {
    if (this.speed === 0) this.isTrunkOpen = true;
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

let car1 = new Car({ brand: "Toyota", model: "Camry" });
let car2 = new Car({ brand: "Tesla", model: "version3" });

console.log("car1", car1);

//console.log("car1 infp:", car1.displayInfo());
console.log("car1 g", car1.go());
console.log("car1 g", car1.go());
console.log("car1 g", car1.go());
console.log(" car2 info:", car1.displayInfo());
console.log("is car1 open? ", car1.openTrunk());
console.log(" car2 info:", car1.displayInfo());
console.log("car1 b", car1.brake());
console.log(" car2 info:", car1.displayInfo());
console.log("car1 trunck: ", car1.openTrunk());
console.log(" car2 info:", car1.displayInfo());

console.log("car2", car2);
console.log(" car2 info:", car2.displayInfo());
console.log("car2 g", car2.go());
console.log("car2 g", car2.go());
console.log("car2 g", car2.go());
console.log(" car2 info:", car2.displayInfo());
console.log("car2 b ", car2.brake());
console.log(" car2 info:", car2.displayInfo());
console.log("car2trunck: ", car2.openTrunk());
console.log(" car2 info:", car2.displayInfo());

class RaceCar extends Car {
  accelerator;
  constructor(carDetails) {
    super(carDetails);
    this.accelerator = carDetails.accelerator;
  }

  go() {
    if (this.speed > 300) {
      this.speed = 300;
    }

    return (this.speed += this.accelerator);
  }

  brake() {
    if (this.speed < 0) {
      this.speed = 0;
    }

    return (this.speed -= this.accelerator);
  }

  openTrunk() {
    return "race car does not have trunk";
  }

  closeTrunk() {
    return "race car does not have trunk";
  }
}

const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  accelerator: 20,
});

console.log(raceCar);
console.log(raceCar.go());
console.log(raceCar.go());
console.log(raceCar.go());
console.log(raceCar.displayInfo());
console.log(raceCar.openTrunk());
