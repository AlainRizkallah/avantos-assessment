import { Node, Edge } from 'react-flow-renderer';

export const findUpstreamNodes = (currentNode: Node, nodes: Node[], edges: Edge[]): Node[] => {
    const upstreamNodes: Node[] = [];
    const visited = new Set<string>();

    const traverse = (nodeId: string) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        // Find edges where the current node is the target
        edges.forEach((edge) => {
            if (edge.target === nodeId) {
                const upstreamNode = nodes.find((n) => n.id === edge.source);
                if (upstreamNode && !upstreamNodes.some((n) => n.id === upstreamNode.id)) {
                    upstreamNodes.push(upstreamNode);
                    traverse(upstreamNode.id); // Recursively traverse further upstream
                }
            }
        });
    };

    traverse(currentNode.id);
    return upstreamNodes.filter(node => node.id !== currentNode.id);
};
