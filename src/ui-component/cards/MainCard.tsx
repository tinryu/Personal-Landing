import { forwardRef, Props } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

type Propps = {
    border: boolean,
    boxShadow: boolean,
    children: React.ReactNode,
    content: boolean,
    contentClass: string,
    contentSX: object,
    darkTitle: boolean,
    secondary: React.ReactNode | string | object,
    shadow: string,
    sx: object,
    title: React.ReactNode | string | object
    others: any
};
export type Ref = HTMLButtonElement;
const MainCard = forwardRef<Ref, Propps>((props,ref) => {
    const theme: any = useTheme();
    return (
        <Card
            ref={ref}
            {...props.others}
            sx={{
                border: props.border ? '1px solid' : 'none',
                borderColor: theme.palette.primary[200] + 75,
                ':hover': {
                    boxShadow: props.boxShadow ? props.shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                },
                ...props.sx
            }}
        >
            {/* card header and action */}
            {!props.darkTitle && props.title && <CardHeader sx={headerSX} title={props.title} action={props.secondary} />}
            {props.darkTitle && props.title && (
                <CardHeader sx={headerSX} title={<Typography variant="h3">{props.title}</Typography>} action={props.secondary} />
            )}

            {/* content & header divider */}
            {props.title && <Divider />}

            {/* card content */}
            {props.content && (
                <CardContent sx={props.contentSX} className={props.contentClass}>
                    {props.children}
                </CardContent>
            )}
            {!props.content && props.children}
        </Card>
    );
    }
);

export default MainCard;
