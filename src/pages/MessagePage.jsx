import "../styles/MessagePage.css"
// SocketStatus
import CommonHeader from "../components/CommonHeader"
import { useEffect, useState, useRef } from "react"
import socket from "../../public/utils/SocketConnect"
import { useSearchParams } from "react-router-dom"
import { useUploadImageMutation, useGetReplyMessageQuery, useGetAllUserConversationQuery, useHandleDeleteMessageMutation } from "../features/api/UserApi"
import DeleteConfirmModal from "../components/DeleteConfirmModel"
import Addimage from "../components/Addimage"
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";



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
    const [uniqueReplyMsgId, setuniqueReplyMsgId] = useState(null)
    const [HighLightMessage, setHighLightMessage] = useState(null)
    const [liveReply, setLiveReply] = useState(null)
    const [repliedToImage, setRepliedToImage] = useState(null)
    const [SocketStatus,setSocketStatus]=useState('🟢')
    const [istyping,setistypingmsg]=useState(null)

    const [preview, setPreview] = useState(null);
    const [ImageUrl, setImageUrl] = useState(null)
    const OtherUserId = searchParams.get("OtherUserId");
    const UserId = localStorage.getItem("UserId")
    console.log('MessagePage UserId', UserId)
    console.log('Other UserId', OtherUserId)
    // let { data: RepliedMessage, isLoading: isReplyLoading, } = useGetReplyMessageQuery({ MsgId: ReplyMsgId })
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
        console.log('RepliedToImage', repliedToImage)
    }, [repliedToImage])
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
    setTimeout(()=>{
setistypingmsg(null)
    },[1200])
   
    useEffect(() => {
       socket.on("IsTyping",(Data)=>{
        console.log('IsTyping',Data)
        setistypingmsg(Data?.msg)
       })
        
    }, [])

   useEffect(() => {
  if (!socket || !UserId) return;

  const onConnect = () => {
    console.log("🟢 Connected:", socket.id);
    setSocketStatus("🟢");
    socket.emit("UserJoined", { Id: UserId });
  };

  const onDisconnect = (reason) => {
    console.log("🔴 Disconnected:", reason);
    setSocketStatus("🔴");
  };

  const onReconnectAttempt = (attempt) => {
    console.log("🔄 Reconnect attempt:", attempt);
    setSocketStatus("🔄");
  };

  const onReconnect = () => {
    console.log("✅ Reconnected");
    setSocketStatus("🟢");
    socket.emit("UserJoined", { Id: UserId });
  };

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.io.on("reconnect_attempt", onReconnectAttempt);
  socket.io.on("reconnect", onReconnect);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.io.off("reconnect_attempt", onReconnectAttempt);
    socket.io.off("reconnect", onReconnect);
  };
}, [UserId]);


    async function UploadNewImage() {
        try {
            if (UploadingImage) return;

            const formData = new FormData();
            formData.append("file", SelectedFile);

            let result = await UploadImage({ formData })

            setImageUrl(result?.data?.UploadImage)
            setIsAddImageOpen(false)
            setSelectedFile(null)

        } catch (err) {
            console.log('uploadimg err', err)

        }

    }
    async function HandleConfirmDelete() {
        try {


            const res = await HandleMessageDelet({ Id: Delete_Msg_Id }).unwrap();

            toast.success(res?.msg || "Message Deleted Successfully");
        } catch (err) {
            toast.error(err?.data?.Err || "Deletion Process Cancelled");
            console.error(err);
        }

        setisDeleteModalOpen(false);
    }



    function ReformateMessage(Msg) {
        console.log('Reformateddata', Msg)



        let FormateedMsg = {
            _id: Msg?._id,
            msg: Msg?.message,
            type: Msg?.senderId == UserId ? 'sent' : 'incoming',
            sender: Msg?.SenderUsername.trim()==localStorage.getItem("username")?"You":Msg?.SenderUsername,
            // MsgDate:`${Res[0]},${convertTo12Hour(Res[1])}`,
            Date: Msg.date
            , Time: Msg.time,
            isDeleted: Msg.isDeleted,
            replyTo: Msg?.replyTo || null,
            replyMessage: Msg?.replyMessage?.message || null,
            replyImage: Msg?.replyMessage?.ImageUrl || null,
            ImageUrl: Msg?.ImageUrl,
            UniqueMessageId: Msg?.UniqueMessageId,
            RepliedToUniqueMessageId: Msg?.replyMessage?.RepliedToUniqueMessageId || Msg?.RepliedToUniqueMessageId,
            RepliedToImage: Msg?.RepliedToImage

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

        const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));


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
                Time: Msg.Time,
                ImageUrl: Msg.ImageUrl,
                RepliedToUniqueMessageId: Msg.RepliedToUniqueMessageId,
                UniqueMessageId: Msg.UniqueMessageId,
                replyMessage: Msg?.replyMessage,
                RepliedToImage: Msg?.RepliedToImage

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
        const clientMessageId = uuidv4();

        if (Message.trim() == "" && ImageUrl == null) {
            setIsMessageEmpty(true)
            toast.error("Please enter Some Text or add Image")

            return
        }

        let SentMsg = {
            msg: Message.trim(),
            type: 'sent',
            sender: 'You',
            // MsgDate:`${Res[0]},${convertTo12Hour(Res[1])}`
            Date: Res[0]
            , Time: convertTo12Hour(Res[1]),
            ReplyId,
            //             replyTo: ReplyId,
            // replyMessage: ReplyMessage || null,
            ImageUrl,
            UniqueMessageId: clientMessageId,
            RepliedToUniqueMessageId: uniqueReplyMsgId,
            replyMessage: uniqueReplyMsgId && liveReply,
            RepliedToImage: repliedToImage
        }
        setMessages((prev) => {
            return [...prev, SentMsg]
        })

        socket.emit("SendMessage", { msg: Message, SenderId: UserId, ReciverId: OtherUserId, Date: Res[0], Time: convertTo12Hour(Res[1]), ReplyId: ReplyId, ImageUrl: ImageUrl, UniqueMessageId: clientMessageId, RepliedToUniqueMessageId: uniqueReplyMsgId, replyMessage: liveReply, RepliedToImage: repliedToImage })
        setPreview(null); setSelectedFile(null); setImageUrl(null)
        setMessage("")
        setReplyMessage("")
        setReplyId(null)
        setHighLightMessage(null)
        setuniqueReplyMsgId(null)
        setLiveReply(null)
        setRepliedToImage(null)



    }
    return <div className="MessagePageContainer">
        <CommonHeader Title={'Messaging'} ShowBadge={false} SocketStatus={SocketStatus}></CommonHeader>
         {istyping&&<div style={{color:'black',display:'flex',justifySelf:'flex-start',padding:"0.5rem"}}><p style={{display:'flex',justifyContent:'flex-start',fontSize:'1rem'}}>{istyping}</p></div>}

        <div className="MessageContainer">


            {IsAddImageOpen && <Addimage UploadingImage={UploadingImage} preview={preview} setPreview={setPreview} setSelectedFile={setSelectedFile} setIsAddImageOpen={setIsAddImageOpen} UploadNewImage={UploadNewImage}></Addimage>}
            <DeleteConfirmModal Title={'Are you sure you want to delete this message?'} isOpen={isDeleteModalOpen} onClose={HandleCancleDelete} onConfirm={HandleConfirmDelete} ></DeleteConfirmModal>

            {Messages?.map((ele, index) => {


                return <div ref={(el) => (messageRefs.current[ele.UniqueMessageId] = el)} className={`message ${ele?.type} ${HighLightMessage == ele?.UniqueMessageId && 'HighLight'}`}>
                    <div className="sender">{ele?.sender}</div>

                    <div style={{ color: ele?.type == 'incoming' ? 'black' : 'white' }} className="bubble">
                        {/* ele: 0, IsExpanded */}
                        <div className="InnerBubbleContainer">
                            {(ele?.replyMessage || ele?.RepliedToImage) && !ele?.isDeleted && <div onClick={() => { messageRefs.current[ele?.RepliedToUniqueMessageId]?.scrollIntoView({ behavior: 'smooth', block: 'center' }); { ele?.RepliedToUniqueMessageId && setHighLightMessage(ele?.RepliedToUniqueMessageId); } }} className="reply-container">

                                {(ele?.RepliedToImage || ele?.replyMessage) && <span className="reply-label">Replied to</span>}
                                <div style={{ backgroundColor: 'white' }} className="imageContainer">
                                    {ele?.RepliedToImage && <img
                                        src={ele?.RepliedToImage}
                                        className="MessageImage"
                                    />}
                                </div>
                                <p className="reply-text">{ele?.replyMessage}</p>
                            </div>}

                            {ele?.ImageUrl && <img
                                src={ele?.ImageUrl}
                                className="MessageImage"
                            />}

                            {<p onClick={() => { if (ele?.isDeleted) { return } setReplyId(ele?._id); setReplyMessage(ele?.msg); setuniqueReplyMsgId(ele?.UniqueMessageId); setLiveReply(ele?.msg); ele?.ImageUrl && setRepliedToImage(ele?.ImageUrl) }} className="BubbleMessage">{ele?.isDeleted ? 'This Message Have Been Deleted' : ele?.msg}

                            </p>}

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
                    {console.log('ele?.UniqueMessageId', ele?.UniqueMessageId)}
                    {console.log('ele?.UniqueMessageId', ele)}

                    {uniqueReplyMsgId === ele?.UniqueMessageId && (
                        <div className="ReplyBox">
                            <span className="reply-text">Replying to: {ele?.msg ? ele?.msg : 'Image'}</span>
                            <span
                                className="close-reply"
                                onClick={() => { setuniqueReplyMsgId(null); setRepliedToImage(null) }}
                            >
                                ✖
                            </span>
                        </div>
                    )}



                    <div className="time">{`${ele?.Date}/${ele?.Time}`}</div>
                </div>
            })}

            <div ref={bottomRef}></div>


        </div>

        <div style={{ position: 'relative' }} className="InputBox">
            {ImageUrl && <div className="SelectedImage">
                <img onClick={() => { setPreview(null); setSelectedFile(null); setImageUrl(null) }} src='Images/ClosePreview.png' className="ClosePreview"></img>
                <img className='InputPreviewImage' src={ImageUrl}></img>
            </div>}
           
            <input onClick={() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }} style={{ border: IsMessageEmpty ? "1px solid red" : "" }} onChange={(event) => {socket.emit('istyping',{username:localStorage.getItem('username'),Id:OtherUserId}); setIsMessageEmpty(false); setMessage(event.target.value) }} value={Message} className="MessageInput" placeholder="Enter Message"></input>
            <img onClick={sendMessage} className="SendMessageBtn" src="/Images/send-message.png"></img>
            {!uniqueReplyMsgId && <img onClick={() => { setIsAddImageOpen(true) }} className="AddFileBtn" src="/Images/clip.png"></img>}

        </div>
    </div>
}