import { Link } from '@reach/router';

const Navigation = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/recipes/new">Create a Recipe</Link>
        </nav>
    )
}
export default Navigation;
