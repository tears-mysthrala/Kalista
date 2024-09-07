'use client';

import { useState } from 'react';

interface ContactFormProps {
  darkMode: boolean;
}

export default function ContactForm({ darkMode }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Enviando...');

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus('¡Mensaje enviado con éxito!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
        />
      </div>
      <div>
        <label htmlFor="email" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
        />
      </div>
      <div>
        <label htmlFor="message" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
        ></textarea>
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        Enviar
      </button>
      {status && <p className={`mt-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{status}</p>}
    </form>
  );
}