import axios from 'axios';
import Typography from 'typography';
import funstonTheme from 'typography-theme-funston';
import { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import API_URI from '../utilities/apiUtils.js';
import Navigation from './Navigation.js';
import RecipeForm from './RecipeForm.js';
import RecipeDetails from './RecipeDetails.js';
import RecipeTable from './RecipeTable.js';
import '../styles/_main.scss';

const typography = new Typography(funstonTheme);
function App() {
    const [recipes, setRecipes] = useState([]);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        axios.get(API_URI)
            .then(res => setRecipes(res.data));
    }, []);
    const updateRecipe = (recipe) => {
        const idx = recipes.findIndex(m => m._id === recipe._id);
        axios.put(`${API_URI}/${recipe._id}`, recipe)
            .then(res => {
                const updatedRecipes = [...recipes];
                updatedRecipes[idx] = recipe;
                setErrors([]);
                setRecipes(updatedRecipes);
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    const createRecipe = (recipe) => {
        axios.post(API_URI, recipe)
            .then(res => {
                setRecipes([...recipes, res.data]);
                setErrors([]);
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    const deleteHandler = (id) => {
        axios.delete(`${API_URI}/${id}`)
            .then((res) => {
                setRecipes(recipes.filter(m => m._id !== res.data.id));
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="">
            <header>
            { typography.injectStyles() }
                <h1 className="main-title">Newsom Kitchen</h1>
            </header>
            <Navigation />
            <Router>
                <RecipeTable recipes={recipes} default />
                <RecipeForm errors={errors} onSubmitProp={createRecipe} path="/recipes/new" />
                <RecipeDetails errors={errors} onDeleteProp={deleteHandler} onSubmitProp={updateRecipe} path="/recipes/:id"/>
            </Router>
        </div>
    )

}

export default App;
