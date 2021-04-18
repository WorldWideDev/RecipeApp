import { navigate } from '@reach/router';
import {useState} from 'react';
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
    console.log("rendering recipe form");
    const initialState = (props.recipe === undefined)
        ? INITIAL_RECIPE_STATE
        : {...props.recipe, releaseDate:getFormReadyDate(props.recipe.releaseDate)};
    const { errors, onSubmitProp, children } = props;
    const [recipe, setRecipe] = useState({...initialState});
    const {name, steps, ingredients, cookingTime, description} = recipe;
    function onInputChanged(field, value) {
        setRecipe({ ...recipe, [field]:value});
    }
    function onSubmitHandler(e) {
        e.preventDefault();
        onSubmitProp(recipe);
        if(errors.length < 1) { setRecipe({...INITIAL_RECIPE_STATE}); }
        //navigate('/');
    }
    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <span className="error">{ errors?.name?.message }</span>
                <input className="form-control" type="text" id="name" value={name} onChange={(e) => onInputChanged('name', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="cookingTime">Cook Time</label>
                <span className="error">{ errors?.cookingTime?.message }</span>
                <input className="form-control" type="text" id="cookingTime" value={cookingTime} onChange={(e) => onInputChanged('cookingTime', e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
            { children }
        </form>
    )
}
export default RecipeForm;
