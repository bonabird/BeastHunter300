export default function Tile(props) {
    // Inherits data from the parent function and changes colour depending on whether it has a colour or not
    const styles = {
        backgroundColor: props.hasPoint ? "#FFFF00" : "white",
    }
    return (
        <div
            className="point"
            style={styles}
        >
        </div>
    )
}