import {useEffect, useRef} from "react";

function BindKeyToComponent(keyPressed, callbackFunction) {
	
	const callbackRef = useRef(callbackFunction);
	useEffect(() => { callbackRef.current = callbackFunction; });
	
	useEffect(() => {
		function handle(e) {
            // supports multiple key binds per component
            for(let i = 0; i < keyPressed.length; i++) {
                if(e.code === keyPressed[i]) { callbackRef.current(e); }
            }
		} 
	document.addEventListener("keypress", handle);
	return () => document.removeEventListener("keypress", handle);
    }, [keyPressed]);
    
}

export default BindKeyToComponent;