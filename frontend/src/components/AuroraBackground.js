import React from 'react';
import './AuroraBackground.css';

export const AuroraBackground = ({
    className,
    children,
    header,
    showRadialGradient = true,
    ...props
}) => {
    return (
        <main className={`aurora-main ${className || ''}`} {...props}>
            <div className="aurora-bg-container">
                <div
                    className={`aurora-effect ${showRadialGradient ? 'aurora-radial-mask' : ''}`}
                ></div>
            </div>
            {header}
            <div className="auth-content-wrapper">
                {children}
            </div>
        </main>
    );
};
