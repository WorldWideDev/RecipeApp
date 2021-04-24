import EntryItem from './EntryItem.js';
import React, { useState } from 'react';

const EntryFormGroup = (props) => {
    const { entries, entryName, entryDisplayName, onEntriesChanged } = props;
    const [newEntry, setNewEntry] = useState("");


    function onNewEntrySubmit() {
        console.log(entries);
        onEntriesChanged([...entries, newEntry]);
        setNewEntry("");
    }
    
    function onNewEntryChanged(newText) {
        setNewEntry(newText);
    }

    function entryChangedHandler(text, i) {
        let tempEntries = [...entries];
        tempEntries[i] = text;
        onEntriesChanged(tempEntries);
    }

    return (
        <section>
            <div className="form-group">
                <label htmlFor={entryName}>{`${entryDisplayName}${'s'}`}</label>
                <input className="form-control" 
                    type="text" id={entryName} value={newEntry} 
                    onChange={(e) => onNewEntryChanged(e.target.value)} />
                <button className="btn" 
                    onClick={onNewEntrySubmit}>Add {entryDisplayName}</button>
                <div className="entry-group">
                {
                    entries.map((ent, i) => {
                        return (
                            <EntryItem key={i} value={ent} 
                                onEntryItemChanged={(updatedEntry) => entryChangedHandler(updatedEntry)} />
                        )
                    })
                }
                </div>
            </div>
        </section>
    )
}

export default EntryFormGroup;
