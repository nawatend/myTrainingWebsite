import { Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import ImageUpload from '../../components/UploadFiles/ImageUpload';
import VideoUpload from '../../components/UploadFiles/VideoUpload';
//api
import { ExerciseBaseService, TrainerService } from '../../services/api';
//jwt authen
import { getTrainerIdFromJWT, isJWTValid } from '../../utils/jwt';



const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    },
    deleteButton: {
        color: theme.palette.error.main,
        margin: theme.spacing(2, 0)
    }
}));

const schema = {
    title: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    type: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },

    // password: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     length: {
    //         maximum: 128
    //     }
    // },
    // policy: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     checked: true
    // }
};

let ExerciseEdit = (props) => {
    const { history } = props;

    const classes = useStyles();
    const { id } = useParams()
    const [isAuth, setIsAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        id: '',
        title: 'Nawang',
        type: '',
        imageName: '',
        videoName: '',
        cardioLevel: 0,
        muscleLevel: 0,
        description: 'Descriot',
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        trainerId: '-'
    })

    const selections = {
        types:
            [
                {
                    value: '',
                    label: ''
                },
                {
                    value: 'reps',
                    label: 'Repetition based'
                },
                {
                    value: 'time',
                    label: 'Time based'
                },


            ]
        , levels: [{
            value: 0,
            label: '0 Level'
        },
        {
            value: 1,
            label: '1 Level'
        },
        {
            value: 2,
            label: '2 Level'
        },
        {
            value: 3,
            label: '3 Level'
        },
        {
            value: 4,
            label: '4 Level'
        },
        {
            value: 5,
            label: '5 Level'
        }


        ]
    }


    useEffect(() => {
        setIsAuth(isJWTValid())
    }, [isAuth])


    useEffect(() => {
        const errors = validate(values.values, schema);
        setValues(values => ({
            ...values,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [values.values]);


    //get once data from db
    useEffect(() => {
        if (id !== undefined) {
            if (loading) {
                ExerciseBaseService.getExerciseBaseById(id)
                    .then((res) => {
                        setValues({
                            ...values, ...res, values: {
                                description: res.description,
                                type: res.type,
                                title: res.title
                            }, trainerId: res.trainer.id
                        })
                        setLoading(false)
                        console.log(res)
                    }).catch(error => {
                        console.log(error)
                        history.push('/exercises')
                    })
            }
        }
    }, [values])

    useEffect(() => {
        if (isAuth) {
            TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
                .then((res) => {
                    console.log(res)
                    setValues(values => ({
                        ...values,
                        trainerId: res.id
                    }));
                }).catch((e) => console.log('trainer not found'))
        }
    }, [isAuth])

    const handleImage = (publicId) => {
        setValues({
            ...values,
            imageName: publicId
        })
    }

    const handleVideo = (publicId) => {
        setValues({
            ...values,
            videoName: publicId
        })
    }

    const handleChange = event => {
        event.persist();

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });

        setValues(values => ({
            ...values,
            values: {
                ...values.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...values.touched,
                [event.target.name]: true
            }
        }));
    };

    const saveExercise = async (e) => {
        e.preventDefault()
        //ExerciseService
        ExerciseBaseService.createExerciseBase(values)
            .then((res) => {
                console.log(res)
                history.push("/exercises")
            }).catch((e) => console.log('failed saved'))

    }

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = event => {
        event.preventDefault();
        history.push('/');
    };

    const hasError = field =>
        values.touched[field] && values.errors[field] ? true : false;

    if (!isAuth) {
        return (
            <Redirect to='/sign-in' />
        )
    } else {

        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                >
                    <Grid
                        className={classes.content}
                        item
                        lg={7}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <div className={classes.contentHeader}>
                                <IconButton onClick={handleBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </div>
                            <div className={classes.contentBody}>
                                <form
                                    className={classes.form}

                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        Create new exercise
                            </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Fill detail of new exercise
                            </Typography>
                                    <TextField
                                        className={classes.textField}
                                        error={hasError('title')}
                                        fullWidth
                                        helperText={
                                            hasError('title') ? values.errors.title[0] : null
                                        }
                                        label="Title"
                                        name="title"
                                        onChange={handleChange}
                                        type="text"
                                        value={values.title || ''}
                                        variant="outlined"
                                        required
                                    />

                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Select Type"
                                        margin="dense"
                                        name="type"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.type}
                                        variant="outlined"
                                    >
                                        {selections.types.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>

                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Select Cardio Level"
                                        margin="dense"
                                        name="cardioLevel"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.cardioLevel}
                                        variant="outlined"
                                    >
                                        {selections.levels.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>

                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Select Muscle Level"
                                        margin="dense"
                                        name="muscleLevel"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.muscleLevel}
                                        variant="outlined"
                                    >
                                        {selections.levels.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>

                                    {/* <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Main Information of exercise
                            </Typography> */}

                                    {/* {values.type === 'time' ?
                                    (<TextField
                                        className={classes.textField}
                                        error={hasError('time')}
                                        fullWidth
                                        helperText={
                                            hasError('time') ? values.errors.type[0] : null
                                        }
                                        label="Time in min"
                                        name="time"
                                        onChange={handleChange}
                                        type="number"
                                        value={values.values.time || ''}
                                        variant="outlined"
                                    />)
                                    : (

                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                sm={4}
                                                xs={6}
                                            >
                                                <TextField
                                                    className={classes.textField}
                                                    error={hasError('repetition')}
                                                    helperText={
                                                        hasError('repetition') ? values.errors.type[0] : null
                                                    }
                                                    label="Repetition"
                                                    name="repetition"
                                                    onChange={handleChange}
                                                    type="number"
                                                    value={values.values.repetition || ''}
                                                    variant="outlined"
                                                    required
                                                />

                                            </Grid>
                                            <Grid
                                                item
                                                sm={4}
                                                xs={6}
                                            >
                                                <TextField
                                                    className={classes.textField}
                                                    error={hasError('set')}

                                                    helperText={
                                                        hasError('set') ? values.errors.type[0] : null
                                                    }
                                                    label="Sets"
                                                    name="set"
                                                    onChange={handleChange}
                                                    type="number"
                                                    value={values.values.set || ''}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>

                                            <Grid
                                                item
                                                sm={4}
                                                xs={6}
                                            >
                                                <TextField
                                                    className={classes.textField}
                                                    error={hasError('kg')}

                                                    helperText={
                                                        hasError('kg') ? values.errors.type[0] : null
                                                    }
                                                    label="Kilograms"
                                                    name="kg"
                                                    onChange={handleChange}
                                                    type="number"
                                                    value={values.values.kg || ''}
                                                    variant="outlined"
                                                    required
                                                />
                                            </Grid>
                                        </Grid>

                                    )
                                } */}

                                    <TextField
                                        className={classes.textField}
                                        error={hasError('description')}
                                        fullWidth
                                        helperText={
                                            hasError('description') ? values.errors.description[0] : null
                                        }
                                        label="Description"
                                        name="description"
                                        onChange={handleChange}
                                        type="text"
                                        value={values.description || ''}
                                        variant="outlined"
                                        multiline
                                        rows="6"
                                    />


                                    <Typography
                                        className={classes.title}
                                        variant="h4"
                                    >
                                        Upload Files
                            </Typography>
                                    <ImageUpload onChange={handleImage} image={values.imageName} />
                                    <VideoUpload onChange={handleVideo} video={values.videoName} />

                                    <Button
                                        className={classes.signUpButton}
                                        color="primary"
                                        disabled={!values.isValid}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={(e) => saveExercise(e)}
                                    >
                                        SAVE EXERCISE
                    </Button>
                                    {id !== undefined &&
                                        <Button
                                            className={classes.deleteButton}
                                            color="warning"
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                        >
                                            Delete
                                </Button>
                                    }

                                </form>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div >
        );
    }
}


export default withRouter(ExerciseEdit);