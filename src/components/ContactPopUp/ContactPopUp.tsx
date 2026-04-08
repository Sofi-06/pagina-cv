import { useEffect, useRef } from "react";
import { Mail, PhoneCall, X } from "lucide-react";
import "./ContactPopUp.css";

interface ContactPopUpProps {
    onClose: () => void;
    isClosing?: boolean;
    email?: string;
    phoneLabel?: string;
    phoneValue?: string;
    phoneHref?: string;
}

const DEFAULT_EMAIL = "aux.campusvirtual@ustatunja.edu.co";
const DEFAULT_PHONE_LABEL = "PBX: (608) 7 44 04 04";
const DEFAULT_PHONE_VALUE = "5470 - 5471 - 5473";
const DEFAULT_PHONE_HREF = "tel:+577440404";

function ContactPopUp({
    onClose,
    isClosing = false,
    email = DEFAULT_EMAIL,
    phoneLabel = DEFAULT_PHONE_LABEL,
    phoneValue = DEFAULT_PHONE_VALUE,
    phoneHref = DEFAULT_PHONE_HREF,
}: ContactPopUpProps) {
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const { body } = document;
        const previousOverflow = body.style.overflow;

        body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <div className={`contact-popup-overlay${isClosing ? " is-closing" : ""}`}>
            <button
                type="button"
                className="contact-popup-backdrop"
                onClick={onClose}
                aria-label="Cerrar popup de contacto"
            />

            <section
                className="contact-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-popup-title"
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="contact-popup-close"
                    onClick={onClose}
                    aria-label="Cerrar contacto"
                >
                    <X size={32} strokeWidth={2.6} />
                </button>

                <div className="contact-popup-card">
                    <p className="contact-popup-kicker">Necesitas ayuda o tienes alguna pregunta?</p>
                    <h1 className="contact-popup-title" id="contact-popup-title">
                        Contáctanos
                    </h1>

                    <div className="contact-popup-details">
                        <div className="contact-popup-item">
                            <span className="contact-popup-icon" aria-hidden="true">
                                <Mail size={30} strokeWidth={2.2} />
                            </span>
                            <a className="contact-popup-link" href={`mailto:${email}`}>
                                {email}
                            </a>
                        </div>

                        <div className="contact-popup-item">
                            <span className="contact-popup-icon" aria-hidden="true">
                                <PhoneCall size={30} strokeWidth={2.2} />
                            </span>
                            <div className="contact-popup-phone-block">
                                <span className="contact-popup-phone-label">{phoneLabel}</span>
                                <a className="contact-popup-link" href={phoneHref}>
                                    {phoneValue}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactPopUp;
