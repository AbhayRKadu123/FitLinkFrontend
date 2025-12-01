import "../styles/MessagePage.css"
import CommonHeader from "../components/CommonHeader"
import { useEffect, useState, useRef } from "react"
import socket from "../../public/utils/SocketConnect"
import { useSearchParams } from "react-router-dom"
import { useGetAllUserConversationQuery ,useHandleDeleteMessageMutation} from "../features/api/UserApi"
import DeleteConfirmModal from "../components/DeleteConfirmModel"
export default function MessagePage() {
    const [Message, setMessage] = useState("")
    const [IsMessageEmpty, setIsMessageEmpty] = useState(false)
    const [searchParams] = useSearchParams();
    const [Messages, setMessages] = useState([])
    const [MessageOptions, setMessageOptions] = useState({ ele: 0, IsExpanded: false })
    const bottomRef = useRef(null);
    const TimeRef = useRef(null)
    const [isDeleteModalOpen,setisDeleteModalOpen]=useState(false)
    const [Delete_Msg_Id,setDelete_Msg_Id]=useState(null)
    const OtherUserId = searchParams.get("OtherUserId");
    const UserId = localStorage.getItem("UserId")
    console.log('MessagePage UserId', UserId)
    console.log('Other UserId', OtherUserId)
    let { data, isLoading, isError, isSuccess } = useGetAllUserConversationQuery({ UserId: UserId, OtherUserId: OtherUserId })
    let [HandleMessageDelet,{data:DeletedMessage,isLoading:LoadingMessages,isError:ErrorDeleting}]=useHandleDeleteMessageMutation()
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [Messages]);
    function HandleCancleDelete(){
        console.log('HandleCancleDelete')
        setisDeleteModalOpen(false)
    }
    function HandleConfirmDelete (){
        console.log('HandleConfirmDelete ',Delete_Msg_Id)
        setisDeleteModalOpen(false)
        
    }

    function ReformateMessage(Msg) {
        let FormateedMsg = {
            _id:Msg?._id,
            msg: Msg?.message,
            type: Msg?.senderId == UserId ? 'sent' : 'incoming',
            sender: Msg?.SenderUsername || 'Anonymus',
            // MsgDate:`${Res[0]},${convertTo12Hour(Res[1])}`,
            Date: Msg.date
            , Time: Msg.time
        }
        console.log('Reformated msg', FormateedMsg)

        return FormateedMsg
    }
    useEffect(() => {

        if (data && data?.result) {
            console.log('datadata', data?.result)

            console.log("data?.result", data?.result[0])

            let FormatedDataArray = data?.result?.map((ele) => {
                return ReformateMessage(ele)
            })
            console.log('FormatedDataArray', FormatedDataArray)
            setMessages((prev) => {
                return [...FormatedDataArray]
            })

        }


    }, [data])
    function getFormattedToday() {
        // const utcNow = new Date().toISOString();
        const utcDate = new Date();
        console.log('utcDate', utcDate)
        const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
        console.log('isodate', istDate.toISOString()?.split('T')[0]);

        return istDate.toISOString()?.split('T')
    }
    function convertTo12Hour(timeString) {
        // extract the HH:MM part
        const [hoursStr, minutesStr] = timeString.split(":");

        let hours = Number(hoursStr);
        let minutes = Number(minutesStr);

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // 0 → 12
        minutes = minutes.toString().padStart(2, "0");

        return `${hours}:${minutes} ${ampm}`;
    }


    useEffect(() => {

        function handleIncoming(Msg) {
            let IncommingMsg = {
                msg: Msg.msg.trim(),
                type: 'incoming',
                sender: Msg.SenderUsername,
                Date: Msg.Date,
                Time: Msg.Time
            };

            setMessages(prev => [...prev, IncommingMsg]);
        }

        socket.on("IncommingMsg", handleIncoming);

        return () => {
            socket.off("IncommingMsg", handleIncoming);  // THIS FIXES DUPLICATION
        };

    }, []);

    function sendMessage() {
        let Res = getFormattedToday()

        if (Message.trim() == "") {
            setIsMessageEmpty(true)

            return
        }
        console.log('Message', Message)
        let SentMsg = {
            msg: Message.trim(),
            type: 'sent',
            sender: 'You',
            // MsgDate:`${Res[0]},${convertTo12Hour(Res[1])}`
            Date: Res[0]
            , Time: convertTo12Hour(Res[1])
        }
        setMessages((prev) => {
            return [...prev, SentMsg]
        })
        socket.emit("SendMessage", { msg: Message, SenderId: UserId, ReciverId: OtherUserId, Date: Res[0], Time: convertTo12Hour(Res[1]) })
        setMessage("")

    }
    return <div className="MessagePageContainer">
        <CommonHeader Title={'Messaging'} ShowBadge={false}></CommonHeader>
        <div className="MessageContainer">
            <DeleteConfirmModal Title={'Are you sure you want to delete this message?'} isOpen={isDeleteModalOpen} onClose={HandleCancleDelete} onConfirm={HandleConfirmDelete} ></DeleteConfirmModal>

            {Messages?.map((ele, index) => {

                return <div className={`message ${ele?.type}`}>
                    <div className="sender">{ele?.sender}</div>

                    <div  style={{ color: ele?.type == 'incoming' ? 'black' : 'white' }} className="bubble">
                        {/* ele: 0, IsExpanded */}
                        <p onClick={()=>{console.log('reply')}} className="BubbleMessage">{ele?.msg}</p><span
                            onClick={() => {
                                setMessageOptions((prev) => {
                                    return {
                                        ele: index,
                                        IsExpanded: prev?.ele === index ? !prev.IsExpanded : true
                                    };
                                });
                            }}
                            className="DelBtn"
                        >
                            
                                <img
                                    onClick={()=>{setDelete_Msg_Id(ele?._id),setisDeleteModalOpen(true)}}
                                    style={{ width: "1rem", height: "0.8rem" }}
                                    src="/Images/delete.png"
                                />
                          
                        </span>

                    </div>

                    <div className="time">{`${ele?.Date}/${ele?.Time}`}</div>
                </div>
            })}

            <div ref={bottomRef}></div>

        </div>

        <div className="InputBox">
            <input style={{ border: IsMessageEmpty ? "1px solid red" : "" }} onChange={(event) => { setIsMessageEmpty(false); setMessage(event.target.value) }} value={Message} className="MessageInput" placeholder="Enter Message"></input>
            <img onClick={sendMessage} className="SendMessageBtn" src="/Images/send-message.png"></img>
        </div>
    </div>
}