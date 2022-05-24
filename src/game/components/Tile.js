export default function Tile(props) {
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