import React, { useState } from 'react';
import { TaskInput } from '../../types';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTaskStore } from '../../hooks/useTaskStore';



export const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskText.trim() === '') return;

        const newTask: TaskInput = {
            title: taskText,
            status: 'todo'
        };

        addTask(newTask);
        setTaskText('');
    };


    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                justifyContent: "space-evenly",
                alignItems: 'center'
            }}
        >
            <TextField
                value={taskText}
                sx={{ m: 1, minWidth: 200, flexGrow: 1 }}
                size="small"
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter a task"
            />
            <Button variant='contained' size='small' type="submit" sx={{ p: 1, m: 1 }}>
                <Add />
            </Button>
        </form>
    );
};
