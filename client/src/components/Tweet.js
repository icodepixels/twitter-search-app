import get from "lodash.get";
import Hashtag from "./Hashtag";
import "./Tweet.scss";

function Tweet({ tweet, handleSubmit, selectedFilter, filterIsOn }) {
    const profileImg = get(tweet, 'user.profile_image_url', '');
    const name = get(tweet, 'user.screen_name', '');
    const text = get(tweet, 'text', '');
    const id = get(tweet, 'id', '');
    const hashtags = get(tweet, 'entities.hashtags', []);

    function addLinks(t) {
        const replacePattern = /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
        const replacedText = t.replace(replacePattern, '<a href="$1" target="_blank">$1</a>');
        return replacedText;
    }

    return (
        <div key={id} className={`Tweet__result`}>
            <div className={`Tweet__column`}>
                <img src={profileImg} alt={name} className={`Tweet__image`} />
            </div>
            <div className={`Tweet__column`}>
                <div className={`Tweet__name`}>@{name}</div>
                <p className={`Tweet__text`} dangerouslySetInnerHTML={{__html: addLinks(text)}} />
                <div className={`Tweet__buttons`}>
                    {hashtags.length > 0 && hashtags.map(tag => <Hashtag key={tag.text} filterIsOn={filterIsOn} selectedFilter={selectedFilter} title={tag.text} handleSubmit={handleSubmit} className={`Tweet__hashtag`} />)}
                </div>
            </div>
        </div>
    )
}

export default Tweet;
