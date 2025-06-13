
import { Link } from "react-router-dom";

function SectionHeader({ title, link }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl">{title}</h2>
            {link && (
                <Link to={link} className="text-neutral-400 text-sm font-bold hover:underline">
                    Show all
                </Link>
            )}
        </div>
    );
}

export default SectionHeader;
