import API_URI from '../utilities/apiUtils.js';
import axios from 'axios';
import { navigate } from '@reach/router';
import {useState} from 'react';
import EntryFormGroup from './EntryFormGroup';
const getFormReadyDate = (date=null) => {
    const dt = (date === null) ? new Date() : new Date(date);
    return dt.toISOString().split('T')[0];
}
const INITIAL_RECIPE_STATE = {
    name: '',
    description: '',
    cookingTime: '',
    steps: [],
    ingredients: [],
    isInstantPot: false
}
// const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated'];
const RecipeForm = (props) => {
    console.log("recipe form rendering");
    const initialState = (props.recipe === undefined)
        ? INITIAL_RECIPE_STATE
        : {...props.recipe, releaseDate:getFormReadyDate(props.recipe.releaseDate)};
    const { isCreate, children } = props;
    const [recipe, setRecipe] = useState({...initialState});
    const [steps, setSteps] = useState([...recipe.steps]);
    const [ingredients, setIngredients] = useState([...recipe.ingredients]);
    const [newIngredient, setNewIngredient] = useState("");
    const [errors, setErrors] = useState([]);
    const [newStep, setNewStep] = useState("");
    const {name, cookingTime, description} = recipe;
    function onInputChanged(field, value) {
        setRecipe({ ...recipe, [field]:value});
    }
    const updateRecipe = () => {
        axios.put(`${API_URI}/${recipe._id}`, recipe)
            .then(res => {
                setErrors([]);
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    const createRecipe = () => {
        axios.post(API_URI, recipe)
            .then(res => {
                setErrors([]);
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    }
    function onNewItemHandler(itemType) {
        console.log(itemType, newIngredient, ingredients);
        switch(itemType) {
            case 'ingredient':
                setIngredients([...ingredients, newIngredient])
                onInputChanged("ingredients", ingredients);
                setNewIngredient('');
                return;
            default:
                setSteps([...steps, newStep])
                onInputChanged("steps", steps);
                setNewStep('');
        }
    }
    function onSubmitHandler(e) {
        console.log("submitting!");
        e.preventDefault();
        if(isCreate) {
            createRecipe();
        } else {
            updateRecipe();
        }
    }
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-btns">
                { children }
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <span className="error">{ errors?.name?.message }</span>
                <input 
                    className="form-control" 
                    type="text" id="name" value={name} 
                    onChange={(e) => onInputChanged('name', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="cookingTime">Cooking Time</label>
                <span className="error">{ errors?.cookingTime?.message }</span>
                <input className="form-control" 
                    type="text" id="cookingTime" value={cookingTime} 
                    onChange={(e) => onInputChanged('cookingTime', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <span className="error">{ errors?.description?.message }</span>
                <textarea className="form-control" 
                    type="text" id="description" value={description} 
                    onChange={(e) => onInputChanged('description', e.target.value)}></textarea>
            </div>
            <div className="entry-group-container">
                <EntryFormGroup entries={ingredients} 
                    entryName={"ingredients"}
                    entryDisplayName={"Ingredient"} 
                    onEntriesChanged={(newIngredients) => setIngredients(newIngredients)}/>
            </div>
            <button onClick={(e) => onSubmitHandler(e)} type="submit" 
                className="btn btn-primary">Send</button>
        </form>
    )
}
export default RecipeForm;
