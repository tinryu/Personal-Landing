import { forwardRef } from 'react';

// material-ui
import { Collapse, Fade, Box, Grow, Slide, Zoom } from '@mui/material';

// ==============================|| TRANSITIONS ||============================== //
type Propps = {children: React.ReactNode, position: string, type: string, direction: string, others: any }
export type Ref = HTMLButtonElement;
const Transitions = forwardRef<Ref, Propps>((props, ref) => {
    let positionSX = {
        transformOrigin: '0 0 0'
    };

    switch (props.position) {
        case 'top-right':
            positionSX = {
                transformOrigin: 'top right'
            };
            break;
        case 'top':
            positionSX = {
                transformOrigin: 'top'
            };
            break;
        case 'bottom-left':
            positionSX = {
                transformOrigin: 'bottom left'
            };
            break;
        case 'bottom-right':
            positionSX = {
                transformOrigin: 'bottom right'
            };
            break;
        case 'bottom':
            positionSX = {
                transformOrigin: 'bottom'
            };
            break;
        case 'top-left':
        default:
            positionSX = {
                transformOrigin: '0 0 0'
            };
            break;
    }

    return (
        <Box ref={ref}>
            {props.type === 'grow' && (
                <Grow {...props.others}>
                    <Box sx={positionSX}>{props.children}</Box>
                </Grow>
            )}
            {props.type === 'collapse' && (
                <Collapse {...props.others} sx={positionSX}>
                    {props.children}
                </Collapse>
            )}
            {props.type === 'fade' && (
                <Fade
                    {...props.others}
                    timeout={{
                        appear: 500,
                        enter: 600,
                        exit: 400
                    }}
                >
                    <Box sx={positionSX}>{props.children}</Box>
                </Fade>
            )}
            {props.type === 'slide' && (
                <Slide
                    {...props.others}
                    timeout={{
                        appear: 0,
                        enter: 400,
                        exit: 200
                    }}
                    direction={props.direction}
                >
                    <Box sx={positionSX}>{props.children}</Box>
                </Slide>
            )}
            {props.type === 'zoom' && (
                <Zoom {...props.others}>
                    <Box sx={positionSX}>{props.children}</Box>
                </Zoom>
            )}
        </Box>
    );
});

Transitions.defaultProps = {
    type: 'grow',
    position: 'top-left',
    direction: 'up'
};

export default Transitions;
