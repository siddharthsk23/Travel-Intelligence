import { useState } from "react";
import ChatWindow from "../components/ai/ChatWindow";
import questions from "../ai/data/questions.json";
import AIBootScreen from "../components/ai/AIBootScreen";

export default function AIAssistant() {

    const [bootFinished,setBootFinished]=useState(false);

    if(!bootFinished){
        return(
            <AIBootScreen
                onComplete={()=>setBootFinished(true)}
            />
        )
    }

    return(

        <div className="min-h-screen bg-[#071024] p-10">

            <ChatWindow/>

        </div>

    )

}