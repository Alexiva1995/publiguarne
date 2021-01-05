import React from 'react'
import { Button, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import SoonImage from '../resources/images/soon_background.png';
import PodcastImage from '../resources/images/podcast.png';
import MessageImage from '../resources/images/message_btn.png';
import database from './../@firebase/database';
import Notification from './../@utils/Notification';


const useStyles = makeStyles(theme=>({
    root:{
        height:'100vh',
        background:`#000 url(${SoonImage}) no-repeat center /cover`,
        '& a':{color:'inherit', textDecoration:'none'},
    },
    grid:{ margin:'auto', height:'100%', },
    body:{
        maxWidth:theme.breakpoints.values.sm,
        [theme.breakpoints.down('md')]:{
            maxWidth:'calc(100% - 30px)',
        },
        '& .title':{
            color:'white',
            marginBottom:20,
            letterSpacing:0,
            fontWeight:'bold',
            textAlign:'center',
            font:'normal normal 900 60px/89px Raleway',
            [theme.breakpoints.down('md')]:{
                font:'normal normal 900 40px/89px Raleway',
            },
        },
        '& .paragraph':{
            color:'white',
            marginBottom:20,
            textAlign:'center',
            fontFamily:'Open Sans',
            fontWeight:100,
        },
        '& .subtitle':{
            color:'white',
            marginBottom:38,
            textAlign:'center',
            fontFamily:'Open Sans',
        },
        '& .form':{
            position:'relative',
            '& .MuiTextField-root': {
                flexGrow: 1,
                maxWidth:300,
                margin: theme.spacing(1),
                '& fieldset':{
                    borderRadius:25,
                },
            },
        },        
    },

    textfield:{
        fontFamily:'Times New Romans',
    },


    footer:{
        margin:'0 40px',
        marginBottom:20,
        fontFamily:'Raleway',
        '& .left':{
            display:'flex',
            justifyContent:'space-between',
            width:'calc(8.333333333333334% * 2)',
            fontSize:20,
        },
        '& .center':{
            textAlign:'center',
            position:'relative',
            '& img':{
                top: -75,
                width: 75,
                height: 75,
                position:'absolute',
                left:'calc((100% - 75px) / 2)',
            },
            [theme.breakpoints.down('sm')]:{
                top:-30,
                width:'100%',
                position:'absolute',
                '& img':{
                    top:-25,
                    width: 50,
                    height: 50,
                    left:'calc(50% - (50px / 2))',
                },
            },
        },
        '& .right':{
            textAlign:'right',
            '& > a:first-child':{ marginRight:20, },
        },
        [theme.breakpoints.down('sm')]:{
            position:'relative',
            flexDirection:'column-reverse',
            '& .MuiGrid-item':{
                width:'100%',
                marginBottom:10,
            },
            '& .left':{ marginBottom:0, },
        },
    },
}));


export default function SoonPage(){
    const classes = useStyles(),
        [ loading, setLoading ] = React.useState(null),
        [ warn, setWarn ] = React.useState(null),
        [ email, setEmail ] = React.useState(''),
        saveEmail = ()=>{
            setWarn(null);
            setLoading(false);
            if(!email.length) return;
            if(!(new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)).test(email))
                setWarn('Formato de email incorrecto');
            else{
                setWarn(null);
                setLoading(true);
                database.ref(`/subscriptors/${email.replace(/@/gi,'-').replace(/\.+/gi,'_')}`).set({
                    email,
                    emailWelcome:false,
                }).then(()=>{
                    setLoading(false)
                    setEmail('');
                    Notification.message('Te enviaremos un email pronto.');
                });
            }
        };
    

    return (<div className={classes.root}>
        <Grid container justify="center" alignItems="flex-end" className={classes.grid}>
            <Grid item sm={12} className={classes.body}>
                <Typography className='title'>PROXIMAMENTE</Typography>
                <Typography className='paragraph'>
                    ¿Eres emprendedor y quieres vender, comprar y recomendar?
                    Todo esto lo encuentras en <b>PubliGuarne</b>, tu comunidad de comerciantes en <b>Guarne.</b>
                </Typography>
                <Typography className='subtitle'>
                    ¡Escribe tu <b>email</b> aquí y súmate a la grandiosa comunidad de <b>PubliGuarne</b> para crecer juntos!
                    Aprovecha al máximo lo que traemos para ti,
                    <b>inscríbete ahora mismo</b> y te guiaremos en este <b>camino hacia tu éxito.</b>
                </Typography>
                <div className='form'>
                    <Grid container justify="center" alignItems="center">
                        <TextField className={classes.textfield} variant='outlined' focused={Boolean(warn)} disabled={loading} size="small" color={warn?'secondary':'primary'} label="Ingresa tu email" value={email} onChange={({target:{value}})=>setEmail(value)} />
                        <Button variant="contained" disabled={loading} color="primary" onClick={saveEmail}>
                            {loading?<CircularProgress size={30}/>:'enviar'}
                        </Button>
                    </Grid>
                </div>
            </Grid>


            <Grid container justify="space-between" alignItems="center" className={classes.footer}>
                <Grid item className="left">
                    <a href="/#"><i className="fab fa-youtube"></i></a>
                    <a href="https://www.facebook.com/publiGuarne/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/publiguarne/"><i className="fab fa-instagram"></i></a>
                    <a href="https://mobile.twitter.com/guarnepubli"><i className="fab fa-twitter"></i></a>
                    <a href="/#"><img alt="Podcast" src={PodcastImage} width="20px" /></a>
                </Grid>
                <Grid item className="center">
                    <img alt="Podcast" src={MessageImage} />
                </Grid>
                <Grid item className="right">
                    <a href="/#tel:+573175751142"> <i className="fas fa-phone-alt" /> +57 304 1271115 </a>
                    <a href="/#tel:+573103758197"> <i className="fas fa-phone-alt" /> +57 310 3758197 </a>
                </Grid>
            </Grid>

        </Grid>
    </div>);
}