import { useState, useEffect } from 'react'
import { styled } from '@emotion/styled'
import { chroma } from 'chroma-js'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Container = styled.div`
  background-color: ${({ backgroundColor}) => backgroundColor};
  padding: 20px;
`;

function App() {
  const [hour, setHour] = useState(new Date().getHours());
  const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor(hour));
  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
      const color1 = chroma('darkred');
      const color2 = chroma('darkgreen');
      const color3 = chroma('darkblue');
      const currentTime = new Date().getTime();
      const morningStart = new Date('06:00:00').getTime();
      const morningEnd = new Date('12:00:00').getTime();
      const afternoonStart = new Date('12:00:00').getTime();
      const afternoonEnd = new Date('18:00:00').getTime();
      if (currentTime >= morningStart && currentTime < morningEnd) {
        const progress = (currentTime - morningStart) / (morningEnd - morningStart);
        const color = chroma.scale([color1, color2])(progress);
        setBackgroundColor(color.hex());
      } else if (currentTime >= afternoonStart && currentTime < afternoonEnd) {
        const progress = (currentTime - afternoonStart) / (afternoonEnd - afternoonStart);
        const color = chroma.scale([color2, color3])(progress);
        setBackgroundColor(color.hex());
      } else {
        const progress = (currentTime - afternoonEnd) / (24 * 60 * 60 * 1000 - afternoonEnd);
        const color = chroma.scale([color3, color1])(progress);
        setBackgroundColor(color.hex());
      }
    }, 1000 * 60); //update every minute
    return () => clearInterval(timer);
  }, []);


  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
