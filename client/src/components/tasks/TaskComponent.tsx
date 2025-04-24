import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types';
import { useTaskStore } from '../../hooks/useTaskStore';
import { Button, ButtonGroup, MenuItem, Select, Tooltip } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import CloseIcon from '@mui/icons-material/Close';
import { Edit, Save } from '@mui/icons-material';
import { statusLabels } from '../../utils';


export const TaskComponent: React.FC<{ task: Task }> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedStatus, setEditedStatus] = useState<TaskStatus>(task.status);
    const removeTask = useTaskStore((state) => state.removeTask);
    const updateTask = useTaskStore((state) => state.updateTask);

    const handleDelete = () => {
        removeTask(task.id);
    };
    const handleUpdate = () => {
        if (isEditing) {
            setIsEditing(false);
            updateTask({ ...task, status: editedStatus });
        } else {
            setIsEditing(true);
        }
    };

    return (
        <>
            <TableCell component="th" scope="row">{task.title}</TableCell>
            <TableCell align="center">
                {isEditing ? (
                    <Select
                        value={editedStatus}
                        size="small"
                        onChange={(e) =>
                            setEditedStatus(e.target.value as TaskStatus)
                        }
                    >
                        {Object.keys(statusLabels).map((statusKey) => (
                            <MenuItem key={statusKey} value={statusKey}>
                                {statusLabels[statusKey as TaskStatus]}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    statusLabels[task.status]
                )}
            </TableCell>

            <TableCell align="center">
                <ButtonGroup variant="contained" >
                    { isEditing ?
                            <Tooltip title="Save">
                                <Button color="success" variant="contained" onClick={handleUpdate}>
                                    <Save />
                                </Button>
                            </Tooltip>
                        :
                            <Tooltip title="Edit">
                                <Button color="warning" variant="contained" onClick={handleUpdate}>
                                    <Edit />
                                </Button>
                            </Tooltip>
                    }
                    <Tooltip title="Delete">
                        <Button color="error" variant="contained" onClick={handleDelete}>
                            <CloseIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </TableCell>
        </>
    );
}
