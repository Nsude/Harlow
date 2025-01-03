import React, { useRef, useState } from 'react';
import useCustomEffect from '../../hooks/useCustomEffect';

interface Props {
  min: number
  max: number
  setExternalRange: React.Dispatch<React.SetStateAction<{min: number, max: number}>>
}

const RangeSlider:React.FC<Props> = ({min, max, setExternalRange}) => {
  const rangeProgressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const [rangeValue, setRangeValue] = useState({
    min: min,
    max: max
  })

  useCustomEffect(() => {
    setRangeValue({min: min, max: max});
  }, [max, min])

  /* ====== MIN INPUT RANGE HANDLER ====== */
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!maxRef.current) return;
    if (+e.target.value >= +maxRef.current.value) {
      setRangeValue({...rangeValue, min: rangeValue.max});
      setExternalRange({...rangeValue});
      return 
    };

    setRangeValue({...rangeValue, min: +e.target.value});
    setExternalRange({...rangeValue});
  }

  /* ====== MAX INPUT RANGE HANDLER ====== */
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!minRef.current) return;
    if (+e.target.value <= +minRef.current.value) {
      setRangeValue({...rangeValue, max: rangeValue.min});
      return setExternalRange({...rangeValue});
    };

    setRangeValue({...rangeValue, max: +e.target.value});
    setExternalRange({...rangeValue});
  }

  /* ====== CALCULATE PROGRESS BAR WIDTH AND POSITION ====== */
  useCustomEffect(() => {
    if (!rangeProgressRef.current || !progressBarRef.current || !maxRef.current || !minRef.current) return;

    const maxValue = +maxRef.current.value;
    const minValue = +minRef.current.value;

    const totalRange = +maxRef.current.max - +minRef.current.min;
    const valueRange = maxValue - minValue;
    const width = valueRange / totalRange * 100;
    const offsetX = ((minValue - +minRef.current.min) / totalRange) * 100;

    progressBarRef.current.style.width = `${width}%`;
    progressBarRef.current.style.left = `${offsetX}%`

  }, [rangeValue.max, rangeValue.min, max])
 
  return (
    <div className="range-slider">
      <div className="slider">
        <input 
          ref={minRef} 
          type="range" 
          className='min' 
          min={min} 
          max={max}
          value={rangeValue.min}
          onChange={(e) => handleMinChange(e)}
          />

        <input 
          ref={maxRef} 
          type="range" 
          className='max' 
          min={min} 
          max={max}
          value={rangeValue.max}
          onChange={(e) => handleMaxChange(e)}
          />

        <div ref={rangeProgressRef} className="range-progress">
          <div ref={progressBarRef} className="progress-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default RangeSlider;