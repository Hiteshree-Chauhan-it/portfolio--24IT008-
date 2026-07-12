import "./Header.css"
function Header({siteTitle , name}){
    return(
        <header className="header">
            <h1 className="site-Title">{siteTitle}</h1>
            <p className="header-name">{name}</p>
        </header>
    );
}

export default Header;