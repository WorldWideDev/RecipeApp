import { Link } from '@reach/router';
const getFormattedDate = (date) => new Date(date).toLocaleDateString();
const RecipeTable = (props) => {
    let { recipes } = props;
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Cook Time</th>
                    <th>Instant Pot</th>
                </tr>
            </thead>
            <tbody>
            {recipes.map((recipe, i) => {
                return (
                <tr key={recipe._id}>
                    <td><Link to={`/recipes/${ recipe._id }`}>{ recipe.name }</Link></td>
                    <td>{ recipe.cookingTime }</td>
                    <td>{ recipe.isIntantPot }</td>
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}
export default RecipeTable;
