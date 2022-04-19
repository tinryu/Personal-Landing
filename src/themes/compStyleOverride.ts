/**
 * MUI Components whose styles are override as per theme
 * @param {JsonObject} theme Plain Json Object
 */

export function componentStyleOverrides(theme: any): { MuiButton: { styleOverrides: { root: { fontWeight: number; textTransform: string; borderRadius: string; }; }; }; MuiPaper: { defaultProps: { elevation: number; }; styleOverrides: { root: { backgroundImage: string; }; rounded: { borderRadius: string; }; }; }; MuiCardHeader: { styleOverrides: { root: { color: any; padding: string; }; title: { fontSize: string; }; }; }; MuiCardContent: { styleOverrides: { root: { padding: string; }; }; }; MuiCardActions: { styleOverrides: { root: { padding: string; }; }; }; MuiListItemButton: { styleOverrides: { root: { color: any; paddingTop: string; paddingBottom: string; '&.Mui-selected': { color: any; backgroundColor: any; '&:hover': { backgroundColor: any; }; '& .MuiListItemIcon-root': { color: any; }; }; '&:hover': { backgroundColor: any; color: any; '& .MuiListItemIcon-root': { color: any; }; }; }; }; }; MuiListItemIcon: { styleOverrides: { root: { color: any; minWidth: string; }; }; }; MuiListItemText: { styleOverrides: { primary: { color: any; }; }; }; MuiInputBase: { styleOverrides: { input: { color: any; '&::placeholder': { color: any; fontSize: string; }; }; }; }; MuiOutlinedInput: { styleOverrides: { root: { background: any; borderRadius: string; '& .MuiOutlinedInput-notchedOutline': { borderColor: any; }; '&:hover $notchedOutline': { borderColor: any; }; '&.MuiInputBase-multiline': { padding: number; }; }; input: { fontWeight: number; background: any; padding: string; borderRadius: string; '&.MuiInputBase-inputSizeSmall': { padding: string; '&.MuiInputBase-inputAdornedStart': { paddingLeft: number; }; }; }; inputAdornedStart: { paddingLeft: number; }; notchedOutline: { borderRadius: string; }; }; }; MuiSlider: { styleOverrides: { root: { '&.Mui-disabled': { color: any; }; }; mark: { backgroundColor: any; width: string; }; valueLabel: { color: any; }; }; }; MuiDivider: { styleOverrides: { root: { borderColor: any; opacity: number; }; }; }; MuiAvatar: { styleOverrides: { root: { color: any; background: any; }; }; }; MuiChip: { styleOverrides: { root: { '&.MuiChip-deletable .MuiChip-deleteIcon': { color: string; }; }; }; }; MuiTooltip: { styleOverrides: { tooltip: { color: any; background: any; }; }; }; } {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    borderRadius: '4px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: theme.customization.borderRadius + 'px'
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors.textDark,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme.menuSelectedBack,
                        '&:hover': {
                            backgroundColor: theme.menuSelectedBack
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected
                        }
                    },
                    '&:hover': {
                        backgroundColor: theme.menuSelectedBack,
                        color: theme.menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: theme.colors.grey50,
                    borderRadius: theme.customization.borderRadius + 'px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors.grey400
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors.primaryLight
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: theme.colors.grey50,
                    padding: '15.5px 14px',
                    borderRadius: theme.customization.borderRadius + 'px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: theme.customization.borderRadius + 'px'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme.colors.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.colors.primaryDark,
                    background: theme.colors.primary200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.paper,
                    background: theme.colors.grey700
                }
            }
        }
    };
}
