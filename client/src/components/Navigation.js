import { Link } from '@reach/router';

const Navigation = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/movies/new">Create a Movie</Link>
        </nav>
    )
}
export default Navigation;
