import React from 'react';
import {
    Container,
    Typography,
    Card,
    Fab,
    MenuItem,
    Menu,
} from '@mui/material';
import { useTaskStore } from '../hooks/useTaskStore';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { Layout } from './Layout';



export const TaskPage: React.FC = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const fetchTasks = useTaskStore((state) => state.fetchTasks);


    React.useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <Layout>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                    Tasks
                </Typography>

                <Card sx={{ borderRadius: 0 }}>
                    <TaskForm />
                </Card>

                <TaskList tasks={tasks} />
            </Container>
        </Layout>
    );
};
