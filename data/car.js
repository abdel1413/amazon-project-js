class Car {
  brand;
  model;
  speed = 0;

  isTrunkOpen = false;
  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "opened" : "closed";
    return `${this.brand} ${this.model}, Speed: ${this.speed} km/h,  ${trunkStatus}`;
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
console.log("car1 infp:", car1.displayInfo());
console.log("car1 g", car1.go());
console.log("car1 g", car1.go());
console.log("car1 g", car1.go());
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
