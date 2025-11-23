import { useEffect, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/CustomWorkoutPlans.css"
import { flushSync } from "react-dom";
import Input from "../../components/Input";
import List from "../../components/List";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import WorkoutCard from "../../components/workoutCard";
import { useGetUserDetailsQuery } from "../../features/api/UserApi";
import Notification from "../../components/ToastNotification";
import { useContext } from "react";
import MyContext from "../../../public/utils/MyContext";
import BannerContext from "../../../public/utils/BannerContext";

import { useUpdateUserActiveWorkoutPlanMutation, useAddWorkoutRoutinMutation, useGetUserWorkoutRoutinQuery, useDeleteRoutineMutation, useUpdateWorkoutRoutinMutation } from "../../features/api/WorkoutApi";
export default function CustomWorkoutPlan({ setNotActive }) {
    const navigate = useNavigate();
    const [IsCustomWorkout, setIsCustomWorkout] = useState(false)
    const [selectedday, setselectedday] = useState('')
    // const [selecteddays, setselecteddays] = useState([])
    const [CreateWorkoutPlan, setCreateWorkoutPlan] = useState(false)
    // const CreateWorkoutPlanuseref = useRef(false)
    const [exercise, setexercise] = useState("")
    const [PlanCreatedSuccessfully, setPlanCreatedSuccessfully] = useState(false)
    const [PlanEditSuccessfully, setPlanEditSuccessfully] = useState(false)

    const [addWorkoutRoutine, { data, error: errorAddingWorkout, isLoading, isSuccess }] = useAddWorkoutRoutinMutation();
    const [UpdateUserActivePlan, { data: ActivePlan, error: Updatingerror, isLoading: ActivePlanLoading, isSuccess: PlanChanged }] = useUpdateUserActiveWorkoutPlanMutation();
    const [DeleteRoutinMutation, { data: deleteroutin, error: errordeleting, isSuccess: DataDeleted }] = useDeleteRoutineMutation();
    // const [UpdateRoutin, { data: UpdatedRoutin, isSuccess: RoutinUpdated }] = useUpdateWorkoutRoutinMutation();
    const { data: GetExerciseData, refetch, error: errorgettingworkout, isError, isSuccess: dataFetched } = useGetUserWorkoutRoutinQuery();
    // let navigate=useNavigate();
    const { data: GetUserDetail, error: ErrorLoadingUserDetails, isSuccess: LoadingUserDetailSuccessfull,refetch:RefetchGetUserDetail } = useGetUserDetailsQuery({ Id: null });
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
    }, [])

    console.log('GetExerciseData', GetExerciseData)
    let daysarr = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']
    const {
        ShowNotification,
        setShowNotification,
        NotificatonType,
        setNotificatioinType,
        NotificationMessage,
        setNotificationMessage,
        selecteddays,
        setselecteddays,

    } = useContext(MyContext);

    const {
        bannerText, setbannerText, useDiffBannerText, setuseDiffBannerText

    } = useContext(BannerContext);
    useEffect(() => {

        console.log("selecteddays", selecteddays)
    }, [selecteddays])

    useEffect(() => {
        if (PlanChanged == true) {
            refetch()
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Custom Plan Activated')
            RefetchGetUserDetail ()

        }

    }, [PlanChanged])
    useEffect(() => {

        if (DataDeleted == true) {
            setIsCustomWorkout(false)

            // refetch()
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Data Deleted Successfully')
        }


    }, [DataDeleted])
    useEffect(() => {
        console.log('GetUserDetail', GetUserDetail?.Detail[0]?.planName)
    }, [GetUserDetail])
    useEffect(() => {
        if (isSuccess == true) {
            refetch()
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Plan Created Successfully')
        }


    }, [isSuccess])
    // useEffect(() => {
    //     console.log('PlanChanged ', PlanChanged)
    //     if (PlanChanged == true) {
    //         refetch()

    //         // setPlanEditSuccessfully(true)
    //     }
    // }, [PlanChanged])

    useEffect(() => {
        console.log('GetExerciseData?.result', GetExerciseData?.result)
        console.log('formData', formData)
        if (GetExerciseData?.result !== null) {
            setIsCustomWorkout(true)

        } else {
            setIsCustomWorkout(false)


        }

    }, [dataFetched])
    useEffect(() => {
        refetch()
    }, [errordeleting])
    useEffect(() => {
        if (selecteddays && selecteddays.length > 0) {
            console.log("selecteddays=", selecteddays[0])
            setselectedday(selecteddays[0])
        }

    }, [selecteddays])
    const ToggleDay = (day) => {
        setselecteddays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day) // remove if already selected
                : [...prev, day] // add if not selected
        );
    };
    async function deleteuserroutin(id) {
        await DeleteRoutinMutation({ id })
    }
    function handleSaveAndNext() {
        if (selecteddays.length == 0) return;

        // Update context FIRST



        setuseDiffBannerText(true);
        setbannerText("Now Enter Title Of Exercise and Enter Exercise name Click on Add Exercise it will be added to exercise list and then click on Save Routin ")

        // setTimeout(() => {
            setCreateWorkoutPlan(true);

        // }, [100])




        // THEN switch UI state
    }


          useEffect(()=>{
    console.log(' bannerText', bannerText)
    if(useDiffBannerText==true){
    setCreateWorkoutPlan(true)

    }
        },[bannerText,useDiffBannerText])
        
        useEffect(()=>{

if(isSuccess==true){
    setuseDiffBannerText(true);
        setbannerText("Your Custom Workout Plan is Created !")
}
        },[isSuccess])


    const [formData, setformData] = useState({
        mon: {
            Title: "",
            exercises: [],
            day: 'monday'

        },
        tue: {
            Title: "",
            exercises: [],
            day: 'tuesday'


        },
        wed: {
            Title: "",
            exercises: [],
            day: 'wednesday'


        }, thur: {
            Title: "",
            exercises: [],
            day: 'thursday'


        }, fri: {
            Title: "",
            exercises: [],
            day: 'friday'

        },
        sat: {
            Title: "",
            exercises: [],
            day: 'saturday'


        },
        sun: {
            Title: "",
            exercises: [],
            day: 'sunday'


        }

    })
    useEffect(() => {
        console.log('formData-', data)
    }, [data])

    // useEffect(())

    return <div className="CustomWorkoutPlanContainer">
        <Outlet></Outlet>
        <div onClick={() => { navigate(-1) }} className="CustomWorkoutPlanBackBtn"><img className="backarrow" src="Images/left-arrow.png"></img></div>
        <div className="CustomWorkoutPlanAddWorkoutContainer">
            {/* {PlanCreatedSuccessfully && <Notification type={'success'} message={'New Custom Plan Created Successfully'} onClose={() => { setPlanCreatedSuccessfully(false) }}></Notification>}
            {PlanEditSuccessfully && <Notification type={'success'} message={'Plan Edit Successfull'} onClose={() => { setPlanEditSuccessfully(false) }}></Notification>} */}

            {IsCustomWorkout ? <div className="CheckCustomExercise" >
                {/* {formData.map((ele) => {
                    <WorkoutCard day={ele.day} title={ele.} exerciseList={[

                    ]}></WorkoutCard>
                })} */}

                {GetExerciseData?.result && Object.entries(GetExerciseData?.result).map(([key, value]) => (
                    <WorkoutCard
                        id={GetExerciseData?.result?._id}
                        key={key}
                        day={key}
                        ExerciseList={value.exercises}
                        Title={value.Title}
                        refetch={refetch}
                        PlanEditSuccessfully={PlanEditSuccessfully}
                        setPlanEditSuccessfully={setPlanEditSuccessfully}
                    />
                ))}



                <Button label={'Delete Workout Routin'} onClick={() => { deleteuserroutin(GetExerciseData?.result?._id) }}></Button>
                {GetUserDetail?.Detail[0]?.planName && GetUserDetail?.Detail[0]?.planName == "CustomPlan" ? <h4 style={{ color: 'black' }}>Plan Activated</h4> : <Button label={'Follow Workout Routin'} onClick={async () => { await UpdateUserActivePlan({ Id: GetExerciseData?.result?._id }); console.log('follow workout routin') }}></Button>}










            </div> :
                <div className="CreateCustomWorkout">
                    {CreateWorkoutPlan ? <div className="AddExercisesContainer">

                        <div className="AddExercisesDays">{selecteddays.map((ele) => <span style={{ backgroundColor: selectedday == ele && '#ffcc00', border: selectedday == ele && '#ffcd07ff' }} onClick={() => { setselectedday(ele); console.log('slected day', ele) }} className="SelectedExerciseDays">{ele}</span>)}</div>
                        <div className="AddExerciseCotent">
                            <h2 style={{ textAlign: 'center', marginTop: "2rem", fontWeight: '600', color: "black" }}>{selectedday}</h2>
                            {/* <input placeholder="Enter Title"></input> */}
                            <Input label={'Enter Title'}
                                placeholder={'Enter Exercise Title'}
                                value={formData?.[selectedday]?.Title}
                                onChange={(event) => {
                                    setformData((prev) => {
                                        return { ...prev, [selectedday]: { Title: event.target.value, exercises: [], day: selectedday } }
                                    })


                                }}



                            ></Input>


                            <List title={'Exercise List'} items={[...formData[selectedday]?.exercises]}></List>



                            {/* <div className="Exercisesontainer"> */}
                            <Input label={'Enter ExerciseName'} placeholder={'Enter ExerciseName'} onChange={(event) => { setexercise(event.target.value) }} value={exercise} ></Input>
                            {/* </div> */}
                            {/* <Button label={'Add Exercise'} ></Button> */}

                            <Button label={'Add Exercise'} onClick={() => {
                                if (exercise.trim() === "") return; // avoid empty input

                                setformData((prev) => ({
                                    ...prev,
                                    [selectedday]: {
                                        ...prev[selectedday],
                                        exercises: [...prev[selectedday].exercises, exercise] // append new exercise
                                    }
                                }));

                                setexercise("");
                            }} ></Button>

                        </div>
                        <div className="AddExerciseSaveBtn">
                            <Button
                                label={'Save Routine'}
                                variant="outline"
                                onClick={async () => {
                                    if (selecteddays.length === 0) {
                                        // alert("No days selected")
                                        <Alert message={"No days selected"}></Alert>

                                        return
                                    };
                                    if (selectedday && (!formData[selectedday].Title)) {
                                        // alert("Title is missing",formData[selectedday].exercises.length)
                                        <Alert message='Title is missing'></Alert>


                                        return;
                                    };
                                    if (formData[selectedday].exercises == 0) {
                                        alert("plese add some exercise", formData[selectedday].exercises.length)


                                        return;
                                    }

                                    const currentIndex = selecteddays.indexOf(selectedday);
                                    if (currentIndex < selecteddays.length - 1) {
                                        setselectedday(selecteddays[currentIndex + 1]); // move to next day
                                    } else {
                                        console.log("✅ All routines saved!", formData);
                                        let result = await addWorkoutRoutine({ data: formData })
                                        console.log('result-', result)
                                        // refetch()
                                        setIsCustomWorkout(true)

                                        // you can add your final save logic here
                                    }
                                }}
                            ></Button>


                        </div>






                    </div> : <div className="CreateCustomWorkoutPage1">
                        <div><h3 style={{ color: 'black' }}>Days You Want to workout ?</h3></div>
                        <div className="DaysSelector">{daysarr.map((day) => {
                            return <span style={{ backgroundColor: selecteddays.includes(day) ? '#ffcc00' : 'white' }} key={day} onClick={() => { ToggleDay(day) }}>{day}</span>
                        })}</div>
                        <div>
                            <Button label={'Save And Next'} onClick={() => {
                                // setCreateWorkoutPlan(true)

                                handleSaveAndNext()
                            }}>Save And Next</Button>
                        </div>
                    </div>}



                </div>}
        </div>
    </div >
}