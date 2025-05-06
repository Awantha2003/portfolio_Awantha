const API_BASE = 'http://localhost:5000/api/contact';

export const submitContactForm = async (formData) => {
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (err) {
    console.error('❌ Contact form failed:', err);
    return { success: false, message: 'Network error' };
  }
};
