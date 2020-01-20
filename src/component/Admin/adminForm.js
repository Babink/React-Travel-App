import React from "react"


class AdminForm extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.state = {
            name: "",
            password: ""
        }
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onFormSubmit() {
        const { name, password } = this.state

        if (name.toLowerCase() === "admin" && password.toLowerCase() === "admin") {
            localStorage.setItem("admin", true)
            this.props.onBtnClicked()
        }
        else {
            console.log("Error")
            this.setState({
                error: "Please enter correct admin credientials"
            })
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.error ? <p style={{ color: "red" , fontSize: "20px" , fontWeight: "800" }}> {this.state.error} </p> : null
                }
                <input type="text" placeholder="Username" value={this.state.name} onChange={this.onNameChange} />
                <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />

                <button onClick={this.onFormSubmit}> Login </button>
            </div>
        )
    }
}

export default AdminForm