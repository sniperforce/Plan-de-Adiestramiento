import { ConnectDB } from '@/lib/config/db';
import TodoModel from '@/lib/models/TodoModel';
import { NextResponse } from 'next/server';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const toDos = await TodoModel.find({});

  return NextResponse.json({ toDos: toDos });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await TodoModel.create({ title, description });

  return NextResponse.json({ message: 'ToDo Created' });
}

export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get('mongoId');
  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ message: 'ToDo Deleted' });
}

export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get('mongoId');
  const isCompleted = await request.nextUrl.searchParams.get('isCompleted');
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: isCompleted === 'true' ? false : true,
    },
  });

  return NextResponse.json({ message: 'ToDo Completed' });
}
