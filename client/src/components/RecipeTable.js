import { useState, useEffect } from 'react';
import seedRecipes from '../data/seed-data.json';
import axios from 'axios';
import API_URI from '../utilities/apiUtils.js';
import { Link } from '@reach/router';
const RecipeTable = (props) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        setRecipes(seedRecipes);
       // axios.get(API_URI)
       //     .then(res => setRecipes(res.data));
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
                <tr key={recipe.id}>
                    <td><Link to={`/recipes/${ recipe.id }`}>{ recipe.name }</Link></td>
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
