import mongoose from 'mongoose';

export const ConnectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://iuhubcz:afgazcbz@cluster0.ylaqpdn.mongodb.net/ToDoApp'
  );
  console.log('db connected');
};
