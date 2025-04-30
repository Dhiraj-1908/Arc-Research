//import { NextResponse } from "next/server";
//C:\Users\amitg\OneDrive\Desktop\dhiraj\projects\arc-research\src\app\api\deep-research\route.ts
export async function POST(req:Request) {
    try{
            const {messages} = await req.json();
            console.log(messages);

            const lastMessageContent = messages[messages.length -1].content;

            const parsed = JSON.parse(lastMessageContent);

            const topic = parsed.topic;

            const clarifications = parsed.clarifications;

            console.log(parsed)

            return new Response(
                 JSON.stringify({
                    success: true,
                 }),
                 {status: 200}
            );
    }catch(error){
        return new Response(
            JSON.stringify({
               success: false,
               error: error instanceof Error ? error.message: "Invalid message format!"
            }),
            {status: 200}
       );
    }
}