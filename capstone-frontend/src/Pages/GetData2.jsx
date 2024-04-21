import React, { useEffect, useState } from "react";
import axios from 'axios';
import idsData from './ids.json';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;

const GetData2 = () => {
    const seasonsGPT = ["2023"];
    const [loadingAllData, setLoadingAllData] = useState(true);
    const [allPlayerData2, setAllPlayerData2] = useState([]);
    const ids = Array.from(new Set(idsData))
    console.log("testing", ids.length)

    useEffect(() => {
        const fetchPlayerStats = async () => {
            if (ids.length === 0) return;

            const data = [];
            for (let i = 0; i < seasonsGPT.length; i++) {
                for (let j = 0; j < ids.length; j++) {
                    // close to api rate limit 
                    await delay(90); // Delay of 90ms (0.09 seconds) between requests
                    const requestOptions = {
                        method: "GET",
                        url: VITE_X_RAPIDAPI_URL3,
                        params: {
                            id: ids[j],
                            season: seasonsGPT[i],
                        },
                        headers: {
                            "X-RapidAPI-Key": `${VITE_X_RAPIDAPI_KEY2}`,
                            "X-RapidAPI-Host": `${VITE_X_RAPIDAPI_HOST2}`,
                        },
                    };

                    try {
                        const response = await axios(requestOptions);
                        data.push(response.data);
                    } catch (error) {
                        console.error("Error fetching player statistics:", error);
                    }
                }
            }
            setAllPlayerData2(data);
            setLoadingAllData(false);
        };

        fetchPlayerStats();
    }, []);

    const handleDownloadAllPlayerData = () => {
        const json = JSON.stringify(allPlayerData2, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'allPlayerGameData.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="playerexamplepage">
            <button onClick={handleDownloadAllPlayerData} disabled={loadingAllData}>
                {loadingAllData ? "Downloading All Player Data..." : "Download All Player Data"}
            </button>
        </div>

    );
}

export default GetData2;