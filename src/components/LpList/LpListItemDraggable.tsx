import {attachClosestEdge, type Edge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import DropIndicator from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {ListItemProps} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import {ReactNode} from "react";
import {useEffect, useRef, useState} from 'react';

interface IListItemProps<T> extends ListItemProps {
    item: T;
    children: ReactNode;
}


const LpListItemDraggable = <T extends { id: number | string }>(props: IListItemProps<T>) => {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dropEdge, setDropEdge] = useState<Edge | null>(null);

    const {item, children, ...renderProps} = props;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Create a combined function calling draggable and dropTarget functions
        return combine(
            draggable({
                element: element,
                getInitialData: () => item,
                onDragStart: () => setIsDragging(true),
                onDrop: () => setIsDragging(false),
            }),
            dropTargetForElements({
                element: element,
                getData: ({input}) => {
                    return attachClosestEdge(item, {
                        element,
                        input,
                        allowedEdges: ['top', 'bottom']
                    });
                },
                getDropEffect: () => 'move',
                onDrop: () => setDropEdge(null),
                onDragEnter: ({self}) => setDropEdge(extractClosestEdge(self.data)),
                onDragLeave: () => setDropEdge(null),

            })
        );
    }, [item]);

    return (
        <>
            <ListItem
                {...renderProps}
                disablePadding
                alignItems={"flex-start"}
                ref={ref}
                style={{
                    position: 'relative',
                    padding: '10px',
                    margin: '5px 0',
                    backgroundColor: isDragging ? 'var(--secondary-color)' : '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    opacity: isDragging ? 0.4 : 1,
                    transition: 'background-color 0.2s ease, opacity 0.2s ease',
                }}
                sx={{
                    '&:hover': {
                        cursor: 'grab',
                        backgroundColor: 'var(--secondary-color) !important',
                    },
                }}>
                {children}
                {dropEdge && <DropIndicator edge={dropEdge}/>}
            </ListItem>
        </>
    );
};

export default LpListItemDraggable;