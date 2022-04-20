import { forwardRef } from 'react';
// third-party
import { motion, useCycle } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

// type: 'slide' | 'scale' | 'rotate',
// direction: 'up' | 'down' | 'left' | 'right',
type Propps = {
    children: React.ReactNode,
    offset?: number,
    type?: string,
    direction?: string,
    scale?: any | number
};
export type Ref = HTMLDivElement;
const AnimateButton = forwardRef<Ref, Propps>((props, ref) => {
    let offset1;
    let offset2;
    switch (props.direction) {
        case 'up':
        case 'left':
            offset1 = props.offset;
            offset2 = 0;
            break;
        case 'right':
        case 'down':
        default:
            offset1 = 0;
            offset2 = props.offset;
            break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (props.type) {
        case 'rotate':
            return (
                <motion.div 
                    ref={ref}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        repeatDelay: 0
                    }}
                >
                    {props.children}
                </motion.div>
            );
        case 'slide':
            if (props.direction === 'up' || props.direction === 'down') {
                return (
                    <motion.div
                        ref={ref}
                        animate={{ y: y !== undefined ? y : '' }}
                        onHoverEnd={() => cycleY()}
                        onHoverStart={() => cycleY()}
                    >
                        {props.children}
                    </motion.div>
                );
            }
            return (
                <motion.div ref={ref} animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
                    {props.children}
                </motion.div>
            );

        case 'scale':
        default:
            if (typeof props.scale === 'number') {
                props.scale = {
                    hover: props.scale,
                    tap: props.scale
                };
            }
            return (
                <motion.div ref={ref} whileHover={{ scale: props.scale?.hover }} whileTap={{ scale: props.scale?.tap }}>
                    {props.children}
                </motion.div>
            );
    }
});
export default AnimateButton;
