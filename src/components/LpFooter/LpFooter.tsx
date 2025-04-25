import logoFooter from "../../assets/home/logo_footer.png";

export const LpFooter = () => {
    return (
        <footer>
            <article>
                <img src={logoFooter} alt="Little Pequi Logo"/>
            </article>
            <article>
                <p>Copyright Little Pequi</p>
            </article>
        </footer>
    )
}

export default LpFooter;