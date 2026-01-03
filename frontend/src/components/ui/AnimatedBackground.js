import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Children,
    cloneElement,
    useEffect,
    useState,
    useId,
} from 'react';
import './AnimatedBackground.css';

export default function AnimatedBackground({
    children,
    defaultValue,
    onValueChange,
    className,
    transition,
    enableHover = false,
}) {
    const [activeId, setActiveId] = useState(null);
    const uniqueId = useId();

    const handleSetActiveId = (id) => {
        setActiveId(id);

        if (onValueChange) {
            onValueChange(id);
        }
    };

    useEffect(() => {
        if (defaultValue !== undefined) {
            setActiveId(defaultValue);
        }
    }, [defaultValue]);

    return Children.map(children, (child, index) => {
        const id = child.props['data-id'];

        const interactionProps = enableHover
            ? {
                onMouseEnter: () => handleSetActiveId(id),
                onMouseLeave: () => handleSetActiveId(null),
            }
            : {
                onClick: () => handleSetActiveId(id),
            };

        return cloneElement(
            child,
            {
                key: index,
                className: cn('animated-bg-container', child.props.className),
                'aria-selected': activeId === id,
                'data-checked': activeId === id ? 'true' : 'false',
                ...interactionProps,
            },
            <>
                <AnimatePresence initial={false}>
                    {activeId === id && (
                        <motion.div
                            layoutId={`background-${uniqueId}`}
                            className={cn('animated-bg-indicator', className)}
                            transition={transition}
                            initial={{ opacity: defaultValue ? 1 : 0 }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        />
                    )}
                </AnimatePresence>
                <div className='animated-bg-content'>{child.props.children}</div>
            </>
        );
    });
}
