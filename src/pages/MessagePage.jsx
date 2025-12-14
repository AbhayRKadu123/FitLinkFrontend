import "../styles/MessagePage.css"
import CommonHeader from "../components/CommonHeader"
import { useEffect, useState, useRef } from "react"
import socket from "../../public/utils/SocketConnect"
import { useSearchParams } from "react-router-dom"
import { useUploadImageMutation, useGetReplyMessageQuery, useGetAllUserConversationQuery, useHandleDeleteMessageMutation } from "../features/api/UserApi"
import DeleteConfirmModal from "../components/DeleteConfirmModel"
import Addimage from "../components/Addimage"
import { toast } from 'react-toastify';

export default function MessagePage() {
    const [Message, setMessage] = useState("")
    const [IsMessageEmpty, setIsMessageEmpty] = useState(false)
    const [searchParams] = useSearchParams();
    const [Messages, setMessages] = useState([])
    const [MessageOptions, setMessageOptions] = useState({ ele: 0, IsExpanded: false })
    const bottomRef = useRef(null);
    const ReplyRef = useRef(null);
    const messageRefs = useRef({});

    const TimeRef = useRef(null)
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false)
    const [IsAddImageOpen, setIsAddImageOpen] = useState(false)
    const [SelectedFile, setSelectedFile] = useState(null)
    const [ReplyMessage, setReplyMessage] = useState(null)
    const [Delete_Msg_Id, setDelete_Msg_Id] = useState(null)
    const [ReplyId, setReplyId] = useState(null)
    const [ReplyMsgId, setReplyMsgId] = useState(null)
    const [HighLightMessage, setHighLightMessage] = useState(null)
    const [preview, setPreview] = useState(null);
    const [ImageUrl,setImageUrl]=useState(null)
    const OtherUserId = searchParams.get("OtherUserId");
    const UserId = localStorage.getItem("UserId")
    console.log('MessagePage UserId', UserId)
    console.log('Other UserId', OtherUserId)
    let { data: RepliedMessage, isLoading: isReplyLoading, } = useGetReplyMessageQuery({ MsgId: ReplyMsgId })
    let [UploadImage, { data: UploadedImage, isLoading: UploadingImage, error: errorUploading, success: UploadSuccessfull }] = useUploadImageMutation();
    let { data, isLoading, refetch, isError, isSuccess } = useGetAllUserConversationQuery({ UserId: UserId, OtherUserId: OtherUserId })
    let [HandleMessageDelet, { data: DeletedMessage, isLoading: LoadingMessages, isSuccess: DeletingSuccessfull, isError: ErrorDeleting }] = useHandleDeleteMessageMutation()
    useEffect(() => {
        console.log('Messages', Messages)
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [Messages]);
    useEffect(() => {
        if (!HighLightMessage) return;

        const timer = setTimeout(() => {
            setHighLightMessage(null);
        }, 1500); // glow visible time

        return () => clearTimeout(timer);
    }, [HighLightMessage]);
    useEffect(() => {
        console.log('SelectedFile', SelectedFile)
    }, [SelectedFile])
    useEffect(() => {
        refetch()
    }, [DeletingSuccessfull])
    function HandleCancleDelete() {
        console.log('HandleCancleDelete')
        setisDeleteModalOpen(false)
    }
    // useEffect(()=>{
    //     refetch()
    // },[isSuccess])
    async function UploadNewImage() {
        try {
            const formData = new FormData();
            formData.append("file", SelectedFile);
            console.log('upload image ')
            let result = await UploadImage({formData})
            console.log('setIsAddImageOpen(false)', result?.data?.UploadImage)
            setImageUrl(result?.data?.UploadImage)
            setIsAddImageOpen(false)
            setSelectedFile(null)

        } catch (err) {
            console.log('uploadimg err', err)

        }

    }
    async function HandleConfirmDelete() {
        try {
            console.log('HandleConfirmDelete ', Delete_Msg_Id);

            const res = await HandleMessageDelet({ Id: Delete_Msg_Id }).unwrap();

            toast.success(res?.msg || "Message Deleted Successfully");
        } catch (err) {
            toast.error(err?.data?.Err || "Deletion Process Cancelled");
            console.error(err);
        }

        setisDeleteModalOpen(false);
    }



    function ReformateMessage(Msg) {
        // console.log('Reformateddata', Msg)



        let FormateedMsg = {
            _id: Msg?._id,
            msg: Msg?.message,
            type: Msg?.senderId == UserId ? 'sent' : 'incoming',
            sender: Msg?.SenderUsername || 'Anonymus',
            // MsgDate:`${Res[0]},${convertTo12Hour(Res[1])}`,
            Date: Msg.date
            , Time: Msg.time,
            isDeleted: Msg.isDeleted,
            replyTo: Msg?.replyTo || null,
            replyMessage: Msg?.replyMessage?.message || null

        }

        return FormateedMsg
    }
    useEffect(() => {

        if (data && data?.result) {
            // console.log('datadata', data?.result)

            // console.log("data?.result", data?.result[0])

            let FormatedDataArray = data?.result?.map((ele) => {
                return ReformateMessage(ele)
            })
            // console.log('FormatedDataArray', FormatedDataArray)
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
            , Time: convertTo12Hour(Res[1]),
            ReplyId,
            //             replyTo: ReplyId,
            replyMessage: ReplyMessage || null,
            ImageUrl
        }
        setMessages((prev) => {
            return [...prev, SentMsg]
        })
        socket.emit("SendMessage", { msg: Message, SenderId: UserId, ReciverId: OtherUserId, Date: Res[0], Time: convertTo12Hour(Res[1]), ReplyId: ReplyId,ImageUrl:ImageUrl })
        setMessage("")
        setReplyMessage("")
        setReplyId(null)
        setHighLightMessage(null)



    }
    return <div className="MessagePageContainer">
        <CommonHeader Title={'Messaging'} ShowBadge={false}></CommonHeader>
        <div className="MessageContainer">
            {IsAddImageOpen && <Addimage preview={preview} setPreview={setPreview} setSelectedFile={setSelectedFile} setIsAddImageOpen={setIsAddImageOpen} UploadNewImage={UploadNewImage}></Addimage>}
            <DeleteConfirmModal Title={'Are you sure you want to delete this message?'} isOpen={isDeleteModalOpen} onClose={HandleCancleDelete} onConfirm={HandleConfirmDelete} ></DeleteConfirmModal>

            {Messages?.map((ele, index) => {
                // console.log('Messages=', ele)

                return <div ref={(el) => (messageRefs.current[ele._id] = el)} className={`message ${ele?.type} ${HighLightMessage == ele?._id && 'HighLight'}`}>
                    <div className="sender">{ele?.sender}</div>

                    <div style={{ color: ele?.type == 'incoming' ? 'black' : 'white' }} className="bubble">
                        {/* ele: 0, IsExpanded */}
                        <div className="InnerBubbleContainer">
                            {ele?.replyMessage && !ele?.isDeleted && <div onClick={() => { messageRefs.current[ele?.replyTo]?.scrollIntoView({ behavior: 'smooth', block: 'center' }); { ReplyId && setHighLightMessage(ele?.replyTo); } }} className="reply-container">
                                {ele?.replyMessage && <span className="reply-label">Replied to</span>}
                                <p className="reply-text">{ele?.replyMessage}</p>
                            </div>}
                            <p onClick={() => { if (ele?.isDeleted) { return } setReplyId(ele?._id); setReplyMessage(ele?.msg); console.log('reply') }} className="BubbleMessage">{ele?.isDeleted ? 'This Message Have Been Deleted' : ele?.msg}</p>

                        </div>
                        <span
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

                            {!ele?.isDeleted && <img
                                onClick={() => { if (ele?.isDeleted) { return } setDelete_Msg_Id(ele?._id), setisDeleteModalOpen(true) }}
                                style={{ width: "1rem", height: "0.8rem" }}
                                src="/Images/delete.png"
                            />}

                        </span>
                        {/* {ReplyId && ReplyId==ele?._id&&"Replying to Abhay"} */}


                    </div>
                    {ReplyId && ReplyId == ele?._id && <div className="ReplyBox">
                        <span className="reply-text">Replying to: {ele?.msg}</span>

                        <span
                            className="close-reply"
                            onClick={() => setReplyId(null)}
                        >
                            ✖
                        </span>
                    </div>
                    }

                    <div className="time">{`${ele?.Date}/${ele?.Time}`}</div>
                </div>
            })}

            <div ref={bottomRef}></div>


        </div>

        <div style={{ position: 'relative' }} className="InputBox">
            <input onClick={() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }} style={{ border: IsMessageEmpty ? "1px solid red" : "" }} onChange={(event) => { setIsMessageEmpty(false); setMessage(event.target.value) }} value={Message} className="MessageInput" placeholder="Enter Message"></input>
            <img onClick={sendMessage} className="SendMessageBtn" src="/Images/send-message.png"></img>
            <img onClick={() => { setIsAddImageOpen(true) }} className="AddFileBtn" src="/Images/clip.png"></img>

        </div>
    </div>
}