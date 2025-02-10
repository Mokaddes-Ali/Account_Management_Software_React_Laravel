import React, { useState } from 'react';

const VerifyEmail = () => {
  const [message, setMessage] = useState(null);

  const handleVerifyEmail = async (id, hash) => {
    try {
      const response = await fetch(`/email/verify/${id}/${hash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Email verified successfully!');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Error occurred while verifying email.');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <button onClick={() => handleVerifyEmail(1, 'somehash')}>Verify Email</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
