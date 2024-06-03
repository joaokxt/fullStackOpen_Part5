const Notification = ({ content, error }) => {
    if(content === null){
        return
    }

    const positive = {
        color: 'green',
        margin: 10,
        padding: 10,
        borderStyle: 'solid',
        borderColor: 'green',
        fontSize: 25
    }

    const negative = {
        color: 'red',
        margin: 10,
        padding: 10,
        borderStyle: 'dashed',
        borderColor: 'red',
        fontSize: 25
    }

    return (
        <div style={error ? negative : positive }>
            {content}
        </div>
    )
}

export default Notification