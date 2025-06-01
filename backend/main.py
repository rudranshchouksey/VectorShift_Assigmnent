from fastapi import FastAPI, Form
from typing import List, Dict, Any
import json

app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Checks if a given graph (nodes and edges) is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort).
    """
    if not nodes:
        return True

    # Build adjacency list and in-degrees
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}

    for edge in edges:
        source = edge['source']
        target = edge['target']
        adj[source].append(target)
        in_degree[target] += 1

    # Initialize queue with nodes having in-degree 0
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_nodes = 0

    while queue:
        u = queue.pop(0)
        visited_nodes += 1

        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    return visited_nodes == len(nodes)

@app.post('/pipelines/parse') # Changed to POST to receive form data
def parse_pipeline(pipeline: str = Form(...)): # Expect pipeline data as a string form field
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])

        num_nodes = len(nodes)
        num_edges = len(edges)
        is_dag_result = is_dag(nodes, edges)

        return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag_result}
    except json.JSONDecodeError:
        return {'error': 'Invalid JSON format for pipeline data'}, 400
    except Exception as e:
        return {'error': str(e)}, 500