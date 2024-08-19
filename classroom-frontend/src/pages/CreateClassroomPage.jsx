// pages/CreateClassroomPage.js
import React from 'react';
import ClassroomForm from '../components/ClassroomForm';
import {api} from '..api/';

const CreateClassroomPage = () => {
  const handleCreateClassroom = async (classroomData) => {
    try {
      const response = await api.post('/classrooms/create', classroomData);
      console.log('Classroom created:', response.data);
    } catch (error) {
      console.error('Error creating classroom:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <h1>Create Classroom</h1>
      <ClassroomForm onCreate={handleCreateClassroom} />
    </div>
  );
};

export default CreateClassroomPage;
