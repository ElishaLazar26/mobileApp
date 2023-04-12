import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(1800);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000); // update the timer every 1000ms (1 second)
    
    return () => clearInterval(intervalId); // cleanup function to stop the interval when the component unmounts
  }, []); // empty dependency array ensures the effect only runs once on mount

  return <Text>   <CountDown
        until={60 * 10 + 30}
        size={30}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
</Text>;
};

export default Timer;
