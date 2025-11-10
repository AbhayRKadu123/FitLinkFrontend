import "../styles/Header.css"
function HeaderDate({ DateNumber = 'DateNumber', value, setVisibleBox,ele}) {
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
export default function HeaderTop({ visibleBox, setVisibleBox,isHomeTab, Dates }) {
    return <div className="Header">
        <div className="HeaderUserDetails"><h4 className="HeaderUserDetailUsername">Hi,<span>{localStorage.getItem('username')}</span></h4><span className="HeaderUserDetailProfile">A</span></div>
      { isHomeTab&& <div className="HeaderWorkoutTracker">
            <div className="HeaderWorkoutTrackerPrevNextWeekbtn"><span className="PreviousWeekBtn">Previous week</span><span className="NextWeekBtn">Next Week</span></div>
            <div className="Headerdate">
                {/* visibleBox */}
                {/* <HeaderDate DateNumber={'DateNumberActive'}></HeaderDate> */}
                {/* <HeaderDate DateNumber={visibleBox == 1 ? 'DateNumberActive' : "DateNumber"} value={1} setVisibleBox={setVisibleBox}  ></HeaderDate> */}
                { Dates.map((ele,index)=> <HeaderDate DateNumber={visibleBox == index ? 'DateNumberActive' : "DateNumber"} value={index+1} setVisibleBox={setVisibleBox} ele={ele}  ></HeaderDate>)}
                {/* <HeaderDate DateNumber={visibleBox == 2 ? 'DateNumberActive' : "DateNumber"} value={2} setVisibleBox={setVisibleBox}  ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 3 ? 'DateNumberActive' : "DateNumber"} value={3} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 4 ? 'DateNumberActive' : "DateNumber"} value={4} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 5 ? 'DateNumberActive' : "DateNumber"} value={5} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 6 ? 'DateNumberActive' : "DateNumber"} value={6} setVisibleBox={setVisibleBox} ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 7 ? 'DateNumberActive' : "DateNumber"} value={7} setVisibleBox={setVisibleBox}  ></HeaderDate>
                <HeaderDate DateNumber={visibleBox == 8 ? 'DateNumberActive' : "DateNumber"} value={8} setVisibleBox={setVisibleBox}  ></HeaderDate> */}





            </div>

        </div>}
    </div>
}