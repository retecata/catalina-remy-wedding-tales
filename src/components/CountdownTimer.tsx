import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  labels: { days: string; hours: string; minutes: string; seconds: string };
}

const CountdownTimer = ({ targetDate, labels }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: labels.days },
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.minutes },
    { value: timeLeft.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 mt-6">
      {units.map(({ value, label }) => (
        <motion.div
          key={label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-display text-2xl md:text-3xl font-medium text-foreground tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

function getTimeLeft(target: Date) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default CountdownTimer;
