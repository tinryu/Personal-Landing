import { PropsWithChildren } from "react";
// material-ui
import { useTheme } from '@mui/material/styles';
import MuiAvatar from '@mui/material/Avatar';

// ==============================|| AVATAR ||============================== //
type Avatar = PropsWithChildren<{
    alt?: string,
    target?: string,
    href?: string,
    className?: string,
    color?: string,
    outline?: boolean,
    size?: string,
    sx?: object,
    // others: any,
}>;
const Avatar: React.FC<Avatar> = (props) => {
    const theme: any = useTheme();

    const colorSX = props.color && !props.outline && { color: theme.palette.background.paper, bgcolor: `${props.color}.main` };
    const outlineSX = props.outline && {
        color: props.color ? `${props.color}.main` : `primary.main`,
        bgcolor: theme.palette.background.paper,
        border: '2px solid',
        borderColor: props.color ? `${props.color}.main` : `primary.main`
    };
    let sizeSX = {};
    switch (props.size) {
        case 'badge':
            sizeSX = {
                width: theme.spacing(3.5),
                height: theme.spacing(3.5)
            };
            break;
        case 'xs':
            sizeSX = {
                width: theme.spacing(4.25),
                height: theme.spacing(4.25)
            };
            break;
        case 'sm':
            sizeSX = {
                width: theme.spacing(5),
                height: theme.spacing(5)
            };
            break;
        case 'lg':
            sizeSX = {
                width: theme.spacing(9),
                height: theme.spacing(9)
            };
            break;
        case 'xl':
            sizeSX = {
                width: theme.spacing(10.25),
                height: theme.spacing(10.25)
            };
            break;
        case 'md':
            sizeSX = {
                width: theme.spacing(7.5),
                height: theme.spacing(7.5)
            };
            break;
        default:
            sizeSX = {};
    }

    return <MuiAvatar sx={{ ...colorSX, ...outlineSX, ...sizeSX, ...props.sx }}/>;
};

export default Avatar;
