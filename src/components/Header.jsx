import "../styles/Header.css"
import { useGetUserDetailsQuery } from "../features/api/UserApi"

function HeaderDate({ DateNumber = 'DateNumber', value, setVisibleBox, ele }) {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    width: '1.5rem',
    height: '100%',

    paddingLeft: "0.8rem",
    paddingRight: '0.8rem'

  }}>
    <span style={{ fontSize: '0.6rem', color: '#d3d3d3' }}>{ele?.day}</span>
    <span onClick={() => { setVisibleBox(value) }} className={DateNumber} style={{ fontSize: '0.6rem', fontWeight: "500", margin: '0.2rem' }}>{ele?.date.split("-")[2]}</span>
  </div>
}
export default function HeaderTop({ visibleBox, setVisibleBox, isHomeTab, Dates, IsPlanAvailable }) {
  let { data, refetch, isLoading, error } = useGetUserDetailsQuery({ Id: null })
  // console.log("data?.Detail[0]?.username.split[0]",data?.Detail[0]?.username[0].toUpperCase())
  return <div className="Header">
    <div className="HeaderUserDetails"><h4 className="HeaderUserDetailUsername">Hi,<span>{localStorage.getItem('username')}</span></h4><span className="HeaderUserDetailProfile">{data?.Detail[0]?.username[0].toUpperCase() || 'U'}</span></div>
  
    {isHomeTab && <div className="HeaderWorkoutTracker">
      {IsPlanAvailable && <div className="HeaderWorkoutTrackerPrevNextWeekbtn"><span className="PreviousWeekBtn">Previous week</span><span className="NextWeekBtn">Next Week</span></div>}
      {IsPlanAvailable && <div className="Headerdate">
        {/* visibleBox */}
        {/* <HeaderDate DateNumber={'DateNumberActive'}></HeaderDate> */}
        {/* <HeaderDate DateNumber={visibleBox == 1 ? 'DateNumberActive' : "DateNumber"} value={1} setVisibleBox={setVisibleBox}  ></HeaderDate> */}
        {Dates.map((ele, index) => <HeaderDate DateNumber={visibleBox == index ? 'DateNumberActive' : "DateNumber"} value={index + 1} setVisibleBox={setVisibleBox} ele={ele}  ></HeaderDate>)}
        {/* <HeaderDate DateNumber={visibleBox == 2 ? 'DateNumberActive' : "DateNumber"} value={2} setVisibleBox={setVisibleBox}  ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 3 ? 'DateNumberActive' : "DateNumber"} value={3} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 4 ? 'DateNumberActive' : "DateNumber"} value={4} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 5 ? 'DateNumberActive' : "DateNumber"} value={5} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 6 ? 'DateNumberActive' : "DateNumber"} value={6} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 7 ? 'DateNumberActive' : "DateNumber"} value={7} setVisibleBox={setVisibleBox}  ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 8 ? 'DateNumberActive' : "DateNumber"} value={8} setVisibleBox={setVisibleBox}  ></HeaderDate> */}





      </div>}
      {!IsPlanAvailable && <div
        style={{
          width: "90%",
          height: "90%",
          padding: "1rem 1rem",
          background: "linear-gradient(135deg, #000 0%, #222 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
          letterSpacing: "1px",
          alignSelf: 'center',
          justifySelf: 'center'
        }}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #fff, #ccc)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}
        >
          Select Your Workout Plan
        </h3>

        <p
          style={{
            fontSize: "0.8rem",
            color: "#ddd",
            maxWidth: "600px",
            lineHeight: "1.2",
          }}
        >
          Choose from multiple science-based training programs tailored for strength, hypertrophy, and performance or create your own by using custom plan feature.
        </p>
      </div>


      }

    </div>}
  </div>
}