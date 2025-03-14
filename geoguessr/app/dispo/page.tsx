"use client"

import React from 'react';

import Header from '../../components/header.tsx';

function Page() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/salle');
                const apiData = await response.json();
                setData(apiData.salle);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);
    console.log(data);

    const handleClick = (item) => {
    window.location.href = `/perso?id=${item.id}`;
    };

    const Carte = () => (
        <div className="grid grid-cols-4 gap-4 w-screen mx-auto rounded overflow-hidden shadow-lg">
            {data.map((item) => (
            <div key={item.id} className="border-2 rounded-lg bg-lescouleurscasertarien" onClick={() => handleClick(item)}>
                {item.disponibility ? (<p className="text-gren text-right"> Disponible </p>) : (<p className="text-red text-right"> Non disponible </p>)}
                <div className="px-6 py-7">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                </div>
                <div className="card-image-container">
                    <img src={`http://localhost:7000/image/${item.id}`} alt="nous n'avons pas d'image de la salle" className="w-full h-auto rounded-t" />
                </div>
            </div>
            ))}
        </div>
    );

    return (
        <main className="bg-celeste min-h-screen">
            <Header/>
            <h1 className="text-5xl font-bold text-grayblue">
                <div className="p-12 flex items-center justify-center w-screen ">
                    Vérifier la disponibilité des salles !!
                </div>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Carte />
            </div>
        </main>
    )
}

export default Page;
