import "./Footer.css"

function Footer({name,year}){
    return(
        <footer className="footer">
            <p>
                &copy; {year} {name}. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;