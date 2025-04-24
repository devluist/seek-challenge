import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { Layout } from './Layout';
import { useTaskStore } from '../hooks/useTaskStore';

export const DashboardPage: React.FC = () => {
    const { tasks, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const data = useMemo(() => {
        // Group tasks by status and count
        // This should be on the server side, but this seems easier for the challange and time constraint
        const counts: { [key: string]: number } = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(counts).map(([status, count]) => ({
            status,
            tasks: count,
        }));
    }, [tasks]);

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <h1>Dashboard</h1>
                <p>Tasks grouped by status</p>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        { data.length === 0 ?
                            (<p>No tasks available</p>)
                        :
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="status" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="tasks" fill="#8884d8" />
                            </BarChart>
                        }
                    </ResponsiveContainer>
                </div>
            </div>
        </Layout>
    );
};
