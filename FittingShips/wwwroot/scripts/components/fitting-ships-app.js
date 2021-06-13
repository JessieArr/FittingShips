function FittingShipsApp(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h2',
            null,
            'Fitting Ships'
        ),
        React.createElement(
            'p',
            null,
            'App'
        ),
        React.createElement(TestImage, null)
    );
}

var app = React.createElement(FittingShipsApp, null);
ReactDOM.render(app, document.getElementById('root'));