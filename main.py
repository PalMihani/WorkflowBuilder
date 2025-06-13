from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineRequest(BaseModel):
    pipeline: Pipeline

@app.get("/")
def read_root():
    return {"message": "Backend running"}

@app.post("/pipelines/run")
def run_pipeline(request: PipelineRequest):
    nodes = request.pipeline.nodes
    edges = request.pipeline.edges

    return {
        "status": "success",
        "message": "Pipeline executed.",
        "node_count": len(nodes),
        "edge_count": len(edges),
    }
