import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LpImage from "../../components/LpImage/LpImage.tsx";

const About = () => {
    return (
        <Container sx={{my: 3}}>
            <Stack direction={"column"} spacing={2}>
                <Grid container spacing={3}>
                    <Grid container direction={"column"} size={4} justifyContent={"center"}>
                        <LpImage
                            src={"https://storage.googleapis.com/little-pequi/assets/pequi.jpg"}
                            alt="Real Pequi photo"
                            sx={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                            }}/>

                    </Grid>
                    <Grid size={8}>
                        <Typography variant="h3">About Us</Typography>
                        <Typography variant="body1" textAlign={"justify"} mb={1}>
                            Little Pequi is a fictional restaurant brought to life through this comprehensive restaurant
                            website project. Although Little Pequi isn't an actual restaurant, this project
                            serves as a showcase of my ability to design and implement a fully functioning restaurant
                            management solution, providing an immersive and engaging experience for users and visitors
                            alike. The purpose of creating the Little Pequi site is to demonstrate my
                            technical skills in web development, user experience design, and application architecture
                            within a real-world context.
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography variant="h3">Behind The Scenes</Typography>
                        <Typography variant="body1" textAlign={"justify"} mb={1}>
                            The platform is designed as a full-stack solution with a modern microservice architecture,
                            seamlessly integrating a robust backend with a modern and interactive frontend.
                        </Typography>
                        <Typography textAlign={"justify"} mb={1}>
                            The frontend is built using React with TypeScript and Material-UI, providing a fast,
                            responsive, and user-friendly interface. Features include dynamic menu browsing, interactive
                            reservation forms, and intuitive account management—all designed for both desktop and mobile
                            users.
                        </Typography>
                        <Typography textAlign={"justify"}>
                            The backend is powered by Python and Django. It offers secure RESTful APIs for
                            authentication, user profiles, reservations, menu management, and order processing. This
                            architecture ensures reliable performance, security, and easy scalability for future
                            enhancements.
                        </Typography>
                    </Grid>
                    <Grid container direction={"column"} size={4} justifyContent={"center"}>
                        <LpImage src={"https://storage.googleapis.com/little-pequi/assets/muiTS.png"}
                                 alt="MUI TypeScript"
                                 sx={{
                                     width: "100%",
                                     height: "auto",
                                     objectFit: "cover",
                                 }}/>

                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}

export default About;