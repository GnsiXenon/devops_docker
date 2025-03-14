'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [testResult, setTestResult] = useState<{
    status: string;
    message: string;
    scores_count?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:7000/test-db');
        const data = await response.json();
        setTestResult(data);
      } catch (error) {
        setTestResult({
          status: 'error',
          message: 'Erreur de connexion à l\'API',
        });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Test de Connexion</h1>
        
        {loading ? (
          <p className="text-gray-600">Chargement en cours...</p>
        ) : testResult ? (
          <div>
            <div className={`p-4 rounded-lg ${
              testResult.status === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <p className={`font-medium ${
                testResult.status === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResult.message}
              </p>
              {testResult.scores_count !== undefined && (
                <p className="mt-2 text-gray-600">
                  Nombre d'entrées dans la table scores : {testResult.scores_count}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-600">Erreur lors du chargement des résultats</p>
        )}
      </div>
    </div>
  );
} 