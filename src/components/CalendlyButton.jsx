import React from 'react';
export default function CalendlyButton({text='Book a call',variant='primary',size='medium',className=''}){
  const variants={primary:'bg-blue-600 text-white',secondary:'bg-gray-700 text-white',outline:'border border-blue-400 text-blue-300',text:'text-blue-500 underline'};
  const sizes={small:'px-4 py-2 text-sm',medium:'px-6 py-3',large:'px-7 py-3 text-lg'};
  return <a href="https://calendly.com/bongani-edgebox/30min" target="_blank" rel="noopener noreferrer" className={`inline-flex font-semibold rounded-lg ${variants[variant] || variants.primary} ${sizes[size] || sizes.medium} ${className}`}>{text}</a>;
}
