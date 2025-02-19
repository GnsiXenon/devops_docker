"use client"

import React from 'react';
import Header from '@/components/header';

function Page() {

    const [data, setData] = React.useState([]);
    const [name, setName] = React.useState('');
    const [x, setX] = React.useState(0.0);
    const [y, setY] = React.useState(0.0);
    const [floor, setFloor] = React.useState(0);
    const [image, setImage] = React.useState(null);

    async function sendData(e: { preventDefault: () => void }) {
        e.preventDefault();
        var data
        try {
            const response = await fetch('http://localhost:7000/salle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "cordinnates_x": x,
                    "cordinnates_y": y,
                    "floor": floor,
                    "disponibility": true,
                    "photo": image
                    }),
            });

            // Traiter la réponse de l'API GoLang si nécessaire
            data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API GoLang :', error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch('/api/salle');
            const apiData = await response.json();
            setData(apiData.salle);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API', error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const Delete = async (id) => {
        try {
            const deleteResponse = await fetch(`http://localhost:7000/salle/${id}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                // Rafraîchissez vos données après la suppression si nécessaire
                fetchData();
                console.log('Suppression réussie');
            } else {
                console.error('Échec de la suppression');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
    };

    const Carte = () => (
        <div className="grid grid-cols-4 gap-4 w-screen mx-auto rounded overflow-hidden shadow-lg">
            {data.map((item) => (
                <div key={item.id} className="border-2 rounded-lg bg-lescouleurscasertarien">
                    <button onClick={() => Delete(item.id)}>supprimer</button>
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

    const handleEntierChange = (e) => {
        const nouvelleValeur = parseInt(e.target.value, 10);
        setFloor(nouvelleValeur);
    };

    const handleX = (e) => {
        const nouvelleValeur = parseFloat(e.target.value);
        setX(nouvelleValeur);
    };

    const handleY = (e) => {
        const nouvelleValeur = parseFloat(e.target.value);
        setY(nouvelleValeur);
    };


    console.log(data)

    return (
        <main className="bg-celeste min-h-screen">
            <Header />
            <form onSubmit={sendData}>
                <input type='text' id='name' name='name' placeholder='nom de la salle' onChange={e => setName(e.target.value)} />
                <input type='number' step={0.01} placeholder='coordonnée x' onChange={handleX} />
                <input type='number' step={0.01} placeholder='coordonnée y' onChange={handleY} />
                <input type='number' placeholder='étage' onChange={handleEntierChange} />
                <input type='file' accept='image/*' onChange={handleFileChange} />
                <button type='submit'>envoyer</button>
            </form>

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
