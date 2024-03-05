import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;
const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL;

const Predict = () => {
    const [allPlayerData, setAllPlayerData] = useState([]);
    const [allTeamData, setAllTeamData] = useState([]);
    const [loadingAllData, setLoadingAllData] = useState(true);

    const seasonsGPT = ["2023", "2022", "2021", "2020"];
    const teamsGPT = ["1", "2", "4", "5", "6", "7", "8", "9", "10", "11", "14", "15", "16", "17", "19",
        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "38", "40", "41"];

    useEffect(() => {
        const fetchAllPlayerStats = async () => {
            const data = [];
            for (let i = 0; i < seasonsGPT.length; i++) {
                for (let j = 0; j < teamsGPT.length; j++) {
                    try {
                        const response = await axios.request({
                            method: 'GET',
                            url: VITE_X_RAPIDAPI_URL2,
                            params: {
                                team: teamsGPT[j],
                                season: seasonsGPT[i]
                            },
                            headers: {
                                'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                                'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                            }
                        });
                        data.push(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            setAllPlayerData(data);
            setLoadingAllData(false);
        };

        fetchAllPlayerStats();
    }, []); // Empty array as second argument to run only once on mount

    useEffect(() => {
        const getData = async () => {
            const data = [];
            const seasonV2 = ["2023-2024", "2022-2023", "2021-2022", "2020-2021", "2019-2020"];
            for (let i = 0; i < seasonV2.length; i++) {
                try {
                    const options = {
                        method: 'GET',
                        url: VITE_X_RAPIDAPI_URL,
                        params: {
                            league: '12',
                            season: seasonV2[i]
                        },
                        headers: {
                            'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
                            'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST
                        }
                    };
                    const response = await axios.request(options);
                    data.push(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            setAllTeamData(data[0]); // Set the first element of data
        }
        getData()
    }, [])

    useEffect(() => {
        console.log("All Player Data:", allPlayerData);
    }, [allPlayerData]); // Dependency on allPlayerData

    useEffect(() => {
        console.log("All Team Data:", allTeamData);
    }, [allTeamData]); // Dependency on allTeamData

    const handleDownloadAllData = () => {
        const json = JSON.stringify(allPlayerData, null, 2); // Changed to allPlayerData
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'allPlayerData.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadAllTeamData = () => {
        const json = JSON.stringify(allTeamData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'allTeamData.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div>
            <h2>Testing...</h2>
            <button onClick={handleDownloadAllData} disabled={loadingAllData}>
                {loadingAllData ? "Downloading All Player Data..." : "Download All Player Data"}
            </button>
            <button onClick={handleDownloadAllTeamData} disabled={loadingAllData}>
                {loadingAllData ? "Downloading All Team Data..." : "Download All Team Data"}
            </button>
        </div>
    );
};

export default Predict;
