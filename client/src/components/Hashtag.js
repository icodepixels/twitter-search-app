import "./Hashtag.scss";

function Hashtag(props) {
    return (
        <button key={props.title} onClick={() => props.handleSubmit(props.title)} className={`Hashtag__button ${props.className}`} disabled={props.filterIsOn && props.title.toLowerCase() !== props.selectedFilter.toLowerCase()}>#{props.title}</button>
    );
}

export default Hashtag;
