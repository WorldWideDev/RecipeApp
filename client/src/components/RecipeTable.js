import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URI from '../utilities/apiUtils.js';
import { Link } from '@reach/router';
const getFormattedDate = (date) => new Date(date).toLocaleDateString();
const RecipeTable = (props) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        axios.get(API_URI)
            .then(res => setRecipes(res.data));
    }, []);
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Cook Time</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {recipes.map((recipe, i) => {
                return (
                <tr key={recipe._id}>
                    <td><Link to={`/recipes/${ recipe._id }`}>{ recipe.name }</Link></td>
                    <td>{ recipe.cookingTime }</td>
                    <td>{ recipe.description }</td>
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}
export default RecipeTable;
