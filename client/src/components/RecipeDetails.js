import { React, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import API_URI from '../utilities/apiUtils.js';
import RecipeForm from './RecipeForm.js';
import axios from 'axios';

const RecipeDetails = (props) => {
    const { id, onSubmitProp, onDeleteProp, errors } = props;
    const [recipe, setRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        axios.get(`${API_URI}/${id}`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((err) => {
                console.log("uh oh", err);
            });

    }, []);
    const deleteHandler = () => {
        const result = prompt("Type 'yes' to delete");
        if(result !== 'yes') { return; }
        onDeleteProp(recipe._id);
        navigate('/');
    }
    const renderConditionalEdit = () => {
        return (isEditing)
            ? (
                <section>
                    <RecipeForm recipe={recipe} errors={errors} onSubmitProp={onSubmitProp}>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="btn btn-warning">Cancel</button>
                    </RecipeForm>
                </section>
            )
            : (
                <section className="recipe-details-card">
                    <h1>{ recipe.name }</h1>     
                    <p><strong>Cook Time:</strong> {recipe.cookingTime}</p>
                    <blockquote>{ recipe.description }</blockquote>
                    <div>
                        <main>
                            <h2>Ingredients</h2>
                            <ul>
                            {recipe.ingredients.map((ing, i) => {
                                return <li key={i}>{ing}</li>;
                            })}
                            </ul>
                        </main>
                        <aside>
                            <h2>Steps</h2>
                            <ol>
                            {recipe.steps.map((step, i) => {
                                return <li key={i}>{step}</li>;
                            })}
                            </ol>
                        </aside>
                    </div>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="btn btn-warning">Edit</button>
                    <button 
                        onClick={deleteHandler}
                        className="btn btn-danger">Delete</button>
                </section>
            );
    }
    return (recipe === null) 
        ? <h1>...loading...</h1>
        : renderConditionalEdit();
        
}

export default RecipeDetails;
