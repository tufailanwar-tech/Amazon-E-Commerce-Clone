export class Car{
  brand;
  model;
  speed; 
  constructor(carDetail){
    this.brand=carDetail.brand;
    this.model=carDetail.model;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}`);
  }
}
const car1=new Car({
  brand:'Toyota',
  model:'Corolla'
});

const car2=new Car({
  brand: 'Tesla',
  model:'Model 3'
})
console.log(car1);
console.log(car2);
console.log(car1.displayInfo(),car2.displayInfo())


