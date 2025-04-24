import React from 'react';
import { Task } from '../../types';
import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TaskComponent } from './TaskComponent';



export const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return <TableContainer component={Card} sx={{ borderRadius: 0 }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {tasks.map((task: Task) => (
                    <TableRow key={task.id}>
                        <TaskComponent task={task} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}
