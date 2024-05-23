function IconBar (props) {
    const position = props.position;

    const dynamicPosition = {
        top: position === 'top' ? '0' : 'auto',
        bottom: position === 'bottom' ? '0' : 'auto',
    }

    return (
        <div className="iconBar" style={ dynamicPosition }>

        </div>
    )
};

export default IconBar;