"use client"

import React from "react";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const GeoGuessrPage = () => {
    const [data, setData] = React.useState([]);
    const router = useRouter();

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("This code runs only on the client side.");
            
            console.log("Data from API:", data);
        }

        const fetchData = async () => {
            try {
                const response = await fetch('/api/score');
                const apiData = await response.json();
                setData(apiData.score);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);

    const scoreFilter = data.filter((item) => item.id === 1);

    return (
        <>
            <div className="grid grid-cols-1 content-between min-h-screen">
                
                <div className="flex flex-col w-full h-screen bg-[url('/201.webp')] bg-no-repeat bg-contain bg-center">
                    <Header />
                    {/*div pour le bloc de la carte simulée */}
                    <div className="flex">
                        {/* Deuxième bloc à gauche */}
                        <div className="w-3/4 h-60 mb-4 self-end ">
                            <div className="Score">
                                <p className="text-4xl text-center text-blue">Score</p>
                                <p className="text-4xl text-center text-blue">{scoreFilter.map((item) => (
                                    <li key={item.id}>{item.score}</li>
                                ))}</p>
                            </div>
                        </div>
                        {/* Premier bloc à droite */}
                        <div className="w-full h-60 mb-4 mx-2 self-end ">
                            {/*image statique de la carte en tant qu'arrière-plan */}
                            <div className="h-full w-full bg-center bg-contain bg-no-repeat bg-[url('/1er.jpg')]" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeoGuessrPage;