import boyImg from '../../assets/Home_estu1.png';
import backgroundImg from '../../assets/Captura de pantalla 2026-03-19 161159.png';
import './QueHacemos.css';

function QueHacemos() {
    return (
        <section className="que-hacemos" aria-labelledby="que-hacemos-title">
            <div
                className="que-hacemos__bg"
                aria-hidden="true"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            />
            <div className="que-hacemos__wash" aria-hidden="true" />
            <span className="que-hacemos__corner" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--top" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--bottom" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--top-right" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--pink" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--bottom-right" aria-hidden="true" />
            <span className="que-hacemos__fill-circle" aria-hidden="true" />

            <div className="que-hacemos__inner">
                <div className="que-hacemos__copy">
                    <h2 id="que-hacemos-title">¿Qué hacemos?</h2>
                    <p>
                        Nuestro campo de acción está basado en el uso pedagógico de las TIC, los
                        recursos para el aprendizaje, los ambientes virtuales de aprendizaje
                        interactivos, la infraestructura tecnológica adecuada y suficiente,
                        partiendo de una gestión académica y administrativa que promueve la
                        Educación virtual con impacto social, humanizante, de desarrollo y de
                        crecimiento.
                    </p>
                </div>

                <div className="que-hacemos__visual" aria-hidden="true">
                    <span className="que-hacemos__triangle que-hacemos__triangle--left" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--top" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--center" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--right" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--outline" />
                    <img src={boyImg} alt="" className="que-hacemos__boy" />
                </div>
            </div>
        </section>
    );
}

export default QueHacemos;
