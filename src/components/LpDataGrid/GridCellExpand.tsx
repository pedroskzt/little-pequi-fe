import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import {memo, useEffect, useRef, useState} from "react";

interface GridCellExpandProps {
    values: string[] | string;
    width: number;
}

function isOverflown(element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = memo(
    function GridCellExpand(
        props: GridCellExpandProps,
    ) {
        const {width, values} = props;
        const wrapper = useRef<HTMLDivElement | null>(null);
        const cellDiv = useRef(null);
        const cellValue = useRef(null);
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const [showFullCell, setShowFullCell] = useState(false);
        const [showPopper, setShowPopper] = useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current!);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent: KeyboardEvent) {
                if (nativeEvent.key === 'Escape') {
                    setShowFullCell(false);
                }
            }

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    alignItems: 'center',
                    lineHeight: '24px',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                }}>
                <Box
                    ref={cellDiv}
                    sx={{
                        height: '100%',
                        width,
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                    }}/>
                <Box
                    ref={cellValue}
                    sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {Array.isArray(values) &&
                        values.map(value => <Chip key={value} label={value}/>)}
                    {!Array.isArray(values) && values}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{width, marginLeft: -17}}>
                        <Paper
                            elevation={9}
                            style={{minHeight: wrapper.current!.offsetHeight - 3}}>
                            {Array.isArray(values) &&
                                values.map(
                                    value =>
                                        <Chip
                                            key={value}
                                            label={value}
                                            size={"small"}
                                            sx={{
                                                marginY: 0.5,
                                                marginX: 2
                                            }}/>
                                )
                            }
                            {!Array.isArray(values) && values}
                        </Paper>
                    </Popper>
                )}
            </Box>
        );
    });

export default GridCellExpand;