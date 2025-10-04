import { useEffect, useState } from "react";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    ParticipantView
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { createStream, getStreamByLotId } from "../../Services/Methods";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const apiKey = process.env.REACT_APP_STREAM_API_KEY as string;
const user_id = uuidv4();
const user = { id: user_id, name: "admin" };

export default function AdminVideoStream({ lotId, onNoCall }: any) {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [liveLotInfo, setLiveLotInfo] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [callId, setCallId] = useState<string | null>(null);

    const fetchLiveStream = async () => {
        try {
            const response = await getStreamByLotId(lotId);
            if (response.data.length) {
                const latestLiveStream = response.data[response.data.length - 1];
                setLiveLotInfo(latestLiveStream);
                setCallId(latestLiveStream.CallId);
                setToken(latestLiveStream.Token);
            } else {
                setLiveLotInfo(null);
                setCallId(null);
                setToken(null);
            }
        } catch (error) {
            console.error("Error fetching live stream:", error);
        }
    };

    const generateToken = async () => {
        try {
            const newCallId = uuidv4(); // Generate new callId only if needed
            const payload = { userId: user_id, callId: newCallId, lotID: lotId };
            const response = await axios.post("http://16.170.106.236:8181/initialize-stream", payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data?.token) {
                setToken(response.data.token);
                setCallId(newCallId);
                return { token: response.data.token, callId: newCallId };
            } else {
                console.error("Token generation failed: Invalid response structure");
                return null;
            }
        } catch (error: any) {
            console.error("Error generating token:", error.response);
            return null;
        }
    };

    useEffect(() => {
        if (lotId) fetchLiveStream();
    }, [lotId]);

    useEffect(() => {
        if (!lotId) return;

        const setupClient = async () => {
            let newToken = token;
            let newCallId = callId;

            if (!liveLotInfo) {
                const generated = await generateToken();
                if (!generated) return;
                newToken = generated.token;
                newCallId = generated.callId;
                try {
                    await createStream({ LotId: lotId, Token: newToken, CallId: newCallId, UserId: user_id });
                } catch (error) {
                    console.error(error)
                }
            }

            if (!newToken || !newCallId) return; // Ensure both values exist

            const myClient = new StreamVideoClient({ apiKey, user, token: newToken });
            setClient(myClient);
            setCallId(newCallId);

            return () => {
                myClient.disconnectUser();
                setClient(null);
            };
        };

        setupClient();
    }, [lotId, liveLotInfo]);

    useEffect(() => {
        if (!client || !callId) return;

        const myCall = client.call("default", callId);
        myCall.join({ create: !liveLotInfo }) // Create call only if no previous record
            .catch(err => console.error("Failed to join the call", err));

        setCall(myCall);

        return () => {
            myCall.leave().catch(err => console.error("Failed to leave the call", err));
            setCall(null);
        };
    }, [client, callId]);

    if (!token || !callId) return onNoCall;
    if (!client || !call) return <h1>Loading...</h1>;

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <VideoLayout onNoCall={onNoCall} />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}
const VideoLayout = ({ onNoCall }: any) => {
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    if (!localParticipant) return onNoCall || <div>No call available</div>;

    return (
        <div className="admin-layout">
            <ParticipantView participant={localParticipant} />
            <style>
                {`.str-video__call-controls__button {display: none !important;} 
                  .str-video__participant-details__name {color:white !important}`}
            </style>
        </div>
    );
};

