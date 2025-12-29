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

import { Button } from './button';
import { cn } from '../../lib/utils';

const variantStyles = {
    default: 'bg-white border-gray-200 text-gray-900',
    success: 'bg-white border-green-600/50',
    error: 'bg-white border-red-500/50',
    warning: 'bg-white border-amber-600/50',
};

const titleColor = {
    default: 'text-gray-900',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
};

const iconColor = {
    default: 'text-gray-500',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
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

// Custom toast function
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
                    'flex items-center justify-between w-full max-w-xs p-3 rounded-xl border shadow-md bg-white',
                    variantStyles[variant]
                )}
            >
                <div className="flex items-start gap-2">
                    <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconColor[variant])} />
                    <div className="space-y-0.5">
                        {title && (
                            <h3
                                className={cn(
                                    'text-xs font-medium leading-none',
                                    titleColor[variant],
                                    highlightTitle && titleColor['success']
                                )}
                            >
                                {title}
                            </h3>
                        )}
                        <p className="text-xs text-gray-500">{message}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {actions?.label && (
                        <Button
                            variant={actions.variant || 'outline'}
                            size="sm"
                            onClick={() => {
                                actions.onClick();
                                sonnerToast.dismiss(toastId);
                            }}
                            className="h-7 text-xs px-2"
                        >
                            {actions.label}
                        </Button>
                    )}

                    <button
                        onClick={() => {
                            sonnerToast.dismiss(toastId);
                            onDismiss?.();
                        }}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-label="Dismiss notification"
                    >
                        <X className="h-3 w-3 text-gray-400" />
                    </button>
                </div>
            </motion.div>
        ),
        { duration, position }
    );
};

// Export a wrapper that mimics sonner's API but uses our custom UI
export const toast = {
    success: (message, options) => showCustomToast({ ...options, message, variant: 'success' }),
    error: (message, options) => showCustomToast({ ...options, message, variant: 'error' }),
    warning: (message, options) => showCustomToast({ ...options, message, variant: 'warning' }),
    info: (message, options) => showCustomToast({ ...options, message, variant: 'default' }),
    custom: sonnerToast.custom,
    dismiss: sonnerToast.dismiss,
};

const Toaster = ({ defaultPosition = 'bottom-right' }) => {
    return (
        <SonnerToaster
            position={defaultPosition}
            toastOptions={{ unstyled: true, className: 'flex justify-end p-4' }}
        />
    );
};

export default Toaster;
