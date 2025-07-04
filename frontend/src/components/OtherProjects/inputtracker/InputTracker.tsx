// Displays the current input
// Shows the previous input value
// Counts the number of characters typed
// Auto-saves the input (simulated) — but only after the user stops typing for a second
// Keeps the typing fast and responsive — no unnecessary re-renders

//variables:
//input (prev, current), 
// # of characters typed in current

//save the input after user stops typing for 1 second
// no unnecessary re-renders

import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../../materialui/CustomTextField";
import CustomBox from "../../materialui/CustomBox";
import CustomButton from "../../materialui/CustomButton";

const InputTracker: React.FC = () => {
    const [inputValue, setInputValue] = useState(0);

    // Update the ref every time inputValue changes
    const prevInputRef = useRef<number | null>(null);
    useEffect(() => {
        prevInputRef.current = inputValue;
    }, [inputValue]);

    // Show the number of renders
    const renderCount = useRef(1);
    useEffect(() => {
        renderCount.current += 1;
    });

    // Show the time since the last render
    const lastRenderTime = useRef(Date.now());
    useEffect(() => {
        lastRenderTime.current = Date.now();
    });
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(e.target.value));
    };

    const handleStaleClick = () => {
        setInputValue(inputValue + 1);
        setInputValue(inputValue + 1); // uses stale value
    };
    
    const handleFunctionalClick = () => {
        setInputValue(prev => prev + 1);
        setInputValue(prev => prev + 1); // uses latest value
    };

    useEffect(() => {
        console.log("inputValue changed:", inputValue);
    }, [inputValue]);

    return (
        <CustomBox
            component="form"
            styleArray={[
                {
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 3,
                  maxWidth: 500,
                  mx: 'auto',
                  mt: 4,
                },
              ]}
        >
            <CustomTextField
                id="inputValue"
                type="inputValue"
                label="Input"
                value={inputValue}
                onChange={handleInputChange}
            />
            <p>Last Render: {new Date(lastRenderTime.current).toLocaleTimeString()}</p>
            <p>Render Count: {renderCount.current}</p>
            <p>Previous value: {prevInputRef.current}</p>
            <CustomButton onClick={handleStaleClick}>Stale +1</CustomButton>
            <CustomButton color="primary" onClick={handleFunctionalClick}>Functional +2</CustomButton>
        </CustomBox>
    );
};

export default InputTracker;
