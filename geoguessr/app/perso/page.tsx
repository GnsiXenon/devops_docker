"use client"

import React from 'react';

import Header from '../../components/header.tsx';

function PagePerso(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/salle?id=${id}`);
                const apiData = await response.json();
                setData(apiData.salle);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);
    console.log(data);

    const Card = () => (
        <div className="bg-blue">
                <div key={data.id} className="border-2 rounded-lg bg-lescouleurscasertarien">
                    <p>Votre salle est la salle: {data.name}</p>
                    <p>elle est à l'étage : {data.floor}</p>
                    <p>elle est {data.disponibility ? (<p className=" flex text-gren"> Disponible </p>) : (<p className="flex text-red"> Non disponible </p>)}</p>
                </div>
                <img src={`http://localhost:7000/image/${data.id}`} alt="nous n'avons pas d'image de la salle" className="h-auto rounded-t w-1/2" />
        </div>
    );

    return (
        <main className="bg-celeste min-h-screen">
            <Header/>
            <h1 className="text-5xl font-bold text-grayblue">
                <div className="p-12 flex items-center justify-center w-screen ">
                    
                </div>
            </h1>
            <Card />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            </div>
        </main>
    )
}

export default PagePerso;