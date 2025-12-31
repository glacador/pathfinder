'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  tier: string;
  userId: string;
  email: string;
  resultId: string;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({
  tier,
  userId,
  email,
  resultId,
  children,
  className = '',
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, userId, email, resultId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCheckout}
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
