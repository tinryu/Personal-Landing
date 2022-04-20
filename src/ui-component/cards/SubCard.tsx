import React, { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

type Propps = {
    children?: React.ReactNode,
    content?: boolean,
    contentClass?: string,
    darkTitle?: boolean,
    secondary?: React.ReactNode | string | object,
    sx?: object,
    contentSX?: object,
    title?: React.ReactNode | string | object,
    others?: any,
};
export type Ref = HTMLButtonElement;
const SubCard = forwardRef<Ref, Propps>((props, ref) => {
    const theme: any = useTheme();

    return (
        <Card 
            ref={ref}
            sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                },
                ...props.sx
            }}
            {...props.others}
        >
                
            {/* card header and action */}
            {!props.darkTitle && props.title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{props.title}</Typography>} action={props.secondary} />}
            {props.darkTitle && props.title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{props.title}</Typography>} action={props.secondary} />}
            {/* content & header divider */}
            {props.title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                />
            )}
            {/* card content */}
            {props.content && (
                <CardContent sx={{ p: 2.5, ...props.contentSX }} className={props.contentClass || ''}>
                    {props.children}
                </CardContent>
            )}
            {!props.content && props.children}
        </Card>
    );
});

export default SubCard;
