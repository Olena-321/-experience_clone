var services = {
  "стрижка": "60 грн",
  "гоління": "80 грн",
  "Миття голови": "100 грн"
  };
  services['Розбити скло'] = "50 грн";
  services['Вставити нове скло'] = "3500 грн";// дуже цікавий сервіс у перукарні

  services.price = function () {
    var sum = 0;
    for (var key in this) {
      if (typeof this[key] ==="string") {
        sum +=parseInt(this[key]);
      }
    }
    return sum + " грн"
  }

  console.log("Загальна ціна", services.price());

  services.miniPrice = function() {
    var min = Infinity;
    for (var key in this) {
      if (typeof this[key] === "string") {
        var price = parseInt(this[key]);
        if (price < min) {
          min = price
        }
      }
    }
      return min + " грн"
    }
   console.log("Мінімальна ціна:", services.miniPrice());

  services.maxPrice = function () {
    var max = -Infinity;
    for (var key in this) {
      if (typeof this [key] === "string") {
        var price = parseInt(this[key]);
        if (price > max) {
          max = price
        }
      }
    }
    return max + " грн"
   }
   console.log("Максимальна ціна:", services.maxPrice());



   //Варіант 2, у цьому варіанті зверталась по допомогу, тому що не все працювало що сама робила

   var services = {
    "стрижка": "60 грн",
    "гоління": "80 грн",
    "Миття голови": "100 грн",
    
    set addServiсe({name, price}) {
      this[name] = price + " грн"
    },

    get price() {
      let sum = 0;
      for (let key in this) {
        if (key === 'price' || key === 'miniPrice' || key === 'maxPrice') continue; 
        if (typeof this[key] === "string" && /\d+/.test(this[key])) {
          sum += parseInt(this[key], 10);
        }
      }
      return sum + " грн";
    },

    get miniPrice() {
      let min = Infinity;
    for (var key in this) {
      if   (key === 'miniPrice' || key === 'price' || key === 'maxPrice' || typeof this[key] !== "string") continue;
      let price = parseInt(this[key], 10); {
       
        if (price < min) {
          min = price
        }
      }
    }
      return min + " грн"
    },

    get maxPrice() {
      let max = -Infinity;
    for (var key in this) {
      if  (key === 'miniPrice' || key === 'price' || key === 'maxPrice' || typeof this[key] !== "string") continue;
      let price = parseInt(this[key], 10); {
        let price = parseInt(this[key], 10);
        if (price > max) {
          max = price
        }
      }
    }
    return max + " грн"
   }
    };

    services.addServiсe = { name: "розбити скло", price: 50 };
    services.addServiсe = { name: "Вставити нове скло", price: 3500 };

    console.log("Загальна ціна:", services.price);
    console.log("Мінімальна ціна:", services.miniPrice);
    console.log("Максимальна ціна:", services.maxPrice);
