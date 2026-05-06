import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import tutorialStudent from "../../assets/tutorial_Estu.png";
import tutorialTeacher from "../../assets/tutorial_profe.png";
import "./TutorialsPopUp.css";

interface TutorialsPopUpProps {
    onClose: () => void;
    isClosing?: boolean;
    studentHref?: string;
    teacherHref?: string;
}

type TutorialRole = {
    id: "student" | "teacher";
    label: string;
    image: string;
    imageAlt: string;
    href?: string;
};

const DEFAULT_STUDENT_TUTORIALS_URL = "https://www.youtube.com/channel/UCuVKb1o4IXyh2fItLZFxUUw/featured";
const DEFAULT_TEACHER_TUTORIALS_URL = "https://plataformalms.ustatunja.edu.co/login/index.php";

function TutorialsPopUp({
    onClose,
    isClosing = false,
    studentHref = DEFAULT_STUDENT_TUTORIALS_URL,
    teacherHref = DEFAULT_TEACHER_TUTORIALS_URL,
}: TutorialsPopUpProps) {
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

    const tutorialRoles: TutorialRole[] = [
        {
            id: "student",
            label: "Soy Estudiante",
            image: tutorialTeacher,
            imageAlt: "Acceso a tutoriales para estudiantes",
            href: studentHref,
        },
        {
            id: "teacher",
            label: "Soy Docente",
            image: tutorialStudent,
            imageAlt: "Acceso a tutoriales para Docentes",
            href: teacherHref,
        },
    ];

    return (
        <div className={`tutorials-popup-overlay${isClosing ? " is-closing" : ""}`}>
            <button
                type="button"
                className="tutorials-popup-backdrop"
                onClick={onClose}
                aria-label="Cerrar popup de tutoriales"
            />

            <section
                className="tutorials-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="tutorials-popup-title"
            >
                <header className="tutorials-popup-header">
                    <h1 className="tutorials-popup-title" id="tutorials-popup-title">
                        Tutoriales
                    </h1>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="tutorials-popup-close"
                        onClick={onClose}
                        aria-label="Cerrar tutoriales"
                    >
                        <X size={34} strokeWidth={2.6} />
                    </button>
                </header>

                <div className="tutorials-popup-body">
                    <div className="tutorials-popup-grid">
                        {tutorialRoles.map((role) => {
                            const actionClassName = `tutorials-option-button tutorials-option-button--${role.id}`;

                            return (
                                <article
                                    key={role.id}
                                    className={`tutorials-option tutorials-option--${role.id}`}
                                >
                                    <div className="tutorials-option-visual">
                                        <img
                                            src={role.image}
                                            alt={role.imageAlt}
                                            className="tutorials-option-image"
                                        />
                                    </div>

                                    {role.href ? (
                                        <a
                                            href={role.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={actionClassName}
                                        >
                                            {role.label}
                                        </a>
                                    ) : (
                                        <button type="button" className={actionClassName}>
                                            {role.label}
                                        </button>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TutorialsPopUp;
