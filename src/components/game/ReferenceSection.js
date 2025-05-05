import React from 'react';
import ReferenceCard from './ReferenceCard';

const ReferenceSection = () => {
  const referenceData = [
    {
      title: "SELECT Statement",
      description: "Used to select data from a database",
      examples: [
        "SELECT * FROM table_name",
        "SELECT column1, column2 FROM table_name"
      ]
    },
    {
      title: "WHERE Clause",
      description: "Used to filter records",
      examples: [
        "SELECT * FROM table_name WHERE condition",
        "SELECT * FROM customers WHERE country = 'USA'"
      ]
    },
    {
      title: "JOIN Operations",
      description: "Used to combine rows from two or more tables",
      examples: [
        "SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id",
        "SELECT a.column, b.column FROM tableA a INNER JOIN tableB b ON a.common_field = b.common_field"
      ]
    },
    {
      title: "GROUP BY Statement",
      description: "Groups rows with the same values into summary rows",
      examples: [
        "SELECT COUNT(id), country FROM customers GROUP BY country",
        "SELECT department, AVG(salary) FROM employees GROUP BY department"
      ]
    },
    {
      title: "ORDER BY Keyword",
      description: "Used to sort the result-set by one or more columns",
      examples: [
        "SELECT * FROM table_name ORDER BY column1 ASC, column2 DESC",
        "SELECT name, price FROM products ORDER BY price DESC"
      ]
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-light text-slate-700 mb-6">SQL Reference Guide</h2>
      
      <div className="space-y-6">
        {referenceData.map((item, index) => (
          <ReferenceCard 
            key={index}
            title={item.title}
            description={item.description}
            examples={item.examples}
          />
        ))}
      </div>
    </section>
  );
};

export default ReferenceSection;