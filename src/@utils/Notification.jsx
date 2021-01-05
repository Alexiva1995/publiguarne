import React from 'react';
import { useSnackbar, SnackbarProvider } from 'notistack';
import { IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';




const useStyles = makeStyles(theme=>({
    containerRoot:{
        [theme.breakpoints.down("sm")]:{
            zIndex:theme.zIndex.appBar-1,
            '& .MuiCollapse-container':{
                padding:0,
                '& .MuiCollapse-wrapper > div:first-child':{ margin:0, },
                '& .MuiSnackbar-root > div:first-child':{ borderRadius:0, },
            },
        },
    },
}));


const Notification = {
    closeSnackbar(){},
    enqueueSnackbar(){},
    build({content, action, ...props}){
        return this.enqueueSnackbar(content,{
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            action:(key)=>action(()=>this.closeSnackbar(key), key),
            ...props,
        });
    },
    message(content){
        return this.build({
            content,
            action:dimiss=>(<IconButton onClick={dimiss} color="inherit" children={<Close/>} />),
        });
    },
};


function NotificationComponent({admin}){
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    admin.closeSnackbar = closeSnackbar;
    admin.enqueueSnackbar = enqueueSnackbar;
    return null;
}
function NotificationProvider({children, ...props}){
    const classes = useStyles(),
        NotiReference = React.createRef(),
        dismiss = key=>NotiReference.current.closeSnackbar(key);
    return (<SnackbarProvider ref={NotiReference}
        dense
        maxSnack={1}
        preventDuplicate
        classes={{containerRoot:classes.containerRoot}}
        action={key=>(<IconButton color="inherit" onClick={()=>dismiss(key)} children={<Close />} />)}
        {...{anchorOrigin:{vertical:'bottom',horizontal:'left',},...props}}>
            <NotificationComponent admin={Notification} />
            {children}
    </SnackbarProvider>);
}





export default Notification
export {
    Notification,
    NotificationProvider,
};