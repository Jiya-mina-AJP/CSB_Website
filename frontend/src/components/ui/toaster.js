import React from 'react';
import { motion } from 'framer-motion';
import {
    Toaster as SonnerToaster,
    toast as sonnerToast,
} from 'sonner';
import {
    CheckCircle,
    AlertCircle,
    Info,
    AlertTriangle,
    X,
} from 'lucide-react';

import { cn } from '../../lib/utils';
import './Toaster.css';

const variantClasses = {
    default: 'toast-default',
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
};

const titleColorClasses = {
    default: 'default',
    success: 'success',
    error: 'error',
    warning: 'warning',
};

const iconColorClasses = {
    default: 'default',
    success: 'success',
    error: 'error',
    warning: 'warning',
};

const variantIcons = {
    default: Info,
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
};

const toastAnimation = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
};

// Custom toast wrapper component
const showCustomToast = ({
    title,
    message,
    variant = 'default',
    duration = 4000,
    position = 'bottom-right',
    actions,
    onDismiss,
    highlightTitle,
}) => {
    const Icon = variantIcons[variant];

    return sonnerToast.custom(
        (toastId) => (
            <motion.div
                variants={toastAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn(
                    'toast-card',
                    variantClasses[variant]
                )}
            >
                <div className="toast-content-wrapper">
                    <Icon className={cn('toast-icon h-5 w-5', iconColorClasses[variant])} />
                    <div className="toast-text-group">
                        {title && (
                            <h3
                                className={cn(
                                    'toast-title',
                                    titleColorClasses[variant],
                                    highlightTitle && 'highlight'
                                )}
                            >
                                {title}
                            </h3>
                        )}
                        {message && <p className="toast-message">{message}</p>}
                    </div>
                </div>

                <div className="toast-actions">
                    {actions?.label && (
                        <button
                            onClick={() => {
                                actions.onClick();
                                sonnerToast.dismiss(toastId);
                            }}
                            className="toast-action-btn"
                        >
                            {actions.label}
                        </button>
                    )}

                    <button
                        onClick={() => {
                            sonnerToast.dismiss(toastId);
                            onDismiss?.();
                        }}
                        className="toast-close-btn"
                        aria-label="Dismiss notification"
                    >
                        <X size={16} />
                    </button>
                </div>
            </motion.div>
        ),
        { duration, position }
    );
};

// Wrapper API to match simplified usage (title as first arg)
// This ensures toast.success('Title', { description: 'Msg'}) works correctly
export const toast = {
    success: (title, options = {}) => showCustomToast({ ...options, title, message: options.description, variant: 'success' }),
    error: (title, options = {}) => showCustomToast({ ...options, title, message: options.description, variant: 'error' }),
    warning: (title, options = {}) => showCustomToast({ ...options, title, message: options.description, variant: 'warning' }),
    info: (title, options = {}) => showCustomToast({ ...options, title, message: options.description, variant: 'default' }),
    custom: sonnerToast.custom,
    dismiss: sonnerToast.dismiss,
};

const Toaster = ({ defaultPosition = 'bottom-right' }) => {
    return (
        <SonnerToaster
            position={defaultPosition}
            // We use unstyled false (default) but override styles via CSS classes in our custom component
            // Alternatively, we can use toastOptions to strip default styles if double-styling occurs
            // Using a simple style override to reset container basics for our custom card
            toastOptions={{
                style: { background: 'transparent', border: 'none', boxShadow: 'none', padding: 0, width: 'auto' },
            }}
        />
    );
};

export default Toaster;
