import React from 'react';

const FAQ = () => {
  const faqs = [
    { q: 'How do I get quotes?', a: 'Fill out the Get a Quote form. Verified movers will contact you with offers.' },
    { q: 'Is MyMoveAdvisor free to use?', a: 'Yes, requesting quotes is free for customers.' },
    { q: 'How long does it take to receive quotes?', a: 'Most customers receive initial quotes within a few hours.' },
    { q: 'Are movers verified?', a: 'We work with registered, reviewed movers and monitor performance and compliance.' },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">FAQ</h2>
          <p className="text-gray-600">Answers to commonly asked questions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
              <div className="font-semibold text-gray-800 mb-1">{item.q}</div>
              <div className="text-gray-600 text-sm">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
