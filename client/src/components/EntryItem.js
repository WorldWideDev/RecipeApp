import React, { useState } from 'react';

const EntryItem = (props) => {
    const { value, onEntryItemChanged, onEntryItemDeleted } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(value);

    function renderDefault() {
        return <span onClick={() => setIsEdit(true)}>{value}</span>
    }
    function onUpdateHandler() {
        setIsEdit(false);
        onEntryItemChanged(text);
    }
    function renderEditing() {
        return (
            <div className="entry-item-form-group">
                <input autoFocus className="form-control"
                    type="text" value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <button className="btn btn-warning"
                    onClick={onUpdateHandler}>Edit</button>
                <button className="btn btn-danger"
                    onClick={onEntryItemDeleted}>Delete</button>
            </div>
        )
    }

    return  isEdit ? renderEditing() : renderDefault();
}

export default EntryItem;
