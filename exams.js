(function () {
  const examMount = document.getElementById('examBank');
  const examSearch = document.getElementById('examSearch');
  const examSectionFilter = document.getElementById('examSectionFilter');
  const examClearFilters = document.getElementById('examClearFilters');
  const examCount = document.getElementById('examCount');
  const examRevisedCount = document.getElementById('examRevisedCount');
  const examNoResults = document.getElementById('examNoResults');
  const examMockCount = document.getElementById('examMockCount');
  const examMockMinutes = document.getElementById('examMockMinutes');
  const examMockStart = document.getElementById('examMockStart');
  const examMockSubmit = document.getElementById('examMockSubmit');
  const examMockSave = document.getElementById('examMockSave');
  const examMockReset = document.getElementById('examMockReset');
  const examMockStatus = document.getElementById('examMockStatus');
  const examMockTimer = document.getElementById('examMockTimer');
  const examMockNote = document.getElementById('examMockNote');
  const examMockBank = document.getElementById('examMockBank');
  const examBestScoreLine = document.getElementById('examBestScoreLine');
  const examHistory = document.getElementById('examHistory');

  if (!examMount) {
    return;
  }

  const REVISED_KEY = 'ce274-exam-revised';
  const EXAM_HISTORY_KEY = 'ce274-exam-history';

  const SECTION_DEFS = [
    { id: 'exam-pdf-objectives', title: 'PDF Objectives' },
    { id: 'exam-pdf-short', title: 'PDF Short Answers' },
    { id: 'exam-pdf-code', title: 'PDF Code Writing' },
    { id: 'exam-practice-basics', title: 'Practice Basics' },
    { id: 'exam-practice-arithmetic', title: 'Practice Arithmetic' },
    { id: 'exam-practice-control', title: 'Practice Control Flow' },
    { id: 'exam-practice-strings', title: 'Practice Strings' },
    { id: 'exam-practice-arrays', title: 'Practice Arrays & Collections' },
    { id: 'exam-practice-oop', title: 'Practice OOP' },
    { id: 'exam-practice-exceptions', title: 'Practice Exceptions' },
    { id: 'exam-practice-methods', title: 'Practice Methods' }
  ];

  const PDF_EXAM_ITEMS = [
    { sectionId: 'exam-pdf-objectives', q: 'You need to write a program with a main entry point that can be executed from the command line. What is the correct method signature?', a: 'public static void main(String[] args)' },
    { sectionId: 'exam-pdf-objectives', q: 'In your application, you call System.out.println("Hello, World!");. What appears on the console?', a: 'Hello, World!' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to store a student\'s age in a variable. Which is a valid declaration?', a: 'int age = 25;' },
    { sectionId: 'exam-pdf-objectives', q: 'Your application calculates product prices with cents. Which data type should you use for precise decimal storage?', a: 'double' },
    { sectionId: 'exam-pdf-objectives', q: 'In a class, an int field is declared but not initialized. What is its default value?', a: '0' },
    { sectionId: 'exam-pdf-objectives', q: 'What does your application output when executing System.out.println(5 + "5")?', a: '55' },
    { sectionId: 'exam-pdf-objectives', q: 'While coding, you encounter a word that looks like a keyword. Which of these is NOT a reserved Java keyword?', a: 'define' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to build an interactive console application that reads user input from the keyboard. What class should you use?', a: 'Scanner' },
    { sectionId: 'exam-pdf-objectives', q: 'Your application needs to repeat a block of code 10 times. Which loop structure is most appropriate?', a: 'for loop' },
    { sectionId: 'exam-pdf-objectives', q: 'You execute integer division in your calculator app with the expression 5 / 2. What is the result?', a: '2' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to store 5 student scores that you will access repeatedly. How do you properly declare this structure?', a: 'int[] arr = new int[5];' },
    { sectionId: 'exam-pdf-objectives', q: 'In an authentication system, you check if a user\'s ID equals 5. What is the correct condition?', a: 'if (x == 5)' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to define a configuration value that cannot be changed after initialization. How do you declare it?', a: 'final int x = 10;' },
    { sectionId: 'exam-pdf-objectives', q: 'In your code documentation, you want to add a single-line explanation. What is the correct syntax?', a: '// This is a comment' },
    { sectionId: 'exam-pdf-objectives', q: 'In a condition check, you execute System.out.println(3 == 3.0). What does your application print?', a: 'true' },
    { sectionId: 'exam-pdf-objectives', q: 'When designing a Banking class, you want to prevent direct access to the account balance field from other classes. Which principle are you applying?', a: 'Encapsulation' },
    { sectionId: 'exam-pdf-objectives', q: 'In a multi-class project, which access modifier restricts a variable to only be accessible within its own class?', a: 'private' },
    { sectionId: 'exam-pdf-objectives', q: 'Your application receives user input as a string (e.g., "12345") and needs to convert it to an integer. Which method do you call?', a: 'Integer.parseInt()' },
    { sectionId: 'exam-pdf-objectives', q: 'In your calculation module, you compute 10 % 3 to find the remainder. What value does your app store?', a: '1' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to create a new instance of the Student class and assign it to a variable. What is the correct syntax?', a: 'ClassName obj = new ClassName();' },
    { sectionId: 'exam-pdf-objectives', q: 'Your method needs to return a person\'s name, age, and address as a group. What is the most practical approach?', a: 'Return a custom object or array' },
    { sectionId: 'exam-pdf-objectives', q: 'In your switch statement, you forgot to add a break after case 2. What happens when case 2 matches?', a: 'Fall-through occurs' },
    { sectionId: 'exam-pdf-objectives', q: 'Your application calls Math.max(10, 20) to find the larger of two values. What does it return?', a: '20' },
    { sectionId: 'exam-pdf-objectives', q: 'In your Employee class, you need to initialize objects with specific values when they are created. What special method do you define?', a: 'Same name as the class and no return type' },
    { sectionId: 'exam-pdf-objectives', q: 'In a conditional branch, you check if a flag is activated. What is the default value of a boolean variable?', a: 'false' },
    { sectionId: 'exam-pdf-objectives', q: 'You are designing a hierarchy where a Manager class needs all features of an Employee class. Which keyword enables this?', a: 'extends' },
    { sectionId: 'exam-pdf-objectives', q: 'Your program\'s entry point uses a method called main(). What is its return type?', a: 'void' },
    { sectionId: 'exam-pdf-objectives', q: 'In your string comparison logic, you need to check if two String variables contain the exact same text. Which method is correct?', a: 'equals()' },
    { sectionId: 'exam-pdf-objectives', q: 'In your business logic, you evaluate the expression 5 > 3 ? "Yes" : "No" in a ternary operator. What does this print?', a: 'Yes' },
    { sectionId: 'exam-pdf-objectives', q: 'When asked what makes Java unique among programming languages, which statement is accurate?', a: 'Java is platform-independent' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to store a single character like the grade \'A\'. How do you declare this variable?', a: "char ch = 'A';" },
    { sectionId: 'exam-pdf-objectives', q: 'In your application loop, you increase x by 5 using the compound operator. If x starts at 10, what is the result?', a: 'Set x to 15' },
    { sectionId: 'exam-pdf-objectives', q: 'When writing a utility class, which of these correctly defines a public method that returns nothing?', a: 'public void myMethod() {}' },
    { sectionId: 'exam-pdf-objectives', q: 'In a data type comparison, which of these is NOT a primitive type like int, double, or boolean?', a: 'String' },
    { sectionId: 'exam-pdf-objectives', q: 'In a comparison check, System.out.println(10 == 10.0) is called. Based on type promotion, what prints?', a: 'true' },
    { sectionId: 'exam-pdf-objectives', q: 'You need to create a contract that multiple classes must implement. Which keyword defines this structure?', a: 'interface' },
    { sectionId: 'exam-pdf-objectives', q: 'In your financial application, you accidentally divide an integer by zero. What exception does Java throw?', a: 'Runtime exception' },
    { sectionId: 'exam-pdf-objectives', q: 'When evaluating user age eligibility (is user >= 18), which operator compares these two numeric values?', a: '==' },
    { sectionId: 'exam-pdf-objectives', q: 'In your algorithm, you start with int i = 1, then execute int j = --i;. What are the final values of both variables?', a: 'i = 0 and j = 0' },
    { sectionId: 'exam-pdf-objectives', q: 'In your application, you have two String variables s1 and s2 created with literals in the code. Both have the value "hello". What does s1 == s2 print due to memory allocation?', a: 'false' },

    { sectionId: 'exam-pdf-short', q: 'In your grade calculation app, you have three test scores (20, 15, 50). Write code to find the maximum using Math.max.', a: 'int maxValue = Math.max(20, Math.max(15, 50));' },
    { sectionId: 'exam-pdf-short', q: 'Your application maintains two Sets of student IDs: Set A and Set B. Write code to find which IDs appear in both sets.', a: 'B.retainAll(A);' },
    { sectionId: 'exam-pdf-short', q: 'You need to remove from Set A all students who are already in Set B (maybe because they transferred). Write the command.', a: 'A.removeAll(B);' },
    { sectionId: 'exam-pdf-short', q: 'Your application needs to combine all students from Set A with new students in Set B into one list. What code accomplishes this?', a: 'A.addAll(B);' },
    { sectionId: 'exam-pdf-short', q: 'In exception handling, the finally block only executes when an exception is caught and handled. True or false?', a: 'False' },
    { sectionId: 'exam-pdf-short', q: 'In your age verification system, int x = 89. What does the condition (x > 50 && x < 100) evaluate to?', a: 'true' },
    { sectionId: 'exam-pdf-short', q: 'Your application checks if a number is even. Given int x = 89, what is the result of (x % 2 == 0)?', a: 'false' },
    { sectionId: 'exam-pdf-short', q: 'Fill in the blank: In exception handling, the ______ block contains statements that might throw an exception.', a: 'try' },
    { sectionId: 'exam-pdf-short', q: 'Explain the practical difference between a while loop and a do-while loop in your application flow.', a: 'while checks the condition before the loop body; do-while executes the body first and checks afterward.' },
    { sectionId: 'exam-pdf-short', q: 'Describe how an array differs from an ArrayList when you\'re building a dynamic collection in an application.', a: 'An array has a fixed size; an ArrayList grows and shrinks dynamically.' },

    { sectionId: 'exam-pdf-code', q: 'Correct Mary’s multidimensional array code and identify the errors.', a: 'Use String[][] dimArray = new String[3][2]; and assign names/marks with valid indices.' },
    { sectionId: 'exam-pdf-code', q: 'Your application needs to display only student marks. Write a for-loop that prints the second column (marks) from a 2D student array.', a: 'for (int i = 0; i < dimArray.length; i++) System.out.println(dimArray[i][1]);' },
    { sectionId: 'exam-pdf-code', q: 'Write a loop that computes the sum of all numbers from 2 to 100 that are divisible by either 5 or 7.', a: 'Use a for-loop from 2 to 100 with an if condition checking i % 5 == 0 || i % 7 == 0.' },
    { sectionId: 'exam-pdf-code', q: 'In a grading system, set y to 2 for passing (x > 0), -3 for failing (x < 0), and 0 for zero scores. Write the conditional with three branches.', a: 'if (x > 0) y = 2; else if (x < 0) y = -3; else y = 0;' }
  ];

  function makeBasicsPractice() {
    const classNames = ['Box', 'Student', 'Course', 'Result', 'Printer'];
    const variableNames = ['value', 'score', 'count', 'flag', 'name'];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const group = i % 10;
      const className = classNames[i % classNames.length];
      const variableName = variableNames[i % variableNames.length];
      switch (group) {
        case 0:
          items.push({ sectionId: 'exam-practice-basics', q: `Which keyword begins the definition of class ${className}?`, a: 'class' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-basics', q: `Which keyword creates a new object of ${className}?`, a: 'new' });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-basics', q: `Which keyword makes ${variableName} a constant?`, a: 'final' });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-basics', q: `Which access modifier keeps ${variableName} visible only inside one class?`, a: 'private' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-basics', q: `Which keyword lets one class inherit from another?`, a: 'extends' });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-basics', q: `Which keyword is used to implement an interface?`, a: 'implements' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-basics', q: `Which data type stores only true or false?`, a: 'boolean' });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-basics', q: `Which data type stores a single character?`, a: 'char' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-basics', q: `Which package is commonly imported to use Scanner?`, a: 'java.util' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-basics', q: `What is the required entry-point method for a Java program?`, a: 'public static void main(String[] args)' });
          break;
      }
    }
    return items;
  }

  function makeArithmeticPractice() {
    const pairs = [
      [3, 4], [8, 2], [9, 5], [12, 3], [7, 7], [15, 6], [20, 4], [11, 2], [18, 9], [14, 7]
    ];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const [a, b] = pairs[i % pairs.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of ${a} + ${b}?`, a: String(a + b) });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of ${a} - ${b}?`, a: String(a - b) });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of ${a} * ${b}?`, a: String(a * b) });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of integer division ${a} / ${b}?`, a: String(Math.trunc(a / b)) });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of ${a} % ${b}?`, a: String(a % b) });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of System.out.println("CE" + ${a})?`, a: `CE${a}` });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of ${a} > ${b}?`, a: String(a > b) });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What is the output of Math.max(${a}, ${b})?`, a: String(Math.max(a, b)) });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `If x = ${a}, what is the value of ++x?`, a: String(a + 1) });
          break;
        default:
          items.push({ sectionId: 'exam-practice-arithmetic', q: `What does the ternary expression ${a} > ${b} ? "A" : "B" return?`, a: a > b ? 'A' : 'B' });
          break;
      }
    }
    return items;
  }

  function makeControlPractice() {
    const values = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const x = values[i % values.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-control', q: 'Which loop should you use when the number of repetitions is known in advance?', a: 'for loop' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-control', q: `If x = ${x}, what is the result of x > 10 ?`, a: String(x > 10) });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-control', q: 'Which selection structure is best when one variable can take many discrete values?', a: 'switch' });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-control', q: 'Which loop executes its body at least once?', a: 'do-while' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-control', q: 'What does break do inside a loop?', a: 'It exits the nearest loop immediately.' });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-control', q: 'What does continue do inside a loop?', a: 'It skips the current iteration and moves to the next one.' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-control', q: `What is the output of ${x} % 2 == 0?`, a: String(x % 2 === 0) });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-control', q: 'What kind of loop is appropriate for reading input until a sentinel value is entered?', a: 'sentinel-controlled loop' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-control', q: `If x = ${x}, what is the output of the ternary x > 10 ? "big" : "small"?`, a: x > 10 ? 'big' : 'small' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-control', q: 'What is the difference between while and do-while?', a: 'while checks the condition first; do-while checks after running the loop body.' });
          break;
      }
    }
    return items;
  }

  function makeStringsPractice() {
    const names = ['Java', 'Python', 'Binary', 'Campus', 'Student', 'Lecture', 'Course', 'Object', 'String', 'Array'];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const word = names[i % names.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-strings', q: `Which method checks whether two String values have the same content?`, a: 'equals()' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the output of System.out.println("${word}" + 2025)?`, a: `${word}2025` });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the result of "${word}".substring(1, 3)?`, a: word.substring(1, 3) });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the length of the String "${word}"?`, a: String(word.length) });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the character at index 0 in "${word}"?`, a: word[0] });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-strings', q: `How do you convert the String "123" to an int?`, a: 'Integer.parseInt("123")' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-strings', q: `What does "${word}".toUpperCase() return?`, a: word.toUpperCase() });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the result of "${word}".indexOf("${word[0]}")?`, a: '0' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-strings', q: `Which method ignores case when comparing Strings?`, a: 'equalsIgnoreCase()' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-strings', q: `What is the difference between a char and a String?`, a: 'char stores one character; String stores a sequence of characters.' });
          break;
      }
    }
    return items;
  }

  function makeCollectionsPractice() {
    const sizes = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const n = sizes[i % sizes.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-arrays', q: `How do you declare an int array with ${n} elements?`, a: `int[] arr = new int[${n}];` });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-arrays', q: 'What is the main difference between an array and an ArrayList?', a: 'Arrays have fixed size; ArrayLists can grow and shrink dynamically.' });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-arrays', q: 'Which collection is best when duplicate values must not be stored?', a: 'Set' });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-arrays', q: 'Which collection stores key-value pairs?', a: 'HashMap' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-arrays', q: `How many elements are in a ${n} x 2 two-dimensional array?`, a: String(n * 2) });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-arrays', q: 'What method adds an element to an ArrayList?', a: 'add()' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-arrays', q: 'What method removes all matching elements from a Set or Collection?', a: 'removeAll()' });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-arrays', q: 'What method keeps only the common elements between two collections?', a: 'retainAll()' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-arrays', q: 'How do you access the first element of an array?', a: 'arr[0]' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-arrays', q: 'Which loop is commonly used to traverse an array?', a: 'for loop' });
          break;
      }
    }
    return items;
  }

  function makeOopPractice() {
    const classNames = ['Box', 'Student', 'Course', 'Result', 'Shape', 'BankAccount', 'Vehicle', 'Product', 'Car', 'Book'];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const className = classNames[i % classNames.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-oop', q: `What is a class in Java?`, a: 'A blueprint for creating objects.' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-oop', q: `What is an object created from class ${className}?`, a: 'An instance of that class.' });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-oop', q: `What is the purpose of a constructor in class ${className}?`, a: 'To initialize object state when an object is created.' });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-oop', q: 'What does this refer to?', a: 'The current object instance.' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-oop', q: 'What keyword makes a member belong to the class instead of an object?', a: 'static' });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-oop', q: 'What is encapsulation?', a: 'Hiding data fields and exposing controlled access through methods.' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-oop', q: 'What keyword is used to call a superclass constructor?', a: 'super' });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-oop', q: 'What is method overloading?', a: 'Using the same method name with different parameter lists.' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-oop', q: 'What access modifier makes a field visible only within the class?', a: 'private' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-oop', q: `Which keyword is used to inherit class ${className} from another class?`, a: 'extends' });
          break;
      }
    }
    return items;
  }

  function makeExceptionsPractice() {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const n = values[i % values.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'Why do programmers use exception handling?', a: 'To handle runtime problems gracefully and keep the program stable.' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'Which block contains code that may throw an exception?', a: 'try' });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'Which block executes whether an exception occurs or not?', a: 'finally' });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'What exception often occurs when Scanner receives the wrong input type?', a: 'InputMismatchException' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-exceptions', q: `What happens when you divide ${n} by zero in Java?`, a: 'A runtime exception occurs.' });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'Which class represents file and directory paths?', a: 'File' });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'Which class is commonly used to write text to a file?', a: 'PrintWriter' });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'What does a catch block do?', a: 'It handles a thrown exception.' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'What keyword can be used to declare that a method may throw an exception?', a: 'throws' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-exceptions', q: 'What is the purpose of allowing a user to re-enter a value after an exception?', a: 'To make the program more robust and user-friendly.' });
          break;
      }
    }
    return items;
  }

  function makeMethodsPractice() {
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const items = [];
    for (let i = 0; i < 30; i += 1) {
      const n = values[i % values.length];
      switch (i % 10) {
        case 0:
          items.push({ sectionId: 'exam-practice-methods', q: 'What is a method in Java?', a: 'A reusable block of code that performs a task.' });
          break;
        case 1:
          items.push({ sectionId: 'exam-practice-methods', q: 'What does a void method return?', a: 'It returns no value.' });
          break;
        case 2:
          items.push({ sectionId: 'exam-practice-methods', q: `What is the output of Math.max(${n}, ${n + 5})?`, a: String(Math.max(n, n + 5)) });
          break;
        case 3:
          items.push({ sectionId: 'exam-practice-methods', q: 'What is method overloading?', a: 'Using the same method name with different parameter lists.' });
          break;
        case 4:
          items.push({ sectionId: 'exam-practice-methods', q: 'Can a method return multiple values directly in Java?', a: 'No, but it can return an array, object, List, or Map.' });
          break;
        case 5:
          items.push({ sectionId: 'exam-practice-methods', q: `What is the result of a range sum method that sums 1 to ${n}?`, a: String((n * (n + 1)) / 2) });
          break;
        case 6:
          items.push({ sectionId: 'exam-practice-methods', q: 'What is recursion?', a: 'A method calling itself.' });
          break;
        case 7:
          items.push({ sectionId: 'exam-practice-methods', q: 'What is the return type of the main method?', a: 'void' });
          break;
        case 8:
          items.push({ sectionId: 'exam-practice-methods', q: 'What does the parameter list of a method specify?', a: 'The data the method expects as input.' });
          break;
        default:
          items.push({ sectionId: 'exam-practice-methods', q: 'Why is method decomposition useful?', a: 'It reduces repetition and makes code easier to read and maintain.' });
          break;
      }
    }
    return items;
  }

  const PRACTICE_ITEMS = [
    ...makeBasicsPractice(),
    ...makeArithmeticPractice(),
    ...makeControlPractice(),
    ...makeStringsPractice(),
    ...makeCollectionsPractice(),
    ...makeOopPractice(),
    ...makeExceptionsPractice(),
    ...makeMethodsPractice()
  ];

  const allItems = [...PDF_EXAM_ITEMS, ...PRACTICE_ITEMS];
  const answerPool = Array.from(new Set(allItems.map((item) => item.a).filter(Boolean)));

  const revisedSet = loadRevisedState();
  let examHistoryItems = loadExamHistory();
  let currentMock = null;
  let mockTimerId = null;

  function loadRevisedState() {
    const raw = localStorage.getItem(REVISED_KEY);
    if (!raw) {
      return new Set();
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.map((value) => String(value)));
      }
    } catch {
      return new Set();
    }

    return new Set();
  }

  function saveRevisedState(set) {
    localStorage.setItem(REVISED_KEY, JSON.stringify(Array.from(set)));
  }

  function loadExamHistory() {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return [];
    }

    return [];
  }

  function saveExamHistory() {
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(examHistoryItems));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function formatAnswer(answer) {
    return escapeHtml(answer).replaceAll('\n', '<br>');
  }

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

  function renderExamHistory() {
    if (!examBestScoreLine || !examHistory) return;

    if (examHistoryItems.length === 0) {
      examBestScoreLine.textContent = 'No past paper attempts yet.';
      examHistory.innerHTML = '<li class="tool-note">No past paper attempts yet.</li>';
      return;
    }

    const best = examHistoryItems.reduce((acc, item) => {
      if (!acc) return item;
      if (item.pct > acc.pct) return item;
      if (item.pct === acc.pct && item.score > acc.score) return item;
      return acc;
    }, null);

    examBestScoreLine.textContent = `${best.score}/${best.total} (${best.pct}%) on ${formatDate(best.timestamp)}.`;

    examHistory.innerHTML = examHistoryItems.slice(0, 10).map((item) => {
      return `<li>${item.score}/${item.total} (${item.pct}%) | ${formatDate(item.timestamp)}</li>`;
    }).join('');
  }

  function setMockStatus(message) {
    if (examMockStatus) {
      examMockStatus.textContent = message;
    }
  }

  function setMockTimerText(message) {
    if (examMockTimer) {
      examMockTimer.textContent = message;
    }
  }

  function clearMockTimer() {
    if (mockTimerId) {
      clearInterval(mockTimerId);
      mockTimerId = null;
    }
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildMockChoices(correctAnswer) {
    const distractors = [];
    const ans = String(correctAnswer).toLowerCase().trim();
    const answerPoolLower = answerPool.map(a => String(a).toLowerCase().trim());
    
    // Common misconceptions and realistic alternatives
    const commonMisconceptions = {
      'public static void main(string[] args)': [
        'public void main(String[] args)',
        'static void main(String[] args)',
        'public static void Main(String[] args)',
        'public static int main(String[] args)'
      ],
      'double': [
        'float',
        'int',
        'decimal',
        'float (with double precision)'
      ],
      'scanner': [
        'InputReader',
        'BufferedReader',
        'Console',
        'System.in directly'
      ],
      'integer.parseint()': [
        'Integer.valueOf()',
        'String.toInt()',
        'int(String)',
        'Integer.parseInt(String) with wrong parameters'
      ],
      'final int x = 10': [
        'const int x = 10',
        'static int x = 10',
        'private int x = 10',
        'int final x = 10'
      ],
      'extends': [
        'implements',
        'inherits from',
        'super',
        'parent'
      ],
      'equals()': [
        '==',
        'compareTo()',
        '.equals(String)',
        'equalsIgnoreCase() (for case-sensitive compare)'
      ],
      'private': [
        'protected',
        'internal',
        'package-private',
        'default'
      ],
      'for loop': [
        'while loop',
        'foreach loop',
        'do-while loop',
        'Iterator'
      ],
      'interface': [
        'abstract class',
        'class',
        'contract',
        'implements'
      ],
      'a runtime exception is thrown': [
        'The result is 0',
        'The program returns -1',
        'It silently returns infinity',
        'It returns Double.INFINITY'
      ],
      'int[] arr = new int[5]': [
        'int arr[5]',
        'int[] arr = {1,2,3,4,5}',
        'array<int> arr(5)',
        'List<Integer> arr = new List[5]'
      ],
      'if (x == 5)': [
        'if (x = 5)',
        'if x == 5',
        'if (x equals 5)',
        'if (x eq 5)'
      ],
      'true': [
        'false',
        '1',
        'yes',
        'true (boolean value 1)'
      ],
      'false': [
        'true',
        '0',
        'no',
        'null'
      ],
      '55': [
        '10',
        '5',
        'error',
        'undefined'
      ],
      '15': [
        '10',
        '5',
        '20',
        '110'
      ],
      '1': [
        '0',
        '3.33',
        '2',
        '10'
      ],
      '2': [
        '2.5',
        '3',
        '0',
        'undefined'
      ],
      'void': [
        'null',
        'int',
        'nothing',
        'boolean'
      ],
      's = new student()': [
        's = Student()',
        'Student s = new Student',
        'new Student() s',
        's = Student.new()'
      ],
      'encapsulation': [
        'inheritance',
        'polymorphism',
        'abstraction',
        'modularity'
      ],
      'try': [
        'catch',
        'finally',
        'attempt',
        'handle'
      ],
      'string[][] array = new string[3][2]': [
        'String[3][2] array',
        'String array = new String[3][2]',
        'String array[][] = new String[3][2]',
        'new String[3][2] array'
      ],
      'array[2][1]': [
        'array[1][2]',
        'array.get(2,1)',
        'array[2, 1]',
        'array(2)(1)'
      ]
    };
    
    // Numeric answer (e.g., "7", "2", "55")
    if (/^\d+$/.test(String(correctAnswer))) {
      const n = Number(correctAnswer);
      const offsets = [1, -1, 2, -2, 3, -3, 10, -10, n * 2, Math.floor(n / 2)];
      offsets.forEach((offset) => {
        const val = n + offset;
        if (val >= 0 && val !== n && !answerPoolLower.includes(String(val).toLowerCase()) && distractors.length < 4) {
          distractors.push(String(val));
        }
      });
    } 
    // Boolean answer (e.g., "true", "false")
    else if (ans === 'true' || ans === 'false') {
      const opposites = ans === 'true' ? ['false', '0', 'no', 'False'] : ['true', '1', 'yes', 'True'];
      opposites.forEach(opt => {
        if (opt.toLowerCase() !== ans && !answerPoolLower.includes(opt.toLowerCase()) && distractors.length < 4) {
          distractors.push(opt);
        }
      });
    } 
    // Check if there are common misconceptions for this answer
    else {
      const key = ans.replace(/[(){}[\]';,\s]/g, '').substring(0, 20);
      let options = null;
      
      // Find matching misconceptions
      for (const [pattern, alternatives] of Object.entries(commonMisconceptions)) {
        if (String(correctAnswer).toLowerCase().includes(pattern.substring(0, 15)) || 
            pattern.includes(key.substring(0, 10))) {
          options = alternatives;
          break;
        }
      }
      
      if (options) {
        options.forEach(opt => {
          if (opt.toLowerCase() !== ans && !answerPoolLower.includes(opt.toLowerCase()) && distractors.length < 4) {
            distractors.push(opt);
          }
        });
      } else {
        // Fallback: use generic realistic alternatives
        const fallbacks = [
          'A similar but incorrect syntax',
          'Correct syntax but wrong parameter',
          'Confusing with another language',
          'A common student misconception'
        ];
        fallbacks.forEach(opt => {
          if (distractors.length < 4) distractors.push(opt);
        });
      }
    }
    
    // Ensure we have 4 unique distractors
    while (distractors.length < 4) {
      const num = distractors.filter(d => /^\d+$/.test(d)).length;
      if (num < 2) distractors.push(`${Number(distractors.filter(d => /^\d+$/.test(d))[0] || 0) + 1}`);
      else distractors.push(`Alternative option ${distractors.length}`);
    }
    
    return shuffle([correctAnswer, ...distractors.slice(0, 4)]);
  }

  function renderMockBank(items, revealed = false) {
    if (!examMockBank) return;

    const html = items.map((item, index) => {
      const options = item.options || buildMockChoices(item.a);
      return `
        <article class="mock-item" data-item-index="${index}" data-section-id="${item.sectionId}">
          <p><strong>Q${index + 1}.</strong> ${escapeHtml(item.q)}</p>
          <div class="mock-options">
            ${options.map((option, optionIndex) => `
              <label class="mock-option">
                <input type="radio" name="mock-choice-${index}" value="${escapeHtml(option)}" class="mock-choice-input">
                <span class="mock-option-tag">${String.fromCharCode(65 + optionIndex)}</span>
                <span>${escapeHtml(option)}</span>
              </label>
            `).join('')}
          </div>
          <div class="mock-feedback" hidden>
            <p class="mock-feedback-status"></p>
            <p><strong>Correct answer:</strong> <span class="mock-correct-answer">${formatAnswer(item.a)}</span></p>
          </div>
          <div class="mock-score-line" hidden>
            <span class="mock-done-indicator">Selected</span>
          </div>
        </article>
      `;
    }).join('');

    examMockBank.innerHTML = html;
    examMockBank.hidden = false;
    attachMockChoiceListeners();
  }

  function attachMockChoiceListeners() {
    const items = Array.from(examMockBank?.querySelectorAll('.mock-item') || []);
    items.forEach((item) => {
      const itemIndex = Number(item.dataset.itemIndex);
      const choiceInputs = Array.from(item.querySelectorAll('.mock-choice-input'));
      choiceInputs.forEach((input) => {
        input.addEventListener('change', () => {
          if (!currentMock || currentMock.submitted) return;
          if (currentMock.selectedAnswers[itemIndex] !== null) {
            return;
          }

          const selectedAnswer = input.value;
          const currentItem = currentMock?.items[itemIndex];
          if (!currentItem) return;

          currentMock.selectedAnswers[itemIndex] = selectedAnswer;
          const feedback = item.querySelector('.mock-feedback');
          const status = item.querySelector('.mock-feedback-status');
          const isCorrect = selectedAnswer === currentItem.a;

          item.classList.remove('correct', 'wrong');
          item.classList.add(isCorrect ? 'correct' : 'wrong');

          if (feedback) feedback.hidden = false;
          if (status) {
            status.textContent = isCorrect ? 'Correct' : 'Wrong';
          }

          // Lock this question after first selection until reset.
          choiceInputs.forEach((choice) => {
            choice.disabled = true;
          });

          const doneLine = item.querySelector('.mock-score-line');
          if (doneLine) doneLine.hidden = false;
        });
      });
    });
  }

  function updateMockControls(submitted) {
    if (examMockSubmit) examMockSubmit.disabled = !currentMock || submitted;
    if (examMockSave) examMockSave.disabled = !currentMock || !submitted;
    if (examMockStart) examMockStart.disabled = !!currentMock && !submitted;
  }

  function finishMockTest(autoSubmitted = false) {
    if (!currentMock) return;

    clearMockTimer();
    currentMock.submitted = true;
    updateMockControls(true);

    const items = Array.from(examMockBank?.querySelectorAll('.mock-item') || []);
    items.forEach((item, index) => {
      const inputs = Array.from(item.querySelectorAll('.mock-choice-input'));
      inputs.forEach((input) => {
        input.disabled = true;
      });
      const selected = currentMock.selectedAnswers[index];
      const feedback = item.querySelector('.mock-feedback');
      const status = item.querySelector('.mock-feedback-status');
      const currentItem = currentMock.items[index];
      if (!currentItem) return;

      const isCorrect = selected === currentItem.a;
      if (selected) {
        item.classList.remove('correct', 'wrong');
        item.classList.add(isCorrect ? 'correct' : 'wrong');
        if (feedback) feedback.hidden = false;
        if (status) status.textContent = isCorrect ? 'Correct' : 'Wrong';
      }
    });

    const count = currentMock.items.length;
    setMockStatus(`${autoSubmitted ? 'Time up. ' : ''}Choose one option per question. Each choice is final and cannot be changed unless you reset the exam.`);
    setMockTimerText('Time left: 00:00');
    if (examMockNote) {
      examMockNote.textContent = 'Each question locks after your first selection. Use Reset Mock Test to unlock and try again.';
    }

    return count;
  }

  function saveMockScore() {
    if (!currentMock || !currentMock.submitted || !examMockBank) return;

    const total = currentMock.items.length;
    const score = currentMock.items.reduce((sum, item, index) => {
      return sum + (currentMock.selectedAnswers[index] === item.a ? 1 : 0);
    }, 0);
    const pct = total === 0 ? 0 : Math.round((score / total) * 100);

    examHistoryItems.unshift({
      timestamp: Date.now(),
      score,
      total,
      pct
    });
    examHistoryItems = examHistoryItems.slice(0, 20);
    saveExamHistory();
    renderExamHistory();

    setMockStatus(`Saved score: ${score}/${total} (${pct}%).`);
    if (examMockNote) {
      examMockNote.textContent = 'Past paper score saved. Start a new mock test anytime.';
    }
    currentMock = null;
    updateMockControls(false);
    if (examMockStart) examMockStart.disabled = false;
  }

  function resetMockTest() {
    clearMockTimer();
    currentMock = null;
    if (examMockBank) {
      examMockBank.hidden = true;
      examMockBank.innerHTML = '';
    }
    if (examMockNote) {
      examMockNote.textContent = 'Choose an option to reveal the answer for each question.';
    }
    setMockStatus('Mock test reset.');
    setMockTimerText('Time left: --:--');
    updateMockControls(false);
  }

  function startMockTest() {
    const requestedCount = Number(examMockCount?.value || PDF_EXAM_ITEMS.length);
    const minutes = Number(examMockMinutes?.value || 20);
    const count = Math.min(requestedCount, PDF_EXAM_ITEMS.length);
    const items = shuffle(PDF_EXAM_ITEMS).slice(0, count);

    clearMockTimer();
    currentMock = {
      items,
      selectedAnswers: Array(count).fill(null),
      submitted: false,
      endsAt: Date.now() + minutes * 60 * 1000
    };

    renderMockBank(items, false);
    updateMockControls(false);
    if (examMockSubmit) examMockSubmit.disabled = false;
    if (examMockSave) examMockSave.disabled = true;

    setMockStatus(`Mock test started with ${count} past-paper questions. Choose an option to reveal the answer and feedback.`);
    if (examMockNote) {
      examMockNote.textContent = 'Answers are hidden until you select an option. After your first selection, that question is locked until reset.';
    }

    const tick = () => {
      if (!currentMock) return;
      const remainingMs = Math.max(0, currentMock.endsAt - Date.now());
      const minutesLeft = Math.floor(remainingMs / 60000);
      const secondsLeft = Math.floor((remainingMs % 60000) / 1000);
      setMockTimerText(`Time left: ${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`);
      if (remainingMs === 0) {
        finishMockTest(true);
      }
    };

    tick();
    mockTimerId = setInterval(tick, 1000);
  }

  function renderBank() {
    let index = 1;
    const html = SECTION_DEFS.map((section) => {
      const items = allItems.filter((item) => item.sectionId === section.id);
      const cards = items.map((item, itemIndex) => {
        const globalIndex = index - 1;
        const checked = revisedSet.has(String(globalIndex)) ? 'checked' : '';
        const searchText = `${section.title} ${item.q} ${item.a}`.toLowerCase();
        const sourceLabel = section.id.startsWith('exam-pdf') ? 'Past paper question' : 'Practice question';
        const markup = `
          <div class="question-item" data-question-index="${globalIndex}" data-search-text="${searchText}">
            <p><strong>Q${index}.</strong> ${escapeHtml(item.q)}<br><strong>Answer:</strong> <span class="exam-answer">${formatAnswer(item.a)}</span></p>
            <p class="tool-note">${sourceLabel}</p>
            <label class="revise-line">
              <input type="checkbox" class="exam-revise-checkbox" data-question-index="${globalIndex}" ${checked}>
              Mark as revised
            </label>
          </div>
        `;
        index += 1;
        return markup;
      }).join('');

      return `
        <article id="${section.id}" class="card qa">
          <h3>${section.title}</h3>
          ${cards}
        </article>
      `;
    }).join('');

    examMount.innerHTML = html;
    bindRevisedCheckboxes();
    applyFilters();
    updateRevisedCount();
  }

  function bindRevisedCheckboxes() {
    const checkboxes = Array.from(document.querySelectorAll('.exam-revise-checkbox'));
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const idx = checkbox.dataset.questionIndex;
        if (!idx) return;
        if (checkbox.checked) {
          revisedSet.add(idx);
        } else {
          revisedSet.delete(idx);
        }
        saveRevisedState(revisedSet);
        updateRevisedCount();
      });
    });
  }

  function updateRevisedCount() {
    if (examRevisedCount) {
      examRevisedCount.textContent = `Revised progress: ${revisedSet.size} / ${allItems.length}`;
    }
  }

  function applyFilters() {
    const searchValue = (examSearch?.value || '').trim().toLowerCase();
    const selectedSection = examSectionFilter?.value || 'all';
    let visibleCount = 0;

    SECTION_DEFS.forEach((section) => {
      const article = document.getElementById(section.id);
      if (!article) return;

      const sectionMatches = selectedSection === 'all' || selectedSection === section.id;
      article.hidden = !sectionMatches;
      if (!sectionMatches) return;

      const items = Array.from(article.querySelectorAll('.question-item'));
      let visibleInSection = 0;
      items.forEach((item) => {
        const text = item.dataset.searchText || '';
        const visible = !searchValue || text.includes(searchValue);
        item.hidden = !visible;
        if (visible) {
          visibleInSection += 1;
          visibleCount += 1;
        }
      });

      article.hidden = visibleInSection === 0;
    });

    if (examCount) {
      examCount.textContent = `Showing ${visibleCount} of ${allItems.length} exam questions.`;
    }
    if (examNoResults) {
      examNoResults.hidden = visibleCount !== 0;
    }
  }

  if (examSearch) {
    examSearch.addEventListener('input', applyFilters);
  }

  if (examSectionFilter) {
    examSectionFilter.addEventListener('change', applyFilters);
  }

  if (examClearFilters) {
    examClearFilters.addEventListener('click', () => {
      if (examSearch) examSearch.value = '';
      if (examSectionFilter) examSectionFilter.value = 'all';
      applyFilters();
    });
  }

  if (examMockStart) {
    examMockStart.addEventListener('click', startMockTest);
  }

  if (examMockSubmit) {
    examMockSubmit.addEventListener('click', () => finishMockTest(false));
  }

  if (examMockSave) {
    examMockSave.addEventListener('click', saveMockScore);
  }

  if (examMockReset) {
    examMockReset.addEventListener('click', resetMockTest);
  }

  renderBank();
  renderExamHistory();
})();
