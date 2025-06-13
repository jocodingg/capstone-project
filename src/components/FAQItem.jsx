import React, { useState } from 'react';
import '../styles/faq.css';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span className="symbol">{open ? '–' : '+'}</span>
        <span>{question}</span>
      </div>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default FAQItem;
