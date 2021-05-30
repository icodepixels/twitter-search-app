import "./Hashtag.scss";

function Hashtag(props) {
    return (
        <button key={props.title} onClick={() => props.handleSubmit(props.title)} className={`Hashtag__button ${props.className}`} disabled={props.filterIsOn && props.title !== props.selectedFilter}>#{props.title}</button>
    );
}

export default Hashtag;
