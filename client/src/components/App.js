import Typography from 'typography';
import funstonTheme from 'typography-theme-funston';
import { Router } from '@reach/router';
import Navigation from './Navigation.js';
import RecipeForm from './RecipeForm.js';
import RecipeDetails from './RecipeDetails.js';
import RecipeTable from './RecipeTable.js';
import '../styles/_main.scss';

const typography = new Typography(funstonTheme);
function App() {
    return (
        <div className="">
            <header>
            { typography.injectStyles() }
                <h1 className="main-title">Newsom Kitchen</h1>
            </header>
            <Navigation />
            <Router>
                <RecipeTable default />
                <RecipeForm isCreate={true} path="/recipes/new" />
                <RecipeDetails path="/recipes/:id"/>
            </Router>
        </div>
    )

}

export default App;
