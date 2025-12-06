import {extractClosestEdge} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {reorderWithEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import {monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {ListProps} from "@mui/material";
import {List} from "@mui/material";
import {ReactNode} from "react";
import {useEffect} from 'react';
import {default as ListItem} from "./LpListItemDraggable.tsx";

interface IDraggableListProps<T> extends ListProps {
    items: T[];
    onReorder: (reorderedItems: T[]) => void;
    renderItem: (item: T, display_order: number) => ReactNode;
}


const LpListDraggable = <T extends { id: number | string }>(props: IDraggableListProps<T>) => {
    const {items, onReorder, renderItem, ...renderProps} = props;

    useEffect(() => {
        // Set up the monitor as the central listener for all drag-and-drop events
        // Return the monitor function to unsubscribe on the component unmount
        return monitorForElements({
            onDrop({location, source}) {

                const target = location.current.dropTargets[0];
                if (!target) return; // Dropped outside a valid target

                const sourceData = source.data;
                const targetData = target.data;
                //
                if (sourceData.id === targetData.id) return; // Dropped on itself

                const startIndex = items.findIndex(item => item.id === sourceData.id);
                const finishIndex = items.findIndex(item => item.id === targetData.id);

                if (startIndex < 0 || finishIndex < 0) return; // Something went wrong

                const closestEdgeOfTarget = extractClosestEdge(targetData)

                const reorderedItems = reorderWithEdge({
                    list: items,
                    startIndex: startIndex,
                    indexOfTarget: finishIndex,
                    closestEdgeOfTarget: closestEdgeOfTarget,
                    axis: 'vertical'
                })

                onReorder(reorderedItems);
            },
        });
    }, [items, onReorder]); // Re-subscribe if items change to ensure indices are correct

    return (
        <>
            <List {...renderProps}>
                {items.map(
                    (item, index) => (
                        <ListItem key={item.id} item={item}>
                            {renderItem(item, index)}
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
};

export default LpListDraggable;