import React, { useState, useEffect } from 'react';
import Hashtag from "./Hashtag";
import "./Hashtags.scss";

const HASHTAGS = [
    "coding",
    "Python",
    "ComputerScience",
    "gitmergememes",
    "Engineering"
];

function Hashtags(props) {
    const [hashtags, setHashtags] = useState(HASHTAGS);

    useEffect(() => {
        const uniqueHashtags = [...HASHTAGS, ...props.hashtags];
        let uniqueChars = [...new Set(uniqueHashtags)];
        setHashtags(uniqueChars);
    }, [props.hashtags]);

    return (
        <div className={`Hashtags`}>
            <h2 className={`Hashtags__title`}>Filter by hashtag</h2>
            <div className={`Hashtags__tags`}>
                {hashtags.map(hashtag => hashtag != null && <Hashtag key={hashtag} filterIsOn={props.filterIsOn} selectedFilter={props.selectedFilter} title={hashtag} handleSubmit={props.handleSubmit} className={`Hashtags__button`} />)}
            </div>
        </div>
    );
}

export default Hashtags;
