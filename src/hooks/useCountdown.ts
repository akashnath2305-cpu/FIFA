import { useState, useEffect } from 'react';

export function useCountdown(initialDays: number, initialHrs: number, initialMins: number, initialSecs: number) {
  const [timeLeft, setTimeLeft] = useState({ 
    days: initialDays, 
    hrs: initialHrs, 
    mins: initialMins, 
    secs: initialSecs 
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hrs, mins, secs } = prev;
        
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hrs > 0) {
              hrs--;
            } else {
              hrs = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hrs, mins, secs };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
