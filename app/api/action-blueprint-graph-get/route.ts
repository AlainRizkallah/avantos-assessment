import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    nodes: [
      { id: '1', data: { label: 'Form A' }, position: { x: 100, y: 100 }, sourcePosition: 'right', targetPosition: 'left' },
      { id: '2', data: { label: 'Form B' }, position: { x: 300, y: 0 }, sourcePosition: 'right', targetPosition: 'left' },
      { id: '3', data: { label: 'Form D' }, position: { x: 500, y: 0 }, sourcePosition: 'right', targetPosition: 'left' },
      { id: '4', data: { label: 'Form C' }, position: { x: 300, y: 200 }, sourcePosition: 'right', targetPosition: 'left' },
      { id: '5', data: { label: 'Form E' }, position: { x: 500, y: 200 }, sourcePosition: 'right', targetPosition: 'left' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  };

  return NextResponse.json(data);
}