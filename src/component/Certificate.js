import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import certificate from './certi.png';
import { useState } from 'react';

export const Certificate = () => {
  const certificateRef = useRef(null);
  const [name, setName] = useState('');
  
  document.body.style.backgroundColor='skyblue';
  const handleDownload = () => {
    if (!certificateRef.current) return;

    html2canvas(certificateRef.current)
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error generating the certificate:', error);
      });
  };
  
  return (
    <div style={{ display: 'flex' }}>
      <div
        ref={certificateRef}
        style={{ position: 'relative', width: '800px', height: '600px' }}
      >
        {/* Your certificate content goes here */}
        <img src={certificate} width="100%" height="100%" alt="Certificate" />
        <h2
          style={{
            fontFamily: 'Lugrasimo',
            position: 'absolute',
            top: '280px', // Adjust the top position as needed
            left: '50%', // Adjust the left position as needed
            transform: 'translateX(-50%)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'black',
            textTransform: 'uppercase',
          }}
        >
          {name}
        </h2>
      </div>
      <div style={{ marginRight: '10px' }}>
        <h3 >Enter your name</h3>
        <div style={{ marginLeft: '10px' }}> 
        <input type='text' onChange={(e) => { setName(e.target.value) }}></input>
        <button onClick={handleDownload}>Download Certificate</button>
        </div>
      </div>
      
    </div>
  );
};
