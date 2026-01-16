function Invitefriend(message){
       const Message =
                        message||"Hey! Join this app to track workouts, monitor progress, and get stronger 💪";

                    const link = "https://fitlinkfrontend.onrender.com";

                    const whatsappURL =
                        "https://wa.me/?text=" +
                        encodeURIComponent(Message + " " + link);

                    window.open(whatsappURL, "_blank");

}
export  default Invitefriend;