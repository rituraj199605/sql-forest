# SQL Forest

SQL Forest is an interactive, visually engaging application designed to help people learn SQL through a gamified experience. The application visualizes SQL concepts as a journey through a forest, with users progressing through different areas as they master SQL commands and techniques.



## Features

- **Interactive Learning Experience**: Learn SQL concepts through hands-on challenges in a visually appealing interface
- **Progressive Difficulty**: Start with basic SELECT statements and advance to complex JOIN operations
- **Visual Database Tables**: See database tables represented visually to better understand relationships
- **Real-time Feedback**: Get immediate feedback on your SQL queries
- **Achievement System**: Track your progress with achievements and completion metrics
- **Built-in SQL Reference**: Access a comprehensive SQL reference guide within the application

## Technologies Used

- React
- Tailwind CSS 3
- JavaScript ES6+

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rituraj199605/sql-forest.git
   cd sql-forest
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Tailwind CSS:
   ```
   npm install -D tailwindcss@3.3.3 postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Configure Tailwind CSS by updating `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           peach: {
             100: '#FDF2E9',
             200: '#FBEADB',
             300: '#F4B183',
             400: '#E59C6B',
             600: '#D2691E',
           },
           mint: {
             100: '#E6F0ED',
             200: '#D1E0DB',
             600: '#3D7A68',
           },
         },
         scale: {
           '102': '1.02',
         },
       },
     },
     plugins: [],
   }
   ```

5. Add Tailwind directives to your CSS in `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. Start the development server:
   ```
   npm start
   ```

## How to Use

1. **Learning Mode**: Start in the "Learn" tab to progress through SQL challenges
2. **Executing Queries**: Write your SQL queries in the editor and click "Execute Query" to test them
3. **Progress Tracking**: View your progress in the "Progress" tab
4. **SQL Reference**: Access the SQL reference guide in the "SQL Reference" tab for syntax help and examples

## Adding More Levels

To extend the application with additional SQL challenges, update the `levels` array in `App.jsx`:

```javascript
const levels = [
  {
    id: 4,
    title: "Your New Level",
    description: "Description of the challenge",
    challenge: "Challenge instructions here",
    hint: "Try: YOUR SQL HINT HERE",
    solution: "YOUR SQL SOLUTION HERE",
    tables: [
      // Define your tables here
    ]
  }
];
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

Copyright (c) 2025 Ritu Raj Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.