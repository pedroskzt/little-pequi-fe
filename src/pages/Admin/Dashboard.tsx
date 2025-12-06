import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {SparkLineChart} from "@mui/x-charts";

const Dashboard = () => {

    return (
        <>
            <Container>
                <Typography variant={'h4'}>Dashboard</Typography>
                <Stack direction={'row'} spacing={2}>
                    <Card>
                        <CardContent>
                            <Stack>
                                <Typography variant={"caption"}>Users</Typography>
                            </Stack>
                            <Stack sx={{alignItems: "flex-end"}} direction={"row"}>
                                <Typography variant={"h4"}>6</Typography>
                                <Box sx={{width: "100%", height: "50px"}}>
                                    <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]}/>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack>
                                <Typography variant={"caption"}>Menu Items</Typography>
                            </Stack>
                            <Stack sx={{alignItems: "flex-end"}} direction={"row"}>
                                <Typography variant={"h4"}>6</Typography>
                                <Box sx={{width: "100%", height: "50px"}}>
                                    <SparkLineChart data={[1, 2, 4, 6, 8, 10, 12, 14]}/>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack>
                                <Typography variant={"caption"}>Orders</Typography>
                            </Stack>
                            <Stack sx={{alignItems: "flex-end"}} direction={"row"}>
                                <Typography variant={"h4"}>6</Typography>
                                <Box sx={{width: "100%", height: "50px"}}>
                                    <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]}/>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>

            </Container>
        </>

    )
}

export default Dashboard;