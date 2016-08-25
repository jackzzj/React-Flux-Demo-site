var _ = require('lodash');
var Origin = require('./origin')
var coffees = [{
  "id": 1,
  "originId": 1,
  "description": "Over twenty-five million people around the world earn their living from growing coffee. ENCA Farm helps spur this sustainable economic opportunity throughout the Province of Benguet.The Coffee tree originated in Africa and was used extensively to provide an understory to dense tropical forest. The four commercial coffee varieties are: Arabica coffee, Robusta coffee, Excelsa coffee and Liberica coffee. The Philippines is one the few countries in the world where all four commercial coffee varieties are found. Likewise, Benguet remains one of the few provinces in the country where these four varieties are grown.",
  "name": "Arabica Cooperative",
  "image": [
    "/assets/images/arabica.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 2,
  "originId": 2,
  "description": "Marcala is a region in the west central area that is known for some of the highest quality coffees from Honduras. This Marcala is grown by COCOSAM (Cooperativa Cafetelera Sanmarquena) in the San Marcos de Colon area, and it is partly the group efforts of the Cooperative Members to improve the processing and drying of the beans that really make this coffee stand out. Fair Trade prices have helped the coffee growers in this region dramatically improve the quality of their coffee, through investments in infrastructure and education. This is a light and mild coffee, very sweet with hints of vanilla, accented by clean apple butter fruit notes and almond flavors in lighter roasts. With a darker roast there is a deeper cocoa taste with nutty tones. Medium Roast provides flavors of baking chocolate, dark berry, cedar and walnut with a bittersweet chocolate finish. Medium-Dark becomes more complex bringing in notes of buttered toast, raisins and dates. City - Full City Roasts emphasize dark sugar flavors, roasted nut and provide tannic acidity similar to black tea.",
  "name": "Honduras Marcala",
  "image": [
    "/assets/images/honduras.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 3,
  "originId": 2,
  "description": "Colombia, known for its high quality coffee, is the second largest producer of coffee in the world and the largest producer of washed Arabica coffee. Colombia exports approximately 12.5 million bags, half to the United States. Colombia only produces washed Arabica coffee. There are primarily three varieties grown in Colombia and the coffee is referred to by the region in which is grown. ",
  "name": "Colombia Huila",
  "image": [
    "/assets/images/huila.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 4,
  "originId": 3,
  "description": "A concentrated citrus fruit acidity combines with a cranberrypomegranate tartness and a refined fructose-like sweetness. The mouthfeel is silky on the tongue with occasional notes of gingersnaps and coriander surfacing throughout. The finish is delightfully clean and satisfying, leaving you with a short note of hibiscus flower.",
  "name": "Kenya Gichathaini",
  "image": [
    "/assets/images/kenya.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 5,
  "originId": 4,
  "description": "Kona coffee is the market name for coffee (Coffea arabica) cultivated on the slopes of Hualalai and Mauna Loa in the North and South Kona Districts of the Big Island of Hawaii. It is one of the most expensive coffees in the world. Only coffee from the Kona Districts can be described as 'Kona'. The weather of sunny mornings, cloud or rain in the afternoon, little wind, and mild nights combined with porous, mineral-rich volcanic soil create favorable coffee growing conditions. The loanword for coffee in the Hawaiian language is kope, pronounced [ˈkope].",
  "name": "Hawaii Kona",
  "image": [
    "/assets/images/kona.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 6,
  "originId": 5,
  "description": "Mandheling is named after the Mandailing people located in North Sumatra, Indonesia. The name is the result of a misunderstanding by the first foreign purchaser of the variety, and no coffee is actually produced in the 'Mandailing region'. Lintong on the other hand, is named after the Lintong district, also located in North Sumatra. This is not a specific cultivar, but rather a region with a specific processing style.",
  "name": "Indonesia Mandheling",
  "image": [
    "/assets/images/mandheling.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 7,
  "originId": 6,
  "description": "'Today, we feel proud being the second generation of coffee growers in our family, producing an extraordinary strictly hard bean coffee and protecting a wonderful forest in Los Cuchumatanes Mountain'. The coffee plantation is about 157.5 has in extension, 70% catuai, 20% caturra and 10% pacamara. The farm produces an average of 2,927 - 69 kgs bags. The coffee is processed in the wet mill at the farm. The beans are sun dried for one day on the patios and then for one or two days in the drier machines at 55º C. At the farm we are really concerned about environment, for that reason we have 10 has. of natural forest, and we process the water used in the mill.",
  "name": "Guatemala Pacamara",
  "image": [
    "/assets/images/pacamara.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 8,
  "originId": 1,
  "description": "A fine Rwanda coffee offers a silky, creamy body along with the floral notes of Ethiopian Yirgacheffe Coffee and the acidity of a Kenya coffee. The aroma may provide hints of lemon and orange blossom with floral notes complementing the sweet citrus qualities with hints of caramel in the aftertaste.",
  "name": "Rwanda CWS",
  "image": [
    "/assets/images/rowanda.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 9,
  "originId": 7,
  "description": "In Ethiopia, coffee (known as ‘bunna’) plays an integral role in social and cultural life, not least in the elaborate ceremonies where the beans are roasted in huge metal pans over an open fire. Grown close to the home of the first coffee bean, the coffee grown around the tiny town of Yirgacheffe in Southern Ethiopia has an extraordinarily distinctive flavour profile, characterised by aromatic floral notes and mild lemon acidity. Wet-processed according to traditional methods, this light-bodied coffee has a silky smooth sweetness, winning it three gold stars in the 2012 Great Taste Awards. In the words of the judges? ‘Good Yirgacheffe fruit. Great peach flavour.’ We couldn’t agree more. ",
  "name": "Ethiopia Yirgacheffe",
  "image": [
    "/assets/images/yirgacheffe.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}]

var buildCoffees = function() {
  // Make a deep copy so we don't change the main array
  var rawCoffees = JSON.parse(JSON.stringify(coffees));
  var builtCoffees = [];
  var coffee;

  for (var i = 0, l = rawCoffees.length; i < l; i++) {
    coffee = rawCoffees[i];
    coffee.origin = Origin.get(coffee.originId);
    builtCoffees.push(coffee);
  }
  return builtCoffees
}

module.exports = {
  get: function(id) {
    return _.find(buildCoffees(), function(coffee) {
      return coffee.id === id;
    });
  },
  getByOriginId: function (originId) {
    return _.filter(buildCoffees(), function(coffee) {
      return coffee.origin.id === originId;
    });
  },
  all: function() {
    return buildCoffees();
  }
}
