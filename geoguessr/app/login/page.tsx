"use client"

import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


export default function Soleil() {

    const [mail, setMail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    async function checkPassword(e: { preventDefault: () => void }) {
        e.preventDefault();
        var data
        try {
            const response = await fetch('http://localhost:7000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": mail, "password": password }),
            });

            // Traiter la réponse de l'API GoLang si nécessaire
            data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API GoLang :', error);
        }
        if (data === "ok") {
            router.push('/');
        } else {
            toast.error("Adresse mail / mot de passe incorrect !")
        }
    }

    return (
        <main className="grid grid-cols-1 min-h-screen content-between">
            <ToastContainer />
            <div className="grid grid-cols-3 content-center ml-80 mr-80">
                <div className="flex flex-col items-center justify-between bg-blue rounded-l-xl pt-16 pb-16 text-white">
                    <img src="/teddyriner.svg" width={150} />
                    <div className="mt-8 font-bold text-xl">Bienvenue dans la communauté Ynov</div>
                    <div className="m-8">Candidats, Etudiants, Professeurs et Entreprises : accédez aux outils et services Ynov Campus à l'aide de votre Compte Ynov !</div>
                    <div className="border-2 border-white rounded-lg p-2 pl-8 pr-8">
                        Créer un compte
                    </div>

                </div>
                <form className="flex flex-col items-center justify-center space-y-4 bg-white rounded-r-xl col-span-2 pt-16 pb-16" onSubmit={checkPassword}>
                    <div className="text-blue text-4xl font-bold">Connexion</div>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="mail">E-mail :</label>
                        <input type="text" id="mail" name="mail" required className="border-2 rounded-lg p-2" onChange={e => setMail(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" required className="border-2 rounded-lg p-2" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Connexion" className="bg-blue p-2 pr-16 pl-16 rounded-lg hover:bg-white border-4 border-blue hover:text-blue text-white" />
                </form>
                <Link href="/logadmin" className="text-black p-2 m-2 border-2 w-fit rounded-lg text-blue hover:text-grayblue">mode admin</Link>
            </div>
            
            <Footer />
        </main>
    )
}