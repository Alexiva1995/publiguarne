import { createMuiTheme } from '@material-ui/core'


export default createMuiTheme({
    palette:{
        type:'dark',
        primary:{
            light:'#52bfc1',
            main:'#27AFB2',
            dark:'#1b7a7c',
        },
    },

    overrides:{
        MuiCssBaseline:{
            '@global':{
                '.MuiButton-root':{
                    color:'#fff',
                    borderRadius:100,
                    padding:'8px 20px',
                },
            },
        },
    },

});