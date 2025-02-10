import { findUpstreamNodes } from '../utils/findUpstreamNodes';
import { Node, Edge } from 'react-flow-renderer';

describe('findUpstreamNodes', () => {
    const nodes: Node[] = [
        { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Node 2' } },
        { id: '3', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Node 3' } },
        { id: '4', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Node 4' } }
    ];

    it('returns upstream nodes in a simple chain', () => {
        const edges: Edge[] = [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' }
        ];

        const upstream = findUpstreamNodes(nodes[2], nodes, edges);
        expect(upstream).toHaveLength(2);
        expect(upstream.map((node) => node.id)).toEqual(['2', '1']);
    });

    it('returns multiple upstream nodes in a branching graph', () => {
        const edges: Edge[] = [
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-4', source: '3', target: '4' }
        ];

        const upstream = findUpstreamNodes(nodes[3], nodes, edges);
        expect(upstream).toHaveLength(3);
        expect(upstream.map((node) => node.id)).toEqual(expect.arrayContaining(['3', '2', '1']));
    });

    it('returns an empty array if no upstream nodes exist', () => {
        const edges: Edge[] = [];
        const upstream = findUpstreamNodes(nodes[0], nodes, edges);
        expect(upstream).toEqual([]);
    });

    it('handles cyclic graphs without infinite loops', () => {
        const edges: Edge[] = [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
            { id: 'e3-1', source: '3', target: '1' }
        ];

        const upstream = findUpstreamNodes(nodes[2], nodes, edges);
        expect(upstream).toHaveLength(2);
        expect(upstream.map((node) => node.id)).toEqual(expect.arrayContaining(['2', '1']));
    });
});
