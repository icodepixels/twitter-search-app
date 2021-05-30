import React, { useState } from 'react';
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./Form.scss";

const Form = (props) => {
    const [hashtag, setHashtag] = useState('');

    function handleFormSubmit(e) {
        const value = e.target.value;
        e.preventDefault();
        setHashtag(value);
        return props.handleSubmit(value);
    }

    return (
        <form className={`Form`} onSubmit={handleFormSubmit}>
            <div></div>
                <div className={`Form__searchField`}>
                    <FontAwesomeIcon icon={faSearch} className={`Form__icon`} />
                    <input className={`Form__input`} type="text" name="hashtag" defaultValue={hashtag} onChange={debounce(handleFormSubmit, 200)} placeholder={`Search by keyword`} />
                </div>
        </form>
    );
}

export default Form;