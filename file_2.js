function checkProbabilityTheory(count) {
    // Oб'являю змінні вне цикла:
    let evenNumbers = 0; // парні
    let oddNumbers = 0;  // непарні
  
   for (let i = 0; i < count; i++) {
      // генеруємо випадкове число від 100 до 1000 включно
      let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    
      // перевіряємо парність
      if (randomNumber % 2 === 0) {
        evenNumbers++;
      } else {
        oddNumbers++;
      }
    }
  
    // обчислюємо відсотки
    let evenPercent = (evenNumbers / count) * 100;
    let oddPercent = (oddNumbers / count) * 100;
  
    // вивід результатів
    console.log("Кількість згенерованих чисел:", count);
    console.log("Парних чисел:", evenNumbers);
    console.log("Непарних чисел:", oddNumbers);
    console.log("Відсоток парних:", evenPercent.toFixed(2) + "%");
    console.log("Відсоток непарних:", oddPercent.toFixed(2) + "%");
  }
  
  // виклик функції :
  checkProbabilityTheory(500);