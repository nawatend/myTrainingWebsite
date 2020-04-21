import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageUpload from '../../components/UploadFiles/ImageUpload'
import VideoUpload from '../../components/UploadFiles/VideoUpload'
import AddWorkoutSessionList from './components/AddWorkoutSessionList'
//import MaterialTable from 'material-table';
//api
import { WorkoutProgramService, WorkoutSessionService, TrainerService } from '../../services/api'

//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing(4)
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
        flexBasis: 900,
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
};

let WorkoutProgramEdit = (props) => {
    const { history } = props;
    const { id } = useParams()
    const classes = useStyles();

    const [isAuth, setIsAuth] = useState(true)
    const [loading, setLoading] = useState(true)

    const [values, setValues] = useState({
        id: undefined,
        title: 'Workout Program not found!',
        type: '',
        selectedWorkoutSessionOptionValue: 0,
        selectedWorkoutSession: 0,
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        trainerId: 0,
    })

    const [workoutSessions, setWorkoutSessions] = useState([])
    const [addWorkoutSessions, setAddWorkoutSessions] = useState([])

    const selections = {
        types:
            [
                {
                    value: '',
                    label: ''
                },
                {
                    value: 'muscle',
                    label: 'Build Muscle'
                },
                {
                    value: 'stamina',
                    label: 'Increase Stamina'
                },
                {
                    value: 'strength',
                    label: 'Build Strength'
                },
                {
                    value: 'fat',
                    label: 'Burn Fat'
                }
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
        , addWorkoutSession: [
            {
                value: '',
                label: ''
            },
            {
                value: 4,
                label: '4 Workout Session',
                type: 'reps',
                muscleLevel: 5,
                cardioLevel: 2


            },
            {
                value: 8,
                label: '8 Workout Session',
                type: 'time',
                muscleLevel: 2,
                cardioLevel: 4
            },
            {
                value: 9,
                label: '9 Workout Session',
                type: 'reps',
                muscleLevel: 4,
                cardioLevel: 2
            },
            {
                value: 11,
                label: '11 Workout Session',
                type: 'reps',
                muscleLevel: 5,
                cardioLevel: 3
            },
            {
                value: 55,
                label: '55 Workout Session',
                type: 'time',
                muscleLevel: 3,
                cardioLevel: 2
            }
        ]
    }

    useEffect(() => {
        if (isAuth) {
            TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
                .then((res) => {
                    console.log('Trainer Id: ' + res.id)
                    setValues(values => ({
                        ...values,
                        trainerId: res.id
                    }));
                }).catch((e) => console.log('trainer not found'))
        }
    }, [isAuth])



    useEffect(() => {
        if (loading) {
            WorkoutProgramService.getWorkoutProgramById(id)
                .then((res) => {
                    console.log(res)
                    setValues({
                        ...values, ...res, trainerId: res.trainer.id, values: {
                            title: res.title,
                            type: res.type,
                        }
                    })
                }).catch(error => {
                    console.log(error)
                    history.push('/workoutprograms')
                })
        }
    }, [])


    useEffect(() => {
        if (loading) {
            WorkoutSessionService.getWorkoutSessionsByAvailable()
                .then((res) => {
                    console.log(res)
                    setWorkoutSessions([{ title: '', id: '' }, ...res])
                    //setValues({ ...values, ...data })
                }).catch(error => {
                    console.log(error)
                    history.push('/workoutprograms')
                })
        }
    }, [values.trainerId])



    useEffect(() => {
        if (loading) {
            WorkoutSessionService.getWorkoutSessionsByWorkoutProgram(id)
                .then((res) => {
                    //setValues({ ...values, ...data, exerciseFulls: [...exerciseFulls] })

                    setAddWorkoutSessions(res)
                }).catch(error => {
                    console.log(error)
                    history.push('/workoutprograms')
                })
        }
    }, [])





    useEffect(() => {
        const errors = validate(values.values, schema);

        setValues(values => ({
            ...values,
            isValid: errors ? false : true,
            errors: errors || {}
        }));

        console.log('workout program')

    }, [values.values]);


    const addWorkoutSessionToWorkoutProgram = (e) => {

        e.preventDefault()

        console.log(addWorkoutSessions.findIndex(x => x.id === values.selectedWorkoutSession.id))
        if (addWorkoutSessions.findIndex(x => x.id === values.selectedWorkoutSession.id) === -1) {
            let newData = [...addWorkoutSessions]
            newData.push(values.selectedWorkoutSession)
            setAddWorkoutSessions(newData)
        } else {
            console.log('session already exist')
        }
    }

    const deleteWorkoutSession = (e, id) => {
        e.preventDefault()
        addWorkoutSessions.forEach((workoutSession, i) => {
            if (parseInt(workoutSession.id) === parseInt(id)) {
                let newArr = [...addWorkoutSessions]
                if (i > -1) {
                    newArr.splice(i, 1)
                    setAddWorkoutSessions(newArr)
                }
            }
        });
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


    const handleChangeSelect = (event) => {
        event.persist();

        setValues({
            ...values,
            selectedWorkoutSession: workoutSessions[event.target.value],
            selectedWorkoutSessionOptionValue: event.target.value
        })
    }

    const handleBack = () => {
        history.goBack();
    };

    const handleSubmit = event => {
        event.preventDefault();

        let bodyUpdate = {
            title: values.title,
            type: values.type,
            workoutProgramId: id,
            workoutSessions: addWorkoutSessions
        }

        let bodyCreate = {
            trainerId: values.trainerId,
            title: values.title,
            type: values.type,
            workoutSessions: addWorkoutSessions
        }

        //WorkoutProgramService.createWorkoutProgram(data)

        if (id === undefined) {
            WorkoutProgramService.createWorkoutProgram(bodyCreate)
                .then((res) => {
                    console.log(res)
                    history.push("/workoutprograms")
                }).catch((e) => console.log('failed saved'))
        } else {
            console.log("updated")
            WorkoutProgramService.updateWorkoutProgram(bodyUpdate)
                .then((res) => {
                    console.log(res)
                    history.push("/workoutprograms")
                }).catch((e) => console.log('failed saved'))
        }
    };

    const hasError = field =>
        values.touched[field] && values.errors[field] ? true : false;

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
                                onSubmit={handleSubmit}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Create New Workout Program
                            </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Fill detail of new workout program
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
                                    value={values.values.title || ''}
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

                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Add Workout Session To This Workout Session
                            </Typography>

                                {/* //list of added workout session */}
                                <AddWorkoutSessionList workoutSessions={addWorkoutSessions} deleteWorkoutSession={deleteWorkoutSession} />
                                {/* end of list of workout session */}

                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Select Workout Session"
                                            margin="dense"
                                            name="selectedWorkoutSession"
                                            onChange={handleChangeSelect}
                                            required
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={values.selectedWorkoutSessionOptionValue}
                                            variant="outlined"
                                        >
                                            {workoutSessions.map((option, id) => (
                                                <option
                                                    key={id}
                                                    value={id}
                                                >
                                                    {option.title} - {option.type}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        sm={12}
                                        xs={6}
                                    >
                                        <Button
                                            className={classes.signUpButton}
                                            color="primary"
                                            //disabled={!values.isValid}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="outlined"
                                            onClick={(e) => addWorkoutSessionToWorkoutProgram(e)}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!values.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    SAVE Workout Session
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


export default withRouter(WorkoutProgramEdit);