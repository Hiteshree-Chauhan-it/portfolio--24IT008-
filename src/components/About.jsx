import "./About.css"

function About({heading , paragraph}){
    return (
        <section id="about" className="about">
            <h2>{heading}</h2>
            <p>{paragraph}</p>
        </section>
    );
}

export default About;