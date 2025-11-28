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
    const [CreateWorkoutPlan, setCreateWorkoutPlan] = useState(false)
    const [exercise, setexercise] = useState("")
    const [PlanCreatedSuccessfully, setPlanCreatedSuccessfully] = useState(false)
    const [PlanEditSuccessfully, setPlanEditSuccessfully] = useState(false)

    const [addWorkoutRoutine, { data, error: errorAddingWorkout, isLoading, isSuccess }] = useAddWorkoutRoutinMutation();
    const [UpdateUserActivePlan, { data: ActivePlan, error: Updatingerror, isLoading: ActivePlanLoading, isSuccess: PlanChanged }] = useUpdateUserActiveWorkoutPlanMutation();
    const [DeleteRoutinMutation, { data: deleteroutin, error: errordeleting,isLoading:Deleting,isSuccess: DataDeleted }] = useDeleteRoutineMutation();
    // const [UpdateRoutin, { data: UpdatedRoutin, isSuccess: RoutinUpdated }] = useUpdateWorkoutRoutinMutation();
    const { data: GetExerciseData, refetch, error: errorgettingworkout, isError, isSuccess: dataFetched } = useGetUserWorkoutRoutinQuery();
    const { data: GetUserDetail, error: ErrorLoadingUserDetails, isSuccess: LoadingUserDetailSuccessfull, refetch: RefetchGetUserDetail } = useGetUserDetailsQuery({ Id: null });

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

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
        if (PlanChanged === true) {
            // Successful activation: refresh and notify
            refetch();
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Custom Plan Activated')
            RefetchGetUserDetail && RefetchGetUserDetail();
        }
    }, [PlanChanged, refetch, setShowNotification, setNotificatioinType, setNotificationMessage, RefetchGetUserDetail])

    useEffect(() => {
        if (DataDeleted === true) {
            setIsCustomWorkout(false)
            // notify
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Data Deleted Successfully')
        }
    }, [DataDeleted, setShowNotification, setNotificatioinType, setNotificationMessage])

    useEffect(() => {
        console.log('GetUserDetail', GetUserDetail?.Detail?.[0]?.planName)
    }, [GetUserDetail])

    useEffect(() => {
        if (isSuccess === true) {
            // Plan created successfully -> refetch and notify
            refetch();
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Plan Created Successfully')
        }
    }, [isSuccess, refetch, setShowNotification, setNotificatioinType, setNotificationMessage])

    useEffect(() => {
        console.log('GetExerciseData?.result', GetExerciseData?.result)
        console.log('formData', formData)
        // if GetExerciseData?.result is not null -> custom workout exists
        if (GetExerciseData?.result != null) {
            setIsCustomWorkout(true)
        } else {
            setIsCustomWorkout(false)
        }
    }, [GetExerciseData?.result])

    // Removed noisy / unnecessary refetch-on-error effect to reduce duplicate API calls.
    // useEffect(() => {
    //     refetch()
    // }, [errordeleting])

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
        try {
            if(Deleting==true) return
            await DeleteRoutinMutation({ id })
        } catch (err) {
            console.error("deleteuserroutin error:", err)
        }
    }

    function handleSaveAndNext() {
        if (selecteddays.length === 0) return;

        // Update context FIRST
        setuseDiffBannerText(true);
        setbannerText("Now Enter Title Of Exercise and Enter Exercise name Click on Add Exercise it will be added to exercise list and then click on Save Routin ")

        // THEN switch UI state
        setCreateWorkoutPlan(true);
    }

    useEffect(() => {
        console.log(' bannerText', bannerText)
        if (useDiffBannerText === true) {
            setCreateWorkoutPlan(true)
        }
    }, [bannerText, useDiffBannerText])

    useEffect(() => {
        if (isSuccess === true) {
            setuseDiffBannerText(true);
            setbannerText("Your Custom Workout Plan is Created !")
        }
    }, [isSuccess, setuseDiffBannerText, setbannerText])

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
        },
        thur: {
            Title: "",
            exercises: [],
            day: 'thursday'
        },
        fri: {
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

    return <div className="CustomWorkoutPlanContainer">
        <Outlet></Outlet>
        <div onClick={() => { navigate(-1) }} className="CustomWorkoutPlanBackBtn"><img className="backarrow" src="Images/left-arrow.png" alt="back"></img></div>
        <div className="CustomWorkoutPlanAddWorkoutContainer">
            {/* Notifications (kept commented as original) */}
            {IsCustomWorkout ? <div className="CheckCustomExercise" >
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

                <Button label={Deleting?"Deleting Routin":'Delete Workout Routin'} disabled={Deleting} onClick={() => { deleteuserroutin(GetExerciseData?.result?._id) }}></Button>

                {GetUserDetail?.Detail?.[0]?.planName && GetUserDetail?.Detail?.[0]?.planName === "CustomPlan"
                    ? <h4 style={{ color: 'black' }}>Plan Activated</h4>
                    : <Button label={ActivePlanLoading?'Activting..':'Follow Workout Routin'} disabled={ActivePlanLoading} onClick={async () => {
                        if(ActivePlanLoading==true) return
                        try {
                            await UpdateUserActivePlan({ Id: GetExerciseData?.result?._id });
                            console.log('follow workout routin')
                        } catch (err) {
                            console.error("UpdateUserActivePlan error:", err)
                        }
                    }}></Button>
                }

            </div> :
                <div className="CreateCustomWorkout">
                    {CreateWorkoutPlan ? <div className="AddExercisesContainer">
                        <div className="AddExercisesDays">{selecteddays.map((ele) => <span style={{ backgroundColor: selectedday === ele ? '#ffcc00' : undefined, border: selectedday === ele ? '#ffcd07ff' : undefined }} onClick={() => {  console.log('slected day', ele) }} className="SelectedExerciseDays" key={ele}>{ele}</span>)}</div>
                        <div className="AddExerciseCotent">
                            <h2 style={{ textAlign: 'center', marginTop: "2rem", fontWeight: '600', color: "black" }}>{selectedday}</h2>

                            <Input label={'Enter Title'}
                                placeholder={'Enter Exercise Title'}
                                value={formData?.[selectedday]?.Title}
                                onChange={(event) => {
                                    // SAFE fix: preserve existing exercises when updating Title
                                    const newTitle = event.target.value;
                                    setformData((prev) => {
                                        const prevForDay = prev?.[selectedday] || { exercises: [], day: selectedday };
                                        return {
                                            ...prev,
                                            [selectedday]: {
                                                ...prevForDay,
                                                Title: newTitle,
                                                day: selectedday
                                            }
                                        }
                                    })
                                }}
                            ></Input>

                            <List title={'Exercise List'} items={[...formData[selectedday]?.exercises]}></List>

                            <Input label={'Enter ExerciseName'} placeholder={'Enter ExerciseName'} onChange={(event) => { setexercise(event.target.value) }} value={exercise} ></Input>

                            <Button label={'Add Exercise'} onClick={() => {
                                if (exercise.trim() === "") return; // avoid empty input

                                setformData((prev) => ({
                                    ...prev,
                                    [selectedday]: {
                                        ...prev[selectedday],
                                        exercises: [...(prev[selectedday]?.exercises || []), exercise] // append new exercise safely
                                    }
                                }));

                                setexercise("");
                            }} ></Button>

                        </div>
                        <div className="AddExerciseSaveBtn">
                            <Button
                                label={isLoading?'Saving..':'Save Routine'}
                                variant="outline"
                                disabled={isLoading}
                                onClick={async () => {
                                    if(isLoading==true) return
                                    if (selecteddays.length === 0) {
                                        // Using Alert component as in original (kept as JSX call as original did, but better would be to show real UI)
                                        <Alert message={"No days selected"}></Alert>
                                        return
                                    };
                                    if (selectedday && (!formData[selectedday]?.Title || formData[selectedday].Title.trim() === "")) {
                                        <Alert message='Title is missing'></Alert>
                                        return;
                                    };
                                    if (!formData[selectedday]?.exercises || formData[selectedday].exercises.length === 0) {
                                        alert("please add some exercise")
                                        return;
                                    }

                                    const currentIndex = selecteddays.indexOf(selectedday);
                                    if (currentIndex < selecteddays.length - 1) {
                                        setselectedday(selecteddays[currentIndex + 1]); // move to next day
                                    } else {
                                        console.log("✅ All routines saved!", formData);
                                        try {
                                            let result = await addWorkoutRoutine({ data: formData })
                                            console.log('result-', result)
                                            // set flag to show custom workout UI
                                            setIsCustomWorkout(true)
                                        } catch (err) {
                                            console.error("addWorkoutRoutine error:", err)
                                        }
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
                                handleSaveAndNext()
                            }}>Save And Next</Button>
                        </div>
                    </div>}

                </div>}
        </div>
    </div >
}
