import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function About({ isMinimized, isVisible, onMinimize, onClose}) {
    const container_style = {display: isMinimized ? "none" : "flex"};
    const panel_style = {display: isVisible ? "flex" : "none"};
    const nodeRef = useRef(null);
    
    return(
        <Draggable nodeRef={nodeRef} handle='.header'>
            <div ref={nodeRef} className="about-panel" style={panel_style}>
                <PanelHeader isMinimized={isMinimized} title="About" onMinimize={() => onMinimize("About Panel")} onClose={() => onClose("About Panel")}/>
                <div className="about-container" style={container_style}>
                    <p>Version 2.0 is a major redesign of a Java Applet first deployed in 2011.</p>
                    <p>Students with major contributions: Tomo Bessho, Jacob Dimmitt, Sofia Sharif, and Amanda Swearngin.</p>
                    <p>Faculty advisor: Berthe Y. Choueiry</p>
                    <p>Constraint Systems Laboratory © 2026</p>
                    <p>Supported by multiple NSF REU supplements and UNL UCARE grants.</p>
                    <div className="about-logos">
                        <img id="consystlab-logo" src='/images/consystlab-logo.png'></img>
                        <img id="nebraska-logo" src='/images/nebraska.png'></img>
                        <img id="nsf-logo" src='/images/nsf.png'></img>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default About;