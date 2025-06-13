function CreateCard({ title, description, buttonText }) {
    return (
        <div className="bg-neutral-800 rounded-md p-4 mb-4">
            <h3 className="font-bold text-base mb-1">{title}</h3>
            <p className="text-sm text-neutral-400 mb-4">{description}</p>
            <a href="/"><button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm">
                {buttonText}
            </button></a>
        </div>
    );
}
export default CreateCard;