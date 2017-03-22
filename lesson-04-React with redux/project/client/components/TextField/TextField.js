import React, {Component} from 'react';

class TextField extends Component {

    _keyPress = (e) => {
        if (e.target.value && e.charCode == 13) {
            this
                .props
                .onKeyPress(e.target.value);
        }
    }
    _onChange = (e) => {
        this
            .props
            .onChange(e.target.value);
    }
    render() {
        return (
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder}
                    onKeyPress={this._keyPress}
                    value={this.props.value}
                    onChange={this._onChange}/>
            </div>
        );
    }
}

export default TextField;