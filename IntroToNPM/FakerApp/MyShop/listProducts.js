var fake = require("faker");

for (var i=0;i<10;i++) {
    var randomName = fake.commerce.productName();
    var randomPrice = fake.commerce.price();
    console.log(randomName + ": $" + randomPrice);
}