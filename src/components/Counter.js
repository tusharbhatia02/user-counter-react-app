import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function Counter() {
  const [count, setCount] = useState(0);

  const animationProps = useSpring({
    backgroundColor: `rgba(0, 0, 255, ${Math.min(count / 10, 1)})`,
    config: { tension: 170, friction: 26 }
  });

  return (
    <animated.div style={{ ...animationProps, padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>
        Counter: {count}
      </Typography>
      <Box display="flex" gap="10px">
        <Button variant="contained" color="primary" onClick={() => setCount(prev => prev + 1)}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setCount(prev => Math.max(prev - 1, 0))}>
          Decrement
        </Button>
        <Button variant="contained" onClick={() => setCount(0)}>
          Reset
        </Button>
      </Box>
    </animated.div>
  );
}

export default Counter;