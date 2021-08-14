import React, { useState } from 'react';

const EntryItem = (props) => {
    const { value, onEntryItemChanged, onEntryItemDeleted } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(value);
    const [hasChanged, setHasChanged] = useState(false);

    function renderDefault() {
        return <span onClick={() => setIsEdit(true)}>{value}</span>
    }
    function onUpdateHandler() {
        setIsEdit(false);
        onEntryItemChanged(text);
        setHasChanged(false);
    }
    function onChangeHandler(e) {
        setText(e.target.value);
        setHasChanged(true);
    }
    function renderEditing() {
        return (
            <div className="entry-item-form-group">
                <input autoFocus className="form-control"
                    type="text" value={text} 
                    onChange={(e) => onChangeHandler(e)} 
                />
                <button className="btn btn-warning"
                    onClick={onUpdateHandler}>{ hasChanged ? "Edit" : "Cancel" }</button>
                <button className="btn btn-danger"
                    onClick={onEntryItemDeleted}>Delete</button>
            </div>
        )
    }

    return  isEdit ? renderEditing() : renderDefault();
}

export default EntryItem;
