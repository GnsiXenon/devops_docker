"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import React from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {

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
                body: JSON.stringify({ "username": "admin", "password": password }),
            });

            // Traiter la réponse de l'API GoLang si nécessaire
            data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API GoLang :', error);
        }
        if (data === "ok") {
            router.push('/admin');
        } else {
            toast.error("Wrong password !")
        }
    }



    return (
        <><ToastContainer />
            <main className="grid grid-cols-1 min-h-screen content-between">
                <Header />
                <div className="flex flex-col items-center p-24 ">
                    <form onSubmit={checkPassword}>
                        <input type="password" placeholder="admin's password" required className="p-4 border-4 rounded-lg border-blue focus:border-grayblue focus:outline-none"
                            onChange={e => setPassword(e.target.value)} />
                    </form>
                </div>
                <Footer />
            </main></>
    )
}