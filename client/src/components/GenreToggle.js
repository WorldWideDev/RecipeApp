const GenreToggle = (props) => {
    const { genres } = props;
    // useEffect could do some cool things here 
    // useEffect(callback, [state, state])
    return (
        <nav className="genre-nav">
            {genres.map((genre, i) => {
                return (
                    <button key={i} className="btn btn-warning">{genre}</button>
                )
            })}
        </nav>
    )
}
export default GenreToggle;
