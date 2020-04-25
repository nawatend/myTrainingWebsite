import { Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import ImageUpload from '../../components/UploadFiles/ImageUpload';
//import MaterialTable from 'material-table';
//api
import { ExerciseBaseService, ExerciseFullService, TrainerService, WorkoutSessionService } from '../../services/api';
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt';
import AddExerciseList from './components/AddExerciseList';



const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,

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
    muscleLevel: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    cardioLevel: {
        presence: { allowEmpty: false, message: 'is required' },
    }
};

let WorkoutSessionEdit = (props) => {
    const { history } = props;

    const classes = useStyles();
    const { id } = useParams()
    const [isAuth, setIsAuth] = useState(true)
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        id: -21321,
        title: 'no-title',
        type: '',
        imageName: '',
        cardioLevel: 0,
        muscleLevel: 0,
        time: 0,
        repetition: 0,
        set: 0,
        kg: 0,
        selectedExerciseOptionValue: 0,
        selectedExerciseBase: 0,
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        trainerId: null,
        workoutProgramId: 0,
        free: false

    })

    const [exerciseBases, setExerciseBases] = useState([])
    const [exerciseFulls, setExerciseFulls] = useState([])


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
        , exercises: [
            {
                value: '',
                label: ''
            },
            {
                value: 1,
                label: '1 Exercise',
                type: 'reps'


            },
            {
                value: 2,
                label: '2 Exercise',
                type: 'time'
            },
            {
                value: 3,
                label: '3 Exercise',
                type: 'reps'
            },
            {
                value: 4,
                label: '4 Exercise',
                type: 'reps'
            },
            {
                value: 5,
                label: '5 Exercise',
                type: 'time'
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
            ExerciseBaseService.getExerciseBasesByTrainer(values.trainerId)
                .then((res) => {
                    console.log(res)
                    setExerciseBases([{ title: '', id: '' }, ...res])
                }).catch((e) => console.log('bases not found'))
        }
    }, [values.trainerId])

    useEffect(() => {
        if (loading) {
            ExerciseFullService.getExerciseFullsByWorkoutSession(id)
                .then((exerciseFulls) => {
                    //setValues({ ...values, ...data, exerciseFulls: [...exerciseFulls] })

                    setExerciseFulls(exerciseFulls)
                }).catch(error => {
                    console.log(error)
                    history.push('/workoutsessions')
                })
        }
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            if (loading) {
                WorkoutSessionService.getWorkoutSessionById(id)
                    .then((res) => {
                        console.log(res)
                        setValues({
                            ...values, ...res, trainerId: res.trainer.id, values: {
                                title: res.title,
                                type: res.type,
                                muscleLevel: res.muscleLevel,
                                cardioLevel: res.cardioLevel
                            }
                        })
                    })
            }
        }
    }, [])


    useEffect(() => {
        const errors = validate(values.values, schema);

        setValues(values => ({
            ...values,
            isValid: errors ? false : true,
            errors: errors || {}
        }));

    }, [values.values]);


    const addExerciseToWorkoutSession = (e) => {

        e.preventDefault()

        let newExercise = {
            //all new exercise will get -1 for temp
            id: -1
            , sets: parseInt(values.set)
            , reps: parseInt(values.repetition)
            , kg: parseInt(values.kg)
            , time: parseInt(values.time)
            , exerciseBase: { ...values.selectedExerciseBase }
        }

        console.log(newExercise)
        let newData = [...exerciseFulls]
        newData.push(newExercise)
        setExerciseFulls(newData)
    }

    const deleteExercise = (e, id) => {
        e.preventDefault()
        exerciseFulls.forEach((exercise, i) => {


            if (parseInt(exercise.id) === parseInt(id)) {
                console.log('deleted')
                let newArr = [...exerciseFulls]
                if (i > -1) {
                    newArr.splice(i, 1)
                    setExerciseFulls(newArr)
                }
            } else {
                console.log('not deleted')
            }
        });
    }

    const handleImage = (publicId) => {
        setValues({
            ...values,
            imageName: publicId
        })
    }

    const handleVideo = (publicId) => {
        setValues({
            ...values,
            videoPath: publicId
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

    const handleChangeSelect = (event) => {
        event.persist();
        console.log(event.target.value)
        setValues({
            ...values,
            selectedExerciseBase: exerciseBases[event.target.value],
            selectedExerciseOptionValue: event.target.value
        })
    }

    const saveWorkoutSession = async (e) => {
        e.preventDefault()
        //TODO save workout session to db
        //TODO change trainerId and workoutProgramId


        let bodyUpdate = {
            workoutSessionId: id,
            trainerId: values.trainerId,
            title: values.title,
            type: values.type,
            muscleLevel: values.muscleLevel,
            cardioLevel: values.cardioLevel,
            imageName: values.imageName,
            //workoutProgramId: 4,
            exerciseBaseIds: exerciseFulls,
            free: (values.free === "true") ? true : false
        }

        let bodyCreate = {

            trainerId: values.trainerId,
            title: values.title,
            type: values.type,
            muscleLevel: values.muscleLevel,
            cardioLevel: values.cardioLevel,
            imageName: values.imageName,
            exerciseBaseIds: exerciseFulls,
            free: (values.free === "true") ? true : false
        }

        if (id === undefined) {
            WorkoutSessionService.createWorkoutSession(bodyCreate)
                .then((res) => {
                    console.log(res)
                    history.push("/workoutsessions")
                }).catch((e) => console.log('failed saved'))
        } else {
            WorkoutSessionService.updateWorkoutSession(bodyUpdate)
                .then((res) => {
                    console.log(res)
                    history.push("/workoutsessions")
                }).catch((e) => console.log('failed saved'))
        }
        //WorkoutSessionService.createWorkoutSession(data)
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
                                onSubmit={handleSignUp}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Create New Workout Wession
                            </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Fill detail of new workout session
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
                                    label="Free to use?"
                                    margin="dense"
                                    name="free"
                                    onChange={handleChange}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={values.free}
                                    variant="outlined"
                                >

                                    <option
                                        key={true}
                                        value={true}
                                    >
                                        Yes
                                    </option>
                                    <option
                                        key={false}
                                        value={false}
                                    >
                                        Not today
                                    </option>
                                </TextField>


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
                                    value={values.values.cardioLevel}
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

                                    fullWidth
                                    label="Select Muscle Level"
                                    margin="dense"
                                    name="muscleLevel"
                                    onChange={handleChange}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={values.values.muscleLevel}
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


                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Upload Cover Image
                            </Typography>
                                <ImageUpload onChange={handleImage} image={values.imageName} />


                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Add Exercises To This Workout Session
                            </Typography>

                                {/* //list of added exercise */}
                                <AddExerciseList exerciseFulls={exerciseFulls} deleteExercise={deleteExercise} />
                                {/* end of list of added exercise */}

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
                                            label="Select Exercise"
                                            margin="dense"
                                            name="selectedExercise"
                                            onChange={handleChangeSelect}
                                            required
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={values.selectedExerciseOptionValue}
                                            variant="outlined"
                                        >
                                            {exerciseBases.map((exercise, i) => (
                                                <option
                                                    key={exercise.id}
                                                    value={i}
                                                >
                                                    {exercise.title}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        {values.selectedExerciseBase.type === 'time' ?
                                            (<TextField
                                                className={classes.textField}
                                                //error={hasError('time')}
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
                                                            //error={hasError('repetition')}
                                                            helperText={
                                                                hasError('repetition') ? values.errors.type[0] : null
                                                            }
                                                            label="Repetition"
                                                            name="repetition"
                                                            onChange={handleChange}
                                                            type="number"
                                                            SelectProps={{ native: true }}
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
                                                            // error={hasError('set')}
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

                                                            // error={hasError('kg')}

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
                                        }
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
                                            onClick={(e) => addExerciseToWorkoutSession(e)}
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
                                    onClick={(e) => saveWorkoutSession(e)}
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


export default withRouter(WorkoutSessionEdit);