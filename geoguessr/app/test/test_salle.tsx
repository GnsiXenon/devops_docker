import request from 'supertest';
import { createServer, Server } from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { GET } from '../api/salle/route'; // Importez la fonction GET

// Mock de fetch pour les tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ salle: [] }), // Données retournées par l'API mockée
    status: 200,  // Code HTTP de la réponse
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    ok: true,
    redirected: false,
    type: 'basic',
    url: 'http://localhost/salle',
  } as unknown as Response) // Force l'assertion de type pour que TypeScript accepte le mock
);

describe('GET /salle API', () => {
  let server: Server;

  beforeAll(() => {
    server = createServer((req: IncomingMessage, res: ServerResponse) => {
      if (req.method === 'GET') {
        try {
          // Créer un objet Request manuellement pour l'adapter à la fonction GET
          const url = `http://localhost${req.url}`; // Créer une URL avec la base
          const requestObj = new Request(url, { method: 'GET' }); // Créer un objet Request de manière personnalisée

          GET(requestObj).then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.body));
          }).catch((err) => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          });
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      }
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should handle errors gracefully', async () => {
    const response = await request(server).get('/salle?id=invalid');
    expect(response.status).toBe(500);
  });
});
