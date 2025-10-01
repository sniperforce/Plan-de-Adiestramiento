import mongoose from 'mongoose';

export const ConnectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://diegozera9_db_user:gCImUBQthD3py0XL@cluster0.ylaqpdn.mongodb.net/ToDoApp'
  );
  console.log('db connected');
};
