import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

export type Node = { nodeId: number; pubKey: string };

export type RegisterNodeBody = {
  nodeId: number;
  pubKey: string;
};

export type GetNodeRegistryBody = {
  nodes: Node[];
};

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  _registry.get('/status', (req, res) => {
    res.send('live');
  });

  //3.1
  _registry.post('/registerNode', async (req: Request, res: Response) => {
    const { nodeId, pubKey }: RegisterNodeBody = req.body;
    // Assuming an in-memory map or similar structure for storing registered nodes
    if(nodes.has(nodeId)) {
      return res.status(400).send({ error: 'Node already registered' });
    }
    nodes.set(nodeId, { nodeId, pubKey });
    res.status(201).send({ message: 'Node registered successfully' });
  });
  

  //3.2
  _registry.get('/getPrivateKey', (req, res) => {
    
  });


  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`Registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}